import authInstance from "apis/authInstance";
import nonAuthInstance from "apis/nonAuthInstance";

const getProfile = () => {
  return authInstance.get("/auth/profile");
};

const login = params => {
  return nonAuthInstance.post("/auth/login", params);
};

const register = params => nonAuthInstance.post("/auth/register", params);

const userService = { login, register, getProfile };
export default userService;
