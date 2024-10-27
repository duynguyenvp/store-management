import authLocalStorage from "helpers/authLocalStorage";
import { Navigate } from "react-router-dom";

export const UnProtectedRoute = ({ children }) => {
  const user = authLocalStorage.getUser();
  
  if (user.username) {
    return <Navigate to="/" />;
  }
  return children;
};
