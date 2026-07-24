"use client";

import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  function registerAnother() {
    // Remove the previous user's username
    localStorage.removeItem("username");

    // Return to the home page
    router.push("/");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-10 text-center shadow-xl">

        {/* Success Icon */}
        <div className="mb-5 text-6xl">
          ✅
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-green-700">
          Registration Successful!
        </h1>

        <p className="mt-4 text-gray-600">
          Thank you for registering.
        </p>

        <p className="mt-1 text-gray-600">
          Your registration has been successfully received.
        </p>

        {/* Divider */}
        <div className="my-8 border-t border-gray-200" />

        {/* Register Another */}
        <button
          onClick={registerAnother}
          className="w-full rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
        >
          Register Another Participant
        </button>

        {/* Dashboard */}
        <button
          onClick={() => router.push("/dashboard")}
          className="mt-3 w-full rounded-lg border border-blue-700 px-6 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
        >
          View Registration Dashboard
        </button>

      </div>
    </main>
  );
}