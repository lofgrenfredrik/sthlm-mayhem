"use client"

import { useState } from "react"
import { db } from "../lib/firestore"
import { doc, setDoc } from "firebase/firestore"

export default function TimerForm() {
  const [time, setTime] = useState(1)
  const [wrongTimeFormat, setWrongTimeFormat] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const now = new Date()
    const countdownTime = 10000
    const timePadding = 9000
    const timeDate = now.getTime() + time * 60000 + timePadding
    const countdown = now.getTime() + countdownTime

    try {
      // Define a predefined document ID here
      const timerDocId = "mayhem-timer" // replace this with your actual ID
      const timerDocRef = doc(db, "lambda", timerDocId)

      // Use setDoc instead of addDoc
      await setDoc(timerDocRef, {
        time: timeDate,
        countdown: countdown,
      })

      console.log("Document written with predefined ID: ", timerDocId)
      setTime("") // Clear the form
    } catch (e) {
      console.error("Error adding document: ", e)
    }
  }

  function handleTimeChange(value) {
    console.log(`Time: ${value}`)
    setWrongTimeFormat(value > 60 || value < 1 || isNaN(value))
    setTime(value)
  }

  return (
    <div className="bg-gray-800 w-full flex justify-center items-center flex-col p-4">
      <h2>Time</h2>
      <form className="flex gap-5 text-black" onSubmit={handleSubmit}>
        <input
          className="p-2 rounded-sm"
          type="text"
          value={time}
          max={60}
          min={1}
          onChange={(e) => handleTimeChange(e.target.value)}
          placeholder="minutes"
        />
        <span className="bg-gray-600 text-white p-2">Value must be between 1 and 60</span>
        <button
          className={`${
            wrongTimeFormat ? "bg-red-700" : "bg-green-700"
          } p-2 rounded-sm text-gray-100 font-bold`}
          disabled={wrongTimeFormat}
          type="submit"
        >
          Add time
        </button>
      </form>
    </div>
  )
}
