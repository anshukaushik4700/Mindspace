import React, { useState, useEffect, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"

type Message = {
  role: "user" | "ai"
  content: string
}

export default function Chat() {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const journal = location.state?.journal
  const introSent = useRef(false)

  const sendToAI = async (text: string) => {
    try {
      const token = localStorage.getItem("token")
        if(!token){
          alert("You must be login to talk with AI");
          navigate("/signin")
        }
      const res = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: text }),
      })
      const data = await res.json()
      const aiMessage = {
        role: "ai" as const,
        content: data.reply || "Sorry, I couldn’t generate a reply.",
      }
      setMessages((prev) => [...prev, aiMessage])
    } catch (err) {
      console.error(err)
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: " Error contacting AI service." },
      ])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (journal && !introSent.current) {
      const introMessage = `my Today's day is ${journal.howWasYourDay} and I am feeling ${
        journal.howAreYouFeeling || "dont want to say"
      } and ${journal.whatWasGoodToday || "Dont want to say"} was good today`

      setMessages([{ role: "user", content: introMessage }])
      setLoading(true)
      sendToAI(introMessage)
      introSent.current = true
    }
  }, [journal])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: "user" as const, content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)
    sendToAI(userMessage.content)
  }

  return (
    <div className="h-dvh flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-1 flex flex-col overflow-hidden ">
        <div className="flex-1 overflow-y-auto p-4 space-y-3 flex flex-col">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-2xl max-w-[80%] sm:max-w-[60%] md:max-w-[30%] break-words ${
                msg.role === "user"
                  ? "bg-blue-500 self-end text-white mr-0 sm:mr-20 shadow-md"
                  : "bg-gray-200 self-start text-black ml-0 sm:ml-20 shadow-md"
              }`}
            >
              {msg.content}
            </div>
          ))}
          {loading && (
            <div className="p-3 ml-0 sm:ml-20 rounded-2xl bg-gray-200 text-black self-start max-w-xs">
              Typing...
            </div>
          )}
        </div>

        <form
          onSubmit={handleSend}
          className="p-4 border-t flex items-center gap-2 bg-white flex-shrink-0"
        >
          <input
            type="text"
            className="flex-1 border rounded-xl px-3 py-2 focus:outline-none w-full"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-xl disabled:opacity-50"
            disabled={loading}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}
