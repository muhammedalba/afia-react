// Admin Routes
export const adminRoutes = [
  {
    path: "/admin/login",
    element: "AdminLogin",
    isPublic: true,
  },
  {
    path: "/admin/dashboard",
    element: "AdminDashboard",
    isPublic: false,
    role: "admin",
  },
  {
    path: "/admin/patients",
    element: "AdminPatients",
    isPublic: false,
    role: "admin",
  },
  {
    path: "/admin/doctors",
    element: "AdminDoctors",
    isPublic: false,
    role: "admin",
  },
  {
    path: "/admin/examinations",
    element: "AdminExaminations",
    isPublic: false,
    role: "admin",
  },
  {
    path: "/admin/donations",
    element: "AdminDonations",
    isPublic: false,
    role: "admin",
  },
  {
    path: "/admin/profile",
    element: "AdminProfile",
    isPublic: false,
    role: "admin",
  },

];

// Patient Routes
export const patientRoutes = [
  {
    path: "/patient/login",
    element: "PatientLogin",
    isPublic: true,
  },
  {
    path: "/patient/register",
    element: "PatientRegister",
    isPublic: true,
  },
  {
    path: "/patient/dashboard",
    element: "PatientDashboard",
    isPublic: false,
    role: "patient",
  },
  {
    path: "/patient/examinations",
    element: "PatientExaminations",
    isPublic: false,
    role: "patient",
  },
  {
    path: "/patient/profile",
    element: "PatientProfile",
    isPublic: false,
    role: "patient",
  },
];

// Public Routes
export const publicRoutes = [
  {
    path: "/",
    element: "Home",
    isPublic: true,
  },
  {
    path: "/About",
    element: "About",
    isPublic: true,
  },
  {
    path: "/login",
    element: "Login",
    isPublic: true,
  },
  {
    path: "*",
    element: "NotFound",
    isPublic: true,
  },
];

// Combine all routes
// export const allRoutes = [...adminRoutes, ...patientRoutes, ...publicRoutes];
// 