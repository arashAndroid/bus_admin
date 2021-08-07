import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


export const actionTypes = {
    getAllTravels: "[getAllTravels] Action",
    addTravel: "[addTravel] Action",
    deleteTravel: "[deleteTravel] Action",
    editTravel: "[editTravel] Action",


};

const initialTravelsState = {
    travels: [],
    isTravelsLoaded: false,
};

export const reducer = persistReducer(
    { storage, key: "v705-demo1-auth", whitelist: ["user", "travels"] },
    (state = initialTravelsState, action) => {
        switch (action.type) {
            case actionTypes.getAllTravels: {
                console.log("action.payload getAllTravels::::", action.payload)
                const travels = action.payload;
                return { travels, isTravelsLoaded: true };
            }

            case actionTypes.addTravel: {
                console.log("action.payload ::::", action.payload)
                const travel = action.payload;
                return { travels: initialTravelsState.travels.push(travel), isTravelsLoaded: true };
            }
            case actionTypes.editTravel: {
                console.log("action.payload ::::", action.payload)
                const travel = action.payload;
                return { travels: initialTravelsState.travels.push(travel), isTravelsLoaded: true };
            }
            case actionTypes.deleteTravel: {
                console.log("action.payload ::::", action.payload)
                const travel = action.payload;
                return { travels: initialTravelsState.travels.push(travel), isTravelsLoaded: true };
            }

            default:
                return state;
        }
    }
);

export const actions = {
    getAllTravels: travels => ({ type: actionTypes.getAllTravels, payload: { travels } }),
    addTravel: travel => ({ type: actionTypes.addTravel, payload: { travel } }),
    editTravel: travel => ({ type: actionTypes.editTravel, payload: { travel } }),
    deleteTravel: travel => ({ type: actionTypes.deleteTravel, payload: { travel } }),


};

