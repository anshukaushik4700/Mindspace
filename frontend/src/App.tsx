import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Journal from "./pages/Journal";
import Chat from "./pages/Chat";
import Mood from "./pages/Mood";
import History from "./pages/History";
import MoodHistory from "./pages/MoodHistory";
import TherapyBooking from "./pages/TherapyBooking";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/journals' element={<Journal />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/mood' element={<Mood />} />
        <Route path='/history' element={<History />} />
        <Route path='/mood/history' element={<MoodHistory />} />
        <Route path='/therapybooking' element={<TherapyBooking />} />
      </Routes>
  );
}

export default App;
