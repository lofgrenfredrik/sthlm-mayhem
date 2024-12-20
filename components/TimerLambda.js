"use client"

import { useEffect, useState } from "react"
import { listenToFirestoreChanges } from "../lib/firestoreListener"
import { digital7Mono } from "../lib/fonts"
export default function Competition() {
  const [timer, setTimer] = useState({
    countdown: "0",
    minutes: "00",
    seconds: "00",
    active: false,
  })
  const [active, setActive] = useState(false)

  const fetchData = async () => {
    const res = await fetch("/api/timer")
    const data = await res.json()
    setTimer(data)
  }

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
    setActive(timer.active)
  }, [timer])

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData()
    }, 300)

    if (!active) {
      console.log("Clear Intervall")
      clearInterval(intervalId)
    }

    return () => clearInterval(intervalId)
  }, [active])

  return (
    <div
      className={`${digital7Mono.className} w-full flex justify-center items-center mb-5 flex-col`}
    >
      {timer.countdownSeconds !== "0" ? (
        <span className="text-8xl lg:text-[450px]">{timer.countdownSeconds}</span>
      ) : null}
      {timer.countdownSeconds === "0" && active ? (
        <span className="text-8xl lg:text-[250px]">
          {timer.minutes}:{timer.seconds}
        </span>
      ) : null}
      {!active ? <span className="text-7xl lg:text-[250px]">00:00</span> : null}
    </div>
  )
}
