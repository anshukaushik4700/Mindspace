import React from 'react'
import SigninForm from '../components/signinform'

function Signin() {
  return (
    <div className='flex justify-between items-center'>
      <SigninForm/>
      <div className='hidden md:block'>
        <img className='w-180 h-182' src="/images/auth-right.jpg" alt="" />
      </div>
    </div>
  )
}

export default Signin