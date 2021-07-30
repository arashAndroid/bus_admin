import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import { getUserByToken } from "./sensorCrud";

export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",
  Register: "[Register] Action",
  UserRequested: "[Request User] Action",
  UserLoaded: "[Load User] Auth API",
  SensorsLoaded: "[sensor] SensorsLoaded  Action",
  SensorsLoadedNotSelected: "[sensor] SensorsLoadedNotSelected  Action",
  AddSensor: "[sensor] AddSensor Action",
  HandleVar: "[sensor] HandleVar Action"


};

const initialState = {
  user: undefined,
  authToken: undefined,
  sensors: [],
  sensors_not_selected: [],
  is_sensors_loaded: 0,
  is_sensors_loaded_not_selected: 0,
  sensor_name: '',
  sensor_password: '',

};

export const reducer = persistReducer(
  { storage, key: "v705-demo1-auth", whitelist: ["user", "authToken"] },
  (state = initialState, action) => {
    switch (action.type) {

      case actionTypes.HandleVar: {

        switch (action.name) {
          case 'sensor_name':
            console.log("name :::::", action.value)
            return {
              ...state,
              sensor_name: action.value,
            };
          case 'sensor_password':
            return {
              ...state,
              sensor_password: action.value,
            };


        }
      }

      case actionTypes.SensorsLoaded: {
        return { ...state, is_sensors_loaded: 2, sensors: action.payload };
      }
      case actionTypes.SensorsLoadedNotSelected: {
        return { ...state, is_sensors_loaded_not_selected: 2, sensors_not_selected: action.payload };
      }

      case actionTypes.AddSensor: {
        console.log("payload :::", action.payload)

        return {
          ...state,
          sensors: initialState.sensors.concat(action.payload)
        };
      }

      default:
        return state;
    }
  }
);

export const actions = {

  setSensors: (items) => ({ type: actionTypes.SensorsLoaded, payload: items }),
  setSensorsNotSelected: (items) => ({ type: actionTypes.SensorsLoadedNotSelected, payload: items }),
  addNewSensor: (item) => ({ type: actionTypes.AddSensor, payload: item }),
  handleVar: (name, value) => ({ type: actionTypes.HandleVar, payload: { name, value } })


};

