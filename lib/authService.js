import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "http://localhost:5000/api";

export const login = async (email, password) => {
  const response = await axios.post(
    `${API_URL}/users/login`,
    { email, password },
    { withCredentials: true }
  );
  return response.data;
};

export const fetchProtectedData = async () => {
  const response = await axios.get(`${API_URL}/products`, {
    withCredentials: true,
  });
  return response.data;
};

export const setToken = (token) => {
  Cookies.set("access_token", token);
};

export const getToken = () => {
  return Cookies.get("access_token");
};

export const removeToken = () => {
  Cookies.remove("access_token");
};
