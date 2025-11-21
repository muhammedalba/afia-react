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

// User Routes
export const userRoutes = [
  {
    path: "/volunteer/Info",
    element: "Info",
    isPublic: true,
  }
];
