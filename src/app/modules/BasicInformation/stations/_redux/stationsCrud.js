import axios from "axios";
import config from "../../../../../config/config";

// export const LOGIN_URL = "api/auth/login";
export const STATION = config.baseUrl + 'station';

export const TOWNSHIP = config.baseUrl + 'township';



export function getAllStations() {
    return axios.get(STATION);
}

export function getTownships() {
    return axios.get(TOWNSHIP);
}

export function addStations(data) {
    let body = {
        TownshipId: data.TownshipId,
        Title: data.Title,
        StationCode: data.StationCode,
        Lon: data.Lon,
        Lat: data.Lat,
        IsMidway: data.IsMidway,
        IsActive: data.IsActive,
        Description: data.Description


    }
    return axios.post(STATION, body);
}

export function editStations(data) {
    let body = {
        TownshipId: data.TownshipId,
        Title: data.Title,
        StationCode: data.StationCode,
        Lon: data.Lon,
        Lat: data.Lat,
        IsMidway: data.IsMidway,
        IsActive: data.IsActive,
        Description: data.Description


    }
    return axios.put(STATION + '/' + data.Id, body);
}

export function deleteStations(id) {
    return axios.delete(STATION + '/' + id);
}
