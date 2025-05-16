

const API_URL = "http://127.0.0.1:8000/api";
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
};

// Authentication
const adminLogin = async (credentials) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
};

const adminLogout = async () => {
  const response = await fetch(`${API_URL}/Logout`, {
    method: "POST",
    headers: getAuthHeader(),
  });
  return response.json();
};

// Profile
const getAdminProfile = async () => {
  const response = await fetch(`${API_URL}/admin_profile`, {
    headers: getAuthHeader(),
  });
  return response.json();
};

// Patients
const getAllPatients = async () => {
  const response = await fetch(`${API_URL}/Display_patients`, {
    headers: getAuthHeader(),
  });
  return response.json();
};

const searchPatients = async (query) => {
  const response = await fetch(`${API_URL}/Search_for_patient/${query}`, {
    headers: getAuthHeader(),
  });
  return response.json();
};

const approvePatient = async (patientId) => {
  const response = await fetch(`${API_URL}/Patient_approve`, {
    method: "POST",
    headers: getAuthHeader(),
    body: JSON.stringify({ patient_id: patientId }),
  });
  return response.json();
};

const deletePatient = async (patientId) => {
  const response = await fetch(`${API_URL}/Delete_patient/${patientId}`, {
    method: "DELETE",
    headers: getAuthHeader(),
  });
  return response.json();
};

// Doctors
const getAllDoctors = async () => {
  const response = await fetch(`${API_URL}/Display_doctors`, {
    headers: getAuthHeader(),
  });
  return response.json();
};

const searchDoctors = async (query) => {
  const response = await fetch(`${API_URL}/Search_for_doctor/${query}`, {
    headers: getAuthHeader(),
  });
  return response.json();
};

const approveDoctor = async (doctorId) => {
  const response = await fetch(`${API_URL}/Doctor_approve`, {
    method: "POST",
    headers: getAuthHeader(),
    body: JSON.stringify({ doctor_id: doctorId }),
  });
  return response.json();
};

const deleteDoctor = async (doctorId) => {
  const response = await fetch(`${API_URL}/Delete_doctor/${doctorId}`, {
    method: "DELETE",
    headers: getAuthHeader(),
  });
  return response.json();
};

// Examinations
const getAllExaminations = async () => {
  const response = await fetch(`${API_URL}/Display_examinations`, {
    headers: getAuthHeader(),
  });
  return response.json();
};

const deleteExamination = async (examinationId) => {
  const response = await fetch(
    `${API_URL}/delete_examination/${examinationId}`,
    {
      method: "DELETE",
      headers: getAuthHeader(),
    }
  );
  return response.json();
};

// Donations
const getAllDonations = async () => {
  const response = await fetch(`${API_URL}/Display_all_donations`, {
    headers: getAuthHeader(),
  });
  return response.json();
};

const approveDonation = async (donationId) => {
  const response = await fetch(`${API_URL}/Approve_donation/${donationId}`, {
    method: "PATCH",
    headers: getAuthHeader(),
  });
  return response.json();
};

const cancelDonation = async (donationId) => {
  const response = await fetch(`${API_URL}/Cancel_doantion/${donationId}`, {
    method: "PATCH",
    headers: getAuthHeader(),
  });
  return response.json();
};

// Statistics
const getDoctorCount = async () => {
  const response = await fetch(`${API_URL}/numbers_of_doctors`, {
    headers: getAuthHeader(),
  });
  return response.json();
};

const getPatientCount = async () => {
  const response = await fetch(`${API_URL}/numbers_of_patients`, {
    headers: getAuthHeader(),
  });
  return response.json();
};

const getExaminationCount = async () => {
  const response = await fetch(`${API_URL}/numbers_of_examinations`, {
    headers: getAuthHeader(),
  });
  return response.json();
};

const getDonationCount = async () => {
  const response = await fetch(`${API_URL}/numbers_of_blood_donations`, {
    headers: getAuthHeader(),
  });
  return response.json();
};

// Combined statistics function
const getStatistics = async () => {
  try {
    const [doctors, patients, examinations, donations] = await Promise.all([
      getDoctorCount(),
      getPatientCount(),
      getExaminationCount(),
      getDonationCount(),
    ]);

    return {
      doctors: doctors.count || 0,
      patients: patients.count || 0,
      examinations: examinations.count || 0,
      donations: donations.count || 0,
    };
  } catch (error) {
    console.error("Error fetching statistics:", error);
    return {
      doctors: 0,
      patients: 0,
      examinations: 0,
      donations: 0,
    };
  }
};

export {
  adminLogin,
  adminLogout,
  getAdminProfile,
  getAllPatients,
  searchPatients,
  approvePatient,
  deletePatient,
  getAllDoctors,
  searchDoctors,
  approveDoctor,
  deleteDoctor,
  getAllExaminations,
  deleteExamination,
  getAllDonations,
  approveDonation,
  cancelDonation,
  getDoctorCount,
  getPatientCount,
  getExaminationCount,
  getDonationCount,
  getStatistics,
};
