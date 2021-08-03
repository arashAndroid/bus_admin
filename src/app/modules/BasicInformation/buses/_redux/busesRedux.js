import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


export const actionTypes = {
    getAllBuses: "[getAllBuses] Action",
    getAllBusTypes: "[getAllBusTypes] Action",
    addBus: "[addBus] Action",
    deleteBus: "[deleteBus] Action",
    editBus: "[editBus] Action",


};

const initialBusesState = {
    buses: [],
    busTypes: [],
    isBusesLoaded: false
};

export const reducer = persistReducer(
    { storage, key: "v705-demo1-auth", whitelist: ["user", "buses"] },
    (state = initialBusesState, action) => {
        switch (action.type) {
            case actionTypes.getAllBuses: {
                console.log("action.payload getAllBuses::::", action.payload)
                const buses = action.payload;
                return { buses, isBusesLoaded: true };
            }
            case actionTypes.getAllBusTypes: {
                console.log("action.payload getAllBusTypes::::", action.payload)
                const busTypes = action.payload;
                return { ...state, busTypes };
            }

            case actionTypes.addBus: {
                console.log("action.payload ::::", action.payload)
                const bus = action.payload;
                return { buses: initialBusesState.buses.push(bus), isBusesLoaded: true };
            }
            case actionTypes.editBus: {
                console.log("action.payload ::::", action.payload)
                const bus = action.payload;
                return { buses: initialBusesState.buses.push(bus), isBusesLoaded: true };
            }
            case actionTypes.deleteBus: {
                console.log("action.payload ::::", action.payload)
                const bus = action.payload;
                return { buses: initialBusesState.buses.push(bus), isBusesLoaded: true };
            }

            default:
                return state;
        }
    }
);

export const actions = {
    getAllBuses: buses => ({ type: actionTypes.getAllBuses, payload: { buses } }),
    getAllBusTypes: busTypes => ({ type: actionTypes.getAllBusTypes, payload: { busTypes } }),
    addBus: bus => ({ type: actionTypes.addBus, payload: { bus } }),
    editBus: bus => ({ type: actionTypes.editBus, payload: { bus } }),
    deleteBus: bus => ({ type: actionTypes.deleteBus, payload: { bus } }),


};

