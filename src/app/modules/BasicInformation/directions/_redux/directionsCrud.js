import axios from "axios";
import config from "../../../../../config/config";

export const TOWNSHIP = config.baseUrl + 'township';
export const DIRECTION = config.baseUrl + 'direction';




export function getAllDirections() {
    return axios.get(DIRECTION);
}

export function getTownships() {
    return axios.get(TOWNSHIP);
}



export function addDirections(data) {
    let body = {
        SourceTownshipId: data.SourceTownshipId,
        DestTownshipId: data.DestTownshipId,
        DurationOverDistance: data.DurationOverDistance,
        Distance: data.Distance,
        IsActive: data.IsActive,


    }
    return axios.post(DIRECTION, body);
}

export function editDirections(data) {
    let body = {
        SourceTownshipId: data.SourceTownshipId,
        DestTownshipId: data.DestTownshipId,
        DurationOverDistance: data.DurationOverDistance,
        Distance: data.Distance,
        IsActive: data.IsActive,


    }
    return axios.put(DIRECTION + '/' + data.Id, body);
}

export function deleteDirections(id) {

    return axios.delete(DIRECTION + '/' + id);
}
