"use client"

import { useEffect, useState } from "react"
import Link from "next/link";
import { listenToFirestoreChanges } from "../../lib/firestoreListener"


export default function Competition() {
  const [timer, setTimer] = useState({countdown: "0", minutes: "00", seconds: "00", active: false});
  const [timerData, setTimerData] = useState(null);
  const [countdownData, setCountdownData] = useState(null);
  const [active, setActive] = useState(false);

  const fetchData = async (timer, countdown) => {
    const queryParams = new URLSearchParams({ timerTimestamp: timer, countdownTimestamp: countdown });
    const res = await fetch(`/api/timer?${queryParams.toString()}`);
    const data = await res.json();
    setTimer(data);
  };

  useEffect(() => {
    if (timerData){
      fetchData(timerData, countdownData);
    }
  }, [timerData, countdownData]);

  useEffect(() => {
    // Call the listener function and update state with Firestore data
    const unsubscribe = listenToFirestoreChanges("lambda", (data) => {
      const [mayhemTimer] = data;
      if (mayhemTimer.id === 'mayhem-timer') {
        setTimerData(mayhemTimer.time);
        setCountdownData(mayhemTimer.countdown);
      }
    });

    // Clean up the listener when the component is unmounted
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log(timer, "<--- timer")
    setActive(timer.active);
  }, [timer])

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData(timerData, countdownData);
    }, 1000);

    if (!active) {
      console.log("Clear Intervall")
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [active, timerData, countdownData]);

  return (
    <div className="flex justify-center items-center w-screen h-screen flex-col relative">
      <h1 className="text-6xl">Mayhem competition LAMBDA</h1>
      <div className="text-7xl">
        {timer.countdownSeconds !== "0" ? <h2 className="text-9xl">{timer.countdownSeconds}</h2> : null}
        {timer.countdownSeconds === "0" && active ?  <h2>{timer.minutes} : {timer.seconds}</h2> : null}
        {!active ? <h2>DONE!</h2> : null}
        </div>
      <Link className="absolute top-4 left-4 text-lg underline" href="/admin">Admin</Link>
    </div>
  )
}
