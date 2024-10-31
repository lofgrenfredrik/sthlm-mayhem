"use client"

import { useEffect, useState } from "react"
import { listenToFirestoreChanges } from "../lib/firestoreListener"
import { getTimer } from "../lib/timer"

export default function Competition() {
  const [timerLocal, setTimerLocal] = useState({
    countdown: "0",
    minutes: "00",
    seconds: "00",
    active: false,
  })
  const [active, setActive] = useState(false)

  useEffect(() => {
    const unsubscribe = listenToFirestoreChanges("lambda", (data) => {
      const mayhemTimer = data.find((item) => item.id === "mayhem-timer")
      if (mayhemTimer.id === "mayhem-timer") {
        console.log("TIMER DATABASE UPDATED")
        const timerTime = new Date(mayhemTimer.time)
        const nowTime = new Date()
        if (timerTime > nowTime) {
          setActive(true)
        }
      }
    })

    // Clean up the listener when the component is unmounted
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    setActive(timerLocal.active)
  }, [timerLocal])

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const timerData = await getTimer()
      setTimerLocal(timerData)
    }, 300)

    if (!active) {
      console.log("Clear Intervall")
      clearInterval(intervalId)
    }

    return () => clearInterval(intervalId)
  }, [active])

  return (
    <div className="w-full flex justify-center items-center mb-5">
      {timerLocal.countdownSeconds !== "0" ? (
        <span className="text-8xl lg:text-[250px]">{timerLocal.countdownSeconds}</span>
      ) : null}
      {timerLocal.countdownSeconds === "0" && active ? (
        <span className="text-8xl lg:text-[250px]">
          {timerLocal.minutes}:{timerLocal.seconds}
        </span>
      ) : null}
      {!active ? <span className="text-7xl lg:text-[150px]">DONE!</span> : null}
    </div>
  )
}
