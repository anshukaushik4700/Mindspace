import React, { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { useNavigate } from "react-router-dom"

type Journal = {
  id: string
  howWasYourDay: string | null
  howAreYouFeeling: string | null
  whatWasGoodToday: string | null
  createdAt: string
}

export default function History() {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate()
  const [journals, setJournals] = useState<Journal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingJournal, setEditingJournal] = useState<Journal | null>(null)
  const [formData, setFormData] = useState({
    howWasYourDay: "",
    howAreYouFeeling: "",
    whatWasGoodToday: "",
  })

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const token = localStorage.getItem("token")
        if(!token){
          alert("You must be login to see the history");
          navigate("/signin")
        }
        const res = await fetch(`${API_URL}/history`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) throw new Error("Failed to fetch journals")
        const data = await res.json()
        setJournals(data.journals)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchJournals()
  }, [])

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token")
    await fetch(`${API_URL}/history/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
    setJournals((prev) => prev.filter((j) => j.id !== id))
  }

  const handleEditClick = (journal: Journal) => {
    setEditingJournal(journal)
    setFormData({
      howWasYourDay: journal.howWasYourDay || "",
      howAreYouFeeling: journal.howAreYouFeeling || "",
      whatWasGoodToday: journal.whatWasGoodToday || "",
    })
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingJournal) return

    const token = localStorage.getItem("token")
    const res = await fetch(`${API_URL}/history/${editingJournal.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })

    if (res.ok) {
      const data = await res.json()
      setJournals((prev) =>
        prev.map((j) => (j.id === editingJournal.id ? data.updatedjournal : j))
      )
      setEditingJournal(null)
    }
  }

  if (loading) return <p className="text-center mt-10">Loading...</p>
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-1 max-w-3xl mx-auto mt-10 px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Your Journal History
        </h1>

        {journals.length === 0 ? (
          <p className="text-center text-gray-500">No journals yet.</p>
        ) : (
          <ul className="space-y-4 ">
            {journals.map((journal) => (
              <li
                key={journal.id}
                className="border p-4 rounded-xl min-w-100 shadow-sm bg-white flex flex-col gap-2"
              >
                <p className="text-sm text-gray-400 break-words">
                  {new Date(journal.createdAt).toLocaleString()}
                </p>
                {journal.howWasYourDay && (
                  <p className="break-words">
                    <span className="font-semibold">How was your day?</span>{" "}
                    {journal.howWasYourDay}
                  </p>
                )}
                {journal.howAreYouFeeling && (
                  <p className="break-words">
                    <span className="font-semibold">How are you feeling?</span>{" "}
                    {journal.howAreYouFeeling}
                  </p>
                )}
                {journal.whatWasGoodToday && (
                  <p className="break-words">
                    <span className="font-semibold">What was good today?</span>{" "}
                    {journal.whatWasGoodToday}
                  </p>
                )}

                <div className="flex flex-col sm:flex-row gap-3 mt-3">
                  <button
                    onClick={() => handleDelete(journal.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 w-full sm:w-auto"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEditClick(journal)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full sm:w-auto"
                  >
                    Edit
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {editingJournal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Edit Journal</h2>
              <form onSubmit={handleEditSubmit} className="space-y-3">
                <div>
                  <label className="block font-medium">How was your day?</label>
                  <input
                    type="text"
                    value={formData.howWasYourDay}
                    onChange={(e) =>
                      setFormData({ ...formData, howWasYourDay: e.target.value })
                    }
                    className="w-full border rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block font-medium">How are you feeling?</label>
                  <input
                    type="text"
                    value={formData.howAreYouFeeling}
                    onChange={(e) =>
                      setFormData({ ...formData, howAreYouFeeling: e.target.value })
                    }
                    className="w-full border rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block font-medium">What was good today?</label>
                  <input
                    type="text"
                    value={formData.whatWasGoodToday}
                    onChange={(e) =>
                      setFormData({ ...formData, whatWasGoodToday: e.target.value })
                    }
                    className="w-full border rounded-lg p-2"
                  />
                </div>
                <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setEditingJournal(null)}
                    className="px-3 py-1 bg-gray-300 rounded-lg hover:bg-gray-400 w-full sm:w-auto"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 w-full sm:w-auto"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
