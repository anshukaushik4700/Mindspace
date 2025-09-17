import React from 'react'
import { useNavigate } from 'react-router-dom'

function Footer() {
    const navigate = useNavigate()
  return (
    <div className='bg-black h-auto shadow-[0_-4px_10px_rgba(1,1,1,1)] px-4 sm:px-0'>
       <div className='flex flex-col lg:flex-row lg:justify-evenly mt-8 lg:mt-30'>
            <div className='flex justify-center lg:justify-start mb-6 lg:mb-0 lg:mt-30 lg:ml-20 sm:mb-0'>
                <img 
                  src="/images/footer-01.webp" 
                  alt="" 
                  className='w-24 h-24 sm:w-32 sm:h-32 lg:w-auto lg:h-auto'
                />
            </div>
            <div className='text-2xl sm:text-3xl lg:text-5xl text-[#FBFBFB] font-bold lg:mt-40 font-serif text-center lg:text-right lg:mr-20'>
                <span style={{ fontFamily: "Cartel" }} className='bg-amber-400 text-black p-1 sm:p-2 lg:p-2 rounded-xl lg:rounded-2xl lg:pt-1'>Reinvent</span> mental health for a new generation.
            </div>
       </div>

       <div className='flex flex-col lg:flex-row mt-8 lg:mt-0'>
                <div className='flex flex-col lg:ml-70 lg:mt-20 mb-8 lg:mb-0'>
                    <div className='text-[#FBFBFB] font-serif text-xl sm:text-2xl lg:text-3xl font-semibold underline decoration-amber-400 decoration-2 lg:decoration-3 text-center lg:text-left'>
                        Connect with us
                    </div>
                    <div className='text-[#d8d8d8] flex flex-col mt-4 lg:mt-0 space-y-2 lg:space-y-0 items-center lg:items-start'>
                        <div className='flex items-center lg:mt-3 gap-3'>
                        <img className='w-6 h-6 lg:w-7 lg:h-7' src="/images/footer-linkedin.jpg" alt="" />
                        <span onClick={() => (window.location.href = "https://www.linkedin.com/in/anshukaushik/")} className='text-base lg:text-1/2xl cursor-pointer font-medium text-[#d8d8d8]'> Linkedin</span>
                        </div>
                        <div className='flex items-center lg:mt-2 gap-2'>
                        <img className='w-7 h-7 lg:w-8 lg:h-8' src="/images/footer-insta.jpg" alt="" />
                        <span onClick={() => (window.location.href = "https://www.instagram.com/mindspace37/?next=%2F")} className='cursor-pointer text-base lg:text-1/2xl font-medium text-[#d8d8d8]'> Instagram</span>
                        </div>
                        <div className='flex items-center lg:mt-2 gap-3'>
                        <img className='w-6 h-6 lg:w-7 lg:h-7' src="/images/footer-twitter.jpg" alt="" />
                        <span onClick={() => (window.location.href = "https://x.com/kaushikanshu_")} className='cursor-pointer text-base lg:text-1/2xl font-medium text-[#d8d8d8]'> Twitter</span>
                        </div>
                        <div className='flex items-center lg:mt-2 gap-3'>
                        <img className='w-6 h-6 lg:w-7 lg:h-7' src="/images/footer-facebook.avif" alt="" />
                        <span className='cursor-pointer text-base lg:text-1/2xl font-medium text-[#d8d8d8]'> Facebook</span>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center lg:ml-50 lg:justify-start'>
                    <img 
                      className='w-48 h-32 sm:w-60 sm:h-40 lg:w-150 lg:h-100' 
                      src="/images/footer-02.webp" 
                      alt="" 
                    />
                </div>
       </div>

        <div className='flex mt-8 lg:mt-10'>
       <div className="w-full lg:w-300 h-[2px] bg-gray-400 lg:mt-6 lg:ml-40 mx-4 lg:mx-0"></div>
        </div>

        <div className='flex flex-col sm:flex-row justify-between mt-6 lg:ml-39 lg:mr-39 px-4 lg:px-0 pb-6'>
            <div className='text-[#797775] mb-2 sm:mb-0 text-center sm:text-left'>
               © 2021 Mindset Labs , Inc
            </div>
            <div className='text-[#797775] text-center sm:text-right'>
                Terms | Privacy | Contact us
            </div>
        </div>
    </div>
  )
}

export default Footer