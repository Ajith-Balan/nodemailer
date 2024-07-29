import contactSchema from './models/contact.model.js'
import userSchema from "./models/user.model.js"
import bcrypt from 'bcrypt'
import pkg from 'jsonwebtoken'
import nodemailer from 'nodemailer'


const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "3bf1ace8b5aa81",
      pass: "23d9ae6b829afb",
    },
  });

const {sign} = pkg


export async function addcontact(req,res){
    const {...contact}=req.body;
    await contactSchema.create({...contact})
    .then(()=>{res.status(201).send({message:"successfully added a contactNumber"})})
    
    .catch((error)=>{res.status(400).send(error)})
    console.log(contact);
}



export async function getcontact(req,res){
    const data= await contactSchema.find();
    try {
        res.status(200).send(data)

    } catch (error) {
        res.status(500).send(error)

    }
}

export async function deletecontact(req,res){
    const {id}=req.params;
    const data= await contactSchema.deleteOne({_id:id});
    try {
        res.status(200).send({message:"successfully deleted the number"})

    } catch (error) {
        res.status(400).send({error})

    }
}


export async function foredit(req,res){
    const {id}=req.params;
    const data= await contactSchema.findOne({_id:id});
    try {
        res.status(200).send({data})

    } catch (error) {
        res.status(400).send({error})

    }
}



export async function updatecontact(req,res){
    const {id}=req.params;
    const {...data}=req.body
    await contactSchema.updateOne ({_id:id},{$set:{...data}});
    try {
        res.status(201).send({message:"successfully updated "})

    } catch (error) {
        res.status(400).send({error:error})

    }
}

















export async function userRegister(req,res) {

    const {username,password,cpassword}=req.body
console.log(password);
    if(!(username&&password&&cpassword))
        return res.status(404).send("fields are empty")

    if(password!==cpassword)
        return res.status(404).send("password not matched")

bcrypt.hash(password,10).then(async(hpassword)=>{
    userSchema.create({username,password:hpassword,otp:""}).then(()=>{
        return res.status(201).send({msg:"successfully created"})

    })
    .catch((error)=>{
        return res.status(400).send({error:error})
    })
}).catch((error)=>{
    res.status(400).send({error:error})
})
    
}




export async function userLogin(req,res){
    try {
        const {username, password}=req.body;
        const user=await userSchema.findOne({username})
        if(user == null)return res.status(404).send({msg:"user not found"})
            const id = user._id
        const success= await bcrypt.compare(password,user.password);
        if(success!==true) return res.status(400).send({msg:"password not matched"})
            const token=await sign ({id,username},process.env.JWT_KEY,{expiresIn:"24h"})
        return res.status(200).send({token})
    } catch (error) {
        res.status(400).send({error:error})
    }
}






export async function Home(req,res){
    const {id,username}=req.user
    console.log(req.user);
    res.status(200).send({username})
}





export async function Forget(req,res){
    const {username}=req.body;
    console.log(username);
const data=await userSchema.findOne({username:username});
if(!data)
    return res.status(400).send({msg:"user not found"})

const otpLength = 6;
  // Generate a random numeric OTP with exactly 6 digits
  const otp = Math.floor(100000 + Math.random() * 900000);
  console.log(otp);
//   update otp in data base code here
  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
    to: "ajithaji9404@gmail.com", // list of receivers
    subject: "OTP", // Subject line
    text: "your valid otp", // plain text body
    html: `<b>${otp}</b>`, // html body
  });

  console.log("Message sent: %s", info.messageId);



}