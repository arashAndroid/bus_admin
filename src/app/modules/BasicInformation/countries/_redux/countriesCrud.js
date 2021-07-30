import axios from "axios";
import config from "../../../../../config/config";
export const COUNTRY = config.baseUrl + 'country';

export const ME_URL = "api/me";

export function getAllCountries(user) {
    return axios.get(COUNTRY);
}

export function addCountry(user, data) {
    let body = {
        Title: data.Title
    }
    return axios.post(COUNTRY, body);
}


export function deleteCountry(user, id) {

    return axios.delete(COUNTRY + '/' + id);
}


export function editCountry(user, data) {
    let body = {
        Title: data.Title
    }
    return axios.put(COUNTRY + '/' + data.Id, body);
}

