import React from "react";
//css
import "./App.css";
//routes
import { BrowserRouter as Router } from "react-router-dom";
import { Redirect, Route, Switch } from "react-router";
import { useAuth } from "./contexts/AuthContext";
import AuthRoute from "./containers/AuthRoute";
import GuestRoute from "./containers/GuestRoute";
//components
import Loader from "./containers/Loader";
import Home from "./AuthSection/components/Home";
import GuestSection from "./GuestSection/GuestSection";
import Dashboard from "./AuthSection/components/dashboard/Dashboard";
import Navbar from "./AuthSection/containers/Navbar";
import Post from "./AuthSection/components/blog/Post";
import Edit from "./AuthSection/components/blog/Edit";
import Blog from "./AuthSection/components/blog/Blog";
import ProfileVisit from "./AuthSection/components/user/ProfileVisit";

function App() {
  const { user, loading } = useAuth();

  return loading ? (
    <Loader height="100" />
  ) : (
    <>
      <Router>
        <Navbar />
        <div className="container">
          <div className="row pt-4">
            <Switch>
              {/* <AuthRoute exact path="/" component={Home} />
              <GuestRoute exact path="/home" component={GuestSection} /> */}
              <Route exact path="/">
                {user ? <Home /> : <GuestSection />}
              </Route>
              <AuthRoute exact path="/dashboard" component={Dashboard} />
              <AuthRoute exact path="/post" component={Post} />
              <AuthRoute exact path="/edit/:id" component={Edit} />
              <AuthRoute exact path="/read/:id" component={Blog} />
              <AuthRoute exact path="/user/:userId" component={ProfileVisit} />
              <Redirect from="*" to="/" />
            </Switch>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
