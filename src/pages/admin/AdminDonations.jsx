import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

const AdminDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await fetch(
        "https://lavenderblush-owl-178559.hostingersite.com/api/Display_all_donations",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch donations");

      const data = await response.json();
      setDonations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveDonation = async (donationId) => {
    try {
      const response = await fetch(
        `https://lavenderblush-owl-178559.hostingersite.com/api/Approve_donation/${donationId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${user.token}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to approve donation");

      // Refresh donation list
      fetchDonations();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancelDonation = async (donationId) => {
    try {
      const response = await fetch(
        `https://lavenderblush-owl-178559.hostingersite.com/api/Cancel_doantion/${donationId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${user.token}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to cancel donation");

      // Refresh donation list
      fetchDonations();
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredDonations = donations.filter(
    (donation) =>
      donation.donor_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.blood_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.hospital_name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      donation.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Blood Donation Management</h1>
        <input
          type="text"
          placeholder="Search donations..."
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
                Donor Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Blood Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hospital
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
            {filteredDonations.map((donation) => (
              <tr key={donation.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {donation.donor_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {donation.blood_type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {donation.hospital_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{donation.city}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      donation.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : donation.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {donation.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {donation.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleApproveDonation(donation.id)}
                        className="text-green-600 hover:text-green-900 mr-4"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleCancelDonation(donation.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDonations;
