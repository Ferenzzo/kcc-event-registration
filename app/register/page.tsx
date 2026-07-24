"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    fullname: "",
    organization: "",
    position: "",
    region: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function register() {
    if (
      !form.email ||
      !form.fullname ||
      !form.organization ||
      !form.position ||
      !form.region
    ) {
      alert("Please complete all required fields.");
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          fullname: form.fullname,
          organization: form.organization,
          position: form.position,
          region: form.region,
          username: localStorage.getItem("username") || "",
        }),
      });

      const result = await response.json();

      if (result.success) {
        router.push("/success");
      } else {
        console.error(result);
        alert("Unable to save registration.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while saving your registration.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white shadow-xl">

        {/* Header */}
        <div className="rounded-t-2xl bg-blue-700 p-8 text-center text-white">
          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-white text-2xl font-bold text-blue-700">
              <Image
                        src="/Maven_LOGO.jpg"
                        alt="Event Logo"
                        width={120}
                        height={120}
                        className="object-contain"
                        priority
                      />
          </div>

          <h1 className="text-3xl font-bold">
            Event Registration
          </h1>

          <p className="mt-2 text-blue-100">
            Registration Form
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6 p-8">

          <div>
            <label className="mb-2 block font-semibold text-gray-800">
              Email Address *
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold text-gray-800">
              Full Name *
            </label>

            <input
              type="text"
              name="fullname"
              value={form.fullname}
              onChange={handleChange}
              placeholder="First Name, Middle Initial, Last Name"
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold text-gray-800">
              School / TVI / TTI / Agency / Company *
            </label>

            <input
              type="text"
              name="organization"
              value={form.organization}
              onChange={handleChange}
              placeholder="No abbreviation"
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold text-gray-800">
              Position *
            </label>

            <input
              type="text"
              name="position"
              value={form.position}
              onChange={handleChange}
              placeholder="Your position"
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold text-gray-800">
              Region *
            </label>

            <select
              name="region"
              value={form.region}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 focus:border-blue-600 focus:outline-none"
            >
              <option value="">Select Region</option>

              <option>National Capital Region (NCR)</option>
              <option>Ilocos Region (Region I)</option>
              <option>Cagayan Valley (Region II)</option>
              <option>Cordillera Administrative Region (CAR)</option>
              <option>Central Luzon (Region III)</option>
              <option>CALABARZON (Region IV-A)</option>
              <option>MIMAROPA</option>
              <option>Bicol Region (Region V)</option>
              <option>Western Visayas (Region VI)</option>
              <option>Central Visayas (Region VII)</option>
              <option>Eastern Visayas (Region VIII)</option>
              <option>Zamboanga Peninsula (Region IX)</option>
              <option>Northern Mindanao (Region X)</option>
              <option>Davao Region (Region XI)</option>
              <option>SOCCSKSARGEN (Region XII)</option>
              <option>Caraga Region (Region XIII)</option>
              <option>BARMM</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-between pt-4">
            <button
              onClick={() => router.back()}
              className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-100"
            >
              ← Back
            </button>

            <button
              onClick={register}
              className="rounded-lg bg-blue-700 px-8 py-3 font-semibold text-white hover:bg-blue-800"
            >
              Register
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}