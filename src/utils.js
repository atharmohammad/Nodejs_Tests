const db = require('./database')

const insertJob = async(job,id)=>{
    try{
        return db.run(`INSERT INTO Jobs(Name,Fee,Userid) VALUES ('${job.Name}','${job.Fee}','${id}')`)
    }catch(e){
        return e;
    }
}


const getUser = async(user)=>{
    try{
        return db.all(`SELECT * FROM Users WHERE Username='${user.Username}' AND Password='${user.Password}'`)
    }catch(e){
        return e;
    }
}

const getJob = async(id)=>{
    try{
        return db.all(`SELECT * FROM Jobs WHERE Userid='${id}'`)
    }catch(e){
        return e;
    }
}

const createUser = async(user)=>{
    try{
        return db.run(`INSERT into Users (Username , Password) VALUES ('${user.Username}','${user.Password}')`)
    }catch(e){
        return e;
    }
}


module.exports = {
    insertJob:insertJob,
    getUser:getUser,
    createUser:createUser,
    getJob:getJob
}