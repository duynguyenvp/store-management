import React, { useLayoutEffect } from "react";
import authLocalStorage from "helpers/authLocalStorage";
import responseExtractor from "helpers/responseExtractor";
import { useDispatch } from "react-redux";
import userService from "services/user";
import authActions from "stores/actions/authAction";

const useAuthentication = () => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    async function getProfileFunc() {
      const token = authLocalStorage.getAccessToken();
      if (token) {
        try {
          const response = await userService.getProfile();
          const { isSuccess, data, errorMessage } =
            responseExtractor.extract(response);
          if (isSuccess) {
            dispatch(authActions.profile(data));
          } else {
            console.error(errorMessage);
          }
        } catch (error) {
          console.error(error.message);
        }
      }
    }
    getProfileFunc();
  }, []);
};

export default useAuthentication;
