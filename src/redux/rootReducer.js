import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import * as cities from "../app/modules/BasicInformation/cities/_redux/citiesRedux";
import * as busTypes from "../app/modules/BasicInformation/busTypes/_redux/busTypesRedux";
import * as buses from "../app/modules/BasicInformation/buses/_redux/busesRedux";
import * as provinces from "../app/modules/BasicInformation/provinces/_redux/provincesRedux";
import * as townships from "../app/modules/BasicInformation/townships/_redux/townshipsRedux";
import * as carBrands from "../app/modules/BasicInformation/carBrands/_redux/carBrandsRedux";
import * as carTypes from "../app/modules/BasicInformation/carTypes/_redux/carTypesRedux";
import * as cars from "../app/modules/BasicInformation/cars/_redux/carsRedux";
import * as drivers from "../app/modules/BasicInformation/drivers/_redux/driversRedux";
import * as servants from "../app/modules/BasicInformation/servants/_redux/servantsRedux";
import * as stations from "../app/modules/BasicInformation/stations/_redux/stationsRedux";
import * as directions from "../app/modules/BasicInformation/directions/_redux/directionsRedux";
import * as travels from "../app/modules/BasicInformation/travels/_redux/travelsRedux";
import * as details from "../app/modules/BasicInformation/details/_redux/detailsRedux";
import * as travelDetails from "../app/modules/BasicInformation/travelDetails/_redux/travelDetailsRedux";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  cities: cities.reducer,
  busTypes: busTypes.reducer,
  buses: buses.reducer,
  travels: travels.reducer,
  provinces: provinces.reducer,
  townships: townships.reducer,
  carBrands: carBrands.reducer,
  carTypes: carTypes.reducer,
  cars: cars.reducer,
  drivers: drivers.reducer,
  servants: servants.reducer,
  stations: stations.reducer,
  directions: directions.reducer,
  details: details.reducer,
  travelDetails: travelDetails.reducer,
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
