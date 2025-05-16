import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

const AdminPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/Display_patients",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch patients");

      const data = await response.json();
      setPatients(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprovePatient = async (patientId) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/Patient_approve",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ patient_id: patientId }),
        }
      );

      if (!response.ok) throw new Error("Failed to approve patient");

      // Refresh patient list
      fetchPatients();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeletePatient = async (patientId) => {
    if (!window.confirm("Are you sure you want to delete this patient?"))
      return;

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/Delete_patient/${patientId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete patient");

      // Refresh patient list
      fetchPatients();
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone?.includes(searchTerm) ||
      patient.national_number?.includes(searchTerm)
  );

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Patient Management</h1>
        <input
          type="text"
          placeholder="Search patients..."
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                National ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPatients.map((patient) => (
              <tr key={patient.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {patient.full_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {patient.national_number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      patient.is_approved
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {patient.is_approved ? "Approved" : "Pending"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {!patient.is_approved && (
                    <button
                      onClick={() => handleApprovePatient(patient.id)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() => handleDeletePatient(patient.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPatients;
