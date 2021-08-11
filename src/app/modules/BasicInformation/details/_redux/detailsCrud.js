import axios from "axios";
import config from "../../../../../config/config";

// export const LOGIN_URL = "api/auth/login";
export const DIRECTION_DETAIL = config.baseUrl + "directionDetail";

export function getAllDetails(did) {
  return axios.get(DIRECTION_DETAIL + "/" + did);
}

export function addDetails(data, did) {
  return axios.post(DIRECTION_DETAIL + "/" + did, data);
}

export function editDetails(data, did) {
  return axios.put(DIRECTION_DETAIL + "/" + did + "/" + data.id, data);
}

export function deleteDetails(id, did) {
  return axios.delete(DIRECTION_DETAIL + "/" + did + "/" + id);
}
