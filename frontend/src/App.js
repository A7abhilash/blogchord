import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Loader from "./containers/Loader";
import Routes from "./containers/Routes";
import Navbar from "./AuthSection/containers/Navbar";

function App() {
  // const location = useLocation();
  const { loading } = useAuth();

  return loading ? (
    <Loader height="100" />
  ) : (
    <>
      <Router>
        <Navbar />
        <Routes />
      </Router>
    </>
  );
}

export default App;
