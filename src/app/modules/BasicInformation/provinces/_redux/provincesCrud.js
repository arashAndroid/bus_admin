import axios from "axios";
import config from "../../../../../config/config";

// export const LOGIN_URL = "api/auth/login";
export const PROVINCE = config.baseUrl + 'Province';
export const COUNTRY = config.baseUrl + 'country';



// export const REGISTER_URL = "api/auth/register";
// export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";


export function getAllProvinces(user) {
    return axios.get(PROVINCE);
}



export function getCountries() {
    return axios.get(COUNTRY);
}


export function addProvince(data) {
    let body = {
        CountryId: data.CountryId,
        Title: data.Title,
        // area_code: data.area_code,
        IsActive: data.IsActive,
        Lat: data.Lat,
        Lon: data.Lon
    }
    return axios.post(PROVINCE, body);
}


export function deleteProvince(id) {
    return axios.delete(PROVINCE + '/' + id);
}


export function editProvince(data) {
    let body = {
        CountryId: data.CountryId,
        Title: data.Title,
        // area_code: data.area_code,
        IsActive: data.IsActive,
        Lat: data.Lat,
        Lon: data.Lon
    };
    return axios.put(PROVINCE + '/' + data.Id, body);
}

