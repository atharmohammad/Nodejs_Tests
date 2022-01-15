const express = require('express');
const app = express();
const {graphqlHTTP} = require('express-graphql');
const cors = require("cors");
const database = require('./database')
const jwt = require("jsonwebtoken")
const AuthMiddleWare = require("./middleware/Auth")
const Schema = require("./Schema/schema")
const Resolver = require("./Resolver/resolvers")
const routes = require("./routes/routes")

const createServer = ()=>{
    app.use(
        cors({
            origin: "*",
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        })
    );
    
    app.use(express.json());
    app.use(AuthMiddleWare);
    database.setupDbForDev();

    app.use("",routes);

    app.use(
        '/graphql',
        graphqlHTTP({
            schema: Schema,
            rootValue: Resolver,
            graphiql: true
        })
    );
    
    return app;
}

module.exports = createServer;
