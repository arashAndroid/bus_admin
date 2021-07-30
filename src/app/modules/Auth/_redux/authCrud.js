import axios from "axios";

// export const LOGIN_URL = "http://127.0.0.1:8000/api/auth/login";
// export const REGISTER_URL = "http://127.0.0.1:8000/api/auth/signup";
// export const ME_URL = "http://127.0.0.1:8000/api/auth/user";

export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";

export const LOGIN_URL = "http://api.monosens.com/api/auth/login";
export const REGISTER_URL = "http://api.monosens.com/api/auth/signup";
export const ME_URL = "http://api.monosens.com/api/auth/user";

export function login(email, password) {
  return axios.post(LOGIN_URL, { email, password });
}

export function register(email, first_name, last_name, phone, company_name, name, password, role) {
  return axios.post(REGISTER_URL, { email, first_name, last_name, phone, company_name, name, password, role });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}
