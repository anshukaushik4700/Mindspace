import React from "react"
import { useNavigate } from "react-router-dom"

function LogoutButton() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/signin")
  }

  return (
    <button 
      onClick={handleLogout}
      className="px-4 py-2 rounded-lg bg-[#FFFFFF] text-red-400 font-medium hover:bg-red-400 hover:text-white border border-red-300 hover:scale-105 transition"
    >
      Logout
    </button>
  )
}

export default LogoutButton
