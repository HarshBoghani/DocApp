import validator from 'validator'
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js' 
import jwt  from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'
import userModel from '../models/userModel.js'

//API for adding doctor

const addDoctor=async (req,res)=>{
    try{

        const {name,email,password,speciality,degree,experience,about,fees,address} =req.body;
        const imageFile = req.file;
        // console.log({name,email,password,speciality,degree,experience,about,fees,address},imageFile);
         //checking for all data to add doctor
         
         if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address)
         {
            

            return res.json({success:false,msg:"Missing details"})
         }
         // validatin email format 
         if(!validator.isEmail(email)){
            return res.json({msg:"Email is not valid"})
         }
         // validate passwd
         if(password.length<8) {
            return res.json({msg:"Please enter a strong password"})

         }
        const salt = await bcrypt.genSalt(5)
        const hashPass = await bcrypt.hash(password,salt)
         
        // generating image url 
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:'image'})
        const imageUrl = imageUpload.secure_url
         
         const doctorData = {
            name,
            email,
            image:imageUrl,
            password:hashPass,
            speciality,
            degree,
            experience,
            about,
            fees,
            address,
            date:Date.now()
         }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save();
res.json({
    msg:"Doctor added"
})
    }
    catch(e){
console.log("Error is occuring in admin controller"+e);

    }
}

//API for the admin login

const loginAdmin = async (req,res)=>{
    try{
        // console.log("from backend")
        // console.log(req)
        const {email,password} = req.body
        if(email===process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){

         const token = jwt.sign(email+password,process.env.JWT_SECRET)   
        res.json({
            token:token
        })


        }
        else{
            res.json({
                msg:"Invalid credentials"
            })
        }
    }
    catch(e){
        console.log("Error is occuring in admin controller"+e);
        
            }
    


}

//APi to get all doctors list for admin panel
const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password'); // exclude passwords because obvious security reasons

        res.status(200).json({  
            success:true,
            doctors,
        });
    } catch (e) {
        console.error("Error in admin controller: ", e);

        res.status(500).json({  
            success: false,
            message: "An error occurred while fetching doctors",
        });
    }
};


//API to get all appointment list

const appointmentsAdmin = async (req,res)=>{
    try{

const appointments = await appointmentModel.find({})
res.json({success:true,appointments})

    }
    catch(e){
        console.log(e)
        res.json({success:false,e})
    }
}

//API for appointment cancellation

const appointmentCancel = async (req,res)=>{
    try{
    const {appointmentId} = req.body
    
    const appointmentData = await appointmentModel.findById(appointmentId)
    
   
    
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

const appointmentComplete = async (req,res)=>{
    try{
        const {appointmentId} = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        if(!appointmentData){
            return res.json({success:false,msg:"Appointment not found"})
        }
        if(appointmentData.cancelled){
            return res.json({success:false,msg:"Cancelled appointment cannot be marked done"})
        }
        await appointmentModel.findByIdAndUpdate(appointmentId,{payment:true,isCompleted:true})
        res.json({success:true,msg:"Appointment marked as completed"})
    }
    catch(e){
        console.log(e)
        res.json({success:false,msg:"Failed to update appointment"})
    }
}
    
//API for dashboard for admin panel


const adminDashboard = async (req,res)=>{
    try{
const doctors  = await doctorModel.find({})

const users = await userModel.find({})
const appointments  = await appointmentModel.find({})


const dashData = {
    doctors:doctors.length,
    appointments:appointments.length,
    patients:users.length,
    latestAppointments : appointments.reverse().slice(0,5)
}

res.json({success:true,dashData})

    }
    catch(e){
        console.log(e)
        res.json({success:false,msg:"Error in dashboard fetching"})
    }
}
const removeDoctor = async (req, res) => {
  try {
    const docId = req.params.id;
    console.log("Deleting docId:", docId);

    const status = await doctorModel.deleteOne({ _id: docId });

    console.log(status);
    
    res.json({
      success: true,
      msg: "Successfully removed doctor",
      id: docId,
    });
  } catch (e) {
    console.log("Error in remove doc:", e);
    res.status(500).json({ success: false, msg: e.message });
  }
};
export {addDoctor,adminDashboard,loginAdmin,allDoctors,appointmentCancel,appointmentsAdmin,removeDoctor,appointmentComplete}