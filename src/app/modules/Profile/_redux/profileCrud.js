import axios from "axios";

export const LOGIN_URL = "api/auth/login";
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";
//PUT END POINTS HEARE
export const EDIT_PROFILE_URL = 'http://api.monosens.com/api/auth/user'
export const ME_URL = "http://api.monosens.com/api/auth/user";
// export const EDIT_PROFILE_URL = 'http://127.0.0.1:8000/api/auth/user'
// export const ME_URL = "http://127.0.0.1:8000/api/auth/user";




export function editProfile(data) {
  return axios.put(EDIT_PROFILE_URL, data);

}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}




