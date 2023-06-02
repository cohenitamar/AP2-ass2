const loginService = require('../services/loginService')
const jwt = require("jsonwebtoken")


const login = async(req,res) =>{
    let x = await loginService.login(req.body.username,req.body.password);
    if(x){
        const key = "OriItamarTalKey";
        const data = { username: req.body.username }
        const token = jwt.sign(data, key);
        res.send(token);
    }
    else{
        return res.status(404).json("not valid user/password.");
    }
}


 const getUser = async (req,res) => {
     if (req.headers.authorization) {
// Extract the token from that header
         console.log(req.headers.authorization);
         const token = req.headers.authorization.split(" ")[1];
         const result = await loginService.getUser(token);
         if (!result) {
             return res.status(404).json("no user Found");
         } else {
             console.log(req.params.username);
             if(result.username !== req.params.username){
                 return res.status(401).json("Unauthorized");
             }
             const x = {username: result.username, displayName: result.username, profilePic: result.profilePic}
             return res.json(x);
         }
     } else {
     }
 }







module.exports = {login , getUser}
