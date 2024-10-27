import { createReducer } from "@reduxjs/toolkit";
import authLocalStorage from "helpers/authLocalStorage";
import authActions from "stores/actions/authAction";
import { BroadcastChannel } from 'broadcast-channel';
import { AUTH_BROAD_CAST } from "constants/broadcast";
const channel = new BroadcastChannel(AUTH_BROAD_CAST.channel);

const authReducer = createReducer({}, builder => {
  builder
    .addCase(authActions.login, (state, action) => {
      const { token, refreshToken, user } = action.payload ?? {};
      authLocalStorage.setAccessToken(token);
      authLocalStorage.setRefrestToken(refreshToken);
      authLocalStorage.setUser(user);
      channel.postMessage(AUTH_BROAD_CAST.login);
      return user;
    })
    .addCase(authActions.profile, (state, action) => {
      return action.payload;
    })
    .addCase(authActions.logout, () => {
      authLocalStorage.logout();
      channel.postMessage(AUTH_BROAD_CAST.logout);
      return {};
    });
});

export default authReducer;
