"use client";

import { useEffect, useState } from "react";

type DashboardData = {
  success: boolean;
  total: number;
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

    // Refresh every 30 seconds
    const interval = setInterval(loadDashboard, 30000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <h1 className="text-2xl font-bold text-gray-700">
          Loading Dashboard...
        </h1>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-8">
      <div className="w-full max-w-2xl">
        <div className="rounded-2xl bg-white p-10 text-center shadow-xl">

          <h1 className="text-3xl font-bold text-blue-900">
            Registration Dashboard
          </h1>

          <p className="mt-3 text-gray-500">
            Total number of registered participants
          </p>

          <div className="mt-8 rounded-2xl bg-blue-700 p-10 text-white">
            <p className="text-lg font-medium">
              Registered Participants
            </p>

            <p className="mt-3 text-7xl font-bold">
              {data?.total ?? 0}
            </p>
          </div>

          <p className="mt-6 text-sm text-gray-400">
            Automatically updates every 30 seconds
          </p>

        </div>
      </div>
    </main>
  );
}