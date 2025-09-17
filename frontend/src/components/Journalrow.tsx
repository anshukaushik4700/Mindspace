import React, { useState } from 'react'
import { submitjournal } from '../api/journal'
import { useNavigate } from 'react-router-dom'


function Journalrow() {
    const navigate = useNavigate()
    const [Journaldata , setJournalData ] = useState({
        howWasYourDay: '',
        howAreYouFeeling: '',
        whatWasGoodToday: ''
    })

    const handlesubmit = async () => {
        console.log('Submit clicked', Journaldata)
        try {
        const token = localStorage.getItem("token")
        if(!token){
          alert("You must be login to save the journal");
          navigate("/signin")
        }
        if(Journaldata.howWasYourDay == "" && Journaldata.howAreYouFeeling == "" && Journaldata.whatWasGoodToday == "")
        alert("please fill atleast one field to continue !")
      else{
        const result = await submitjournal(Journaldata)
        console.log('Journal submitted:', result)
        navigate("/history")
      }
    } catch (err: any) {
        console.error('Submission error:', err.message)
  }
    }

const handleTalkWithAI = async () => {
  try {
    const token = localStorage.getItem("token")
        if(!token){
          alert("You must be login to save the journal");
          navigate("/signin")
        }
    if(Journaldata.howWasYourDay == "" && Journaldata.howAreYouFeeling == "" && Journaldata.whatWasGoodToday == "")
      alert("please fill atleast one field to continue !")
    else{
      await submitjournal(Journaldata);
  
      navigate("/chat", { state: { journal: Journaldata } });
    }
  } catch (err) {
    console.error("Error saving journal before Chat:", err);
  }
};



    

  return (
    <div>
        <form className='flex flex-col'>
            <label className='mt-3 text-xl font-serif font-semibold underline decoration-2 decoration-amber-200'>How was your day ?</label>
            <textarea value={Journaldata.howWasYourDay} onChange={(e) => setJournalData({...Journaldata,howWasYourDay:e.target.value})} className= 'mt-2 mb-4 text-gray-500 border rounded-xl h-40 p-2' />
            <label className='mt-3 text-xl font-serif font-semibold underline decoration-2 decoration-amber-200'>How are you feeling today ?</label>
            <textarea value={Journaldata.howAreYouFeeling} onChange={(e) => setJournalData({...Journaldata,howAreYouFeeling:e.target.value})} className='mt-2 mb-4 text-gray-500 border rounded-xl h-40 p-2' />
            <label className='mt-3 text-xl font-serif font-semibold underline decoration-2 decoration-amber-200'>What was good today ?</label>
            <textarea value={Journaldata.whatWasGoodToday} onChange={(e) => setJournalData({...Journaldata,whatWasGoodToday:e.target.value})} className='mt-2 mb-4 text-gray-500 border rounded-xl h-40 p-2' />


            <div className='flex gap-7 justify-center mt-5 items-center'>
            <button onClick={handlesubmit} type='button' className='p-2 rounded-md bg-gray-800 text-white cursor-pointer' >Submit Journal</button>
            <button onClick={handleTalkWithAI} type='button' className='p-2 rounded-md bg-gray-800 text-white cursor-pointer'>Talk with AI</button>
            </div>
        </form>
    </div>
  )
}

export default Journalrow
