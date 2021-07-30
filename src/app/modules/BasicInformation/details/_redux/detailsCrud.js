import axios from "axios";
import config from "../../../../../config/config";

// export const LOGIN_URL = "api/auth/login";
export const DIRECTION_DETAIL = config.baseUrl + 'directionDetail';
export const STATION = config.baseUrl + 'station';




export function getAllDetails(did) {
    return axios.get(DIRECTION_DETAIL + '/' + did);
}

export function addDetails(data, did) {
    let body = {
        StationId: data.StationId,
        StationOrder: data.StationOrder,
        Duration: data.Duration,
        DistanceFromSource: data.DistanceFromSource,
        DirectionId: data.DirectionId,
        Factor: data.Factor,


    }
    return axios.post(DIRECTION_DETAIL + '/' + did, body);
}

export function editDetails(data, did) {
    let body = {
        StationId: data.StationId,
        StationOrder: data.StationOrder,
        Duration: data.Duration,
        DistanceFromSource: data.DistanceFromSource,
        DirectionId: data.DirectionId,
        Factor: data.Factor,
    }
    return axios.put(DIRECTION_DETAIL + '/' + did + '/' + data.Id, body);
}

export function deleteDetails(id, did) {
    return axios.delete(DIRECTION_DETAIL + '/' + did + '/' + id);
}



export function getStations() {
    return axios.get(STATION);
}