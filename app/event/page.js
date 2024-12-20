"use client"
import Image from "next/image"
import TimerLambda from "../../components/TimerLambda"
import Workout from "../../components/Workout"
import { takota } from "../../lib/fonts"
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
        <div className="w-48 h-6 md:h-full relative hidden lg:block">
          <Image src="/images/cf-torn.png" alt="sodertorn" layout={"fill"} objectFit={"contain"} />
        </div>
        <h1 className={`${takota.className} text-4xl md:text-6xl lg:text-8xl my-6 uppercase`}>
          {title}
        </h1>
        <div className="w-48 h-6 md:h-full relative hidden md:block">
          <Image src="/images/mayhem-fit.jpg" alt="mayhem" layout={"fill"} objectFit={"contain"} />
        </div>
      </div>
      <div className="flex flex-col-reverse md:flex-row h-full w-full">
        <Workout />
        <TimerLambda />
      </div>
    </div>
  )
}
