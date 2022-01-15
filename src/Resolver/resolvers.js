const {
  insertJob,
  getUser,
  createUser,
  getJob,
} = require("../utils");
const jwt = require("jsonwebtoken")

const Resolver = {
  login: async (args) => {
    try {
      const user = await getUser(args.user);
      if (!user[0]) {
        throw new Error("No User Found !");
      }
      const token = jwt.sign({ userId: user[0].id }, "Secret");
      return { id: user[0].id, token: token };
    } catch (e) {
      return e;
    }
  },
  jobs: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error("Please Authenticate !");
      }
      const job = await getJob(req.userId);
      return job;
    } catch (e) {
      return e;
    }
  },
  addJob: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error("Please Authenticate !");
      }
      const job = args.jobs;
      await insertJob(job, req.userId);
      return "Job is added !";
    } catch (e) {
      console.log(e);
      return e;
    }
  },
  createUser: async (args) => {
    try {
      const user = await createUser(args.user);
      return `Welcome ${args.user.Username}. Please Login to Start Adding Jobs !`;
    } catch (e) {
      return e;
    }
  }
};

module.exports = Resolver;
