
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import ComponentRoutes from "./Components/LandingComponent/Routes/ComponentRoutes";
import { AuthProvider } from "./contexts/authContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <ComponentRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
