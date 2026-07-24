"use client";

import { useEffect, useState } from "react";

type DashboardData = {
  success: boolean;
  total: number;
  regions: Record<string, number>;
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadDashboard() {
    try {
      const response = await fetch("/api/dashboard");
      const result = await response.json();

      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();

    const interval = setInterval(loadDashboard, 30000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-2xl font-bold">Loading Dashboard...</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-5xl">

        <h1 className="mb-8 text-center text-4xl font-bold text-blue-900">
          Registration Dashboard
        </h1>

        <div className="mb-10 rounded-2xl bg-blue-700 p-8 text-center text-white shadow-xl">
          <h2 className="text-xl">Total Registered Participants</h2>

          <p className="mt-4 text-6xl font-bold">
            {data?.total}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

          {data &&
            Object.entries(data.regions).map(([region, count]) => (
              <div
                key={region}
                className="rounded-xl bg-white p-6 shadow"
              >
                <h3 className="font-semibold text-gray-700">
                  {region}
                </h3>

                <p className="mt-4 text-4xl font-bold text-blue-700">
                  {count}
                </p>
              </div>
            ))}

        </div>

      </div>
    </main>
  );
}