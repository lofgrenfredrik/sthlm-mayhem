"use client"

import { useEffect, useState } from "react"
import { listenToFirestoreChanges } from "../lib/firestoreListener"

const ListItems = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Call the listener function and update state with Firestore data
    const unsubscribe = listenToFirestoreChanges("test", (updatedData) => {
      setData(updatedData);
    });

    // Clean up the listener when the component is unmounted
    return () => unsubscribe();
  }, []);


  console.log(data,"<----data")

  return (
    <div className="border w-96 text-center p-4">
      <h2>List of Items</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  )
}

export default ListItems

