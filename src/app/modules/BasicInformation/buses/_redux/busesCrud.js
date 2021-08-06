import axios from "axios";
import config from "../../../../../config/config";
export const BUS = config.baseUrl + "bus";

export const ME_URL = "api/me";

export function getAllBuses(user) {
  return axios.get(BUS);
}

export function addBus(data) {
  console.log(data);
  return axios.post(BUS, data);
}

export function deleteBus(id) {
  console.log("bus id remove crud: ", id);
  return axios.delete(BUS + "/" + id);
}

export function editBus(data) {
  return axios.put(BUS + "/" + data.id, data);
}
