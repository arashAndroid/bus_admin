import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";

export const actionTypes = {
  getAllTravelDetails: "[getAllTravelDetails] Action",
  getAllCities: "[getAllCities] Action",
};

const initialCountreiesState = {
  travelDetails: [],
  cities: [],
  isDetailsLoaded: false,
};

export const reducer = persistReducer(
  { storage, key: "v705-demo1-auth", whitelist: ["user", "travelDetails"] },
  (state = initialCountreiesState, action) => {
    switch (action.type) {
      case actionTypes.getAllTravelDetails: {
        console.log("action.payload ::::", action.payload);
        const travelDetails = action.payload;
        return { ...state, travelDetails, isDetailsLoaded: true };
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
  getAllTravelDetails: (travelDetails) => ({
    type: actionTypes.getAllTravelDetails,
    payload: { travelDetails },
  }),
  getAllCities: (cities) => ({
    type: actionTypes.getAllCities,
    payload: { cities },
  }),
};
