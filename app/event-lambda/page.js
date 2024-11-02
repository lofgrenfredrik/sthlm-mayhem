"use client"
import Image from "next/image"
import TimerLocal from "../../components/TimerLocal"
import TimerLambda from "../../components/TimerLambda"

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
      <div className="flex w-full md:justify-around py-2 flex-col items-center md:flex-row">
        <div className="w-48 h-6 md:h-full relative">
          <Image src="/images/cf-torn.png" alt="sodertorn" layout={"fill"} objectFit={"contain"} />
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-8xl my-6">{title}</h1>
        <div className="w-48 h-6 md:h-full relative">
          <Image src="/images/mayhem-fit.jpg" alt="mayhem" layout={"fill"} objectFit={"contain"} />
        </div>
      </div>
      <div className="flex flex-col md:flex-row h-full w-full">
        <TimerLambda />
        <TimerLocal />
      </div>
    </div>
  )
}
