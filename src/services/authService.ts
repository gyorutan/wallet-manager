import { LOGIN_API, LOGOUT_API, REGISTER_API } from "@/constants/api";
import { userLoginInfo, userRegisterInfo } from "@/types/authType";
import axios from "axios";

export const userRegister = async (userRegisterInfo: userRegisterInfo) => {
  const data = await axios
    .post(REGISTER_API, userRegisterInfo)
    .then((res) => res.data);
  console.log({ data });

  return data;
};

export const userLogin = async (userLoginInfo: userLoginInfo) => {
  const data = await axios
    .post(LOGIN_API, userLoginInfo)
    .then((res) => res.data);
  console.log({ data });

  return data;
};

export const userLogout = async () => {
  const data = await axios.get(LOGOUT_API).then((res) => res.data);

  console.log({ data });

  return data;
};
