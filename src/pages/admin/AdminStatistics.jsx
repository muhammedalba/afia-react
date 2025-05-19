import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center">
      <div className={`p-3 rounded-full ${color} bg-opacity-10`}>{icon}</div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

const AdminStatistics = () => {
  const [stats, setStats] = useState({
    doctors: 0,
    patients: 0,
    examinations: 0,
    donations: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const [doctorsRes, patientsRes, examinationsRes, donationsRes] =
        await Promise.all([
          fetch("https://lavenderblush-owl-178559.hostingersite.com/api/numbers_of_doctors", {
            headers: {
              Authorization: `Bearer ${user.token}`,
              Accept: "application/json",
            },
          }),
          fetch("https://lavenderblush-owl-178559.hostingersite.com/api/numbers_of_patients", {
            headers: {
              Authorization: `Bearer ${user.token}`,
              Accept: "application/json",
            },
          }),
          fetch("https://lavenderblush-owl-178559.hostingersite.com/api/numbers_of_examinations", {
            headers: {
              Authorization: `Bearer ${user.token}`,
              Accept: "application/json",
            },
          }),
          fetch("https://lavenderblush-owl-178559.hostingersite.com/api/numbers_of_blood_donations", {
            headers: {
              Authorization: `Bearer ${user.token}`,
              Accept: "application/json",
            },
          }),
        ]);

      if (
        !doctorsRes.ok ||
        !patientsRes.ok ||
        !examinationsRes.ok ||
        !donationsRes.ok
      ) {
        throw new Error("Failed to fetch statistics");
      }

      const [doctorsData, patientsData, examinationsData, donationsData] =
        await Promise.all([
          doctorsRes.json(),
          patientsRes.json(),
          examinationsRes.json(),
          donationsRes.json(),
        ]);

      setStats({
        doctors: doctorsData.count || 0,
        patients: patientsData.count || 0,
        examinations: examinationsData.count || 0,
        donations: donationsData.count || 0,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">System Statistics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Doctors"
          value={stats.doctors}
          icon={
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          }
          color="text-blue-600"
        />

        <StatCard
          title="Total Patients"
          value={stats.patients}
          icon={
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          }
          color="text-green-600"
        />

        <StatCard
          title="Total Examinations"
          value={stats.examinations}
          icon={
            <svg
              className="w-6 h-6 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          }
          color="text-purple-600"
        />

        <StatCard
          title="Total Donations"
          value={stats.donations}
          icon={
            <svg
              className="w-6 h-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          }
          color="text-red-600"
        />
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">System Overview</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Doctor to Patient Ratio</span>
              <span className="font-medium">
                {stats.doctors > 0
                  ? (stats.patients / stats.doctors).toFixed(2)
                  : "0"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Examinations per Patient</span>
              <span className="font-medium">
                {stats.patients > 0
                  ? (stats.examinations / stats.patients).toFixed(2)
                  : "0"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Donations per Patient</span>
              <span className="font-medium">
                {stats.patients > 0
                  ? (stats.donations / stats.patients).toFixed(2)
                  : "0"}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Activity Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Users</span>
              <span className="font-medium">
                {stats.doctors + stats.patients}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Medical Records</span>
              <span className="font-medium">{stats.examinations}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Blood Donations</span>
              <span className="font-medium">{stats.donations}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStatistics;
