import React, { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import Navbar from "../components/Navbar"

type Mood = {
  id: string
  mood: number
  createdAt: string
}

export default function MoodHistory() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [moods, setMoods] = useState<Mood[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await fetch(`${API_URL}/mood/history`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) throw new Error("Failed to fetch moods")
        const data = await res.json()
        setMoods(data.moods)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchMoods()
  }, [])

  if (loading) return <p className="text-center mt-10">Loading...</p>
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>

  return (
    <div>
    <Navbar />
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Mood History</h1>

      {moods.length === 0 ? (
        <p className="text-center text-gray-500">No moods recorded yet.</p>
      ) : (
        <>
          <div className="w-full h-64 mb-10">
            <ResponsiveContainer>
              <LineChart data={moods.slice().reverse()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="createdAt"
                  tickFormatter={(v) => new Date(v).toLocaleDateString()}
                />
                <YAxis domain={[1, 10]} />
                <Tooltip
                  labelFormatter={(v) =>
                    new Date(v).toLocaleString()
                  }
                />
                <Line type="monotone" dataKey="mood" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <ul className="space-y-3">
            {moods.map((mood) => (
              <li
                key={mood.id}
                className="border p-3 rounded-lg shadow-sm bg-white flex justify-between"
              >
                <span>Mood: {mood.mood}</span>
                <span className="text-gray-500 text-sm">
                  {new Date(mood.createdAt).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
    </div>
  )
}
