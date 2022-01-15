const express = require("express")
const router = new express.Router()
const {
    insertJob,
    getUser,
    createUser,
    getJob,
  } = require("../utils");
const jwt = require("jsonwebtoken")
router.post("/signup",async(req,res)=>{
    try{
        const user = {Username:req.body.Username,Password:req.body.Password}
        await createUser(user)
        return res.status(200).send("Welcome")
    }catch(e){
        return res.status(400).send(e);
    }
})

router.post("/login",async(req,res)=>{
    try{
        const u = {Username:req.body.Username,Password:req.body.Password}
        const user = await getUser(u);
        if(!user || user.length == 0){
            return res.status(400).send("No User Found");
        }
        const token = jwt.sign({ userId: user[0].id }, "Secret");
        return res.status(200).send({token:token});
    }catch(e){
        return res.status(400).send(e);
    }
})

router.get("/jobs",async(req,res)=>{
    try{
        const jobs = await getJob(req.userId);
        return res.status(200).send(jobs);
    }catch(e){
        return res.status(400).send(e);
    }
})

router.post("/add",async(req,res)=>{
    try{
        if(!req.isAuth){
            return res.status(404).send("Please Authenticate !")
        }
        const job = {
            Name:req.body.Name,
            Fee:req.body.Fee
        }
        await insertJob(job,req.userId);
        return res.status(200).send("Job is added !")
    }catch(e){
        return res.status(400).send(e);
    }
})

module.exports = router