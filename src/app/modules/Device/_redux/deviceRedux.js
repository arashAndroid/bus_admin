import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import { getUserByToken } from "./deviceCrud";

export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",
  Register: "[Register] Action",
  UserRequested: "[Request User] Action",
  UserLoaded: "[Load User] Auth API",
  DevicesLoaded: "[device] DevicesLoaded  Action",
  AddDevice: "[device] AddDevice Action",
  HandleVar: "[device] HandleVar Action"


};

const initialState = {
  user: undefined,
  authToken: undefined,
  devices: [],
  is_devices_loaded: 0,
  name: '',
  model: '',
  production_year: '',
  production_series: '',
  manufacturer: '',
  brand: ''

};

export const reducer = persistReducer(
  { storage, key: "v705-demo1-auth", whitelist: ["user", "authToken"] },
  (state = initialState, action) => {
    switch (action.type) {

      case actionTypes.HandleVar: {

        switch (action.name) {
          case 'name':
            console.log("name :::::", action.value)
            return {
              ...state,
              sensor_name: action.value,
            };
          case 'model':
            return {
              ...state,
              model: action.value,
            };

          case 'production_year':
            return {
              ...state,
              production_year: action.value,
            };

          case 'production_series':
            return {
              ...state,
              production_series: action.value,
            };

          case 'manufacturer':
            return {
              ...state,
              manufacturer: action.value,
            };

          case 'brand':
            return {
              ...state,
              brand: action.value,
            };



        }
      }

      case actionTypes.DevicesLoaded: {
        return { ...state, is_devices_loaded: 2, devices: action.payload };
      }


      case actionTypes.AddDevice: {
        console.log("payload :::", action.payload)

        return {
          ...state,
          devices: initialState.devices.concat(action.payload)
        };
      }

      default:
        return state;
    }
  }
);

export const actions = {

  setDevices: (items) => ({ type: actionTypes.DevicesLoaded, payload: items }),
  addNewDevice: (item) => ({ type: actionTypes.AddDevice, payload: item }),
  handleVar: (name, value) => ({ type: actionTypes.HandleVar, payload: { name, value } }),

};


