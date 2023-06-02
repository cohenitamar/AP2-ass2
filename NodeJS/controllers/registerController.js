const registerService = require ('../services/registerServices');


const createUser = async(req,res) =>{
    let x = await registerService.createUser (req.body.username,req.body.password,
        req.body.displayName,req.body.profilePic);
    if(!x) {
        return res.status(409).json("User already exist.")


        /// 400 fail
        // / 409 conflict
    }
    else if(x===-1){
        return res.status(400).json("Bad Request")
    }
    else{
        console.log("else");
        res.json(await registerService.createUser (req.body.username,req.body.password,
            req.body.displayName,req.body.profilePic));
    }
}



module.exports = {createUser}