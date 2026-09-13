"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    fullname: "",
    age: "",
    sex: "",
    gradeLevel: "",
    school: "",
    adviser: "",
  });

  const [otherGradeLevel, setOtherGradeLevel] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleGradeLevelChange(
    e: React.ChangeEvent<HTMLSelectElement>
  ) {
    const value = e.target.value;

    setForm({
      ...form,
      gradeLevel: value,
    });

    if (value !== "Other") {
      setOtherGradeLevel("");
    }
  }

  async function register() {
    const finalGradeLevel =
      form.gradeLevel === "Other"
        ? otherGradeLevel.trim()
        : form.gradeLevel;

    if (
      !form.email.trim() ||
      !form.fullname.trim() ||
      !form.age.trim() ||
      !form.sex ||
      !finalGradeLevel ||
      !form.school.trim() ||
      !form.adviser.trim()
    ) {
      alert("Please complete all required fields.");
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
          age: form.age,
          sex: form.sex,
          gradeLevel: finalGradeLevel,
          school: form.school,
          adviser: form.adviser,
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

          {/* Event Banner */}
          <Image
            src="/banner.png"
            alt="Event Banner"
            width={1200}
            height={300}
            className="h-auto w-full object-contain"
            priority
          />

          {/* Registration Title */}
          <div className="bg-white px-8 py-5 text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Registration
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
              placeholder="First Name, Middle Name, Last Name"
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:outline-none"
            />
          </div>

          {/* Age */}
          <div>
            <label className="mb-2 block font-semibold text-gray-800">
              Age *
            </label>

            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              placeholder="Enter your age"
              min="1"
              max="100"
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:outline-none"
            />
          </div>

          {/* Sex */}
          <div>
            <label className="mb-2 block font-semibold text-gray-800">
              Sex *
            </label>

            <select
              name="sex"
              value={form.sex}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 focus:border-blue-600 focus:outline-none"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Grade Level */}
          <div>
            <label className="mb-2 block font-semibold text-gray-800">
              Grade Level *
            </label>

            <select
              name="gradeLevel"
              value={form.gradeLevel}
              onChange={handleGradeLevelChange}
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 focus:border-blue-600 focus:outline-none"
            >
              <option value="">Select Grade Level</option>
              <option value="Grade 11">Grade 11</option>
              <option value="Grade 12">Grade 12</option>
              <option value="Other">Other</option>
            </select>

            {form.gradeLevel === "Other" && (
              <input
                type="text"
                value={otherGradeLevel}
                onChange={(e) => setOtherGradeLevel(e.target.value)}
                placeholder="Enter your grade level"
                className="mt-3 w-full rounded-lg border border-gray-300 p-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:outline-none"
              />
            )}
          </div>

          {/* School */}
          <div>
            <label className="mb-2 block font-semibold text-gray-800">
              School *
            </label>

            <input
              type="text"
              name="school"
              value={form.school}
              onChange={handleChange}
              placeholder="Enter the complete name of your school"
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:outline-none"
            />
          </div>

          {/* Adviser */}
          <div>
            <label className="mb-2 block font-semibold text-gray-800">
              Adviser's Name *
            </label>

            <input
              type="text"
              name="adviser"
              value={form.adviser}
              onChange={handleChange}
              placeholder="Enter your adviser's full name"
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:outline-none"
            />
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