import nodemailer from 'nodemailer'

import ENV from "../config/config.js"
import Mailgen from 'mailgen'


let nodeConfig={
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: ENV.EMAIL, // generated ethereal user
      pass: ENV.PASSWORD, 
    }
}

let transporter = nodemailer.createTransport(nodeConfig)

let mailGenerator = new Mailgen({
    theme:"default",
    product:{
        name:"Mailgen",
        link:'https://mailgen.js/'
    }
})


export const registerMail = async (req,res) =>{
    const { username ,userEmail , text , subject } = req.body

    //body of the email 
    let email ={
        body:{
            name:username,
            intro:text || "Welcome to sidhya login application",
            outro:"Need help or have questions?"
        }
    }

    let emailBody = mailGenerator.generate(email);

    let message ={
        from:ENV.EMAIL,
        to:userEmail,
        subject:subject || "Signup Successfull",
        html:emailBody
    }

    //send mail
    transporter.sendMail(message)
        .then(()=>{
            return res.status(200).send({msg:"You should receive an email from us."})
        })
        .catch(error=> res.status(500).send({error}))
}