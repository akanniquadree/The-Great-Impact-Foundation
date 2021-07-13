import express from "express"
import User from "../../model/UserModel/User.js"
import bcrypt  from "bcrypt"

const router = express.Router()

router.post("/register", async (req, res)=>{
    try {

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        const user = await newUser.save()
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send({msg:error.message})
    }
})

router.post("/login", async(req, res)=>{
    try{
        const user = await User.findOne({username: req.body.username})
        const validate = await bcrypt.compare(req.body.password, user.password)
        const {password, ...others} = user._doc;
        if(!user){
            res.status(500).send("Invalid Email");
        }else if(!validate){
            res.status(500).send("Invalid Password");
        }else{
            res.status(200).send(others)
        }
            
    }catch(error){
        res.status(500).send({msg: error.message})
    }
})




export default router;