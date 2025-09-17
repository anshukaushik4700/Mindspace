import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { FiArrowRight } from "react-icons/fi"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import LogoutButton from "./logout"


function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  var tl = gsap.timeline()
  
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token) 
  }, [])

  useGSAP(() => {
    tl.from("#first", { y: 20, opacity: 0, duration: 0.2, delay: 0.5 })
    tl.from("#second1", { y: 20, opacity: 0, duration: 0.2 })
    tl.from("#second2", { y: 20, opacity: 0, duration: 0.2 })
    tl.from("#second3", { y: 20, opacity: 0, duration: 0.2 })
    tl.from("#second4", { y: 20, opacity: 0, duration: 0.2 })
    tl.from("#third", { y: 20, opacity: 0, duration: 0.2 })
  })

  return (
    <nav className="bg-[#FFFFFF] px-4 py-5">
      <div className="flex justify-between items-center">
        <div id="first" className="flex justify-center items-center">
          <img
            className="w-10 h-10 sm:w-12 sm:h-12 mr-2"
            src="/images/nav mindspace.jpg"
            alt="logo"
          />
          <Link
            to="/"
            className="text-2xl sm:text-3xl md:text-4xl text-black navbar-heading"
            style={{ fontFamily: "sugarmagic" }}
          >
            MindSpace
          </Link>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-500 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        <div className="hidden md:flex space-x-6 items-center">
          <Link id="second1" to="/journals" className="nav-item text-gray-500 hover:text-gray-700">
            JOURNALING
          </Link>
          <Link id="second2" to="/mood" className="nav-item text-gray-500 hover:text-gray-700">
            TRACK MOOD
          </Link>
          <Link id="second3" to="/chat" className="nav-item text-gray-500 hover:text-gray-700">
            TALK WITH AI
          </Link>
          <Link id="second4" to="/history" className="nav-item text-gray-500 hover:text-gray-700">
            HISTORY
          </Link>
          {
            isLoggedIn ? (
              <div id="third">
                <LogoutButton />
              </div>
            ) : (
              <Link
            id="third"
            to="/signup"
            className="nav-item flex items-center space-x-2 border border-gray-500 px-4 py-2 rounded-full hover:bg-gray-50"
          >
            <span className="text-gray-500">Get Started</span>
            <FiArrowRight className="font-bold" />
          </Link>
            )
          }
          
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 pb-4">
          <div className="flex flex-col space-y-4">
            <Link
              id="second1"
              to="/journals"
              className="nav-item text-gray-500 hover:text-gray-700 py-2"
              onClick={() => setIsOpen(false)}
            >
              JOURNALING
            </Link>
            <Link
              id="second2"
              to="/mood"
              className="nav-item text-gray-500 hover:text-gray-700 py-2"
              onClick={() => setIsOpen(false)}
            >
              TRACK MOOD
            </Link>
            <Link
              id="second3"
              to="/chat"
              className="nav-item text-gray-500 hover:text-gray-700 py-2"
              onClick={() => setIsOpen(false)}
            >
              TALK WITH AI
            </Link>
            <Link
              id="second4"
              to="/history"
              className="nav-item text-gray-500 hover:text-gray-700 py-2"
              onClick={() => setIsOpen(false)}
            >
              HISTORY
            </Link>
            {
              isLoggedIn ? (
                <div id="third">
                  <LogoutButton />
                </div>
              ) : (
                <Link
              id="third"
              to="/signup"
              className="nav-item flex items-center justify-center space-x-2 border border-gray-500 px-4 py-3 rounded-full hover:bg-gray-50 mt-4"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-gray-500">Get Started</span>
              <FiArrowRight className="font-bold" />
            </Link>
              )
            }
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar