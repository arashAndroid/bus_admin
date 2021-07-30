import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";

export const actionTypes = {

  UsersLoaded: "[users] UsersLoaded  Action",


};

const initialState = {
  // user: undefined,
  // authToken: undefined,
  users: [

  ],
  is_users_loaded: 0,

};

export const reducer = persistReducer(
  { storage, key: "v705-demo1-auth", whitelist: ["user", "authToken"] },
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.UsersLoaded: {
        return { ...state, is_users_loaded: 2, users: action.payload };
      }

      default:
        return state;
    }
  }
);

export const actions = {

  setUsers: (items) => ({ type: actionTypes.UsersLoaded, payload: items }),

};

export function* saga() {
  // yield takeLatest(actionTypes.Login, function* loginSaga() {
  //   yield put(actions.requestUser());
  // });

  // yield takeLatest(actionTypes.Register, function* registerSaga() {
  //   yield put(actions.requestUser());
  // });

  // yield takeLatest(actionTypes.UserRequested, function* userRequested() {
  //   const { data: user } = yield getUserByToken();

  //   yield put(actions.fulfillUser(user));
  // });
}
