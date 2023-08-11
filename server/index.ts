import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { graphqlHTTP } from 'express-graphql';
import compression from 'compression';
import session from 'express-session';
import passport from 'passport';
import connectMongoDBSession from 'connect-mongodb-session';
import schema from './schema/schema';

const app = express();
app.use(compression());

const MongoStore = connectMongoDBSession(session);

app.use(express.json());

const PORT = process.env.PORT;
const MONGDB_URL = process.env.MONGDB_URL;
const MONGO_DBNAME = process.env.MONGO_DBNAME;
const SECRET = process.env.SECRET!;

const dbUrl = `${MONGDB_URL}/${MONGO_DBNAME}`;

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: SECRET!,
    store: new MongoStore({
      uri: dbUrl,
      collection: 'sessions'
    })
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

if (process.env.NODE_ENV === 'development') {
  Promise.all([
    import('webpack'),
    import('webpack-dev-middleware'),
    import('../webpack.dev')
  ]).then((values) => {
    const { webpack } = values[0];
    const { default: webpackMiddleware } = values[1];
    const { default: webpackConfig } = values[2];
    app.use(webpackMiddleware(webpack(webpackConfig)));
  });
} else {
  import('path').then((data) => {
    const join = data.default.join;
    app.use(express.static(join(__dirname, '../../client/dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(join(__dirname, '../../client/dist/index.html'));
    });
  });
}

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log('database connected');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
