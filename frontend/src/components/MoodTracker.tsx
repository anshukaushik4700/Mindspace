import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

type MoodEntry = {
  id: string;
  mood: number;
  note?: string;
  createdAt: string;
};

export default function MoodTracker() {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate()
  const [mood, setMood] = useState(5);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);

  const token = localStorage.getItem("token");

  const fetchMoodHistory = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_URL}/mood/history`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setMoodHistory(data.moods || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMoodHistory();
  }, []);

  const handleSaveMood = async () => {
        if(!token){
          alert("You must be login to save the mood");
          navigate("/signin")
        }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/mood`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ mood, note }),
      });
      const data = await res.json();
      if (res.ok) {
        console.log("Mood saved successfully!");
        setNote("");
        fetchMoodHistory(); 
      } else {
        alert(data.error || "Failed to save mood.");
      }
    } catch (err) {
      console.error(err);
      if(token)
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const averageMood =
    moodHistory.length > 0
      ? (moodHistory.reduce((sum, entry) => sum + entry.mood, 0) /
          moodHistory.length).toFixed(1)
      : "-";

  const bestMoodEntry = moodHistory.reduce(
    (prev, curr) => (curr.mood > prev.mood ? curr : prev),
    { mood: 0, createdAt: "" }
  );

  const worstMoodEntry = moodHistory.reduce(
    (prev, curr) => (curr.mood < prev.mood ? curr : prev),
    { mood: 11, createdAt: "" }
  );

  const last7Days = moodHistory
    .filter(
      (entry) =>
        new Date(entry.createdAt) >=
        new Date(new Date().setDate(new Date().getDate() - 7))
    )
    .map((e) => e.mood);

  const last7DaysAvg =
    last7Days.length > 0
      ? (last7Days.reduce((a, b) => a + b, 0) / last7Days.length).toFixed(1)
      : "-";

  return (
    <div className="flex flex-col p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center">Mood Tracker</h1>

      <div className="bg-white p-6 rounded-xl shadow-md flex flex-col space-y-4">
        <label className="font-semibold">Your Mood Today: {mood}</label>
        <input
          type="range"
          min={1}
          max={10}
          value={mood}
          onChange={(e) => setMood(Number(e.target.value))}
          className="w-full"
        />

        <label className="font-semibold">Optional Note:</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full border rounded-lg p-2 text-gray-700"
          placeholder="Write something about your mood..."
        />

        <button
          onClick={handleSaveMood}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Mood"}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center">
          <span className="text-gray-500">Average Mood</span>
          <span className="text-2xl font-bold">{averageMood}</span>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center">
          <span className="text-gray-500">Best Mood</span>
          <span className="text-2xl font-bold">{bestMoodEntry.mood}</span>
          <span className="text-sm text-gray-400">
            {bestMoodEntry.createdAt
              ? new Date(bestMoodEntry.createdAt).toLocaleDateString()
              : "-"}
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center">
          <span className="text-gray-500">Worst Mood</span>
          <span className="text-2xl font-bold">{worstMoodEntry.mood}</span>
          <span className="text-sm text-gray-400">
            {worstMoodEntry.createdAt
              ? new Date(worstMoodEntry.createdAt).toLocaleDateString()
              : "-"}
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center">
          <span className="text-gray-500">Last 7 Days Avg</span>
          <span className="text-2xl font-bold">{last7DaysAvg}</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Mood Over Time</h2>
        {moodHistory.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={moodHistory
                .slice()
                .reverse()
                .map((entry) => ({
                  date: new Date(entry.createdAt).toLocaleDateString(),
                  mood: entry.mood,
                  note: entry.note,
                }))}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid stroke="#f0f0f0" />
              <XAxis dataKey="date" />
              <YAxis domain={[1, 10]} />
              <Tooltip
                formatter={(value: any) => [`${value}`, "Mood"]}
                labelFormatter={(label, payload) =>
                  `Date: ${label}\nNote: ${payload[0]?.payload.note || "None"}`
                }
              />
              <Line
                type="monotone"
                dataKey="mood"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-500">No mood data yet.</p>
        )}
      </div>
    </div>
  );
}
