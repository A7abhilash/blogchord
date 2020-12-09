import React, { useState } from "react";
import UserProfile from "../../containers/UserProfile";
import { useAuth } from "../../../contexts/AuthContext";
import SelectOptions from "./SelectOptions";
import { Link } from "react-router-dom";
import Card from "../../containers/Card";

function Dashboard() {
  const { user, allBlogs } = useAuth();
  const [selectedOption, setSelectedOption] = useState("all");
  const [displayBlogs, setDisplayBlogs] = useState(allBlogs);
  const [savedBlogs, setSavedBlogsBlogs] = useState([]);

  const setSelection = (id) => {
    setSelectedOption(id);

    switch (id) {
      case "all":
        return setDisplayBlogs(allBlogs);
      case "public":
        return setDisplayBlogs(
          allBlogs.filter((blog) => blog.status === "Public")
        );
      case "private":
        return setDisplayBlogs(
          allBlogs.filter((blog) => blog.status === "Private")
        );
      case "saved":
      default:
        return setDisplayBlogs(allBlogs);
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
        <div className="row">
          {displayBlogs &&
            (displayBlogs.length ? (
              displayBlogs.map((blog) => (
                <Card key={blog._id} blog={blog} access={true} />
              ))
            ) : (
              <p>You haven't posted any blog.</p>
            ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
