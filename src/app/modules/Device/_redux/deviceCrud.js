import axios from "axios";

export const LOGIN_URL = "api/auth/login";
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";


// export const GET_GATEWAY_URL = 'http://127.0.0.1:8000/api/auth/devices'
// export const ADD_GATEWAY_URL = 'http://127.0.0.1:8000/api/auth/devices'
export const GET_GATEWAY_URL = 'http://api.monosens.com/api/auth/devices'
export const ADD_GATEWAY_URL = 'http://api.monosens.com/api/auth/devices'

export const ME_URL = "api/me";


export function getDeviceById(deviceId) {
  return axios.get(`${GET_GATEWAY_URL}/${deviceId}`);
}


export function deleteDevice(deviceId) {
  return axios.delete(`${GET_GATEWAY_URL}/${deviceId}`);
}






export function getUserByToken() {
  return axios.get(ME_URL);
}
export function get_all_devices() {

  return axios.get(GET_GATEWAY_URL);
  // return fetch(GET_GATEWAY_URL);
}

export function addDevice(data) {
  console.log('data', data);
  return axios.post(ADD_GATEWAY_URL, data)

}

export function editDevice(data, deviceId) {
  return axios.put(`${GET_GATEWAY_URL}/${deviceId}`, data);
}

