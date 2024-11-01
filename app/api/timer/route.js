export const dynamic = "force-dynamic"
import { db } from "../../../lib/firestore"
import { doc, getDoc } from "firebase/firestore"

export async function GET(request) {
  const now = new Date()
  let timerDate = new Date()
  let countdownDate = new Date()

  const predefinedDocId = "mayhem-timer" // replace this with your actual ID
  const docRef = doc(db, "lambda", predefinedDocId)

  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const { time, countdown } = docSnap.data()
    timerDate = new Date(time)
    countdownDate = new Date(countdown)
  } else {
    console.log("No such document in database!")
  }

  const countdownLeft = countdownDate.getTime() - now.getTime()
  let countdownSeconds = Math.floor((countdownLeft / 1000) % 60)

  if (countdownSeconds <= 0) {
    countdownSeconds = 0
  }

  const timeLeft = timerDate.getTime() - now.getTime()
  const seconds = Math.floor((timeLeft / 1000) % 60)
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60)
  const padWithZero = (num) => String(num).padStart(2, "0")
  const paddedMinutes = padWithZero(minutes) ?? "00"
  const paddedSeconds = padWithZero(seconds) ?? "00"

  if (timeLeft <= 0) {
    return new Response(
      JSON.stringify({
        active: false,
        message: "Times up!",
        countdownSeconds: "0",
        minutes: "00",
        seconds: "00",
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    )
  }

  console.log(`Time left Lambda: ${paddedMinutes}:${paddedSeconds}`)
  return new Response(
    JSON.stringify({
      active: true,
      countdownSeconds: String(countdownSeconds),
      minutes: String(paddedMinutes),
      seconds: String(paddedSeconds),
      message: "Running timer",
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  )
}
