import axios from "axios";
import config from "../../../../../config/config";

// export const LOGIN_URL = "api/auth/login";
export const DRIVER = config.baseUrl + 'driver';
export const TOWNSHIP = config.baseUrl + 'township';

// export const REGISTER_URL = "api/auth/register";
// export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";


export function getAllDrivers() {
    return axios.get(DRIVER);
}
export function addDrivers(data) {
    let body = {
        FirstName: data.FirstName,
        LastName: data.LastName,
        FatherName: data.FatherName,
        IdNumber: data.IdNumber,
        NationalCode: data.NationalCode,
        BirthDate: data.BirthDate,
        DrivingLicenceNumber: data.DrivingLicenceNumber,
        DrivingLicenceExpireDate: data.DrivingLicenceExpireDate,
        SmartCardNumber: data.SmartCardNumber,
        SmartCardExpireDate: data.SmartCardExpireDate,
        IsActive: data.IsActive,
        IsVerified: data.IsVerified,
        Mobile: data.Mobile,
        Tell: data.Tell,
        TownshipId: data.TownshipId,
        Address: data.Address,
        PostalCode: data.PostalCode,
        Username: data.Username,
        Password: data.Password,
    }
    return axios.post(DRIVER, body);
}

export function editDrivers(data) {
    let body = {
        FirstName: data.FirstName,
        LastName: data.LastName,
        FatherName: data.FatherName,
        IdNumber: data.IdNumber,
        NationalCode: data.NationalCode,
        BirthDate: data.BirthDate,
        DrivingLicenceNumber: data.DrivingLicenceNumber,
        DrivingLicenceExpireDate: data.DrivingLicenceExpireDate,
        SmartCardNumber: data.SmartCardNumber,
        SmartCardExpireDate: data.SmartCardExpireDate,
        IsActive: data.IsActive,
        IsVerified: data.IsVerified,
        Mobile: data.Mobile,
        Tell: data.Tell,
        TownshipId: data.TownshipId,
        Address: data.Address,
        PostalCode: data.PostalCode,
        Username: data.Username,
    }
    if (data.password) {
        body.Password = data.password;
    }
    return axios.put(DRIVER + '/' + data.Id, body);
}

export function deleteDrivers(id) {
    return axios.delete(DRIVER + '/' + id);
}


export function getTownships() {
    return axios.get(TOWNSHIP);
}

