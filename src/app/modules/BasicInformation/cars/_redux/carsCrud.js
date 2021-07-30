import axios from "axios";
import config from "../../../../../config/config";

// export const LOGIN_URL = "api/auth/login";
export const CAR = config.baseUrl + 'car';
export const CAR_TYPE = config.baseUrl + 'carType';
export const CAR_BRAND = config.baseUrl + 'carBrand';



export function getAllCars() {
    return axios.get(CAR);
}


export function addCars(data) {
    console.log("addCars body = ", data);
    let body = {
        CarTypeId: data.CarTypeId,
        CarBrandId: data.CarBrandId,
        PlateSeries: data.PlateSeries,
        PlateNumber: data.PlateNumber,
        CarCode: data.CarCode,
        SmartCardNumber: data.SmartCardNumber,
        SmartCardExpireDate: data.expire,
    }
    return axios.post(CAR, body);
}
export function editCars(data) {
    let body = {
        CarTypeId: data.CarTypeId,
        CarBrandId: data.CarBrandId,
        PlateSeries: data.PlateSeries,
        PlateNumber: data.PlateNumber,
        CarCode: data.CarCode,
        SmartCardNumber: data.SmartCardNumber,
        SmartCardExpireDate: data.expire,
    }
    return axios.put(CAR + '/' + data.Id, body);
}

export function deleteCars(id) {

    return axios.delete(CAR + '/' + id);
}




export function getCarTypes() {
    return axios.get(CAR_TYPE);
}

export function getCarBrands() {
    return axios.get(CAR_BRAND);
}
