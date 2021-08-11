import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";

export const actionTypes = {
  getAllDetails: "[getAllDetails] Action",
  getAllCities: "[getAllCities] Action",
};

const initialCountreiesState = {
  details: [],
  cities: [],
  isDetailsLoaded: false,
};

export const reducer = persistReducer(
  { storage, key: "v705-demo1-auth", whitelist: ["user", "details"] },
  (state = initialCountreiesState, action) => {
    switch (action.type) {
      case actionTypes.getAllDetails: {
        console.log("action.payload ::::", action.payload);
        const details = action.payload;
        return { ...state, details, isDetailsLoaded: true };
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
  getAllDetails: (details) => ({
    type: actionTypes.getAllDetails,
    payload: { details },
  }),
  getAllCities: (cities) => ({
    type: actionTypes.getAllCities,
    payload: { cities },
  }),
};
