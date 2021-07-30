import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";

export const actionTypes = {
    getAllTravels: "[getAllTravels] Action",
    getCars: "[getCars] Action",
    getDrivers: "[getDrivers] Action",
    getServants: "[getServants] Action",
    getDirections: "[getDirections] Action",
    addTravels: "[addTravels] Action",
    editTravels: "[editTravels] Action",
    deleteTravels: "[deleteTravels] Action",


};

const initialCountreiesState = {
    travels: [],
    drivers:[],
    servants:[],
    cars:[],
    directions:[],
    isTravelsLoaded: false,
};

export const reducer = persistReducer(
    { storage, key: "v705-demo1-auth", whitelist: ["user", "travels"] },
    (state = initialCountreiesState, action) => {
        switch (action.type) {
            case actionTypes.getAllTravels: {
                console.log("action.payload ::::", action.payload)
                const travels = action.payload;
                return { ...state,travels, isTravelsLoaded: true };
            }
            case actionTypes.getDirections: {
                console.log("action.payload ::::", action.payload)
                const directions = action.payload;
                return { ...state,directions, isTravelsLoaded: true };
            }
            case actionTypes.getServants: {
                console.log("action.payload ::::", action.payload)
                const servants = action.payload;
                return { ...state,servants, isTravelsLoaded: true };
            }
            case actionTypes.getDrivers: {
                console.log("action.payload ::::", action.payload)
                const drivers = action.payload;
                return { ...state,drivers, isTravelsLoaded: true };
            }
            case actionTypes.getCars: {
                console.log("action.payload ::::", action.payload)
                const cars = action.payload;
                return { ...state,cars, isTravelsLoaded: true };
            }

            case actionTypes.addTravels: {
                return { ...state};
            }
            case actionTypes.editTravels: {
                return { ...state};
            }
            case actionTypes.deleteTravels: {
                return { ...state};
            }


            default:
                return state;
        }
    }
);

export const actions = {
    getAllTravels: travels => ({ type: actionTypes.getAllTravels, payload: { travels } }),
    getCars: cars => ({ type: actionTypes.getCars, payload: { cars } }),
    getDrivers: drivers => ({ type: actionTypes.getDrivers, payload: { drivers } }),
    getServants: servants => ({ type: actionTypes.getServants, payload: { servants } }),
    getDirections: directions => ({ type: actionTypes.getDirections, payload: { directions } }),
    addTravels: travels => ({ type: actionTypes.addTravels, payload: { travels } }),
    deleteTravels: travels => ({ type: actionTypes.deleteTravels, payload: { travels } }),
    editTravels: travels => ({ type: actionTypes.editTravels, payload: { travels } }),

    
};
