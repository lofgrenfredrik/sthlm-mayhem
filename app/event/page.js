"use client"
import Image from "next/image"
import Timer from "../../components/Timer"
import Workout from "../../components/Workout"

import { useEffect, useState } from "react"
import { listenToFirestoreChanges } from "../../lib/firestoreListener"

export default function Event() {
  const [title, setTitle] = useState("STHLM Mayhem")

  useEffect(() => {
    const unsubscribe = listenToFirestoreChanges("lambda", (data) => {
      const mayhemWorkout = data.find((item) => item.id === "mayhem-workout")
      if (mayhemWorkout) {
        setTitle(mayhemWorkout.title)
      }
    })

    // Clean up the listener when the component is unmounted
    return () => unsubscribe()
  }, [])

  return (
    <div className="flex justify-center items-center w-screen h-screen flex-col">
      <div className="flex w-full justify-around py-2">
        <div className="w-48 relative">
          <Image
            src="/images/logga-vit.png"
            alt="sodertorn"
            layout={"fill"}
            objectFit={"contain"}
          />
        </div>
        <h1 className="text-8xl my-6">{title}</h1>
        <div className="w-48 relative">
          <Image src="/images/mayhem-fit.jpg" alt="mayhem" layout={"fill"} objectFit={"contain"} />
        </div>
      </div>
      <div className="flex h-full w-full">
        <Workout />
        <Timer />
      </div>
    </div>
  )
}
