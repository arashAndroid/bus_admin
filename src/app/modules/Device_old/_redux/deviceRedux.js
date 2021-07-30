import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import { getUserByToken } from "./deviceCrud";

export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",
  Register: "[Register] Action",
  UserRequested: "[Request User] Action",
  UserLoaded: "[Load User] Auth API",
  DevicesLoaded: "[device] DevicesLoaded  Action",
  AddDevice: "[device] AddDevice Action",
  HandleVar: "[device] HandleVar Action"


};

const initialState = {
  user: undefined,
  authToken: undefined,
  devices: [
    // {
    //   "id": 1,
    //   "description": "Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.",
    //   "title": "Test",
    //   "img": "dcard__image--river",

    // },
    // {
    //   "id": 2,
    //   "description": "Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.",
    //   "title": "Test",
    //   "img": "dcard__image--river",

    // },
    // {
    //   "id": 3,
    //   "description": "Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.",
    //   "title": "Test",
    //   "img": "dcard__image--river",

    // },
  ],
  is_devices_loaded: 0,
  sensor_name: '',
  sensor_password: '',
  wifi_name: '',
  wifi_password: '',
  domain_name: '',
  data_link: '',
  time_delay: '',
  filter: '',
  run: '',
  fifo: '',
  accelerometer: '',
  self: '',
  axis: '',
  acc_bandwidth: '',
  device_code: '',
  sensor_code: '',
  device_app: '',
  location: '',
  ip: '',
  sim: ''






};

export const reducer = persistReducer(
  { storage, key: "v705-demo1-auth", whitelist: ["user", "authToken"] },
  (state = initialState, action) => {
    switch (action.type) {

      case actionTypes.HandleVar: {

        switch (action.name) {
          case 'sensor_name':
            console.log("name :::::" , action.value)
            return {
              ...state,
              sensor_name: action.value,
            };
          case 'sensor_password':
            return {
              ...state,
              sensor_password: action.value,
            };
          // case 'birth_date':
          //   return {
          //     ...state,
          //     birth_date: action.value,
          //   };
          // case 'driving_licence_expire_date':
          //   return {
          //     ...state,
          //     driving_licence_expire_date: action.value,
          //   };
          // case 'driving_licence_number':
          //   return {
          //     ...state,
          //     driving_licence_number: action.value,
          //   };
          // case 'email':
          //   return {
          //     ...state,
          //     email: action.value,
          //   };
          // case 'father_name':
          //   return {
          //     ...state,
          //     father_name: action.value,
          //   };
          // case 'first_name':
          //   return {
          //     ...state,
          //     first_name: action.value,
          //   };
          // case 'id_no':
          //   return {
          //     ...state,
          //     id_no: action.value,
          //   };
          // case 'is_active':
          //   return {
          //     ...state,
          //     is_active: action.value,
          //   };
          // case 'active':
          //   return {
          //     ...state,
          //     active: action.value,
          //   };
          // case 'last_name':
          //   return {
          //     ...state,
          //     last_name: action.value,
          //   };
          // case 'mobile':
          //   return {
          //     ...state,
          //     mobile: action.value,
          //   };
          // case 'national_code':
          //   return {
          //     ...state,
          //     national_code: action.value,
          //   };
          // case 'postal_code':
          //   return {
          //     ...state,
          //     postal_code: action.value,
          //   };
          // case 'smart_cart_expire_date':
          //   return {
          //     ...state,
          //     smart_cart_expire_date: action.value,
          //   };
          // case 'smart_cart_number':
          //   return {
          //     ...state,
          //     smart_cart_number: action.value,
          //   };
          // case 'tell':
          //   return {
          //     ...state,
          //     tell: action.value,
          //   };
          // case 'township_id':
          //   return {
          //     ...state,
          //     township_id: action.value,
          //   };
          // case 'user_name':
          //   return {
          //     ...state,
          //     user_name: action.value,
          //   };
          // case 'password':
          //   return {
          //     ...state,
          //     password: action.value,
          //   };

        }
      }

      case actionTypes.Login: {
        const { authToken } = action.payload;

        return { authToken, user: undefined };
      }

      case actionTypes.Register: {
        const { authToken } = action.payload;

        return { authToken, user: undefined };
      }
      case actionTypes.DevicesLoaded: {
        return { ...state, is_devices_loaded: 2, devices: action.payload };
      }





      case actionTypes.Logout: {
        // TODO: Change this code. Actions in reducer aren't allowed.
        return initialState;
      }

      case actionTypes.UserLoaded: {
        const { user } = action.payload;
        return { ...state, user };
      }

      case actionTypes.AddDevice: {
        console.log("payload :::", action.payload)

        return {
          ...state,
          devices: initialState.devices.concat(action.payload)





        };
      }

      default:
        return state;
    }
  }
);

export const actions = {

  setDevices: (items) => ({ type: actionTypes.DevicesLoaded, payload: items }),
  addNewDevice: (item) => ({ type: actionTypes.AddDevice, payload: item }),
  handleVar: (name , value) => ({ type: actionTypes.HandleVar, payload: {name , value} }),

  login: authToken => ({ type: actionTypes.Login, payload: { authToken } }),
  register: authToken => ({
    type: actionTypes.Register,
    payload: { authToken }
  }),
  logout: () => ({ type: actionTypes.Logout }),
  requestUser: user => ({ type: actionTypes.UserRequested, payload: { user } }),
  fulfillUser: user => ({ type: actionTypes.UserLoaded, payload: { user } })
};

export function* saga() {
  yield takeLatest(actionTypes.Login, function* loginSaga() {
    yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.Register, function* registerSaga() {
    yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.UserRequested, function* userRequested() {
    const { data: user } = yield getUserByToken();

    yield put(actions.fulfillUser(user));
  });
}
