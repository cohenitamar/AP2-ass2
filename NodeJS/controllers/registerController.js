const registerService = require ('../services/registerServices');


const createUser = async(req,res) =>{
    let x = await registerService.createUser (req.body.username,req.body.password,
        req.body.displayName,req.body.profilePic);
    if(!x) {
        return res.status(404).json("User already exist.")
    }
    else{
        console.log("else");
        res.json(await registerService.createUser (req.body.username,req.body.password,
            req.body.displayName,req.body.profilePic));
    }
}



module.exports = {createUser}