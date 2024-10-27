import axios from "axios";
import authLocalStorage from "helpers/authLocalStorage";

const authInstance = axios.create({
  baseURL: import.meta.env.REACT_APP_API_URL ?? "http://localhost:5000"
});

authInstance.interceptors.request.use(request => {
  const accessToken = authLocalStorage.getAccessToken();

  if (accessToken) {
    request.headers.Authorization = accessToken;
  }

  return request;
});

let failedRequests = [];
let isTokenRefreshing = false;

authInstance.interceptors.response.use(
  response => response,
  async error => {
    const status = error.response?.status;
    const originalRequestConfig = error.config;

    if (status !== 401) {
      return Promise.reject(error);
    }

    if (isTokenRefreshing) {
      return new Promise((resolve, reject) => {
        failedRequests.push({
          resolve,
          reject,
          config: originalRequestConfig,
          error: error
        });
      });
    }

    isTokenRefreshing = true;

    try {
      const response = await authInstance.post("/auth/refresh", {
        refreshToken: authLocalStorage.getRefrestToken()
      });
      const { token = null } = response.data ?? {};

      if (!token) {
        throw new Error(
          "Something went wrong while refreshing your access token"
        );
      }

      authLocalStorage.setAccessToken(token);

      failedRequests.forEach(({ resolve, reject, config }) => {
        authInstance(config)
          .then(response => resolve(response))
          .catch(error => reject(error));
      });
    } catch (_error) {
      console.error(_error);
      failedRequests.forEach(({ reject, error }) => reject(error));

      authLocalStorage.logout();
      return Promise.reject(error);
    } finally {
      failedRequests = [];
      isTokenRefreshing = false;
    }

    return authInstance(originalRequestConfig);
  }
);

export default authInstance;
