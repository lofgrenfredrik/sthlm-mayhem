"use client"

import { useEffect, useState } from "react"
import { listenToFirestoreChanges } from "../lib/firestoreListener"
import { formatTextToHTML } from "../lib/helpers"

export default function Workout() {
  const [workout, setWorkout] = useState("")

  useEffect(() => {
    const unsubscribe = listenToFirestoreChanges("lambda", (data) => {
      const mayhemWorkout = data.find((item) => item.id === "mayhem-workout")
      if (mayhemWorkout) {
        setWorkout(mayhemWorkout.workout)
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div dangerouslySetInnerHTML={{ __html: formatTextToHTML(workout) }} />
    </div>
  )
}
