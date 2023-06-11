import Image from "next/image";
import Link from "next/link";
import SquigglyLines from "./SquigglyLines";

// write a home components
export default function MainPage() {
  return (
    <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-20 mt-20 background-gradient">
      <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-gray-300 sm:text-7xl">
        Generate decentralized picture{" "}
        <span className="relative whitespace-nowrap text-blue-600">
          <SquigglyLines />
          <span className="relative">using Defu</span>
        </span>{" "}
        .
      </h1>
      <h2 className="mx-auto mt-12 max-w-xl text-lg sm:text-gray-400  text-gray-500 leading-7">
        Decentralised picture generation sites don&apos;t collect any
        information from you!
      </h2>
      <Link
        className="bg-blue-600 rounded-xl text-white font-medium px-4 py-3 sm:mt-10 mt-8 hover:bg-blue-500 transition"
        href="/picture"
      >
        Generate photo
      </Link>
      <div className="flex justify-between items-center w-full flex-col sm:mt-10 mt-6">
        <div className="flex flex-col space-y-10 mt-4 mb-16">
          <div className="flex sm:space-x-8 sm:flex-row flex-col">
            <div>
              <Image
                alt="Original photo of a room"
                src="/defu/9.png"
                className="w-full object-cover h-96 rounded-2xl"
                width={400}
                height={400}
              />
            </div>
            <div className="sm:mt-0 mt-8">
              <Image
                alt="Generated photo of a room with roomGPT.io"
                width={400}
                height={400}
                src="/defu/7.png"
                className="w-full object-cover h-96 rounded-2xl sm:mt-0 mt-2"
              />
            </div>
            <div className="sm:mt-0 mt-8">
              <Image
                alt="Generated photo of a room with roomGPT.io"
                width={400}
                height={400}
                src="/defu/8.png"
                className="w-full object-cover h-96 rounded-2xl sm:mt-0 mt-2"
              />
            </div>
            <div className="sm:mt-0 mt-8">
              <Image
                alt="Generated photo of a room with roomGPT.io"
                width={400}
                height={400}
                src="/defu/10.png"
                className="w-full object-cover h-96 rounded-2xl sm:mt-0 mt-2"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
