import axios from "axios";
import config from "../../../../../config/config";

export const DIRECTION = config.baseUrl + "direction";

export function getAllDirections() {
  return axios.get(DIRECTION);
}

export function addDirections(data) {
  return axios.post(DIRECTION, data);
}

export function editDirections(data) {
  return axios.put(DIRECTION + "/" + data.id, data);
}

export function deleteDirections(id) {
  return axios.delete(DIRECTION + "/" + id);
}
