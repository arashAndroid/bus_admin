import axios from "axios";
import config from "../../../../../config/config";
export const TRAVEL = config.baseUrl + 'travel';

export const ME_URL = "api/me";

export function getAllTravels(user) {
    return axios.get(TRAVEL);
}

export function addTravel(user, data) {
    return axios.post(TRAVEL, data);
}


export function deleteTravel(user, id) {

    return axios.delete(TRAVEL + '/' + id);
}


export function editTravel(user, data) {
    return axios.put(TRAVEL + '/' + data.id, data);
}

