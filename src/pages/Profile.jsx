import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";
import { Context } from "../main";

const Profile = () => {
  const { user, isLoading, isAuthenticated } = useContext(Context);
  console.log(user);

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <h1>Your Profile</h1>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
};

export default Profile;
