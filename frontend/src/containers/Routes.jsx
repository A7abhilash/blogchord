import React from "react";
import { useLocation } from "react-router-dom";
import { Redirect, Route, Switch } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { AnimatePresence } from "framer-motion";
import Blog from "../AuthSection/components/blog/Blog";
import Edit from "../AuthSection/components/blog/Edit";
import Post from "../AuthSection/components/blog/Post";
import Dashboard from "../AuthSection/components/dashboard/Dashboard";
import Home from "../AuthSection/components/Home";
import ProfileVisit from "../AuthSection/components/user/ProfileVisit";
import GuestSection from "../GuestSection/GuestSection";
import AuthRoute from "./AuthRoute";
import Alert from "../AuthSection/components/alert/Alert";

function Routes() {
  const location = useLocation();
  const { user } = useAuth();
  return (
    <div className="container mt-3">
      {user && <Alert />}
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
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
      </AnimatePresence>
    </div>
  );
}

export default Routes;
