/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/Homepage`, `src/app/BasePage`).
 */

import React from "react";
import { Redirect, Switch, Route, useLocation } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { Layout } from "../_metronic/layout";
import BasePage from "./BasePage";
import { Logout, AuthPage } from "./modules/Auth";
import Login from './../app/modules/Auth/pages/Login';
import ErrorsPage from "./modules/ErrorsExamples/ErrorsPage";

export function Routes(props) {
    const { user } = useSelector(state => state);
    const { isAuthorized } = useSelector(
        ({ auth }) => ({
            isAuthorized: auth.user,
        }),
        shallowEqual
    );
    // console.log( "props" ,Date.now());
    // var myDate = new Date(localStorage.getItem("tokenTime"));
    // var result = myDate.getTime();
    // console.log("convert" , result);

    const checkTokenIsVerify = () => {
        let isVerify = false;
        let date = new Date();
        let myDate = new Date(localStorage.getItem("tokenTime"));
        let result = myDate.getTime();

        if (date < myDate) { isVerify = true }
        else { isVerify = false }
        return (isVerify);
    }

    console.log("isVerify", checkTokenIsVerify());


    //  console.log(isAuthorized)
    let location = useLocation();
    let is_auth_path = location.pathname.substr(0, 6) === '/auth/' || location.pathname.substr(0, 7) === '/logout';
    return (
        <Switch>{checkTokenIsVerify() ?
            <>
                {(is_auth_path || !isAuthorized) ?
                    <>
                        { !isAuthorized ? (
                            /*Render auth page when user at `/auth` and not authorized.*/
                            <Route>
                                <AuthPage />
                            </Route>
                        ) : (
                            /*Otherwise redirect to root page (`/`)*/
                            <>
                                <Route path="/logout" component={Logout} />
                                <Redirect from="/auth" to="/" />
                            </>
                        )}
                    </>
                    :
                    <Layout>
                        <BasePage />
                    </Layout>
                }
            </>
            : (<>
                <Route>
                    <AuthPage />
                </Route>
                <Redirect to="/auth/login" />
            </>
            )
        }
            <Route path="/error" component={ErrorsPage} />
        </Switch>
    );
}
