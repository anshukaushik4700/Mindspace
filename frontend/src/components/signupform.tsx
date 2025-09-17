import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


function SignupForm() {
  const API_URL = import.meta.env.VITE_API_URL;
    const [formData , setformData ] = useState({
        name:"",
        email:"",
        password:""
    })
    const [error , seterror] = useState<String>("")
    const [otp, setOtp] = useState("")

    const [step, setStep] = useState<"signup" | "otp">("signup")

    const navigate = useNavigate()

    const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) =>  {
            e.preventDefault()

            try {
                const res = await fetch(`${API_URL}/user/signup`,{           
                    method:"POST",
                    headers:{
                        "content-type":"application/json"
                    },
                    body: JSON.stringify(formData)
                })

                const data = await res.json()

                if(res.ok){
                    console.log("User created ", data.email)
                    seterror("")
                    setStep("otp") 
                }else{
                    seterror(data.message)
                }

            } catch (error) {
                console.log("error: " , error)
                seterror("Something went wrong. Please try again.")
            }
    }

    const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await fetch(`${API_URL}/user/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp })
      })

      const data = await res.json()
      if (res.ok) {
        localStorage.setItem("token", data.token)
        console.log("User verified:", data.user)
        seterror("")
        setTimeout(() => navigate("/"), 400)
      } else {
        seterror(data.message)
      }
    } catch (err) {
      console.error("error:", err)
      seterror("OTP verification failed. Please try again.")
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
                    { step === "signup" ? (
                    <form onSubmit={handlesubmit}>
                    <div className='gap-4'>
                        <div className='font-semibold font-serif mb-2'>
                            Name 
                        </div>
                        <div>
                            <input required value={formData.name} onChange={(e) => setformData({...formData,name:e.target.value})} className='w-full p-1 focus:outline-none border rounded-xs focus:ring-2 focus:ring-amber-500' type="text" placeholder='Anshu Kaushik' />
                        </div>
                    </div>
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

                    <button className='bg-black mt-5 rounded-b-sm px-1 w-full py-1 cursor-pointer text-[#FFFFFF]'>Sign up</button>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </form>
                    ) : (
          <form onSubmit={handleVerifyOtp}>
            <div className="gap-4">
              <div className="font-semibold font-serif mb-2">Enter OTP</div>
              <input
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-1 focus:outline-none border rounded-xs focus:ring-2 focus:ring-amber-500"
                type="text"
                placeholder="123456"
              />
            </div>

            <button className="bg-black mt-5 rounded-b-sm px-1 w-full py-1 cursor-pointer text-[#FFFFFF]">
              Verify OTP
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </form>
                    ) }
                    
                    <p className="text-center text-sm mt-4 text-gray-500">
                        Already have an account?{" "}
                        <Link to="/signin" className="text-blue-500 hover:underline">Sign in</Link>
                    </p>
                </div>
    </div>
  )
}

export default SignupForm