import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function SigninForm() {
    const API_URL = import.meta.env.VITE_API_URL;
    const [formData , setformData ] = useState({
        email:"",
        password:""
    })
    const [error , seterror] = useState<String>("")

    const navigate = useNavigate()

    const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) =>  {
            e.preventDefault()

            try {
                const res = await fetch(`${API_URL}/user/signin`,{
                    method:"POST",
                    headers:{
                        "content-type":"application/json"
                    },
                    body: JSON.stringify(formData)
                })

                const data = await res.json()

                if(res.ok){
                    localStorage.setItem("token",data.token)
                    console.log("User created ", data.user)
                    seterror("")
                    setTimeout(() => navigate("/"),100) 
                }else{
                    seterror(data.message)
                }

            } catch (error) {
                console.log("error: " , error)
                seterror("Something went wrong. Please try again.")
            }
    }

   return (
    <div className='bg-[#FFFFFF] flex justify-center h-screen items-center flex-col px-4'>
                <div className='text-2xl md:text-4xl font-bold underline decoration-amber-300 decoration-5 mb-2' style={{ fontFamily: "sugarmagic" }}>
                        Help yourself
                </div>
                <div className='text-xl md:text-4xl font-bold mb-12 md:mb-20 text-center' style={{ fontFamily: "sugarmagic" }}>
                        your creativity and your mental health
                </div>
                <div className='w-full max-w-sm'>
                    <form onSubmit={handlesubmit}>
                    <div className='gap-4'>
                        <div className='font-semibold font-serif mb-2 mt-3'>
                            Email 
                        </div>
                        <div>
                            <input required value={formData.email} onChange={(e) => setformData({...formData , email:e.target.value})} className='w-full p-1 focus:outline-none border rounded-xs focus:ring-2 focus:ring-amber-500' type="email" placeholder='anshu@gmail.com'/>
                        </div>
                    </div>
                    <div className='gap-4'>
                        <div className='font-semibold font-serif mb-2 mt-3'>
                            Password 
                        </div>
                        <div>
                            <input required value={formData.password} onChange={(e) => setformData({...formData , password:e.target.value})} className='w-full p-1 focus:outline-none border rounded-xs focus:ring-2 focus:ring-amber-500' type="password" placeholder='anshu1234'/>
                        </div>
                    </div>

                    <button className='bg-black mt-5 rounded-b-sm px-1 w-full py-1 cursor-pointer text-[#FFFFFF]'>Sign in</button>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </form>
                    <p className="text-center text-sm mt-4 text-gray-500">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
                    </p>
                </div>
    </div>
  )
}

export default SigninForm