import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import { getUserByToken } from "./profileCrud";

export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",
  Register: "[Register] Action",
  UserRequested: "[Request User] Action",
  UserLoaded: "[Load User] Auth API",
  ProfilesLoaded: "[profile] ProfilesLoaded  Action",
  LoadingUser: "[profile] LoadingUser  Action",
  AddProfile: "[profile] AddProfile Action",
  HandleVar: "[profile] HandleVar Action"


};

const initialState = {
  // user: undefined,
  // authToken: undefined,

  is_profiles_loaded: 1,
  first_name: '',
  name: '',
  last_name: '',
  company_name: '',
  phone: '',
  email: '',
  password: '',
  job_title: '',
  country: '',
  city: '',
  phone_fax: '',
  phone_station: '',
  credit_card_type: '',
  credit_card_number: '',
  credit_card_expire_month: '',
  credit_card_expire_year: '',
  credit_name_of_card: '',
  credit_security_number: '',
  web: ''






};

export const reducer = persistReducer(
  { storage, key: "v705-demo1-auth", whitelist: ["user", "authToken"] },
  (state = initialState, action) => {
    // console.log("action = ", action.type);
    switch (action.type) {

      case actionTypes.HandleVar: {

        switch (action.name) {
          case 'first_name':
            console.log("name :::::", action.value)
            return {
              ...state,
              first_name: action.value,
            };
          case 'name':
            return {
              ...state,
              name: action.value,
            };
          case 'last_name':
            return {
              ...state,
              last_name: action.value,
            };
          case 'company_name':
            return {
              ...state,
              company_name: action.value,
            };
          case 'phone':
            return {
              ...state,
              phone: action.value,
            };
          case 'email':
            return {
              ...state,
              email: action.value,
            };
          case 'password':
            return {
              ...state,
              password: action.value,
            };
          case 'job_title':
            return {
              ...state,
              job_title: action.value,
            };
          case 'country':
            return {
              ...state,
              country: action.value,
            };
          case 'city':
            return {
              ...state,
              city: action.value,
            };
          case 'phone_fax':
            return {
              ...state,
              phone_fax: action.value,
            };
          case 'phone_station':
            return {
              ...state,
              phone_station: action.value,
            };
          case 'credit_card_type':
            return {
              ...state,
              credit_card_type: action.value,
            };
          case 'credit_card_number':
            return {
              ...state,
              credit_card_number: action.value,
            };
          case 'credit_card_expire_month':
            return {
              ...state,
              credit_card_expire_month: action.value,
            };
          case 'credit_card_expire_year':
            return {
              ...state,
              credit_card_expire_year: action.value,
            };
          case 'credit_name_of_card':
            return {
              ...state,
              credit_name_of_card: action.value,
            };
          case 'credit_security_number':
            return {
              ...state,
              credit_security_number: action.value,
            };
          case 'web':
            return {
              ...state,
              web: action.value,
            };


        }
      }


      case actionTypes.UserLoaded: {
        const { user } = action.payload;
        console.log('user name = ', user.name);
        return { ...state, is_profiles_loaded: 1, user };
      }
      case actionTypes.LoadingUser: {
        const { isLoading } = action.payload;
        console.log('isLoading = ', isLoading);
        return { ...state, is_profiles_loaded: isLoading };
      }







      default:

        return state;
    }
  }
);

export const actions = {
  fulfillUser: user => ({ type: actionTypes.UserLoaded, payload: { user } }),
  loadingUser: isLoading => ({ type: actionTypes.LoadingUser, payload: { isLoading } })

};

export function* saga() {
  // yield takeLatest(actionTypes.Login, function* loginSaga() {
  //   yield put(actions.requestUser());
  // });

  // yield takeLatest(actionTypes.Register, function* registerSaga() {
  //   yield put(actions.requestUser());
  // });

  // yield takeLatest(actionTypes.UserRequested, function* userRequested() {
  //   console.log('getting user again');
  //   const { data: user } = yield getUserByToken();
  //   yield put(actions.fulfillUser(user));
  // });
}
