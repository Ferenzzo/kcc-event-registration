"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  function continueToRegistration() {
    if (!username.trim()) {
      alert("Please enter your username.");
      return;
    }

    localStorage.setItem("username", username);
    router.push("/register");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

        {/* Logo */}
              <div className="mb-6 flex w-full items-center justify-center">
        {/* Left Logo */}
        <Image
          src="/Maven_LOGO.jpg"
          alt="Maven Logo"
          width={100}
          height={100}
          className="h-24 w-24 object-contain"
          priority
        />

        {/* Right Logo
        <Image
          src="/TVET.jpg"
          alt="Second Logo"
          width={100}
          height={100}
          className="h-24 w-24 object-contain"
        /> */}
      </div>
        {/* Event Information */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Registration
          </h1>

          <p className="mt-2 font-medium text-blue-700">
            September 18-19, 2026
          </p>

          <p className="mt-1 text-sm text-gray-500">
            8:00 AM – 5:00 PM
          </p>
        </div>

        <button
          onClick={() => router.push("/register")}
          className="w-full rounded-lg bg-blue-700 p-3 font-semibold text-white hover:bg-blue-800"
        >
          Register Now
        </button>

        {/* Dashboard */}
        <button
          onClick={() => router.push("/dashboard")}
          className="mt-3 w-full rounded-lg border border-blue-700 p-3 font-semibold text-blue-700 hover:bg-blue-50"
        >
          View Registration Dashboard
        </button>

      </div>
    </main>
  );
}