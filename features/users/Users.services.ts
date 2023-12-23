// Import local files
import axiosInstance from "@/@core/services";
import { MeResponseData } from "./Users.types";

const UsersUrl = {
  me: `/users/me`,
  listUsers: (controllerId: string) => `/users/${controllerId}`,
  createUser: (controllerId: string) => `/users/${controllerId}`,
  getUser: ({
    controllerId,
    userId,
  }: {
    controllerId: string;
    userId: string;
  }) => `/users/${controllerId}/${userId}`,
  updateUser: ({
    controllerId,
    userId,
  }: {
    controllerId: string;
    userId: string;
  }) => `/users/${controllerId}/${userId}`,
  deleteUser: ({
    controllerId,
    userId,
  }: {
    controllerId: string;
    userId: string;
  }) => `/users/${controllerId}/${userId}`,
  listPermissions: ({
    controllerId,
    userId,
  }: {
    controllerId: string;
    userId: string;
  }) => `/users/${controllerId}/${userId}/permissions`,
  addPermissions: ({
    controllerId,
    userId,
  }: {
    controllerId: string;
    userId: string;
  }) => `/users/${controllerId}/${userId}/permissions/add`,
  removePermissions: ({
    controllerId,
    userId,
  }: {
    controllerId: string;
    userId: string;
  }) => `/users/${controllerId}/${userId}/permissions/remove`,
};

export { UsersUrl };

const UsersService = {
  me: (): Promise<MeResponseData> => {
    return axiosInstance({
      method: "GET",
      url: UsersUrl.me,
    });
  },
};

export default UsersService;
