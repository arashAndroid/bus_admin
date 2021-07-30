import axios from "axios";
import config from "../../../../../config/config";

export const CAR_TYPE = config.baseUrl + 'carType';



export function getAllCarTypes() {
    return axios.get(CAR_TYPE);
}


export function deleteCarType(id) {
    return axios.delete(CAR_TYPE + '/' + id);
}

export function addCarType(data) {
    let body = {
        Title: data.Title,
        SeatCount: data.SeatCount,
        SeatRowCount: data.SeatRowCount,
        SeatColumnCount: data.SeatColumnCount
    }
    return axios.post(CAR_TYPE, body);
}

export function editCarType(data) {
    let body = {
        Title: data.Title,
        SeatCount: data.SeatCount,
        SeatRowCount: data.SeatRowCount,
        SeatColumnCount: data.SeatColumnCount

    }
    return axios.put(CAR_TYPE + '/' + data.Id, body);
}
