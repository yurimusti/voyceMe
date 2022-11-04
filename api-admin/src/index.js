require('dotenv').config();

import express from 'express';
import Mongodb from 'mongodb';

const { ApolloServer, gql } = require('apollo-server-express');

import Query from './schema/query.graphql';
import Mutation from './schema/mutation.graphql';
import Type from './schema/type.graphql';
import Input from './schema/input.graphql';

import * as AuthResolver from './controller/auth';
import * as UserResolver from './controller/user';

const MongoClient = Mongodb.MongoClient;

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
    ${Query}
    ${Mutation}
    ${Type}
    ${Input}
`;

// Provide resolver functions for your schema fields

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}${process.env.DB_URL}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect((err, client) => {
    console.log(`Connected DB - ${process.env.ENV === 'production' ? '(PROD)' : '(DEV)'}`);
    const db = client.db(
        process.env.ENV === 'production' ? process.env.DB_NAME : process.env.DB_NAME_DEV
    );

    const app = express();

    const resolvers = {
        Query: {
            loginUser: AuthResolver.loginUser,
            getUser: UserResolver.getUser
        },
        Mutation: {
            createUser: AuthResolver.createUser
        }
    };

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => ({
            auth: req.headers.authorization,
            dbConnect: db
        }),
        playground: true,
        introspection: true
    });
    server.applyMiddleware({ app });

    app.use('/', (req, res) => res.send({ status: 'ok' }));

    app.listen(process.env.PORT || 4000, () =>
        console.log(
            `🚀 API ready at http://localhost:${process.env.PORT || 4000}${server.graphqlPath} `
        )
    );
});

client.close();
