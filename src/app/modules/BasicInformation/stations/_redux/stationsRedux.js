import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";

export const actionTypes = {
    getAllStations: "[getAllStations] Action",
    getTownships: "[getTownships] Action",
    addStations: "[addStations] Action",
    editStations: "[editStations] Action",
    deleteStations: "[deleteStations] Action"

};

const initialCountreiesState = {
    stations: [],
    townships:[],
    isStationsLoaded: false,
};

export const reducer = persistReducer(
    { storage, key: "v705-demo1-auth", whitelist: ["user", "stations"] },
    (state = initialCountreiesState, action) => {
        switch (action.type) {
            case actionTypes.getAllStations: {
                console.log("action.payload ::::", action.payload)
                const stations = action.payload;
                return { ...state,stations, isStationsLoaded: true };
            }
            case actionTypes.getTownships: {
                console.log("action.payload ::::", action.payload)
                const townships = action.payload;
                return { ...state,townships };
            }
            case actionTypes.addStations: {
                return { ...state};
            }
            case actionTypes.deleteStations: {
                return { ...state};
            }
            case actionTypes.editStations: {
                return { ...state};
            }

            default:
                return state;
        }
    }
);

export const actions = {
    getAllStations: stations => ({ type: actionTypes.getAllStations, payload: { stations } }),
    getTownships: townships => ({ type: actionTypes.getTownships, payload: { townships } }),
    addStations: stations => ({ type: actionTypes.addStations, payload: { stations } }),
    editStations: stations => ({ type: actionTypes.editStations, payload: { stations } }),
    deleteStations: stations => ({ type: actionTypes.deleteStations, payload: { stations } }),


};
