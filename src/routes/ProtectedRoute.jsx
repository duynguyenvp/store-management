import authLocalStorage from "helpers/authLocalStorage";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const user = authLocalStorage.getUser();
  
  if (!user.username) {
    return <Navigate to="/auth/login" />;
  }
  return children;
};
