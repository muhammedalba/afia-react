import { useEffect } from "react";
import AppRouter from "./AppRouter";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
