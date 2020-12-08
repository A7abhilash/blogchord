import React from "react";
const BACKEND_URL = "http://localhost:7781";

function GuestSection() {
  return (
    <div className="col-md-4 text-center card bg-secondary p-0 mx-auto mt-5">
      <div className="card-header">
        <h4>Blogchord</h4>
      </div>
      <div className="card-content p-2">
        <h5>Welcome user!</h5>
        <a
          role="button"
          href={`${BACKEND_URL}/auth/google`}
          className="btn btn-sm btn-primary"
        >
          Sign in
        </a>
      </div>
    </div>
  );
}

export default GuestSection;
