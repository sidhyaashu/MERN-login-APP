import UserModel from '../models/User.model.js'
import bcrypt from "bcryptjs"
import  jwt  from 'jsonwebtoken'
import ENV  from '../config/config.js'
import otpGenerator from 'otp-generator'


// middleware for veryfi user
export const verifyUser = async(req,res,next)=>{
    try {
        const {username } = req.method == "GET"? req.query : req.body

        let existUser = await UserModel.findOne({username})
        if(!existUser) {return res.status(404).send({error:"Can't get User"})}

        next()
        
    } catch (error) {
        return res.status(404).send({error:"Authenticate Error"})
    }
}



//to register
export const register =async(req,res)=>{
    try {
        const { username,password,email,profile } = req.body

        if(!username || !password || !email) {return res.status(400).send({message:"All feild required !"})}

        const emailFormat = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if(!(email.match(emailFormat))) {return res.status(400).send({message:"Invalid Email Format...!"})}

        const existUsername = await UserModel.findOne({username}).exec()
        if(existUsername) {return res.status(400).send({message:"Username already exist"})}
        const existEmail = await UserModel.findOne({email}).exec()
        if(existEmail) {return res.status(400).send({message:"Email already exist"})}

        const hashedpassword = await bcrypt.hash(password,10)
        const user = UserModel.create({
            username,
            email,
            password:hashedpassword,
            profile:profile || ""
        })

        if(user){ 
            res.status(201).send({message:"User register succefully"})
        }else{
            res.status(400).send({message:"User not register"})
        }

    } catch (error) {
        return res.status(500).send({message:"Server problem ",error})
    }
}


//to login
export const login =async(req,res)=>{
    const { username,password} = req.body

    try {

        if(!password || !username) {return res.status(400).send({message:"All feild required !"})}

        const foundUser = await UserModel.findOne({username}).exec()
        if(!foundUser){
            res.status(400).send({message:"User not found"})
        }else if(foundUser){
            const matchPassword = await bcrypt.compare(password,foundUser.password)
            if(!matchPassword){ return res.status(200).send({message:"Password not matched"})}

            // jwt token
            const token  = jwt.sign({
                userId:foundUser._id,
                username:foundUser.username,
            },ENV.JWT_SECRET,{expiresIn:"24h"})

            const user={
                userId:foundUser._id,
                username:foundUser.username,
                email:foundUser.email,
                token:token
            }


            res.status(200).send({message :"Login succesfully",user})
        }
        
    } catch (error) {
        return res.status(500).send({message:"Server problem ",error})
    }
}


//to get user
export const getUser =async(req,res)=>{
    const { username } = req.params
    console.log(username)
    try {
        if(!username) return res.status(501).send({error:"Can't find user data"})
        const user = await UserModel.findOne({username})
        if(!user){
            return res.status(501).send({ error: "Couldn't Find the User" });
        }
        const { password, ...rest } = Object.assign({}, user.toJSON());
        return res.status(201).send(rest);


    } catch (error) {
        return res.status(404).send({error:"Can't get Userdata"})
    }
}


//to update user
export const updateUser =async(req,res)=>{
    try {
        //authenticate user id
        const { userId } = req.user

        if(!userId) {return res.status(400).send({error:"User Not Found...!"})}
        const body = req.body
        const updateeduser = await UserModel.updateOne({_id:userId},body)
        if(!updateeduser) {return res.status(400).send({error:"User not update...!"})}

        res.status(200).send({message:"Update succsfully",updateeduser})

    } catch (error) {
        return res.status(404).send({error:"Can't get Userdata",error})
    }
}


//to generateOTP user
export const generateOTP =async(req,res)=>{
    try {
        req.app.locals.OTP = await otpGenerator.generate(6,{
            lowerCaseAlphabets:false,
            upperCaseAlphabets:false,
            specialChars:false,
        })
        res.status(201).send({code:req.app.locals.OTP})


    } catch (error) {
        return res.status(404).send({error:"Can't generate OTP",error})
    }
}


//to verifyOTP user
export const verifyOTP =async(req,res)=>{
    const { code } = req.query
    if(parseInt(req.app.locals.OTP) === parseInt(code)){
        req.app.locals.OTP = null ; // reset the otp value
        req.app.locals.resetSession = true // start session for rest password
        return res.status(201).send({message:"Verify Successfully"})
    }
    return res.status(400).send({error:"Invalid OTP"})
}


//succesfully redirect user when otp is valid
export const createResetSession =async(req,res)=>{
    if(req.app.locals.resetSession){
        req.app.locals.resetSession = false // allow access to this route only once
        return res.status(201).send({message:"Access granted"})
    }
    return res.status(404).send({error:"Session expired!"})
}


//to reset password
export const resetPassword =async(req,res)=>{

    if(!req.app.locals.resetSession) {return res.status(440).send({error:"Session expired!"})}
    try {
        const {username,password} = req.body

        const foundUser = await UserModel.findOne({username})
        if(!foundUser) {return res.status(400).send({error:"User Not Found...!"})}
        const newPassword = await bcrypt.hash(password,10)
        const updatePassword = await UserModel.updateOne({username:foundUser.username},{password:newPassword})
        if(!updatePassword) {return res.status(400).send({error:"User not update...!"})}

        res.status(200).send({message:"Update succsfully"})
    } catch (error) {
        return res.status(401).send({error})
    }
}



// try {
//             const foundUser = await UserModel.findOne({username}).exec()
//             if(!foundUser) {
//                 res.status(400).send({message:"User Not Found"})
//             }else{
//                 const newPassword = bcrypt.hash(password,10)
//                 const updatedPassword = await UserModel.updateOne({username:foundUser.username},{password:newPassword})
//                 if(!updatedPassword) return res.status(400).send({message:"Enable to hashed password"})
//                 return res.status(200).send({message:"Recorde updated...!"})
                
//             }

//         } catch (error) {
//             return res.status(500).send({error})
//         }






// const existUsername = new Promise((resolve,rejecte)=>{
//             UserModel.findOne({username},function(err,user){
//                 if(err) rejecte(new Error(err))
//                 if(user) rejecte({error:"Username already exist"})

//                 resolve()
//             })
//         })

//         const existEmail = new Promise((resolve,rejecte)=>{
//             UserModel.findOne({email},function(err,emaill){
//                 if(err) rejecte(new Error(err))
//                 if(emaill) rejecte({error:"Email already exist"})

//                 resolve()
//             })
//         })

//         Promise.all([existEmail,existUsername])
//             .then(()=>{
//                 if(password){
//                     bcrypt.hash(password,10)
//                         .then((hashedpassword)=>{
//                             const user = UserModel({
//                                 username,
//                                 password:hashedpassword,
//                                 email,
//                                 profile:profile || ""
//                             })

//                             user.save()
//                                 .then(result=>res.status(201).json({msg:"User Register sussesfully",result}))
//                                 .catch(err=>res.status(500).send({err}))

//                         }).catch((error)=>{
//                             return res.status(500).send({
//                                 error :"Enable to hashed password"
//                             })
//                         })
//                 }
//             }).catch(error=>{
//                 console.log(error)
//                 return res.status(500).send({message:"Server problem 1 "})
//             })