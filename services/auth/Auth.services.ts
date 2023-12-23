// Import local files
import axiosInstance, { axiosDefault } from "@/@core/services";
import {
  LoginRequestData,
  LoginResponseData,
  LogoutResponseData,
} from "./Auth.types";
import qs from "qs";

const AuthUrl = {
  login: `/auth/login`,
  logout: `/auth/logout`,
};

export { AuthUrl };

const AuthService = {
  // Plain request, no token
  login: (
    data: LoginRequestData
  ): Promise<{
    data: LoginResponseData;
  }> => {
    return axiosDefault({
      method: "POST",
      url: AuthUrl.login,
      data: qs.stringify(data),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  },
  logout: (): Promise<{
    data: LogoutResponseData;
  }> => {
    return axiosInstance({
      method: "POST",
      url: AuthUrl.logout,
    });
  },
};

export default AuthService;
