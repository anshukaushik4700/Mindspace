import React from "react"

function TherapyBooking() {
  const plans = [
    {
      title: "Individual Session",
      price: "₹1,200",
      desc: "One-on-one private session with a licensed therapist. Great for personal guidance and focused support.",
      duration: "45 mins",
    },
    {
      title: "Couple Therapy",
      price: "₹2,000",
      desc: "A session for couples to strengthen communication and resolve conflicts in a safe environment.",
      duration: "60 mins",
    },
    {
      title: "Monthly Package",
      price: "₹4,500",
      desc: "Includes 4 therapy sessions per month. Best value if you want consistent support on your journey.",
      duration: "4 x 45 mins",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Book a Therapy Session
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          Choose a therapy plan that works best for you. Our licensed therapists are here
          to listen, support, and guide you.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-2xl p-6 border hover:shadow-xl transition"
            >
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                {plan.title}
              </h2>
              <p className="text-gray-500 mb-4">{plan.desc}</p>
              <p className="text-xl font-bold text-indigo-600 mb-2">
                {plan.price}
              </p>
              <p className="text-sm text-gray-500 mb-6">{plan.duration}</p>
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium">
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TherapyBooking
