import axios from "axios";
import config from "../../../../config/config";

// export const LOGIN_URL = "api/auth/login";
export const TRAVEL = config.baseUrl + 'travel';
export const DRIVER = config.baseUrl + 'driver';
export const SERVANT = config.baseUrl + 'servant';
export const DIRECTION = config.baseUrl + 'direction';
export const CAR = config.baseUrl + 'car';

export function getAllTravels() {
    return axios.get(TRAVEL);
}


export function addTravels(data) {
    let body = {
        CarId: data.CarId,
        PrimaryDriverId: data.PrimaryDriverId,
        PrimaryServantId: data.PrimaryServantId,
        SecondaryDriverId: data.SecondaryDriverId,
        SecondaryServantId: data.SecondaryServantId,
        BasePrice: data.BasePrice,
        CarTypeId: data.CarTypeId,
        DepartureDatetime: data.DepartureDatetime,
        DirectionId: data.DirectionId,
        TravelStatus: data.TravelStatus,
    }
    return axios.post(TRAVEL, body);
}


export function editTravels(data) {
    let body = {
        CarId: data.CarId,
        PrimaryDriverId: data.PrimaryDriverId,
        PrimaryServantId: data.PrimaryServantId,
        SecondaryDriverId: data.SecondaryDriverId,
        SecondaryServantId: data.SecondaryServantId,
        BasePrice: data.BasePrice,
        CarTypeId: data.CarTypeId,
        DepartureDatetime: data.DepartureDatetime,
        DirectionId: data.DirectionId,
        TravelStatus: data.TravelStatus,
    }
    return axios.put(TRAVEL + '/' + data.Id, body);
}


export function deleteTravels(id) {
    return axios.delete(TRAVEL + '/' + id);
}
export function getServants() {
    return axios.get(SERVANT);
}

export function getDrivers() {
    return axios.get(DRIVER);
}
export function getDirections() {
    return axios.get(DIRECTION);
}
export function getCars() {
    return axios.get(CAR);
}

