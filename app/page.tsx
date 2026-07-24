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
        <div className="mb-6 flex justify-center">
          <Image
            src="/Maven_LOGO.jpg"
            alt="Event Logo"
            width={120}
            height={120}
            className="object-contain"
            priority
          />
        </div>

        {/* Event Information */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Event Registration
          </h1>

          <p className="mt-2 font-medium text-blue-700">
            July 30–31, 2026
          </p>

          <p className="mt-1 text-sm text-gray-500">
            8:00 AM – 5:00 PM
          </p>
        </div>

        {/* Username */}
        <label className="mb-2 block font-semibold text-gray-800">
          Username
        </label>

        <input
          type="text"
          placeholder="Enter your username"
          className="mb-4 w-full rounded-lg border border-gray-300 p-3 text-gray-900 focus:border-blue-600 focus:outline-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              continueToRegistration();
            }
          }}
        />

        <button
          onClick={continueToRegistration}
          className="w-full rounded-lg bg-blue-700 p-3 font-semibold text-white hover:bg-blue-800"
        >
          Continue to Registration
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