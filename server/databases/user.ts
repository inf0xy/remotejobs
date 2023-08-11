import { Schema, model, Types, MongooseError } from 'mongoose';
import bcrypt from 'bcrypt';
import job from './job';

const { Job } = job;

interface User {
  email: string;
  password: string;
  savedJobs: number[];
  savedFiles: string[];
}

const UserSchema = new Schema<User>({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  savedJobs: [Number],
  savedFiles: [String]
});

UserSchema.pre('save', function save(next) {
  const user = this;

  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, (err: any, salt: string) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err: any, hash: string) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function comparePassword(
  userPassword: string,
  cb: (err: any, match: boolean) => {}
) {
  bcrypt.compare(userPassword, this.password, (err: any, isMatch: boolean) => {
    cb(err, isMatch);
  });
};

const updateJobList = async (id: string, jobId: number) => {
  try {
    const user = await User.find({ _id: id, savedJobs: jobId });
    if (user.length) {
      await User.updateOne({ _id: id }, { $pull: { savedJobs: jobId } });
    } else {
      await User.updateOne({ _id: id }, { $push: { savedJobs: jobId } });
    }
    return user[0];
  } catch (err: any) {
    console.error(err);
    return err.message;
  }
};

const fetchSaveJobs = async (userId: number) => {
  try {
    const user = await User.findById(userId);
    if (user) {
      const jobs = await Job.find(
        { id: { $in: user.savedJobs } },
        { __v: 0, _id: 0 }
      ).populate({
        path: 'company',
        select: 'logo -_id'
      });
      return jobs;
    }
  } catch (err: any) {
    console.error(err);
    return err.message;
  }
};

const updateUserFiles = async (id: string, fileUrl: string) => {
  try {
    const user = await User.find({ _id: id, savedFiles: fileUrl });
    if (user.length) {
      await User.updateOne({ _id: id }, { $pull: { savedFiles: fileUrl } });
    } else {
      await User.updateOne({ _id: id }, { $push: { savedFiles: fileUrl } });
    }
    return user[0];
  } catch (err: any) {
    console.error(err);
    return err.message;
  }
};

const User = model('user', UserSchema);

export default { User, updateJobList, fetchSaveJobs, updateUserFiles };
