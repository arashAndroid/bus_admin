import axios from "axios";
import config from "../../../../../config/config";
export const BUS = config.baseUrl + 'bus';

export const ME_URL = "api/me";

export function getAllBuses(user) {
    return axios.get(BUS);
}

export function addBus(user, data) {
    return axios.post(BUS, data);
}

export function deleteBus(user, id) {

    return axios.delete(BUS + '/' + id);
}

export function editBus(user, data) {
    return axios.put(BUS + '/' + data.id, data);
}

