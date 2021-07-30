import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";

export const actionTypes = {
    getAllDrivers: "[getAllDrivers] Action",
    getTownships: "[getTownships] Action",
    addDrivers: "[addDrivers] Action",
    editDrivers: "[editDrivers] Action",
    deleteDrivers: "[deleteDrivers] Action",


};

const initialCountreiesState = {
    drivers: [],
    townships:[],
    isDriversLoaded: false,
};

export const reducer = persistReducer(
    { storage, key: "v705-demo1-auth", whitelist: ["user", "drivers"] },
    (state = initialCountreiesState, action) => {
        switch (action.type) {
            case actionTypes.getAllDrivers: {
                console.log("action.payload ::::", action.payload)
                const drivers = action.payload;
                return { ...state,drivers, isDriversLoaded: true };
            }

            case actionTypes.getTownships: {
                console.log("action.payload ::::", action.payload)
                const townships = action.payload;
                return { ...state,townships };
            }
            case actionTypes.addDrivers: {
                return { ...state};
            }
            case actionTypes.deleteDrivers: {
                return { ...state};
            }
            case actionTypes.editDrivers: {
                return { ...state};
            }



            default:
                return state;
        }
    }
);

export const actions = {
    getAllDrivers: drivers => ({ type: actionTypes.getAllDrivers, payload: { drivers } }),
    getTownships: townships => ({ type: actionTypes.getTownships, payload: { townships } }),
    addDrivers: drivers => ({ type: actionTypes.addDrivers, payload: { drivers } }),
    editDrivers: drivers => ({ type: actionTypes.editDrivers, payload: { drivers } }),
    deleteDrivers: drivers => ({ type: actionTypes.deleteDrivers, payload: { drivers } }),


    
};
