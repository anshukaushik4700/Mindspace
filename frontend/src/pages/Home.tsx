import CustomCursor from "../components/custom-cursor"
import Footer from "../components/footer"
import Hero from "../components/Hero"
import Mentor from "../components/mentor"
import Mentoricons from "../components/mentor-icon"
import Navbar from "../components/Navbar"

function Home() {
  return (
    <div>
      <CustomCursor/>
      <Navbar/>
      <Hero/>
      <Mentor/>
      <Mentoricons/>
      <Footer/>
    </div>
  )
}

export default Home
