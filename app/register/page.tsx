"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    fullname: "",
    contactNumber: "",
    organization: "",
    institutionType: "",
    otherInstitutionType: "",
    position: "",
    region: "",
  });

  const [submitting, setSubmitting] = useState(false);
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
    !form.contactNumber ||
    !form.organization ||
    !form.institutionType ||
    !form.position ||
    !form.region
  ) {
    alert("Please complete all required fields.");
    return;
  }

  if (
    form.institutionType === "Others" &&
    !form.otherInstitutionType.trim()
  ) {
    alert("Please specify your type of institution.");
    return;
  }

  setSubmitting(true);

  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: form.email,
        fullname: form.fullname,
        contactNumber: form.contactNumber,
        organization: form.organization,
        institutionType: form.institutionType,
        otherInstitutionType:
          form.institutionType === "Others"
            ? form.otherInstitutionType
            : "",
        position: form.position,
        region: form.region,
      }),
    });

    const result = await response.json();

    if (result.success) {
      router.push("/success");
    } else {
      setSubmitting(false);
      console.error(result);
      alert("Unable to save registration. Please try again.");
    }
  } catch (error) {
    setSubmitting(false);
    console.error(error);
    alert("An error occurred while saving your registration.");
  }
}
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white shadow-xl">

        {/* Header */}
        <div className="overflow-hidden rounded-t-2xl">

          {/* Conference Banner */}
          <Image
            src="/HRSD.jpg"
            alt="25th HRSD Conference"
            width={1200}
            height={300}
            className="h-auto w-full object-contain"
            priority
          />

          {/* Registration Title */}
          <div className="bg-white px-8 py-5 text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              25th HRSD Conference Registration
            </h1>

            <p className="mt-1 text-gray-500">
              Please complete the registration form below.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-6 p-8">

          {/* Email */}
          <div>
            <label className="mb-2 block font-semibold text-gray-800">
              Email Address *
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:outline-none"
            />
          </div>

          {/* Full Name */}
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

          {/* Contact Number */}
          <div>
            <label className="mb-2 block font-semibold text-gray-800">
              Contact Number *
            </label>

            <input
              type="tel"
              name="contactNumber"
              value={form.contactNumber}
              onChange={handleChange}
              placeholder="e.g. 0912 345 6789"
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:outline-none"
            />
          </div>

          {/* Organization */}
          <div>
            <label className="mb-2 block font-semibold text-gray-800">
              Name of School / TVI / TTI / Agency / Company *
            </label>

            <input
              type="text"
              name="organization"
              value={form.organization}
              onChange={handleChange}
              placeholder="Please provide the complete name (no abbreviation)"
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:outline-none"
            />
          </div>

          {/* Type of Institution */}
          <div>
            <label className="mb-2 block font-semibold text-gray-800">
              Type of Institution *
            </label>

            <select
              name="institutionType"
              value={form.institutionType}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 focus:border-blue-600 focus:outline-none"
            >
              <option value="">Select Type of Institution</option>
              <option value="Private TVET Institution (TVI)">
                Private TVET Institution (TVI)
              </option>
              <option value="Public TVET Institution (TTI)">
                Public TVET Institution (TTI)
              </option>
              <option value="TESDA">TESDA</option>
              <option value="Others">Others</option>
            </select>

            {/* Appears only when Others is selected */}
            {form.institutionType === "Others" && (
              <div className="mt-3">
                <input
                  type="text"
                  name="otherInstitutionType"
                  value={form.otherInstitutionType}
                  onChange={handleChange}
                  placeholder="Please specify"
                  className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Position */}
          <div>
            <label className="mb-2 block font-semibold text-gray-800">
              Position *
            </label>

            <input
              type="text"
              name="position"
              value={form.position}
              onChange={handleChange}
              placeholder="Enter your position"
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:outline-none"
            />
          </div>

          {/* Region */}
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
              <option>Negros Island Region (NIR)</option>
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
              disabled={submitting}
              className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              ← Back
            </button>

            <button
              onClick={register}
              disabled={submitting}
              className={`rounded-lg px-8 py-3 font-semibold text-white transition ${
                submitting
                  ? "cursor-not-allowed bg-blue-400"
                  : "bg-blue-700 hover:bg-blue-800"
              }`}
            >
              {submitting ? "Submitting..." : "Register"}
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}