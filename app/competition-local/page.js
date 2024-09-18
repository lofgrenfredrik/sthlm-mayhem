"use client"

import { useEffect, useState } from "react"
import Link from "next/link";
import Countdown from 'react-countdown';
import useLocalStorage from '../hooks/localStorage';

function renderText(text){
  return text.split('\n').map((item, i) => {
    return <p className="text-3xl" key={i}>{item}</p>
  })
}


export default function Competition() {
  const [value, setValue] = useState('');
  const [time, setTime] = useState('');
  const { localText, localTime } = useLocalStorage();

  useEffect(() => {
    if(localText.value) {
      setValue(localText.value)
    }

  }, [localText, localText.value]);

  useEffect(() => {
    if(localTime.value) {
      setTime(localTime.value)
    }

  }, [localTime, localTime.value]);

  return (
    <div className="flex justify-center items-center w-screen h-screen flex-col relative">
      <h1 className="text-6xl">Mayhem competition Local</h1>
      <div className="flex justify-between w-96 border-spacing-1 border-red-400">
        <div>
          {value && renderText(value)}
        </div>
        <div>
          {time && <Countdown
                date={time}
                zeroPadTime={2}
                intervalDelay={1}
                renderer={props => <div className="text-4xl">{props.minutes}:{props.seconds}</div>}
              />}
        </div>
      </div>


      <Link className="absolute top-4 left-4 text-lg underline" href="/admin">Admin</Link>
    </div>
  )
}
