const { Test } = require("supertest");
const request = require("supertest")
const database = require("./database")
const createServer = require("./server")
const app = createServer();

beforeAll(()=>{
    // this will run before all unit tests 
    database.release();
})

describe("Rest API",()=>{
    //we will write all tests for restapi
    let token;
    test("Creating User",async()=>{
        const response = await request(app).post("/signup").send({Username:"user1",Password:"123"});
        expect(response.statusCode).toEqual(200);
    })
    test("login a user",async()=>{
        const response = await request(app).post("/login").send({Username:"user1",Password:"123"}); 
        expect(response.statusCode).toEqual(200);
        token = response.body.token;
    })
    test("add a job",async()=>{
        const response = await request(app).post("/add").set("Authorization","Bearer " + token).send({Name:"Creating front page",Fee:22223});
        expect(response.statusCode).toEqual(200);
    })
    test("get User job",async()=>{
        const response = await request(app).get("/jobs").set("Authorization","Bearer " + token).send();
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual([{Name:"Creating front page",Fee:"22223",id:1,Userid:1}])
    })
})

describe("GraphQL API",()=>{
    let token;
    test("Create a User",async()=>{
        const query = `mutation{
            createUser(user:{Username:"user2",Password:"hacker"})
          }`
        const response = await request(app).post('/graphql').send({query:query})
        expect(JSON.parse(response.text).errors).toEqual(undefined)
    })
    test("Login a User",async()=>{
        const query = `query{
            login(user:{Username:"user2",Password:"hacker"}){
              id
              token
            }
          }`
        const response = await request(app).post('/graphql').send({query:query})
        expect(JSON.parse(response.text).data.login.id).toEqual("2")
        token = JSON.parse(response.text).data.login.token
    })
    test("Add an Job for User",async()=>{
        const query = `mutation{
            addJob(jobs:{Name:"Make a Frontend of Website",Fee:2220})
          }`
        const response = await request(app).post('/graphql').set('Authorization',"Bearer " + token).send({query:query})
        expect(JSON.parse(response.text).errors).toEqual(undefined)
    })
    test("Get all Jobs by an User",async()=>{
        const query = `query{
            jobs{
              Name
              Fee
            }
          }`
        const response = await request(app).get('/graphql').set('Authorization',"Bearer " + token).send({query:query})
        expect(JSON.parse(response.text).errors).toEqual(undefined)
        const assignment = JSON.parse(response.text).data;
        expect(assignment).toEqual({ jobs: [ { Name: 'Make a Frontend of Website', Fee: 2220 } ] })
    })
})