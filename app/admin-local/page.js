"use client"

import { useState } from "react"
import useLocalStorage from "../hooks/localStorage"
import Form from "../../components/Form"

export default function Admin() {
  const [textValue, setTextValue] = useState("")
  // const time = useState('');
  const { localText } = useLocalStorage()

  const handleSubmit = async (event) => {
    event.preventDefault()
    // const timeDate = new Date().getTime() + (time.value*60000);
    try {
      // localTime.setValue(timeDate)
      localText.setValue(textValue)
      setTextValue("") // Clear the form
    } catch (e) {
      console.error("Error adding document: ", e)
    }
  }
  return (
    <div className="flex justify-center items-center w-screen h-screen flex-col">
      <h1 className="text-6xl">Admin local</h1>
      <Form handleSubmit={handleSubmit} textValue={textValue} setTextValue={setTextValue} />
    </div>
  )
}
