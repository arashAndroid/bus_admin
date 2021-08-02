import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


export const actionTypes = {
    getAllCities: "[getAllCities] Action",
    addCity: "[addCity] Action",
    deleteCity: "[deleteCity] Action",
    editCity: "[editCity] Action",


};

const initialCitiesState = {
    cities: [],
    isCitiesLoaded: false,
};

export const reducer = persistReducer(
    { storage, key: "v705-demo1-auth", whitelist: ["user", "cities"] },
    (state = initialCitiesState, action) => {
        switch (action.type) {
            case actionTypes.getAllCities: {
                console.log("action.payload getAllCities::::", action.payload)
                const cities = action.payload;
                return { cities, isCitiesLoaded: true };
            }

            case actionTypes.addCity: {
                console.log("action.payload ::::", action.payload)
                const city = action.payload;
                return { cities: initialCitiesState.cities.push(city), isCitiesLoaded: true };
            }
            case actionTypes.editCity: {
                console.log("action.payload ::::", action.payload)
                const city = action.payload;
                return { cities: initialCitiesState.cities.push(city), isCitiesLoaded: true };
            }
            case actionTypes.deleteCity: {
                console.log("action.payload ::::", action.payload)
                const city = action.payload;
                return { cities: initialCitiesState.cities.push(city), isCitiesLoaded: true };
            }

            default:
                return state;
        }
    }
);

export const actions = {
    getAllCities: cities => ({ type: actionTypes.getAllCities, payload: { cities } }),
    addCity: city => ({ type: actionTypes.addCity, payload: { city } }),
    editCity: city => ({ type: actionTypes.editCity, payload: { city } }),
    deleteCity: city => ({ type: actionTypes.deleteCity, payload: { city } }),


};

