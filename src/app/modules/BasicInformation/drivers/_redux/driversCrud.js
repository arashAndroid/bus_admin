import axios from "axios";
import config from "../../../../../config/config";
export const DRIVER = config.baseUrl + 'DRIVER';

export const ME_URL = "api/me";

export function getAllDrivers(user) {
    return axios.get(DRIVER);
}

export function addDriver(user, data) {
    return axios.post(DRIVER, data);
}


export function deleteDriver(user, id) {

    return axios.delete(DRIVER + '/' + id);
}


export function editDriver(user, data) {
    return axios.put(DRIVER + '/' + data.id, data);
}

