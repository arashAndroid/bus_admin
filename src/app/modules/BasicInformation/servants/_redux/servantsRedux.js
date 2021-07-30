import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";

export const actionTypes = {
    getAllServants: "[getAllServants] Action",
    getTownships: "[getTownships] Action",
    addServants: "[addServants] Action",
    editServants: "[editServants] Action",
    deleteServants: "[deleteServants] Action",


};

const initialCountreiesState = {
    servants: [],
    townships:[],
    isServantsLoaded: false,
};

export const reducer = persistReducer(
    { storage, key: "v705-demo1-auth", whitelist: ["user", "servants"] },
    (state = initialCountreiesState, action) => {
        switch (action.type) {
            case actionTypes.getAllServants: {
                console.log("action.payload ::::", action.payload)
                const servants = action.payload;
                return { ...state,servants, isServantsLoaded: true };
            }

            case actionTypes.getTownships: {
                console.log("action.payload ::::", action.payload)
                const townships = action.payload;
                return { ...state,townships };
            }
            case actionTypes.addServants: {
                return { ...state};
            }
            case actionTypes.deleteServants: {
                return { ...state};
            }
            case actionTypes.editServants: {
                return { ...state};
            }



            default:
                return state;
        }
    }
);

export const actions = {
    getAllServants: servants => ({ type: actionTypes.getAllServants, payload: { servants } }),
    getTownships: townships => ({ type: actionTypes.getTownships, payload: { townships } }),
    addServants: servants => ({ type: actionTypes.addServants, payload: { servants } }),
    editServants: servants => ({ type: actionTypes.editServants, payload: { servants } }),
    deleteServants: servants => ({ type: actionTypes.deleteServants, payload: { servants } }),


    
};
