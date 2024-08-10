"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import Link from "next/link";

const Header = () => {
  const path = usePathname();

  useEffect(() => {}, []);
  return (
    <div className="flex p-2 items-center justify-between bg-secondary shadow-lg">
      <div className="flex flex-col items-center">
        <Image src={"/logo.svg"} width={120} height={60} alt="logo" />
        <h2 className="text-md font-semibold text-primary">
          Meet AI Interviewer
        </h2>
      </div>
      <ul className="hidden md:flex gap-6">
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path == "/dashboard" ? "text-primary font-bold" : ""
          }`}
        >
          <Link href="/dashboard">Dashboard</Link>
        </li>

        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path == "/howit" && "text-primary font-bold"
          }`}
        >
          <Link href="/dashboard">How it Works ?</Link>
        </li>
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path == "/howit" && "text-primary font-bold"
          }`}
        >
          <Link href="/dashboard">About Us </Link>
        </li>
      </ul>
      <UserButton
        appearance={{
          elements: {
            avatarBox: "h-12 w-12",
          },
        }}
      />
    </div>
  );
};

export default Header;
