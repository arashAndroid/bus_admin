import axios from "axios";
import config from "../../../../../config/config";

// export const LOGIN_URL = "api/auth/login";
export const TOWNSHIP = config.baseUrl + 'township';
export const PROVINCE = config.baseUrl + 'Province';

// export const REGISTER_URL = "api/auth/register";
// export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";


export function getAllTownships() {
    return axios.get(TOWNSHIP);
}

export function getProvinces() {
    return axios.get(PROVINCE,);
}

export function addTownship(data) {
    console.log('addTownshippppppp data = ', data);
    let body = {
        ProvinceId: data.ProvinceId,
        Title: data.Title,
        IsCapital: data.IsCapital,
        IsActive: data.IsActive,
        Lat: data.Lat,
        Lon: data.Lon
    }
    return axios.post(TOWNSHIP, body);
}


export function deleteTownship(id) {

    return axios.delete(TOWNSHIP + '/' + id);
}


export function editTownship(data) {
    console.log('editTownship data = ', data);

    let body = {
        ProvinceId: data.ProvinceId,
        Title: data.Title,
        IsCapital: data.IsCapital,
        IsActive: data.IsActive,
        Lat: data.Lat,
        Lon: data.Lon

    }
    return axios.put(TOWNSHIP + '/' + data.Id, body);
}

