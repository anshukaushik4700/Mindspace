import React from 'react'

function Mentoricons() {
  return (
    <div className='px-4'>
      <div className='flex flex-col md:flex-row justify-center md:justify-evenly items-center gap-8 md:gap-4 mt-16 md:mt-25 mb-12 md:mb-20 border-2 rounded-2xl md:rounded-4xl p-6 md:p-7 mx-4 md:mx-20 border-gray-200 relative'>
        <div className='text-center md:text-left'>
          <div className='text-gray-500'>
            Talk
          </div>
          <div className='text-3xl md:text-5xl' style={{ fontFamily: "Cartel" }}>
            with experts
          </div> 
        </div>

        <div className='text-center md:text-left'>
          <div className='text-gray-500'>
            Meet
          </div>
          <div className='text-3xl md:text-5xl' style={{ fontFamily: "Cartel" }}>
            Once /Week
          </div> 
        </div>
        <div className='text-center md:text-left md:ml-17'>
          <div className='text-gray-500'>
            For
          </div>
          <div className='text-3xl md:text-5xl' style={{ fontFamily: "Cartel" }}>
            60 min
          </div> 
        </div>
      </div>
    </div>
  )
}

export default Mentoricons;