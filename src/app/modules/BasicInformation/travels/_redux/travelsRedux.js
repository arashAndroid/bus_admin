import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";

export const actionTypes = {
  getAllTravels: "[getAllTravels] Action",
  getTravelTypes: "[getTravelTypes] Action",
  getTravelBrands: "[getTravelBrands] Action",
  addTravels: "[addTravels] Action",
  editTravels: "[editTravels] Action",
  deleteTravels: "[deleteTravels] Action",
};

const initialCountreiesState = {
  travels: [],
  brands: [],
  types: [],
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
      case actionTypes.getTravelTypes: {
        console.log("action.payload ::::", action.payload);
        const types = action.payload;
        return { ...state, types };
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
  getTravelBrands: (brands) => ({
    type: actionTypes.getTravelBrands,
    payload: { brands },
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
