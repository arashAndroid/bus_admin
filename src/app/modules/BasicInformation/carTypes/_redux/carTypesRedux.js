import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";

export const actionTypes = {
    getAllCarTypes: "[getAllCarTypes] Action",
    addCarType: "[addCarType] Action",
    editCarType: "[editCarType] Action",
    deleteCarType: "[deleteCarType] Action"
};

const initialCountreiesState = {
    carTypes: [],
    isCarTypesLoaded: false,
};

export const reducer = persistReducer(
    { storage, key: "v705-demo1-auth", whitelist: ["user", "carTypes"] },
    (state = initialCountreiesState, action) => {
        switch (action.type) {
            case actionTypes.getAllCarTypes: {
                console.log("action.payload ::::", action.payload)
                const carTypes = action.payload;
                return { carTypes, isCarTypesLoaded: true };
            }

            case actionTypes.addCarType: {
                return { ...state};
            }
            case actionTypes.editCarType: {
                return { ...state};
            }
            case actionTypes.deleteCarType: {
                return { ...state};
            }

            default:
                return state;
        }
    }
);

export const actions = {
    getAllCarTypes: carTypes => ({ type: actionTypes.getAllCarTypes, payload: { carTypes } }),
    addCarType: carTypes => ({ type: actionTypes.addCarType, payload: { carTypes } }),
    editCarType: carTypes => ({ type: actionTypes.editCarType, payload: { carTypes } }),
    deleteCarType: carTypes => ({ type: actionTypes.deleteCarType, payload: { carTypes } }),
    
};
