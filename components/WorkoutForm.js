"use client"

import { useState } from "react"
import { db } from "../lib/firestore"
import { doc, setDoc } from "firebase/firestore"

export default function WorkoutForm({ handleWorkoutPreview }) {
  const [title, setTitle] = useState("")
  const [workout, setWorkout] = useState("")
  const [toManyRows, setToManyRows] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      // Define a predefined document ID here
      const workoutDocId = "mayhem-workout" // replace this with your actual ID
      const workoutDocRef = doc(db, "lambda", workoutDocId)

      await setDoc(workoutDocRef, {
        title: title,
        workout: workout,
      })

      console.log("Document written with predefined ID: ", workoutDocRef)
    } catch (e) {
      console.error("Error adding document: ", e)
    }
  }

  function handleWorkoutChange(value) {
    const rowCount = value.split("\n").length
    console.log(`Number of rows: ${rowCount}`)
    setToManyRows(rowCount > 17)
    setWorkout(value)
    handleWorkoutPreview(value)
  }

  return (
    <div className="bg-gray-800 w-full flex justify-center items-center flex-col p-4">
      <form className="flex gap-5 flex-col text-black" onSubmit={handleSubmit}>
        <input
          type="text"
          className="p-2 rounded-sm"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          className="p-2 rounded-sm"
          id="workout"
          name="workout"
          placeholder="Wrap text in # signs to make it bold, ie: #Bold text#."
          rows="17"
          cols="65"
          value={workout}
          onChange={(e) => handleWorkoutChange(e.target.value)}
        />
        <span className="bg-gray-600 text-white p-2">
          Wrap text in # signs to make it bold, ie: #Bold text#.
        </span>
        <span className="bg-gray-600 text-white p-2">
          Max 17 rows. Currently: {workout.split("\n").length}
        </span>
        <button
          className={`${
            toManyRows ? "bg-red-700" : "bg-green-700"
          } py-2 rounded-sm text-gray-100 font-bold`}
          type="submit"
          disabled={toManyRows}
        >
          {toManyRows ? "To many Rows" : "Add workout"}
        </button>
      </form>
    </div>
  )
}
