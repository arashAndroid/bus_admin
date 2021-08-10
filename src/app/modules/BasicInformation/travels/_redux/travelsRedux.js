import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";

export const actionTypes = {
  getAllTravels: "[getAllTravels] Action",
  getTravelTypes: "[getTravelTypes] Action",
  getAllCities: "[getAllCities] Action",
  addTravels: "[addTravels] Action",
  editTravels: "[editTravels] Action",
  deleteTravels: "[deleteTravels] Action",
  
  getAllDrivers: "[getAllDrivers] Action",

};

const initialCountreiesState = {
  travels: [],
  cities: [],
  types: [],
  Drivers: [],
  isTravelsLoaded: false,
};

export const reducer = persistReducer(
  { storage, key: "v705-demo1-auth", whitelist: ["user", "travels"] },
  (state = initialCountreiesState, action) => {
    switch (action.type) {
      case actionTypes.getAllTravels: {
        console.log("action.payload ::::", action.payload);
        const travels = action.payload;
        return { ...state, travels, isTravelsLoaded: true };
      }
      case actionTypes.addTravels: {
        return { ...state };
      }
      case actionTypes.editTravels: {
        return { ...state };
      }
      case actionTypes.deleteTravels: {
        return { ...state };
      }
      
      case actionTypes.getAllCities: {
        console.log("action.payload ::::", action.payload);
        const cities = action.payload;
        return { ...state, cities };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  getAllTravels: (travels) => ({
    type: actionTypes.getAllTravels,
    payload: { travels },
  }),

  getAllCities: (cities) => ({
    type: actionTypes.getAllCities,
    payload: { cities },
  }),

  getTravelTypes: (types) => ({
    type: actionTypes.getTravelTypes,
    payload: { types },
  }),
  addTravels: (travels) => ({ type: actionTypes.addTravels, payload: { travels } }),
  editTravels: (travels) => ({ type: actionTypes.editTravels, payload: { travels } }),
  deleteTravels: (travels) => ({
    type: actionTypes.deleteTravels,
    payload: { travels },
  }),
};
