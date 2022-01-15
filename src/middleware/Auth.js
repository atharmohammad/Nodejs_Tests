const jwt = require("jsonwebtoken");

module.exports = (req,res,next)=>{
  const header = req.get("Authorization");
  if(!header){
    req.isAuth = false;
    return next();
  }

  const token = header.split(' ')[1];

  if(!token || token === ""){
    req.isAuth = false;
    return next();
  }

  let verifiedToken;

  try{
    verifiedToken = jwt.verify(token,"Secret");
  }catch(e){
    req.isAuth = false;
    return next();
  }
  if(!verifiedToken){
    req.isAuth = false;
    return next();
  }

  req.isAuth = true;
  req.userId = verifiedToken.userId;
  next();
}