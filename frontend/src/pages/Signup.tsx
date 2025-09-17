import React from 'react'
import SignupForm from '../components/signupform'

function Signup() {
  return (
    <div className='flex justify-between items-center'>
      <SignupForm/>
      <div className='hidden md:block'>
        <img className='w-180 h-182' src="/images/auth-right.jpg" alt="" />
      </div>
    </div>
  )
}

export default Signup