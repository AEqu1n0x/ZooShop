import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";

export const registration = async (email, phone, name, surname, password) => {
  const { data } = await $host.post("api/user/registration", { email, phone, name, surname, password });
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};

export const Login = async (login, password) => {
  const { data } = await $host.post("api/user/login", { login, password });
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};

export const check = async () => {
  const { data } = await $authHost.get("api/user/auth");
  localStorage.setItem("token", data.token);
  const decoded = jwtDecode(data.token);
  return {
    ...decoded,
    isAuth: true,
  };
};

export const getUserCabinet = async () => {
  const { data } = await $authHost.get("api/user/cabinet");
  return data;
};

export const getUserOrders = async () => {
  const { data } = await $authHost.get("api/order/order");
  return data;
};

export const fetchAllUsers = async () => {
  const { data } = await $authHost.get("api/user/getUsers");
  return data;
};