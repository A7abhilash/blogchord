import React, { useState } from "react";
import UserProfile from "../../containers/UserProfile";
import { useAuth } from "../../../contexts/AuthContext";
import SelectOptions from "./SelectOptions";
import { Link } from "react-router-dom";

function Dashboard() {
  const { user } = useAuth();
  const [selectedOption, setSelectedOption] = useState("all");
  const [displayBlogs, setDisplayBlogsBlogs] = useState({});

  const setSelection = (id) => {
    setSelectedOption(id);
  };

  const switchOptions = (id) => {
    switch (id) {
      case "all":
      case "public":
      case "private":
      case "saved":
      default:
    }
  };

  return (
    <>
      <div className="col-md-3 border-right border-secondary">
        <UserProfile user={user} />
      </div>
      <div className="col-md-8 mx-auto">
        <div className="d-flex align-items-center my-2">
          <h4>Your Blogs</h4>
          <Link to="/post" className="btn btn-sm btn-info ml-auto pb-0">
            <h6>Post a blog</h6>
          </Link>
        </div>
        <SelectOptions
          selectOptions={setSelection}
          selectedOption={selectedOption}
        />
      </div>
    </>
  );
}

export default Dashboard;
