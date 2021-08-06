import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";

export const actionTypes = {
  getAllBuses: "[getAllBuses] Action",
  getBusTypes: "[getBusTypes] Action",
  getBusBrands: "[getBusBrands] Action",
  addBuses: "[addBuses] Action",
  editBuses: "[editBuses] Action",
  deleteBuses: "[deleteBuses] Action",
};

const initialCountreiesState = {
  buses: [],
  brands: [],
  types: [],
  isBusesLoaded: false,
};

export const reducer = persistReducer(
  { storage, key: "v705-demo1-auth", whitelist: ["user", "buses"] },
  (state = initialCountreiesState, action) => {
    switch (action.type) {
      case actionTypes.getAllBuses: {
        console.log("action.payload ::::", action.payload);
        const buses = action.payload;
        return { ...state, buses, isBusesLoaded: true };
      }
      case actionTypes.getBusTypes: {
        console.log("action.payload ::::", action.payload);
        const types = action.payload;
        return { ...state, types };
      }
      case actionTypes.addBuses: {
        return { ...state };
      }
      case actionTypes.editBuses: {
        return { ...state };
      }
      case actionTypes.deleteBuses: {
        return { ...state };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  getAllBuses: (buses) => ({
    type: actionTypes.getAllBuses,
    payload: { buses },
  }),
  getBusBrands: (brands) => ({
    type: actionTypes.getBusBrands,
    payload: { brands },
  }),
  getBusTypes: (types) => ({
    type: actionTypes.getBusTypes,
    payload: { types },
  }),
  addBuses: (buses) => ({ type: actionTypes.addBuses, payload: { buses } }),
  editBuses: (buses) => ({ type: actionTypes.editBuses, payload: { buses } }),
  deleteBuses: (buses) => ({
    type: actionTypes.deleteBuses,
    payload: { buses },
  }),
};
