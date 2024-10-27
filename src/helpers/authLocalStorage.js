const getRefrestToken = () => {
  return localStorage.getItem("refreshToken") ?? "";
};

const setRefrestToken = token => {
  return localStorage.setItem("refreshToken", token);
};

const getAccessToken = () => {
  return localStorage.getItem("accessToken") ?? "";
};

const setAccessToken = token => {
  return localStorage.setItem("accessToken", token);
};
const getUser = () => {
  return JSON.parse(localStorage.getItem("user") ?? "{}");
};

const setUser = user => {
  return localStorage.setItem("user", JSON.stringify(user));
};

const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
};

const authLocalStorage = {
  getAccessToken,
  setAccessToken,
  getRefrestToken,
  setRefrestToken,
  getUser,
  setUser,
  logout
};

export default authLocalStorage;
