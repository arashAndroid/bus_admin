import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


export const actionTypes = {
    getAllBusTypes: "[getAllBusTypes] Action",
    addBusType: "[addBusType] Action",
    deleteBusType: "[deleteBusType] Action",
    editBusType: "[editBusType] Action",


};

const initialBusTypesState = {
    busTypes: [],
    isBusTypesLoaded: false,
};

export const reducer = persistReducer(
    { storage, key: "v705-demo1-auth", whitelist: ["user", "busTypes"] },
    (state = initialBusTypesState, action) => {
        switch (action.type) {
            case actionTypes.getAllBusTypes: {
                console.log("action.payload getAllBusTypes::::", action.payload)
                const busTypes = action.payload;
                return { busTypes, isBusTypesLoaded: true };
            }

            case actionTypes.addBusType: {
                console.log("action.payload ::::", action.payload)
                const busType = action.payload;
                return { busTypes: initialBusTypesState.busTypes.push(busType), isBusTypesLoaded: true };
            }
            case actionTypes.editBusType: {
                console.log("action.payload ::::", action.payload)
                const busType = action.payload;
                return { busTypes: initialBusTypesState.busTypes.push(busType), isBusTypesLoaded: true };
            }
            case actionTypes.deleteBusType: {
                console.log("action.payload ::::", action.payload)
                const busType = action.payload;
                return { busTypes: initialBusTypesState.busTypes.push(busType), isBusTypesLoaded: true };
            }

            default:
                return state;
        }
    }
);

export const actions = {
    getAllBusTypes: busTypes => ({ type: actionTypes.getAllBusTypes, payload: { busTypes } }),
    addBusType: busType => ({ type: actionTypes.addBusType, payload: { busType } }),
    editBusType: busType => ({ type: actionTypes.editBusType, payload: { busType } }),
    deleteBusType: busType => ({ type: actionTypes.deleteBusType, payload: { busType } }),


};

