import { createContext, useCallback, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
export const AdminContext= createContext()

const AdminContextProvider = (props)=>{
const [atoken,setAToken] = useState(localStorage.getItem('atoken')?localStorage.getItem('atoken') : '')
const [doctors,setDoctors] = useState([])
const [dashData,setDashData] = useState(false)
const [appointments,setAppointments] = useState([])
const backendUrl = import.meta.env.VITE_BACKEND_URL

useEffect(()=>{
    const params = new URLSearchParams(window.location.search)
    const tokenParam = params.get('token')
    if(tokenParam){
        localStorage.setItem('atoken',tokenParam)
        setAToken(tokenParam)
        params.delete('token')
        const newQuery = params.toString()
        const newUrl = `${window.location.pathname}${newQuery ? `?${newQuery}` : ''}`
        window.history.replaceState({}, '', newUrl)
    }
},[])

const getAllDoctors = useCallback(async ()=>{
    try{
const {data} = await axios.post(backendUrl+'/api/admin/all-doctors',{},{headers:{atoken}})
        if(data.success==true)
        {
            setDoctors(data.doctors)
        }
        else{
            toast.error("Error in fetching doctors data")
        }

    }
    catch(e){
toast.error(e.message)
    }
},[atoken,backendUrl])

const changeAvailibility = useCallback(async (docId) => {
    try {
        console.log(docId)
        const { data } = await axios.post(backendUrl+'/api/admin/change-availibility',
            { docId },
            { headers: { atoken } }
        );

        console.log("API Response:", data);

        if (data.success) {
            toast.success(data.msg);
            getAllDoctors(); // Refresh doctors list after availability change
        } else {
            toast.error(data.msg);
        }
    } catch (e) {
        console.error("Error:", e.message);
        toast.error(e.message || "An error occurred while changing availability.");
    }
},[atoken,backendUrl,getAllDoctors]);

const getAllAppointments = useCallback(async ()=>{
    try{
const {data} =await axios.get(backendUrl+'/api/admin/appointments',{headers:{atoken}})

if(data.success){
setAppointments(data.appointments)
console.log(data.appointments)
}else{
    toast.error(data.msg)
}

    }
    catch(e){
        console.log(e)
        toast.error(e.message)
    }
},[atoken,backendUrl])

const cancelAppointment = useCallback(async (appointmentId)=>{
    try{

const {data} = await axios.post(backendUrl+'/api/admin/cancel-appointment',{appointmentId},{headers:{atoken}})
if(data.success){
    toast.success(data.msg)
    getAllAppointments()
}
else{
    toast.error(data.msg)
}
    }
    catch(e){
        toast.error(e.message)
    }
},[atoken,backendUrl,getAllAppointments])

const getDashData = useCallback(async ()=>{
    try{
const {data} = await axios.get(backendUrl+'/api/admin/dashboard',{headers:{atoken}})

if(data.success){   
    setDashData(data.dashData)
    console.log(data.dashData);

}
else{
    toast.error(data.msg)
}
    }
    catch(e){
        toast.error(e)
    }
},[atoken,backendUrl])

const completeAppointment = useCallback(async (appointmentId)=>{
    try{
        const {data} = await axios.post(backendUrl+'/api/admin/complete-appointment',{appointmentId},{headers:{atoken}})
        if(data.success){
            toast.success(data.msg)
            getAllAppointments()
            getDashData()
        }else{
            toast.error(data.msg)
        }
    }
    catch(e){
        toast.error(e.message)
    }
},[atoken,backendUrl,getAllAppointments,getDashData])

const value = {
atoken,setAToken,
backendUrl,doctors,getAllDoctors,changeAvailibility,
getAllAppointments,appointments,setAppointments,
cancelAppointment,getDashData,dashData,completeAppointment
}

return (
    <AdminContext.Provider value={value}>
        {props.children}
        </AdminContext.Provider>
)
}
export default AdminContextProvider