import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React from 'react'
import { FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Hero() {

  var tl1 = gsap.timeline()
  useGSAP(()=>{
    tl1.from("#first1",{
        duration:0.3,
        delay:2.1,
        x:200,
        opacity:0
    })
    tl1.from("#first2",{
        duration:0.3,
        x:-200,
        opacity:0
    })
     gsap.to("#star", {
      rotation: 360,
      duration: 7,
      repeat: -1,
      ease:"linear"
    });
  
  })

  return (
    <div className='relative min-h-[80vh] lg:min-h-screen'>
      <div className='flex flex-col items-center px-4'>
        <div id='first1' className='text-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl flex pt-6 justify-center items-center text-center' style={{ fontFamily: "sugarmagic" }}>
          Your Mental <FaStar id='star' className='ml-2 sm:ml-4' style={{ color: "#FFCE6D", fontSize: "30px" }} />
        </div>
        <div id='first2' className='text-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl flex py-2 justify-center items-center text-center' style={{ fontFamily: "sugarmagic" }}>
          Health Matters
        </div>

        <div className="hidden lg:block text-gray-600 absolute right-17 top-1/2 -translate-y-1/2 px-1 py-1">
          <div className='flex flex-col items-center'>
            <img className='w-55' src="/images/right hero.jpg" alt="" />
            <div className='w-40 text-right'>
              There's <span className='font-bold'>hope</span> when your <span className='font-bold'>brain</span> tell's you there isn't.
            </div>
          </div>
        </div>

        <div className='hidden lg:block absolute text-gray-600 left-22 top-7/10'>
          <div className='flex flex-col items-center'>
            <div className='w-40 text-[20px]'>
              You <span className='font-bold'>don't</span> have to <span className='font-bold'>struggle</span> in silence!
            </div>
            <div className='underline self-start mt-2 text-gray-400'>
              <Link to={"/therapybooking"}>Learn More</Link>
            </div>
          </div>
        </div>

        <div className='flex justify-center mt-8 lg:mt-0'>
          <img className='w-4/5 sm:w-3/5 h-auto max-w-2xl' src="/images/centre-hero.webp" alt="mental illustration" />
        </div>

        <div className='lg:hidden flex flex-col sm:flex-row gap-8 mt-8 px-4 text-center'>
          <div className='flex flex-col items-center'>
            <img className='w-32 sm:w-40' src="/images/right hero.jpg" alt="" />
            <div className='text-gray-600 mt-4 max-w-xs'>
              There's <span className='font-bold'>hope</span> when your <span className='font-bold'>brain</span> tell's you there isn't.
            </div>
          </div>
          
          <div className='flex flex-col items-center'>
            <div className='text-gray-600 text-lg sm:text-xl max-w-xs'>
              You <span className='font-bold'>don't</span> have to <span className='font-bold'>struggle</span> in silence!
            </div>
            <div className='underline mt-4 text-gray-400'>
              <Link to={"/therapybooking"}>Learn More</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero