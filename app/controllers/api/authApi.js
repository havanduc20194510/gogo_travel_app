
import env from "../../env.json";
import { axiosSendRequest } from "../axios/axiosSendRequet";

const authApi = {
  // sign in
  signIn: async (params, accessToken) => {
    const url = "/account/login";
    return await axiosSendRequest("post", env.dev.mdsHost.concat(url), params, {
      Authorization: `Bearer ${accessToken}`,
    });
  },
  register: async (params) => {
    const url = "/account/register-student";
    return await axiosSendRequest(
      "post",
      env.dev.mdsHost.concat(url),
      params,
      {}
    );
  },

  // get current account info
  getCurrentUserInfo: async () => {
    const url = "/account/profile";
    return await axiosSendRequest(
      "get",
      env.dev.mdsHost.concat(url),
      {},
      {
        Authorization: `Bearer ${accessToken}`,
      }
    );
  },

  // sign up
  signUp: async (params, accessToken) => {
    const url = "/account/register";
    return await axiosSendRequest("post", env.dev.mdsHost.concat(url), params, {
      Authorization: `Bearer ${accessToken}`,
    });
  },

  // sign out
  signOut: async (params, accessToken) => {
    const url = "/account/signOut";
    return await axiosSendRequest("post", env.dev.mdsHost.concat(url), params, {
      Authorization: `Bearer ${accessToken}`,
    });
  },

  /**
   * Doi mat khau
   * @param {string} oldPassword mat khau cu
   * @param {string} newPassword mat khau moi
   */
  changePassword: async (oldPassword, newPassword, accessToken) => {
    const url = "/account/change-password";
    return await axiosSendRequest(
      "post",
      env.dev.mdsHost.concat(url),
      {
        oldPassword: oldPassword,
        newPassword: newPassword,
      },
      {
        Authorization: `Bearer ${accessToken}`,
      }
    );
  },

  registerBiometric: async (
    { privateKeyBiometrics, publicKeyBiometrics, signature },
    accessToken
  ) => {
    const url = "/account/register-biometric";
    return await axiosSendRequest(
      "put",
      env.dev.mdsHost.concat(url),
      {
        privateKeyBiometrics,
        publicKeyBiometrics,
        signature,
      },
      {
        Authorization: `Bearer ${accessToken}`,
      }
    );
  },

  loginBiometric: async ({ signature, payload, accountId }, accessToken) => {
    const url = "/account/login-biometric";
    return await axiosSendRequest(
      "put",
      env.dev.mdsHost.concat(url),
      { signature, payload, accountId },
      {
        Authorization: `Bearer ${accessToken}`,
      }
    );
  },

  /**
   * Gui yc dat lai mat khau
   * @param {string} email email
   */
  requestResetPassword: async (email, accessToken) => {
    const url = "/account/request-reset-password";
    return await axiosSendRequest(
      "post",
      env.dev.mdsHost.concat(url),
      { email: email },
      {
        Authorization: `Bearer ${accessToken}`,
      }
    );
  },

  /**
   * Dat lai mat khau
   * @param {string} email email
   * @param {string} code sha256 ma dat lai mat khau
   * @param {string} newPassword mat khau moi
   * @returns
   */
  resetPassword: async (email, code, newPassword, accessToken) => {
    const url = "/account/reset-password";
    return await axiosSendRequest(
      "post",
      env.dev.mdsHost.concat(url),
      { email, code, newPassword },
      {
        Authorization: `Bearer ${accessToken}`,
      }
    );
  },

  updateProfile: async (params, accessToken) => {
    const url = "/account/update-profile";
    return await axiosSendRequest("put", env.dev.mdsHost.concat(url), params, {
      Authorization: `Bearer ${accessToken}`,
    });
  },
};

export default authApi;
