import axios from "axios";
import config from "../../../../../config/config";
export const BUSTYPE = config.baseUrl + 'busType';

export const ME_URL = "api/me";

export function getAllBusTypes(user) {
    return axios.get(BUSTYPE);
}

export function addBusType(user, data) {
    let body = {
        title: data.title
    }
    return axios.post(BUSTYPE, body);
}


export function deleteBusType(user, id) {

    return axios.delete(BUSTYPE + '/' + id);
}


export function editBusType(user, data) {
    let body = {
        title: data.title
    }
    return axios.put(BUSTYPE + '/' + data.id, body);
}

