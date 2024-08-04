import Image from "next/image";
import Header from "./dashboard/_components/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative h-screen overflow-hidden">
      <Header />
      <Image
        src={"/Meetai1.png"}
        layout="fill"
        objectFit="cover"
        quality={100}
        alt="robotAndHumanOnaMeeting"
        className="filter blur-sm"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
        <h1 className="font-extrabold text-6xl mb-6 text-center font-serif">
          Meet The AI Interviewer
        </h1>
        <p className="text-md mb-8 text-center max-w-2xl">
          Double your chances of landing that job offer with our AI-powered
          interview preparation
        </p>
        <Link href={"/dashboard"}>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
}
