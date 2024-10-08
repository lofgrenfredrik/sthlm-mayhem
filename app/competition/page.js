"use client"

import { useEffect, useState } from "react"
import { listenToFirestoreChanges } from "../../lib/firestoreListener"
import Link from "next/link";
import Countdown from 'react-countdown';


export default function Competition() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Call the listener function and update state with Firestore data
    const unsubscribe = listenToFirestoreChanges("test", (updatedData) => {
      setData(updatedData);
    });

    // Clean up the listener when the component is unmounted
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex justify-center items-center w-screen h-screen flex-col relative">
      <h1 className="text-6xl">Mayhem competition</h1>
      <ul>
        {data.map((item) => {
          return ( <li key={item.id}>
            {item.text} - {item.time}min
            <Countdown
              date={item.time}
              intervalDelay={0}
              precision={3}
              renderer={props => <div>{props.minutes}:{props.seconds}</div>}
            />
          </li>
        )})}
      </ul>


      <Link className="absolute top-4 left-4 text-lg underline" href="/admin">Admin</Link>
    </div>
  )
}
