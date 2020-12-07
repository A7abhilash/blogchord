import React from "react";

const BACKEND_URL = "http://localhost:7781";
function Navbar() {
  return (
    <nav className="nav navbar bg-dark border-bottom border-danger p-3">
      <h3>Blogchord</h3>
      <div className="ml-auto mr-2">
        <a
          role="button"
          href={`${BACKEND_URL}/auth/logout`}
          className="btn btn-danger"
        >
          Sign out
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
