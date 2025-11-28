import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'

//api to register user

const registerUser = async (req,res)=>{
    try{
const {name,email,password} = req.body
if(!name || !email || !password) {
    return res.json({
        success:false,
        msg:"Missing details"
    })
}

if(!validator.isEmail(email)) {
    return res.json({success:false,msg:"Email is not valid"})
}

if(password.length<8 ){
    return res.json({success:false,msg:"enter a strong password"})

}

const salt = await bcrypt.genSalt(10)
const hashPass  = await bcrypt.hash(password,salt)

const userData = {
    name,
    email,
    password:hashPass
}

const newUser = new userModel(userData)
const user = await newUser.save()

const token= jwt.sign({id:user._id},process.env.JWT_SECRET)
res.json({
    success:true,
    token:token
})
    }
    catch(e){
console.log(e)
res.json({
    success:false,
    msg:e
})
    }
}



//API for userLogin
const userLogin = async (req,res)=>{
try{

    const {email,password} = req.body

    if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
        const adminToken = jwt.sign(email+password,process.env.JWT_SECRET)
        return res.json({
            success:true,
            role:'admin',
            token:adminToken
        })
    }

    const user = await userModel.findOne({email})
    if(!user) {
        return res.json({success:false,msg:"User does not exist"})
    }

    const isMatch = await bcrypt.compare(password,user.password)
    if(isMatch){
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
        res.json({
            success:true,
            role:'user',
            token:token
        })
    }
    else{
        return res.json({success:false,msg:"Invalid credentials"})
    }



}catch(e){
    console.log(e)
res.json({
    success:false,
    msg:e
})
}


}

//API for user profile data

const getProfile = async (req,res)=>{
    try{
        const {userId} = req.body;

        const userData = await userModel.findById(userId).select('-password')
        res.json({success:true,data:userData})

    }
    catch(e){
        return res.json({success:false,msg:"No profile found"})
    }

}

//api to update userprofile
const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, address, dob, gender } = req.body;
        const imageFile = req.file;

        // Validate input
        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, msg: "Data is missing" });
        }

        // Parse address only if it's a string
        let parsedAddress;
        if (typeof address === "string") {
            try {
                parsedAddress = JSON.parse(address);
            } catch (e) {
                return res.json({ success: false, msg: "Invalid address format" });
            }
        } else {
            parsedAddress = address; // Use it directly if it's already an object
        }

        // Update the user profile fields
        await userModel.findByIdAndUpdate(userId, {
            name,
            phone,
            address: parsedAddress,
            dob,
            gender,
        });

        // Handle image upload if an image is provided
        if (imageFile) {
            // Upload image to Cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
            const imageUrl = imageUpload.secure_url;

            // Update the user's image field
            await userModel.findByIdAndUpdate(userId, { image: imageUrl });
        }

        res.json({ success: true, msg: "Profile updated" });
    } catch (e) {
        console.error("Error updating profile:", e);
        return res.json({ success: false, msg: "Failed to update profile" });
    }
};


//API to book an appointment aa function samjvu dhan thi


 const bookAppointment = async (req,res)=>{

try{
const {userId,docId,slotDate,slotTime} = req.body

const docData=  await doctorModel.findById(docId).select('-password')

if(!docData.available){
return  res.json({success:false,msg:"Doctor not available"})

}
let slots_booked = docData.slots_booked
// checking for slots availibility


if(slots_booked[slotDate]){
    if(slots_booked[slotDate].includes(slotTime)){
        return res.json({success:false,msg:"Slot not available"})
    }else{
        slots_booked[slotDate].push(slotTime)
    }
}
else{
    slots_booked[slotDate] = []
    slots_booked[slotDate].push(slotTime)
}
const userData = await userModel.findById(userId).select('-password')
delete docData.slots_booked

const appointmentData = {
    userId,
    docId,
    userData,
    docData,
    amount:docData.fees,
    slotTime,
    slotDate,
    date:Date.now(),
}

const newAppointment= new appointmentModel(appointmentData);
await newAppointment.save();

// save new slot data in doctor model

await doctorModel.findByIdAndUpdate(docId,{slots_booked})

res.json({success:true,msg:"Appointment booked"})


}
catch(e){
    console.log(e)
    res.json({
        success:false,
        msg:e
    })
}
 }


 // API to get user appointmet for fronend 

 const listAppointment = async (req,res)=>{
    try{
const {userId} = req.body;
// console.log(userId);

        const appointments = await appointmentModel.find({userId})

        res.json({success:true,data:appointments})

    }

    catch(e){
        console.log(e)
        res.json({success:false,msg:"Not booked any appointments"})
    }
 }


 // API to cancel appointment


 const cancelAppointment = async (req,res)=>{
try{
const {userId,appointmentId} = req.body

const appointmentData = await appointmentModel.findById(appointmentId)

if(appointmentData.userId!=userId){
    return res.json({success:false,msg:"Appointment not found"})    
}

await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
// releasing doctor's slot

const {docId,slotDate,slotTime}= appointmentData
const doctorData = await doctorModel.findById(docId)
let slots_booked = doctorData.slots_booked;
slots_booked[slotDate] = slots_booked[slotDate].filter(slot=>slot!=slotTime)
await doctorModel.findByIdAndUpdate(docId,{slots_booked})

res.json({success:true,msg:"appointment cancelled"})

}
catch(e){
    console.log(e);
    res.json({success:false,msg:e})
    
}

 }


export {registerUser,userLogin,getProfile,updateProfile,bookAppointment,listAppointment,cancelAppointment}