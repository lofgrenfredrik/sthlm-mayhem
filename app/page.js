import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex items-center w-screen h-screen flex-col">
      <div className="w-64 relative h-24 mt-6">
        <Image src="/images/cf-torn.png" alt="sodertorn" layout={"fill"} objectFit={"contain"} />
      </div>

      <div className="flex justify-center items-center w-full h-full flex-col">
        <Link href="/competition">
          <div className="w-96 h-52 relative">
            <Image
              src="/images/mayhem-fit.jpg"
              alt="mayhem"
              layout={"fill"}
              objectFit={"contain"}
            />
          </div>
        </Link>
      </div>
    </div>
  )
}
