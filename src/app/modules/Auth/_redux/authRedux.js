import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import {actionTypes as reserveActionTypes} from '../../ReservePage/_redux/reserveRedux';

export const actionTypes = {
    Login: "[Login] Action",
    Logout: "[Logout] Action",
    Register: "[Register] Action",
    Verified: "[Verified] Action",
    VerificationRequested: "[Request verification] Action",
    UserRequested: "[Request User] Action",
    UserLoaded: "[Load User] Auth API",
    loginSucceeded: "[login Succeeded] Auth API",
    loginCode: "[login code requested] Auth API"
};

export const initialAuthState = {
    user: undefined,
    authToken: undefined,
    verificationData: undefined,
    mobile: undefined,
    expire_date: undefined
};

export const reducer = persistReducer(
    { storage, key: "v-705-demo2-auth", whitelist: ["user", "authToken", "mobile", "expire_date"] },
    (state = initialAuthState, action) => {
        switch (action.type) {
            case actionTypes.Login: {
                console.log("login log payload", action.payload);
                const authToken = action.payload.AccessToken;
                // const { user } = action.user;
                const user = {
                    "AccessToken": action.payload.AccessToken,
                    "AccessTokenExpireTime": action.payload.AccessToken,
                    "credit": 0,
                    "first_name": action.payload.UserName,
                    "fullname": action.payload.UserName,
                    "gender": 1,
                    "last_name": action.payload.UserName,
                    "national_code": action.payload.UserName,

                };
                // const user = action.payload;
                console.log("login log user", user);
                return { authToken, user };
            }

            case actionTypes.Register: {
                let data = action.payload;
                let mobile = action.mobile;
                return { mobile: mobile, expire_date: data.verification_expire, user: undefined };
            }
            case actionTypes.loginCode: {
                let expire_date = action.payload.expire_date;
                let mobile = action.payload.mobile;
                return { mobile: mobile, expire_date: expire_date, user: undefined };
            }
            case actionTypes.Verified: {
                let data = action.payload;
                return { authToken: data.AccessToken, user: data };
            }

            case actionTypes.Logout: {
                // TODO: Change this code. Actions in reducer aren't allowed.
                return initialAuthState;
            }

            case actionTypes.UserLoaded: {
                const { user } = action.payload;
                return { ...state, user };
            }

            case actionTypes.VerificationRequested: {
                console.log(action)
                const { verificationData } = action.payload;
                return { ...state, verificationData };
            }

            default:
                return state;
        }
    }
);

export const actions = {
    login: user => ({ type: actionTypes.Login, payload: user }),
    loginSucceeded: () => ({ type: actionTypes.loginSucceeded }),
    loginCodeRequested: (expire_date, mobile) => ({ type: actionTypes.loginCode, payload: { expire_date: expire_date, mobile: mobile } }),
    register: (authData, mobile) => ({
        type: actionTypes.Register,
        payload: authData,
        mobile: mobile
    }),
    verify: (data) => ({ type: actionTypes.Verified, payload: data }),
    logout: () => ({ type: actionTypes.Logout }),
    requestUser: user => ({ type: actionTypes.UserRequested, payload: { user } }),
    requestVerification: (verificationData) => {
        return { type: actionTypes.VerificationRequested, payload: { verificationData } }
    },
    fulfillUser: user => ({ type: actionTypes.UserLoaded, payload: { user } }),
    // close_login_dialog: () => ({ type: reserveActionTypes.setVariable, varName: 'needs_login',payload:false })
};

export function* saga() {
    // yield takeLatest(actionTypes.Login, function* loginSaga() {
    //     yield put(actions.requestUser());
    // });

    // yield takeLatest(actionTypes.Register, function* registerSaga() {
    //     yield put(actions.requestVerification());
    //     // yield put(actions.requestUser());
    // });

    // yield takeLatest(actionTypes.UserRequested, function* userRequested() {
    //     const { data: user } = yield getUserByToken();
    //
    //     yield put(actions.fulfillUser(user));
    // });
}
