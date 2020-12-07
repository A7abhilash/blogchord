import React from "react";
//css
import "./App.css";
//routes
import { BrowserRouter as Router } from "react-router-dom";
import { Switch } from "react-router";
import { useAuth } from "./contexts/AuthContext";
import AuthRoute from "./containers/AuthRoute";
import GuestRoute from "./containers/GuestRoute";
//components
import Loader from "./containers/Loader";
import Main from "./AuthSection/Main";
import GuestSection from "./GuestSection/GuestSection";
import Dashboard from "./AuthSection/components/Dashboard";
import Navbar from "./AuthSection/containers/Navbar";

function App() {
  const { user, loading } = useAuth();

  return loading ? (
    <Loader height="100" />
  ) : (
    <>
      {user && <Navbar />}
      <div className="container">
        <div className="row pt-4">
          <Router>
            <Switch>
              <AuthRoute exact path="/" component={Main} />
              <AuthRoute exact path="/dashboard" component={Dashboard} />
              <GuestRoute exact path="/home" component={GuestSection} />
            </Switch>
          </Router>
        </div>
      </div>
    </>
  );
}

export default App;
