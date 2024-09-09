import Image from 'next/image'
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex items-center w-screen h-screen flex-col">
      <Image src="/images/logga-vit.png" alt="mayhem" width={100} height={100} />

      <div className="flex justify-center items-center w-full h-full flex-col">
        <Link href="/competition">
          <Image src="/images/mayhem.jpg" alt="mayhem" width={500} height={500} />
        </Link>
      </div>
    </div>
  )
}


