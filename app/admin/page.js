"use client"

import { useState } from 'react';
import {db} from '../../lib/firestore';
import { collection, addDoc } from "firebase/firestore";

export default function Admin() {
      const [value, setValue] = useState('');
      const [time, setTime] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const timeDate = new Date().getTime() + (time*60000);
        try {
            const docRef = await addDoc(collection(db, "test"), {
                text: value,
                time: timeDate,
            });
            console.log("Document written with ID: ", docRef.id);
            setValue(''); // Clear the form
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
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="text"
                />
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
