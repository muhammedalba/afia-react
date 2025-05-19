import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

const AdminExaminations = () => {
  const [examinations, setExaminations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    fetchExaminations();
  }, []);

  const fetchExaminations = async () => {
    try {
      const response = await fetch(
        "https://lavenderblush-owl-178559.hostingersite.com/api/Display_examinations",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch examinations");

      const data = await response.json();
      setExaminations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteExamination = async (examinationId) => {
    if (!window.confirm("Are you sure you want to delete this examination?"))
      return;

    try {
      const response = await fetch(
        `https://lavenderblush-owl-178559.hostingersite.com/api/delete_examination/${examinationId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete examination");

      // Refresh examination list
      fetchExaminations();
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredExaminations = examinations.filter(
    (examination) =>
      examination.patient?.full_name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      examination.doctor?.full_name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      examination.description_of_status
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      examination.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Examination Management</h1>
        <input
          type="text"
          placeholder="Search examinations..."
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
                Patient
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Doctor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                City
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
            {filteredExaminations.map((examination) => (
              <tr key={examination.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {examination.patient?.full_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {examination.doctor?.full_name}
                </td>
                <td className="px-6 py-4">
                  <div className="max-w-xs truncate">
                    {examination.description_of_status}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {examination.city}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      examination.status === "accepted"
                        ? "bg-green-100 text-green-800"
                        : examination.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {examination.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleDeleteExamination(examination.id)}
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

export default AdminExaminations;
