// api/axiosClient.js
// import axios from 'axios';

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const sTag = "[AxiosClient]";

// Cai dat config mac dinh cho http request
// Tham khao: `https://github.com/axios/axios#request-config`
// de xem chi tiet
const axiosClient = axios.create({
  baseURL: "http://192.168.56.1:1234/api/v1",
  timeout: 100000,
  headers: { "content-type": "application/json" },
});

axiosClient.interceptors.request.use(async (config) => {
  console.log(
    `${sTag} - ${config.baseURL}${config.url}, ${config.method}, ${
      config.method === "post"
        ? JSON.stringify(config.data)
        : JSON.stringify(config.params)
    }`
  );
  console.log(`${sTag} - headers: ${JSON.stringify(config.headers.common)}`);
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    // if (response.headers['session-token'])
    //   axiosClient.defaults.headers.common['session-token'] = response.headers['session-token'];

    if (response && response.data) {
      //console.log(response);
      return response.data;
    }

    return response;
  },
  (error) => {
    console.log(`${sTag} - ${error}`);
    let errorMessage = null;
    const response = error.response;
    if (response && (response.status === 403 || response.status === 401)) {
      console.log("Error: ", response?.reason);
      return;
    }
    if (response && response.data) {
      const data = response.data;
      const { result, reason, detail } = data;
      if (result === "failed") {
        if (reason) {
          errorMessage = reason;
        } else if (detail) {
          errorMessage = detail;
        }
      }
    }
    if (errorMessage) {
      console.log(errorMessage);
    }
    throw error;
  }
);

// Update base url
const updateAxiosBaseURL = (baseUrl) => {
  axiosClient.defaults.baseURL = baseUrl;
};

// Update api key
const updateAxiosAcceptToken = (accessToken) => {
  axiosClient.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${accessToken}`;
};

// Remove accessToken
// const removeAxiosAccessToken = () => {
//   delete axiosClient.defaults.headers.common['accessToken'];
// };

(async () => {
  const isAccessTokenValid = true;
  if (isAccessTokenValid) {
    const accessToken = await AsyncStorage.getItem("accessToken");
    updateAxiosAcceptToken(accessToken);
  } else {
    // await UserHelper.signOut();
  }
})();

export { updateAxiosAcceptToken, updateAxiosBaseURL };

export default axiosClient;
