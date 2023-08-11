import { Request } from 'express';
import { model } from 'mongoose';
import passport from 'passport';
import passportLocal from 'passport-local';

const User = model('user');
const LocalStrategy = passportLocal.Strategy;

interface User {
  email: string;
  password: string;
  savedJobs: [number]
};

passport.serializeUser<any, any>((req, user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(err => done(err, null));
});

passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  User.findOne({ email: email.toLowerCase() })
    .then(user => {
      if (!user) {
        return done(null, false, { message: 'Invalid Credentials'});
      }
      user.comparePassword(password, (err: Error, isMatch: boolean) => {
        if (err) {
          return done(err);
        } else if (isMatch) {
          return done(null, user);
        } else {return done(null, false, { message: 'Invalid Credentials' })};
      })
    })
}));

const signup = ({ email, password, req }: { email: string; password: string; req: Request }) => {
  const user = new User({ email, password, savedJobs: [] });
  if (!email || !password) throw new Error('You must provide an email and password');

  return User.findOne({ email })
    .then(existingUser => {
      if (existingUser) throw new Error('There is already a user with this email address. Please log in.');
      return user.save();
    })
    .then(user => {
      return new Promise((resolve, reject) => {
        req.login(user, (err) => {
          if (err) reject(err);
          resolve(user);
        });
      });
    });
};

const login = ({ email, password, req }: { email: string; password: string; req: Request }) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', (err: Error, user: User) => {
      if (!user) reject('Invalid Credentials');
      req.login(user, () => resolve(user));
    })({ body: { email, password } });
  })
};

const logout = (req: Request) => {
  const { user } = req;
  return new Promise((resolve, reject) => {
    req.logout((err) => {
      if (err) reject(err);
      resolve(user)
    })
  });
}

export default { signup, login, logout };