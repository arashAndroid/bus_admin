import axios from "axios";
import config from "../../../../../config/config";
export const TRAVEL = config.baseUrl + "travel";

export const ME_URL = "api/me";

export function getAllTravels(user) {
  return axios.get(TRAVEL);
}

export function addTravel(data) {
  console.log(data);
  return axios.post(TRAVEL, data);
}

export function deleteTravel(id) {
  console.log("travel id remove crud: ", id);
  return axios.delete(TRAVEL + "/" + id);
}

export function editTravel(data) {
  return axios.put(TRAVEL + "/" + data.id, data);
}
