import axios from "axios";
import config from "../../../../../config/config";

// export const LOGIN_URL = "api/auth/login";
export const TRAVEL_DETAIL = config.baseUrl + "travelDetail";

export function getAllTravelDetails(tid) {
  return axios.get(TRAVEL_DETAIL + "/" + tid);
}

export function addTravelDetails(data, tid) {
  return axios.post(TRAVEL_DETAIL + "/" + tid, data);
}

export function editTravelDetails(data, tid) {
  return axios.put(TRAVEL_DETAIL + "/" + tid + "/" + data.id, data);
}

export function deleteTravelDetails(id, tid) {
  return axios.delete(TRAVEL_DETAIL + "/" + tid + "/" + id);
}
