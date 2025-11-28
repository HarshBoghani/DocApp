import React, { useContext, useEffect } from 'react'
import Login from './pages/login'
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/adminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import { DoctorContext } from './context/doctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointment from './pages/Doctor/DoctorAppointment';
import DoctorProfile from './pages/Doctor/DoctorProfile';
const App = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { atoken } = useContext(AdminContext)
  const { dtoken } = useContext(DoctorContext)

  useEffect(() => {
    if (!atoken && !dtoken) return

    const pathWithoutBase = location.pathname.replace(/^\/admin/, '') || '/'
    const adminOnlyPaths = ['/', '/admin-dashboard', '/add-doctor', '/doctor-list', '/all-appointments']
    const doctorOnlyPaths = ['/', '/doctor-dashboard', '/doctor-appointments', '/doctor-profile']

    if (atoken) {
      if (doctorOnlyPaths.includes(pathWithoutBase)) {
        navigate('/admin-dashboard', { replace: true })
        return
      }
      if (pathWithoutBase === '/') {
        navigate('/admin-dashboard', { replace: true })
      }
    } else if (dtoken) {
      if (adminOnlyPaths.includes(pathWithoutBase)) {
        navigate('/doctor-dashboard', { replace: true })
        return
      }
      if (pathWithoutBase === '/') {
        navigate('/doctor-dashboard', { replace: true })
      }
    }
  }, [atoken, dtoken, location.pathname, navigate])

  return atoken || dtoken ? (
    <div className='bg-[#F8F9FD]'>
  <ToastContainer/>
      <Navbar/>
      <div className='flex items-start'>
      <Sidebar/>
      <Routes>
        {/* Admin Routes */}
        <Route path='/' element={<></>} />
        <Route path='/admin-dashboard' element={<Dashboard/>} />   
        <Route path='/all-appointments' element={<AllAppointments/>} />   
        <Route path='/add-doctor' element={<AddDoctor/>} />   
        <Route path='/doctor-list' element={<DoctorsList/>} />   
        
        {/* Doctor Routes */}
        <Route path='/doctor-dashboard' element={<DoctorDashboard/>} />   
        <Route path='/doctor-appointments' element={<DoctorAppointment/>} />   
        <Route path='/doctor-profile' element={<DoctorProfile/>} />   



        
      </Routes>
      </div>
    </div>
  )
  :
  (
    <>
  <Login/>
  <ToastContainer/>
    </>
  )
}

export default App
