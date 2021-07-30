import axios from "axios";
import config from "../../../../../config/config";

// export const LOGIN_URL = "api/auth/login";
export const SERVANT = config.baseUrl + 'servant';
export const TOWNSHIP = config.baseUrl + 'township';

// export const REGISTER_URL = "api/auth/register";
// export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";


export function getAllServants() {
    return axios.get(SERVANT);
}
export function addServants(data) {
    let body = {
        FirstName: data.FirstName,
        EntityTypeId: 3,
        DocumentDes: 'profile',
        DocumentBase64: ' ',
        LastName: data.LastName,
        FatherName: data.FatherName,
        IdNumber: data.IdNumber,
        NationalCode: data.NationalCode,
        BirthDate: data.BirthDate,
        HealthLicenceNumber: data.HealthLicenceNumber,
        HealthLicenceExpireDate: data.HealthLicenceExpireDate,
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
    return axios.post(SERVANT, body);
}

export function editServants(data) {
    let body = {
        FirstName: data.FirstName,
        EntityTypeId: 3,
        DocumentDes: 'profile',
        DocumentBase64: ' ',
        LastName: data.LastName,
        FatherName: data.FatherName,
        IdNumber: data.IdNumber,
        NationalCode: data.NationalCode,
        BirthDate: data.BirthDate,
        HealthLicenceNumber: data.HealthLicenceNumber,
        HealthLicenceExpireDate: data.HealthLicenceExpireDate,
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
    return axios.put(SERVANT + '/' + data.Id, body);
}

export function deleteServants(id) {
    return axios.delete(SERVANT + '/' + id);
}


export function getTownships() {
    return axios.get(TOWNSHIP);
}

