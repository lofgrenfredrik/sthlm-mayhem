"use client"

import { useEffect, useState } from "react"
import { listenToFirestoreChanges } from "../../lib/firestoreListener"
import Link from "next/link";

export default function Competition() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Call the listener function and update state with Firestore data
    const unsubscribe = listenToFirestoreChanges("test", (updatedData) => {
      console.log(updatedData, "<----updatedData");
      setData(updatedData);
    });

    // Clean up the listener when the component is unmounted
    return () => unsubscribe();
  }, []);


  console.log(data,"<----data")

  return (
    <div className="flex justify-center items-center w-screen h-screen flex-col relative">
      <h1 className="text-6xl">Mayhem competition</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.text} - {item.time}min</li>
        ))}
      </ul>

      <Link className="absolute top-4 left-4 text-lg underline" href="/admin">Admin</Link>
    </div>
  )
}
