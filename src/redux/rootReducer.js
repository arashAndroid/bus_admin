import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import * as device from "../app/modules/Device/_redux/deviceRedux";
import * as sensor from "../app/modules/Sensor/_redux/sensorRedux";
import * as sensors from "../app/modules/Sensors/_redux/sensorsRedux";
import * as gateway from "../app/modules/Gateway/_redux/gatewayRedux";
import * as profile from "../app/modules/Profile/_redux/profileRedux";
import * as users from "../app/modules/Users/_redux/userRedux";

import { customersSlice } from "../app/modules/ECommerce/_redux/customers/customersSlice";
import { productsSlice } from "../app/modules/ECommerce/_redux/products/productsSlice";
import { remarksSlice } from "../app/modules/ECommerce/_redux/remarks/remarksSlice";
import { specificationsSlice } from "../app/modules/ECommerce/_redux/specifications/specificationsSlice";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  device: device.reducer,
  sensor: sensor.reducer,
  sensors: sensors.reducer,
  gateway: gateway.reducer,
  profile: profile.reducer,
  users: users.reducer,
  customers: customersSlice.reducer,
  products: productsSlice.reducer,
  remarks: remarksSlice.reducer,
  specifications: specificationsSlice.reducer
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
