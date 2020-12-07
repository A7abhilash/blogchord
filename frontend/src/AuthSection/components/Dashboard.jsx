import React from "react";
import UserProfile from "../containers/UserProfile";
import { useAuth } from "./../../contexts/AuthContext";

const BACKEND_URL = "http://localhost:7781";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="col-md-3 text-center border-right border-secondary">
      <UserProfile user={user} />
    </div>
  );
}

export default Dashboard;
