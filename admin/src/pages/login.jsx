import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/adminContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const { setAToken, backendUrl } = useContext(AdminContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      const { data } = await axios.post(backendUrl + '/api/admin/login', {
        email,
        password,
      })

      if (data.token) {
        localStorage.setItem('atoken', data.token)
        setAToken(data.token)
      } else {
        toast.error('Incorrect Credentials')
      }
    } catch (e) {
      toast.error('Unable to login. Please try again.')
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center ">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-[96] border border-none rounded-xl text-gray-700 text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">Admin</span> Login
        </p>
        <div className="w-full">
          <p className="font-semibold text-md">Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border rounded border-gray-300 w-full p-2 mt-1 "
            type="email"
            required
          />
        </div>
        <div className="w-full">
          <p className="font-semibold text-md">Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border rounded border-gray-300 w-full p-2 mt-1 "
            type="password"
            required
          />
        </div>
        <button className=" hover:scale-105 transition-all  bg-primary text-white w-full py-2 rounded-md text-base cursor-pointer click:bg-blue-300">
          Login
        </button>
      </div>
    </form>
  )
}

export default Login
