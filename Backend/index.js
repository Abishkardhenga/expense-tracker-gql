import express from 'express';
import http from 'http';
import { ApolloServer } from "@apollo/server";
import mergedTypeDefs from "./typeDefs/index.js";
import { expressMiddleware } from '@apollo/server/express4';
import dotenv from 'dotenv';
import mergedResolvers from "./resolvers/index.js";
import cors from 'cors';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import connectMongoose from './db/connectDb.js';
import passport from 'passport';
import session from 'express-session';
import connectMongo from 'connect-mongodb-session';
import { buildContext } from "graphql-passport";
import configurePassport from "./Passport/passport.config.js";

dotenv.config();
configurePassport();

const app = express();
const httpServer = http.createServer(app);
const MongoDBStore = connectMongo(session);

const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions"
});

store.on("error", (err) => console.log(err));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      httpOnly: true, // Prevents cross-site scripting (XSS) attacks
    },
    store: store
  })
);

app.use((req, res, next) => {
  console.log(req.session);
  next();
});


// Initialize passport and passport session
app.use(passport.initialize());
app.use(passport.session());

const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  '/graphql',
  cors({
    origin: "http://localhost:3000",
    credentials: true
  }),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => buildContext({ req, res }),
  }),
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

console.log(`🚀 Server ready at http://localhost:4000/`);
await connectMongoose();
