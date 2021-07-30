import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";

export const actionTypes = {
    getAllCars: "[getAllCars] Action",
    getCarTypes: "[getCarTypes] Action",
    getCarBrands: "[getCarBrands] Action",
    addCars: "[addCars] Action",
    editCars: "[editCars] Action",
    deleteCars: "[deleteCars] Action",


};

const initialCountreiesState = {
    cars: [],
    brands:[],
    types:[],
    isCarsLoaded: false,
};

export const reducer = persistReducer(
    { storage, key: "v705-demo1-auth", whitelist: ["user", "cars"] },
    (state = initialCountreiesState, action) => {
        switch (action.type) {
            case actionTypes.getAllCars: {
                console.log("action.payload ::::", action.payload)
                const cars = action.payload;
                return { ...state,cars,isCarsLoaded:true };
            }
            case actionTypes.getCarBrands: {
                console.log("action.payload ::::", action.payload)
                const brands = action.payload;
                return { ...state,brands };
            }
            case actionTypes.getCarTypes: {
                console.log("action.payload ::::", action.payload)
                const types = action.payload;
                return { ...state,types};
            }
            case actionTypes.addCars: {
                return { ...state};
            }
            case actionTypes.editCars: {
                return { ...state};
            }
            case actionTypes.deleteCars: {
                return { ...state};
            }

            default:
                return state;
        }
    }
);

export const actions = {
    getAllCars: cars => ({ type: actionTypes.getAllCars, payload: { cars } }),
    getCarBrands: brands => ({ type: actionTypes.getCarBrands, payload: { brands } }),
    getCarTypes: types => ({ type: actionTypes.getCarTypes, payload: { types } }),
    addCars: cars => ({ type: actionTypes.addCars, payload: { cars } }),
    editCars: cars => ({ type: actionTypes.editCars, payload: { cars } }),
    deleteCars: cars => ({ type: actionTypes.deleteCars, payload: { cars } }),


    
};
