
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import {Link, Switch, Redirect, useLocation} from "react-router-dom";
import {toAbsoluteUrl} from "../../../../_metronic/_helpers";
import {ContentRoute} from "../../../../_metronic/layout"
import Login from "./Login";
import Registration from "./Registration";
import ForgotPassword from "./ForgotPassword";
import "../../../../_metronic/_assets/sass/pages/login/classic/login-1.scss";
// import Verification from "./Verification";
// import LoginWithMobile from "./LoginWithMobile";

export function AuthPage(props) {
  let topLink = (<></>);
  let location = useLocation();
  location = location.pathname.split('/');
  if(location.length > 2){
    switch (location[2]) {
      case 'login':
        topLink = (<div className="position-absolute top-0 right-0 text-right mt-5 mb-15 mb-lg-0 flex-column-auto justify-content-center py-5 px-10">
          <span className="font-weight-bold text-dark-50">هنوز ثبت نام نکرده اید؟</span>
          <Link to="/auth/registration" className="font-weight-bold ml-2" id="kt_login_signup">ثبت نام کنید!</Link>
        </div>)
        break;
      case 'registration':
        topLink = (<div className="position-absolute top-0 right-0 text-right mt-5 mb-15 mb-lg-0 flex-column-auto justify-content-center py-5 px-10">
          <span className="font-weight-bold text-dark-50">قبلا ثبت نام کرده اید؟</span>
          <Link to="/auth/login" className="font-weight-bold ml-2" id="kt_login_signup">وارد شوید!</Link>
        </div>)
        break;
    }
  }
  return (
      <>
        <div className="d-flex flex-column flex-root">
          {/*begin::Login*/}
          <div
              className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-row-fluid bg-white"
              id="kt_login"
          >
            {/*begin::Content*/}
            <div className="flex-row-fluid d-flex flex-column position-relative p-7 overflow-hidden">
              {/*begin::Content header*/}
              {topLink}
              {/*end::Content header*/}

              {/* begin::Content body */}
              <div className="d-flex flex-column-fluid flex-center mt-30 mt-lg-0">
                <Switch>
                  <ContentRoute exact path="/auth/login" component={Login}/>
                  {/* <ContentRoute path="/auth/login-mobile" component={LoginWithMobile}/> */}
                  <ContentRoute path="/auth/registration" component={Registration}/>
                  {/* <ContentRoute path="/auth/verification" component={Verification}/> */}
                  <ContentRoute
                      path="/auth/forgot-password"
                      component={ForgotPassword}
                  />
                  <Redirect from="/auth" exact={true} to="/auth/login"/>
                  <Redirect to="/auth/login"/>
                </Switch>
              </div>
              {/*end::Content body*/}

              {/* begin::Mobile footer */}
              <div
                  className="d-flex d-lg-none flex-column-auto flex-column flex-sm-row justify-content-between align-items-center mt-5 p-5">
                <div className="text-dark-50 font-weight-bold order-2 order-sm-1 my-2">
                  &copy; 2020 EBUS
                </div>
                <div className="d-flex order-1 order-sm-2 my-2">
                  <Link to="/terms" className="text-dark-75 text-hover-primary">
                    حریم شخصی
                  </Link>
                  <Link
                      to="/terms"
                      className="text-dark-75 text-hover-primary ml-4"
                  >
                    قوانین
                  </Link>
                  <Link
                      to="/terms"
                      className="text-dark-75 text-hover-primary ml-4"
                  >
                    تماس با ما
                  </Link>
                </div>
              </div>
              {/* end::Mobile footer */}
            </div>
            {/*end::Content*/}
            {/*begin::Aside*/}
            <div
                className="login-aside d-flex flex-row-auto bgi-size-cover bgi-no-repeat p-10 p-lg-10"
                style={{
                  backgroundImage: `url(${toAbsoluteUrl("/media/bg/bg-8.jpg")})`
                }}
            >
              {/*begin: Aside Container*/}
              <div className="d-flex flex-row-fluid flex-column justify-content-between">
                {/* start:: Aside header */}
                <Link to="/" className="flex-column-auto mt-5">
                  <img
                      alt="Logo"
                      className="max-h-70px"
                      src={toAbsoluteUrl("/media/logos/logo-light.png")}
                  />
                </Link>
                {/* end:: Aside header */}

                {/* start:: Aside content */}
                <div className="flex-column-fluid d-flex flex-column justify-content-center">
                  <h3 className="font-size-h1 mb-5 text-white">
                    به Ebus خوش آمدید
                  </h3>
                  <p className="font-weight-lighter text-white opacity-80">
                  پنل مدیریت 
                  </p>
                </div>
                {/* end:: Aside content */}

                {/* start:: Aside footer for desktop */}
                <div className="d-none flex-column-auto d-lg-flex justify-content-between mt-10">
                  <div className="opacity-70 font-weight-bold	text-white">
                    &copy; 2020 Ebus
                  </div>
                  <div className="d-flex">
                    <Link to="/terms" className="text-white">
                      حریم شخصی
                    </Link>
                    <Link to="/terms" className="text-white ml-10">
                      قوانین
                    </Link>
                    <Link to="/terms" className="text-white ml-10">
                      تماس با ما
                    </Link>
                  </div>
                </div>
                {/* end:: Aside footer for desktop */}
              </div>
              {/*end: Aside Container*/}
            </div>
            {/*begin::Aside*/}

          </div>
          {/*end::Login*/}
        </div>
      </>
  );
}
