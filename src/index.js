import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import Cookies from "universal-cookie";
import axios from "axios";

const cookies = new Cookies();

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const config = error.config;
    const errorState = error.response.status;
    if (errorState === 401 || errorState === 403) {
      const originalRequest = config;
      const accessToken = sessionStorage.getItem("UserToken");
      const refreshToken = await cookies.get("refresh_token");
      const {data} = await axios.post(`/api/auth/reissue`, {
        accessToken,
        refreshToken,
      });
      const {accessToken: newAccessToken, refreshToken: newRefreshToken} = data;
      sessionStorage.setItem("UserToken", newAccessToken);
      await cookies.set("refresh_token", newRefreshToken);
      axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);