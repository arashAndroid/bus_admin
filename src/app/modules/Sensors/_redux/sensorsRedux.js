import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import { getUserByToken } from "./sensorsCrud";

export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",
  Register: "[Register] Action",
  UserRequested: "[Request User] Action",
  UserLoaded: "[Load User] Auth API",
  SensorsLoaded: "[sensors] SensorsLoaded  Action",
  SensorFFTsLoaded: "[sensors] SensorFFTsLoaded  Action",
  SensorPacketInfosLoaded: "[sensors] SensorPacketInfosLoaded  Action",
  SensorPredictFailuresLoaded: "[sensors] SensorPredictFailuresLoaded  Action",
  AddSensor: "[sensors] AddSensor Action",
  HandleVar: "[sensors] HandleVar Action"


};

const initialState = {
  user: undefined,
  authToken: undefined,
  sensors: [],
  sensorFFTs: [],
  sensorPacketInfos: [],
  sensorPredictFailures: [],
  is_sensors_loaded: 0,
  is_sensor_FFTs_loaded: 0,
  is_sensor_packet_infos_loaded: 0,
  is_sensor_predict_failures_loaded: 0,
  sensor_name: '',
  sensor_password: '',
  wifi_name: '',
  wifi_password: '',
  domain_name: '',
  data_link: '',
  time_delay: '',
  filter: '',
  run: '',
  fifo: '',
  accelerometer: '',
  self: '',
  axis: '',
  acc_bandwidth: '',
  device_code: '',
  sensor_code: '',
  device_app: '',
  location: '',
  ip: '',
  gateway_id: '',
  gateway_port: '',
  sensor_type: '',
  serial: '',
  connection_type: '',
  device_id: '',
  device_port: '',
  sim: ''






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
      case actionTypes.SensorFFTsLoaded: {
        return { ...state, is_sensor_FFTs_loaded: 2, sensorFFTs: action.payload };
      }
      case actionTypes.SensorPacketInfosLoaded: {
        return { ...state, is_sensor_packet_infos_loaded: 2, sensorPacketInfos: action.payload };
      }
      case actionTypes.SensorPredictFailuresLoaded: {
        console.log("payload sensorPredictFailures :::", action.payload)
        return { ...state, is_sensor_predict_failures_loaded: 2, sensorPredictFailures: action.payload };
      }

      case actionTypes.AddSensor: {

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
  setSensorFFTs: (items) => ({ type: actionTypes.SensorFFTsLoaded, payload: items }),
  setSensorPacketInfos: (items) => ({ type: actionTypes.SensorPacketInfosLoaded, payload: items }),
  setSensorPredictFailures: (items) => ({ type: actionTypes.SensorPredictFailuresLoaded, payload: items }),
  addNewSensor: (item) => ({ type: actionTypes.AddSensor, payload: item }),
  handleVar: (name, value) => ({ type: actionTypes.HandleVar, payload: { name, value } })


};
