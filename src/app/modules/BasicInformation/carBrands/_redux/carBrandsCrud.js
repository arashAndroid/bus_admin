import axios from "axios";
import config from "../../../../../config/config";

export const CAR_BRAND = config.baseUrl + 'carBrand';

export function getAllCarBrands() {
    return axios.get(CAR_BRAND);
}

export function deleteCarBrand(id) {

    return axios.delete(CAR_BRAND + '/' + id);
}

export function addCarBrand(data) {
    let body = {
        Title: data.Title
    }
    return axios.post(CAR_BRAND, body);
}

export function editCarBrand(data) {
    let body = {
        Title: data.Title,
    }
    return axios.put(CAR_BRAND + '/' + data.Id, body);
}
