"use client"

import { useState } from 'react';
import {db} from '../../lib/firestore';
import { count, doc, setDoc } from "firebase/firestore";

export default function Admin() {
    const [time, setTime] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const now = new Date()
        const countdownTime = 10000
        const timePadding = 9000
        const timeDate = now.getTime() + (time*60000) + timePadding;
        const countdown = now.getTime() + countdownTime;

        try {
        // Define a predefined document ID here
        const predefinedDocId = "mayhem-timer";  // replace this with your actual ID
        const docRef = doc(db, "lambda", predefinedDocId);

        // Use setDoc instead of addDoc
        await setDoc(docRef, {
            time: timeDate,
            countdown: countdown
        });

        console.log("Document written with predefined ID: ", predefinedDocId);
        setTime(''); // Clear the form
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };


return (
<div className="flex justify-center items-center w-screen h-screen flex-col">
    <h1 className="text-6xl">Admin</h1>
            <form className="flex justify-center items-center w-full h-full flex-col text-black" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="minutes"
                />
            <button className='bg-slate-200' type="submit">Add Item</button>
        </form>
    </div>
  )
}
