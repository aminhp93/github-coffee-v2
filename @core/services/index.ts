// ** Axios
import axios from "axios";
import qs from "qs";

// ** Config
import { STORAGE_TOKEN_KEY_NAME } from "@/features/auth/Auth.constants";
// import AuthService from "@/features/auth/Auth.services";

const axiosDefault = axios.create({
  baseURL: getBaseUrlAndPort(),
});

export { axiosDefault };

type CbType = (token: string) => void;

export function getBaseUrlAndPort() {
  if (process.env.NEXT_PUBLIC_WEBPMP_V5_BASE_URL) {
    return process.env.NEXT_PUBLIC_WEBPMP_V5_BASE_URL + "/api/v1/";
  }

  // const protocol = "http:"; // "http:" or "https:"
  // let host = "";
  // if (typeof window !== "undefined") {
  //   host = window.location.hostname;
  // }
  // const port = 8888; // Port number of the current web page
  // const baseUrl = `${protocol}//${host}:${port}/api/v1`;

  // return baseUrl;
  return "/";
}

function subscribeTokenRefresh(cb: CbType) {
  refreshSubscribers.push(cb);
}

// function onRrefreshed(token: string) {
//   refreshSubscribers.map((cb: CbType) => cb(token));
// }

let isRefreshing = false;
const refreshSubscribers: CbType[] = [];

const axiosInstance = axios.create({
  headers: { "Content-Type": "application/json" },
  paramsSerializer: {
    serialize: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
  },
  baseURL: getBaseUrlAndPort(),
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = window.localStorage.getItem(STORAGE_TOKEN_KEY_NAME);
    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  async function (error) {
    console.log(error);

    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.detail === "Token has expired"
    ) {
      const { config } = error;
      const originalRequest = config;

      if (!isRefreshing) {
        isRefreshing = true;

        // const refreshToken = window.localStorage.getItem(
        //   authConfig.refreshTokenKeyName
        // );
        // if (refreshToken) {
        // AuthService.getRefreshToken({ refreshToken })
        //   .then((res) => {
        //     window.localStorage.setItem(
        //       authConfig.storageTokenKeyName,
        //       res.data.accessToken
        //     );
        //     window.localStorage.setItem(
        //       authConfig.refreshTokenKeyName,
        //       res.data.refreshToken
        //     );
        //     isRefreshing = false;
        //     onRrefreshed(res.data.accessToken);
        //   })
        //   .catch((err) => {
        //     if (
        //       err.response &&
        //       err.response.status === 401 &&
        //       err.response.data.detail === "Token has expired"
        //     ) {
        //       window.localStorage.removeItem(authConfig.storageTokenKeyName);
        //       window.localStorage.removeItem(authConfig.refreshTokenKeyName);
        //       window.localStorage.removeItem("userData");
        //       // redirect to login page
        //       window.location.href = "/login";
        //     }
        //     console.log(err);
        //   });
      }
      // }

      const retryOrigReq = new Promise((resolve) => {
        subscribeTokenRefresh((token: string) => {
          // // replace the expired token and retry
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: "Bearer " + token,
          };
          console.log("retry", token);
          const refreshAxios = axios.create();

          // Add a response interceptor
          refreshAxios.interceptors.response.use(
            function (response) {
              // Any status code that lie within the range of 2xx cause this function to trigger
              // Do something with response data
              return response.data;
            },
            function (error) {
              // Any status codes that falls outside the range of 2xx cause this function to trigger
              // Do something with response error
              return Promise.reject(error);
            }
          );

          resolve(refreshAxios(originalRequest));
        });
      });

      return retryOrigReq;
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosInstance;
