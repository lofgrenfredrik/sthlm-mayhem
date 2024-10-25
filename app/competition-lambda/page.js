"use client"

import { useEffect, useState } from "react"
import Link from "next/link";
import { listenToFirestoreChanges } from "../../lib/firestoreListener"


export default function Competition() {
  const [timer, setTimer] = useState({minutes: "00", seconds: "00", active: false});
  const [active, setActive] = useState(false);

  const fetchData = async () => {
    const res = await fetch('/api/timer')
    const data = await res.json();

    setTimer(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   // Call the listener function and update state with Firestore data
  //   const unsubscribe = listenToFirestoreChanges("lambda", (data) => {
  //     const [mayhemTimer] = data;
  //     if (mayhemTimer.id === 'mayhem-timer') {
  //       if (mayhemTimer.time > new Date().getTime()) {
  //         console.log("Timer is activated")
  //         setActive(true);
  //       }
  //     }
  //   });

  //   // Clean up the listener when the component is unmounted
  //   return () => unsubscribe();
  // }, []);

  useEffect(() => {
    console.log(timer, "<--- timer")
    setActive(timer.active);
  }, [timer])

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData();
    }, 1000);

    if (!active) {
      console.log("Clear Intervall")
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [active]);

  return (
    <div className="flex justify-center items-center w-screen h-screen flex-col relative">
      <h1 className="text-6xl">Mayhem competition LAMBDA</h1>
      <h2>{timer.minutes} : {timer.seconds}</h2>
      {/* {active ? <h2>{data.minutes} : {data.seconds}</h2> : <h2>00 : 00 NO TIME LEFT</h2>} */}
      <Link className="absolute top-4 left-4 text-lg underline" href="/admin">Admin</Link>
    </div>
  )
}
