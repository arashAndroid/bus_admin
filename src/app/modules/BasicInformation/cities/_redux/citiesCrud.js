import axios from "axios";
import config from "../../../../../config/config";
export const CITY = config.baseUrl + 'city';

export const ME_URL = "api/me";

export function getAllCities(user) {
    return axios.get(CITY);
}

export function addCity(user, data) {
    let body = {
        title: data.title
    }
    return axios.post(CITY, body);
}


export function deleteCity(user, id) {

    return axios.delete(CITY + '/' + id);
}


export function editCity(user, data) {
    let body = {
        title: data.title
    }
    return axios.put(CITY + '/' + data.id, body);
}

