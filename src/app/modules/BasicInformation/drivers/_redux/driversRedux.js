import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


export const actionTypes = {
    getAllDrivers: "[getAllDrivers] Action",
    addDriver: "[addDriver] Action",
    deleteDriver: "[deleteDriver] Action",
    editDriver: "[editDriver] Action",


};

const initialDriversState = {
    drivers: [],
    isDriversLoaded: false,
};

export const reducer = persistReducer(
    { storage, key: "v705-demo1-auth", whitelist: ["user", "drivers"] },
    (state = initialDriversState, action) => {
        switch (action.type) {
            case actionTypes.getAllDrivers: {
                console.log("action.payload getAllDrivers::::", action.payload)
                const drivers = action.payload;
                return { drivers, isDriversLoaded: true };
            }

            case actionTypes.addDriver: {
                console.log("action.payload ::::", action.payload)
                const driver = action.payload;
                return { drivers: initialDriversState.drivers.push(driver), isDriversLoaded: true };
            }
            case actionTypes.editDriver: {
                console.log("action.payload ::::", action.payload)
                const driver = action.payload;
                return { drivers: initialDriversState.drivers.push(driver), isDriversLoaded: true };
            }
            case actionTypes.deleteDriver: {
                console.log("action.payload ::::", action.payload)
                const driver = action.payload;
                return { drivers: initialDriversState.drivers.push(driver), isDriversLoaded: true };
            }

            default:
                return state;
        }
    }
);

export const actions = {
    getAllDrivers: drivers => ({ type: actionTypes.getAllDrivers, payload: { drivers } }),
    addDriver: driver => ({ type: actionTypes.addDriver, payload: { driver } }),
    editDriver: driver => ({ type: actionTypes.editDriver, payload: { driver } }),
    deleteDriver: driver => ({ type: actionTypes.deleteDriver, payload: { driver } }),


};

