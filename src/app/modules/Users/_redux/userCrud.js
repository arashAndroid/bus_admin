import axios from "axios";

export const LOGIN_URL = "api/auth/login";
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";
//PUT END POINTS HERE
export const GET_USERS_URL = 'http://api.monosens.com/api/auth/allUsers'
// export const GET_USERS_URL = 'http://127.0.0.1:8000/api/auth/allUsers'
export const ME_URL = "api/me";



export function get_all_users() {

  return axios.get(GET_USERS_URL);
}

