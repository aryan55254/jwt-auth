import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // If there is no user object, redirect to the /login page
    return <Navigate to="/login" replace />;
  }

  // If there is a user, render the component that was passed as children
  return children;
};

export default ProtectedRoute;
//ok so authcontext is a basically an object that keeps a context of something like is user logged in , is user using dark mode and protcted routes use that to allow someone to see children compoenent if they are logged and example it can also be used as dark mode light mode switchher it can hold context of whether user want light mode over the pages or dark mode and acc to that components can do it , and what authprovider does it allows the user to change that context if no one is loggen in when user logs in they use authprovider to change that when they tap button of light mode dark mode they will have for example like bgprovider which they can use to change it
