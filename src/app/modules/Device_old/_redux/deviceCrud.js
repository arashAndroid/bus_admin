import axios from "axios";

export const LOGIN_URL = "api/auth/login";
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";
//PUT END POINTS HEARE
export const GET_DEVICE_URL = 'http://api.monosens.com/api/devices'
export const ADD_DEVICE_URL = 'http://api.monosens.com/api/devices'
export const ME_URL = "api/me";

export function login(email, password) {
  return axios.post(LOGIN_URL, { email, password });
}

export function getDeviceById(deviceId) {
  return axios.get(`${GET_DEVICE_URL}/${deviceId}`);
}


export function deleteDevice(deviceId) {
  return axios.delete(`${GET_DEVICE_URL}/${deviceId}`);
}


export function register(email, fullname, username, password) {
  return axios.post(REGISTER_URL, { email, fullname, username, password });
}




export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  return axios.get(ME_URL);
}
export function get_all_dev() {

  return axios.get(GET_DEVICE_URL);
  // return fetch(GET_DEVICE_URL);
}

export function add_dev(data) {
  console.log('data', data);
  return axios.post(ADD_DEVICE_URL, data)

}

export function editDevice(data, deviceId) {
  return axios.put(`${GET_DEVICE_URL}/${deviceId}`, data);
}

export function get_devices() {

  return new Promise(function (resolve, reject) {
    resolve([


      {
        "id": 2,
        "description": "This is a BS Sensor",
        "title": "My BS Sensor",
        "img": "dcard__image--flowers",
        "sensor_name": "BS Sensor",
        "sensor_password": "123456",
        "wifi_name": "BS Wifi",
        "wifi_password": "123456",
        "domain_name": "my-domain.com",
        "time_delay": "5 seconds",
        "data_link": "data-link",
        "filter": 3,
        "run": 2,
        "fifo": 3,
        "acceleromter": 65,
        "self": 22,
        "axis": 34,
        "acc_bandwidth": 21,
        "device_code": 123,
        "sensor_code": 435,
        "device_app": "device-app",
        "location": "Zanjan",
        "ip": "58.32.14.16",
        "sim": "sim",
        "created_at": "2020-11-18T05:47:43.000000Z",
        "updated_at": "2020-11-18T05:47:43.000000Z"
      },

      {
        "id": 2,
        "description": "This is a BS Sensor",
        "title": "My BS Sensor",
        "img": "dcard__image--flowers",
        "sensor_name": "BS Sensor",
        "sensor_password": "123456",
        "wifi_name": "BS Wifi",
        "wifi_password": "123456",
        "domain_name": "my-domain.com",
        "time_delay": "5 seconds",
        "data_link": "data-link",
        "filter": 3,
        "run": 2,
        "fifo": 3,
        "acceleromter": 65,
        "self": 22,
        "axis": 34,
        "acc_bandwidth": 21,
        "device_code": 123,
        "sensor_code": 435,
        "device_app": "device-app",
        "location": "Zanjan",
        "ip": "58.32.14.16",
        "sim": "sim",
        "created_at": "2020-11-18T05:47:43.000000Z",
        "updated_at": "2020-11-18T05:47:43.000000Z"
      },


      {
        "id": 2,
        "description": "This is a BS Sensor",
        "title": "My BS Sensor",
        "img": "dcard__image--flowers",
        "sensor_name": "BS Sensor",
        "sensor_password": "123456",
        "wifi_name": "BS Wifi",
        "wifi_password": "123456",
        "domain_name": "my-domain.com",
        "time_delay": "5 seconds",
        "data_link": "data-link",
        "filter": 3,
        "run": 2,
        "fifo": 3,
        "acceleromter": 65,
        "self": 22,
        "axis": 34,
        "acc_bandwidth": 21,
        "device_code": 123,
        "sensor_code": 435,
        "device_app": "device-app",
        "location": "Zanjan",
        "ip": "58.32.14.16",
        "sim": "sim",
        "created_at": "2020-11-18T05:47:43.000000Z",
        "updated_at": "2020-11-18T05:47:43.000000Z"
      },


      {
        "id": 2,
        "description": "This is a BS Sensor",
        "title": "My BS Sensor",
        "img": "dcard__image--flowers",
        "sensor_name": "BS Sensor",
        "sensor_password": "123456",
        "wifi_name": "BS Wifi",
        "wifi_password": "123456",
        "domain_name": "my-domain.com",
        "time_delay": "5 seconds",
        "data_link": "data-link",
        "filter": 3,
        "run": 2,
        "fifo": 3,
        "acceleromter": 65,
        "self": 22,
        "axis": 34,
        "acc_bandwidth": 21,
        "device_code": 123,
        "sensor_code": 435,
        "device_app": "device-app",
        "location": "Zanjan",
        "ip": "58.32.14.16",
        "sim": "sim",
        "created_at": "2020-11-18T05:47:43.000000Z",
        "updated_at": "2020-11-18T05:47:43.000000Z"
      }



    ])
  })
}

