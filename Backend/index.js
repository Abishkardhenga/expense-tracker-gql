import express from 'express';
import http from 'http';
import { ApolloServer } from "@apollo/server";
import mergedTypeDefs from "./typeDefs/index.js"
import { expressMiddleware } from '@apollo/server/express4';
import dotenv from 'dotenv';

import mergedResolvers from "./resolvers/index.js";
import cors from 'cors';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import connectMongoose from './db/connectDb.js';
dotenv.config()

const app = express();


const httpServer = http.createServer(app);


const server = new ApolloServer({
    typeDefs:mergedTypeDefs,
    resolvers:mergedResolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],

  });
  await server.start();

  app.use(
    '/graphql',
    cors(),
    express.json(),
    
    expressMiddleware(server, {
      context: async ({ req }) => ({ req }),
    }),
  );
  
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  
  console.log(`🚀 Server ready at http://localhost:4000/`);
  await connectMongoose()