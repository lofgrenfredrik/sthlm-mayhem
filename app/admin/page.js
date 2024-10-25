"use client"

import { useState } from "react"
import TimerForm from "../../components/TimerForm"
import WorkoutForm from "../../components/WorkoutForm"
import { formatTextToHTML } from "../../lib/helpers"

export default function Admin() {
  const [workoutPreview, setWorkoutPreview] = useState("")

  return (
    <div className="flex">
      <div className="w-full">
        <TimerForm />
        <WorkoutForm handleWorkoutPreview={setWorkoutPreview} />
      </div>
      <div className="w-full flex flex-col justify-center items-center px-4">
        <h2 className="text-2xl">Workout Preview</h2>
        <div
          className="border-2 border-gray-500 min-h-8 min-w-full p-2"
          dangerouslySetInnerHTML={{ __html: formatTextToHTML(workoutPreview) }}
        />
      </div>
    </div>
  )
}
