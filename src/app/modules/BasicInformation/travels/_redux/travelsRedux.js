import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";

export const actionTypes = {
  getAllTravels: "[getAllTravels] Action",
  addTravels: "[addTravels] Action",
  editTravels: "[editTravels] Action",
  deleteTravels: "[deleteTravels] Action",

  getAllDriversTravel: "[getAllDriversTravel] Action",
  getAllBusesTravel: "[getAllBusesTravel] Action",
  getAllDirectionsTravel: "[getAllDirectionsTravel] Action",
};

const initialCountreiesState = {
  travels: [],
  driversTravel: [],
  busesTravel: [],
  directionsTravel: [],
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

      case actionTypes.getAllDriversTravel: {
        console.log("action.payload ::::", action.payload);
        const driversTravel = action.payload;
        return { ...state, driversTravel };
      }
      case actionTypes.getAllBusesTravel: {
        console.log("action.payload ::::", action.payload);
        const busesTravel = action.payload;
        return { ...state, busesTravel };
      }
      case actionTypes.getAllDirectionsTravel: {
        console.log("action.payload ::::", action.payload);
        const directionsTravel = action.payload;
        return { ...state, directionsTravel };
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

  getAllDriversTravel: (driversTravel) => ({
    type: actionTypes.getAllDriversTravel,
    payload: { driversTravel },
  }),
  getAllBusesTravel: (busesTravel) => ({
    type: actionTypes.getAllBusesTravel,
    payload: { busesTravel },
  }),
  getAllDirectionsTravel: (directionsTravel) => ({
    type: actionTypes.getAllDirectionsTravel,
    payload: { directionsTravel },
  }),

  addTravels: (travels) => ({
    type: actionTypes.addTravels,
    payload: { travels },
  }),
  editTravels: (travels) => ({
    type: actionTypes.editTravels,
    payload: { travels },
  }),
  deleteTravels: (travels) => ({
    type: actionTypes.deleteTravels,
    payload: { travels },
  }),
};
