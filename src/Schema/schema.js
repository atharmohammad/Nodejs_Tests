const {buildSchema} = require('graphql')

const schema = buildSchema(`
    type Users {
        id:ID!
        Username:String!
        Password:String
    }
    type Job{
        Name:String!
        Fee:Int!
    }
    type AuthData{
        id:ID!
        token:String!
    }
    input JobInput{
        Name:String!
        Fee:Int!
    }
    input UserInput{
        Username:String!
        Password:String!
    }
    type RootQuery {
        jobs: [Job!]!
        login(user:UserInput):AuthData!
    }
    type RootMutation {
        addJob(jobs:JobInput): String!
        createUser(user:UserInput): String!
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)

module.exports = schema