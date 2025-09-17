import React from 'react'

function Mentor() {
  return (
    <div className='px-4 py-8'>
      <div style={{ fontFamily: "sugarmagic" }} className='flex flex-col lg:flex-row text-2xl lg:text-[30px] justify-center lg:justify-between items-center gap-4 lg:gap-0 px-4 lg:px-30 mt-8 lg:mt-15 pt-6 lg:pt-10'>
        <div className='underline decoration-amber-300 decoration-5'>One platform</div>
        <div className="w-32 lg:w-200 h-[2px] bg-gray-400"></div>
        <div className='underline decoration-amber-300 decoration-5'>many touchpoints</div>
      </div>

      <div className='flex flex-col lg:flex-row mt-8 lg:mt-0'>
        <div className="hidden lg:block w-[2px] h-180 ml-30 mt-15 bg-gray-300"></div>
        
        <div className='lg:mt-15 flex-1'>
          <h2 className='text-2xl lg:text-4xl font-bold px-4 lg:pl-19 lg:pr-3 lg:w-120 lg:mr-60 text-center lg:text-left' style={{ fontFamily: "sugarmagic" }}>
            We support you no matter what you are dealing with
          </h2>
          
          <div className='mt-8 lg:mt-10 space-y-6 lg:space-y-8 px-4 lg:px-0'>
            <div className='lg:ml-15'>
              <div className='text-gray-600 text-lg flex items-center'>
                <img className='w-10 h-10 lg:w-15 lg:h-15 mr-2 flex-shrink-0' src="/images/mentor-01.jpg" alt="" />
                <span>Personalized, therapist-led support groups</span>
              </div>
              <div className='flex mt-2'>
                <div className='w-2 h-2 bg-gray-300 rounded-full mt-2 mr-2 ml-12 lg:ml-35 flex-shrink-0'></div>
                <p className='text-gray-500 lg:w-100'>A 1:1 live session with a therapist offers a private space to discuss your thoughts and feelings openly. It provides personalized support and guidance to help you cope with challenges and improve your mental well-being.</p>
              </div>
            </div>

            <div className='lg:ml-15'>
              <div className='text-gray-600 text-lg flex items-center'>
                <img className='w-10 h-10 lg:w-15 lg:h-15 mr-2 flex-shrink-0' src="/images/mentor-02.jpg" alt="" />
                <span>Real-time SMS support</span>
              </div>
              <div className='flex mt-2'>
                <div className='w-2 h-2 bg-gray-300 rounded-full mt-2 mr-2 ml-12 lg:ml-35 flex-shrink-0'></div>
                <p className='text-gray-500 lg:w-100'>SMS support lets you reach out to a professional anytime via text, offering quick guidance and emotional support. It provides a convenient, private way to share your feelings and get help whenever you need it.</p>
              </div>
            </div>

            <div className='lg:ml-15'>
              <div className='text-gray-600 text-lg flex items-center'>
                <img className='w-10 h-10 lg:w-15 lg:h-15 mr-2 flex-shrink-0' src="/images/mentor-03.jpg" alt="" />
                <span>Interactive mental health resource library</span>
              </div>
              <div className='flex mt-2'>
                <div className='w-2 h-2 bg-gray-300 rounded-full mt-2 mr-2 ml-12 lg:ml-35 flex-shrink-0'></div>
                <p className='text-gray-500 lg:w-100'>The interactive mental health resource library offers a wide range of articles, videos, and tools to support your well-being. It helps you learn coping strategies and explore topics at your own pace in an engaging way.</p>
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-center lg:block mt-8 lg:mt-15'>
          <img className='rounded-2xl lg:rounded-4xl w-80 lg:w-170 px-4 lg:pr-10' src="/images/mentor-right.jpg" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Mentor