import axios from "axios";


// export const GET_SENSOR_URL = 'http://127.0.0.1:8000/api/auth/sensors'
// export const ADD_SENSOR_URL = 'http://127.0.0.1:8000/api/auth/sensors'
export const GET_SENSOR_URL = 'http://api.monosens.com/api/auth/sensors'
export const ADD_SENSOR_URL = 'http://api.monosens.com/api/auth/sensors'


export function getSensorById(sensorId) {
  return axios.get(`${GET_SENSOR_URL}/${sensorId}`);
}

export function deleteSensor(sensorId) {
  return axios.delete(`${GET_SENSOR_URL}/${sensorId}`);
}

export function get_all_sensor(parent, parentId) {
  if (parent) {

    return axios.get(`${GET_SENSOR_URL}/${parent}/${parentId}`);

  } else {
    return axios.get(GET_SENSOR_URL);
  }
  // return fetch(GET_SENSOR_URL);
}
export function get_all_sensor_not_selected(parent, parentId) {
  return axios.get(`${GET_SENSOR_URL}/${parent}/${parentId}/notSelected`);
}



export function add_sensor(data) {
  console.log('data', data);
  return axios.post(ADD_SENSOR_URL, data)

}

export function editSensor(data, sensorId) {
  return axios.put(`${GET_SENSOR_URL}/${sensorId}`, data);
}

