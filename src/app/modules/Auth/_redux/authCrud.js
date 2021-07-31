import axios from "axios";
import config from "../../../../config/config";

export const LOGIN_URL = config.baseUrl + "auth/signin";
export const REGISTER_URL = config.baseUrl + "auth/signup";
export const LOGIN_MOBILE_URL = config.baseUrl + "fast_login_with_mobile";
export const VERIFY_URL = config.baseUrl + "fast_user_verification";
export const REQUEST_PASSWORD_URL = config.baseUrl + "api/auth/forgot-password";

export const ME_URL = "api/me";

export function login(phone, password) {

  let intext = {
    username: phone,
    password: password
  }
  return axios.post(LOGIN_URL, intext);
}
export function loginWithMobile(username) {
  let intext = {
    mobile_number: username,
  }
  return axios.post(LOGIN_MOBILE_URL, { intext }
  );
}

export function register(intext) {
  return axios.post(REGISTER_URL, { intext });
}

export function verify(intext) {
  return axios.post(VERIFY_URL, { intext });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}
