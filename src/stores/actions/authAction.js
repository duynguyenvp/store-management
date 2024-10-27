import { createAction } from "@reduxjs/toolkit";

const profile = createAction("AUTH/PROFILE");
const login = createAction("AUTH/LOGIN");
const logout = createAction("AUTH/LOGOUT");
const authActions = {
  login,
  logout,
  profile
};
export default authActions;
