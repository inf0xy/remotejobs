import { Schema, model, Types, Mongoose, MongooseError } from 'mongoose';

const ITEMS_PER_PAGE = 20;

interface Job {
  id: number;
  title: string;
  category: string;
  location: string;
  company_name: string;
  company: Types.ObjectId,
  tags: [string];
  job_type: string,
  salary: string;
  publication_date: string;
  url: string;
  description: string
};

const JobSchema = new Schema<Job>({
  id: {
    type: Number,
    required: [true, 'id must be number']
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: false,
    allowNull: true
  },
  company_name: {
    type: String,
    required: true
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'company'
  },
  tags: [String],
  job_type: {
    type: String,
    required: false
  },
  salary: {
    type: String,
    required: false,
    allowNull: true
  },
  publication_date: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const createJob = (jobs: [Job]) => {
  return Job.create(jobs)
    .then(res => res)
    .catch(err => err)
};

const getJobs = (page: number, searchTerm: string, jobType: string, locationFilter: string) => {
  const jobTypeFilter = jobType.length
    ? [jobType]
    : ['', 'full_time', 'part_time', 'contract', 'freelance', 'internship', 'other'];

  let options: any;
  if (locationFilter === 'all') {
    options = searchTerm === ''
    ? { job_type: { $in: jobTypeFilter } }
    : {
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } },
        { company_name: { $regex: searchTerm, $options: 'i' } },
        { title: { $regex: searchTerm, $options: 'i' } },
        { tags: { $regex: searchTerm, $options: 'i' } }
      ],
      job_type: { $in: jobTypeFilter }
    };
  } else {
    options = searchTerm === ''
    ? { job_type: { $in: jobTypeFilter }, location: { $regex: locationFilter, $options: 'i' } }
    : {
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } },
        { company_name: { $regex: searchTerm, $options: 'i' } },
        { title: { $regex: searchTerm, $options: 'i' } },
        { tags: { $regex: searchTerm, $options: 'i' } }
      ],
      job_type: { $in: jobTypeFilter },
      location: { $regex: locationFilter, $options: 'i' }
    };
  }

  let count = 0;
  return Job.find(options, { __v: 0, _id: 0 })
    .count()
    .then((res: number) => {
      count = res;
      return Job.find(options, { __v: 0, _id: 0 })
        .sort()
        .skip(--page * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE)
        .populate({
          path: 'company',
          select: 'logo -_id'
        });
    })
    .then((data: any) => ({ jobs: data, count }))
    .catch((err : MongooseError )=> err);
};

const getJobDetail = (id: string) => {
  return Job.findOne({ id }, { __v: 0, _id: 0 })
    .populate({
      path: 'company',
      select: 'logo -_id'
    })
    .then(data => data)
    .catch((err : MongooseError ) => err);
};

const Job = model('job', JobSchema);

export default { Job, createJob, getJobs, getJobDetail };
