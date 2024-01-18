import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "../store/authStore";
import { useUserStore } from "../store/userStore";
const baseUrl = "http://127.0.0.1:8000";

const logout = () => {
  useAuthStore.getState().logout();
  useUserStore.getState().logout();
  window.location.href = "/login";
};

export const axi = axios.create({
  baseURL: baseUrl,
});
export const authAxi = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

authAxi.interceptors.request.use(async (config) => {
  const accessToken = useAuthStore.getState().access;
  config.headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  

  const expiration = new Date(jwtDecode(accessToken).exp * 1000);
  const TenMinutes = 1000 * 60 * 10;
  const now = new Date();

  if (expiration.getTime() - now.getTime() < TenMinutes) {
    try {
      const newsToken = await axi.post("/users/token/refresh/", {
        refresh: useAuthStore.getState().refresh,
      });

      //set the new access and refresh token
      useAuthStore.getState().setTokens(newsToken.data.access, newsToken.data.refresh);
    } catch (error) {
      console.log(error);
      logout();
    }
  }

  return config;
});
