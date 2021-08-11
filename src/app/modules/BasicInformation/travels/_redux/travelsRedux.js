import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";

export const actionTypes = {
  getAllTravels: "[getAllTravels] Action",
  addTravels: "[addTravels] Action",
  editTravels: "[editTravels] Action",
  deleteTravels: "[deleteTravels] Action",

  getAllDrivers: "[getAllDrivers] Action",
  getAllBuses: "[getAllBuses] Action",
  getAllDirections: "[getAllDirections] Action",
};

const initialCountreiesState = {
  travels: [],
  drivers: [],
  buses: [],
  directions: [],
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

      case actionTypes.getAllDrivers: {
        console.log("action.payload ::::", action.payload);
        const drivers = action.payload;
        return { ...state, drivers };
      }
      case actionTypes.getAllBuses: {
        console.log("action.payload ::::", action.payload);
        const buses = action.payload;
        return { ...state, buses };
      }
      case actionTypes.getAllDirections: {
        console.log("action.payload ::::", action.payload);
        const directions = action.payload;
        return { ...state, directions };
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

  getAllDrivers: (drivers) => ({
    type: actionTypes.getAllDrivers,
    payload: { drivers },
  }),
  getAllBuses: (drivers) => ({
    type: actionTypes.getAllBuses,
    payload: { drivers },
  }),
  getAllDirection: (drivers) => ({
    type: actionTypes.getAllDirection,
    payload: { drivers },
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
