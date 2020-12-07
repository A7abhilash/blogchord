import React from "react";

function UserProfile({ user }) {
  return (
    <>
      <img
        src={`${user.image}`}
        alt="profile"
        className="img-fluid mb-2 rounded-circle"
      />
      <h5>{user.displayName}</h5>
    </>
  );
}

export default UserProfile;
