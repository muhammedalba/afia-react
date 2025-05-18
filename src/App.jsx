import React, { useEffect } from "react";
import AppRouter from "./AppRouter";
import { AuthProvider } from "./contexts/AuthContext";
import { Provider } from "react-redux";
import store from "./redux/app/store";


function App() {
  return (
    <Provider store={store}>

        <AuthProvider>
          <AppRouter />
        </AuthProvider>

    </Provider>
  );
}

export default App;
