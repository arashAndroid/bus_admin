import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import { getUserByToken } from "./gatewayCrud";

export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",
  Register: "[Register] Action",
  UserRequested: "[Request User] Action",
  UserLoaded: "[Load User] Auth API",
  GatewaysLoaded: "[gateway] GatewaysLoaded  Action",
  AddGateway: "[gateway] AddGateway Action",
  HandleVar: "[gateway] HandleVar Action"


};

const initialState = {
  user: undefined,
  authToken: undefined,
  gateways: [],
  is_gateways_loaded: 0,
  name: '',
  url: '',
  serial_number: '',
  ip: '',
  sim_number: '',
  location: '',
  connection_type: '',
  connection_user: '',
  connection_password: '',
  wifi_name: '',
  model: '',
  install_date: '',
  port_count: ''

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
          case 'url':
            return {
              ...state,
              sensor_password: action.value,
            };

          case 'serial_number':
            return {
              ...state,
              sensor_password: action.value,
            };

          case 'ip':
            return {
              ...state,
              sensor_password: action.value,
            };

          case 'sim_number':
            return {
              ...state,
              sensor_password: action.value,
            };

          case 'location':
            return {
              ...state,
              sensor_password: action.value,
            };
          case 'connection_type':
            return {
              ...state,
              sensor_password: action.value,
            };
          case 'connection_user':
            return {
              ...state,
              sensor_password: action.value,
            };
          case 'connection_password':
            return {
              ...state,
              sensor_password: action.value,
            };
          case 'wifi_name':
            return {
              ...state,
              sensor_password: action.value,
            };
          case 'model':
            return {
              ...state,
              sensor_password: action.value,
            };
          case 'install_date':
            return {
              ...state,
              sensor_password: action.value,
            };
          case 'port_count':
            return {
              ...state,
              sensor_password: action.value,
            };


        }
      }

      case actionTypes.GatewaysLoaded: {
        return { ...state, is_gateways_loaded: 2, gateways: action.payload };
      }


      case actionTypes.AddGateway: {
        console.log("payload :::", action.payload)

        return {
          ...state,
          gateways: initialState.gateways.concat(action.payload)
        };
      }

      default:
        return state;
    }
  }
);

export const actions = {

  setGateways: (items) => ({ type: actionTypes.GatewaysLoaded, payload: items }),
  addNewGateway: (item) => ({ type: actionTypes.AddGateway, payload: item }),
  handleVar: (name, value) => ({ type: actionTypes.HandleVar, payload: { name, value } }),

};


