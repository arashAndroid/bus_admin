import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import { login } from "../_redux/authCrud";
/*
  INTL (i18n) docs:
  https://github.com/formatjs/react-intl/blob/master/docs/Components.md#formattedmessage
*/

/*
  Formik+YUP:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
*/

const initialValues = {
    mobile_number: "",
    password: "",
};

function Login(props) {
    const { intl } = props;
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const LoginSchema = Yup.object().shape({
        mobile_number: Yup.string()
            .min(3, "حداقل 3 حرف")
            .max(50, "حداکثر 50 حرف")
            .required(
                intl.formatMessage({
                    id: "فیلد را پر کنید",
                })
            ),
        password: Yup.string()
            .min(3, "حداقل 3 حرف")
            .max(50, "حداکثر 50 حرف")
            .required(
                intl.formatMessage({
                    id: "فیلد را پر کنید",
                })
            ),
    });

    const getInputClasses = (fieldname) => {
        if (formik.touched[fieldname] && formik.errors[fieldname]) {
            return "is-invalid";
        }

        if (formik.touched[fieldname] && !formik.errors[fieldname]) {
            return "is-valid";
        }

        return "";
    };

    const formik = useFormik({
        initialValues,
        validationSchema: LoginSchema,
        onSubmit: (values, { setStatus, setSubmitting }) => {
            setLoading(true);
            login(values.mobile_number, values.password)
                .then((data) => {
                    let response = data.data;
                    let status = parseInt(data.status);
                    setLoading(false);
                    setSubmitting(false);
                    if (status === 404) {
                        setStatus(
                            intl.formatMessage({
                                id: "AUTH.VALIDATION.INVALID_LOGIN",
                            })
                        );
                    } else if (status === 200) {

                        props.login(response);
                        let tokenTime = response["AccessTokenExpireTime"];
                        console.log("login log AccessTokenExpireTime", tokenTime);

                        localStorage.setItem("tokenTime", tokenTime);
                    }
                })
                .catch((error) => {
                    console.log(error)
                    setLoading(false);
                    setSubmitting(false);
                    setStatus(
                        intl.formatMessage({
                            id: "AUTH.VALIDATION.INVALID_LOGIN",
                        })
                    );
                });
        },
    });
    // const formik = useFormik({
    //     initialValues,
    //     validationSchema: LoginSchema,
    //     onSubmit: (values, { setStatus, setSubmitting }) => {
    //         setLoading(true);
    //         login(values.mobile_number, values.password)
    //             .then((data) => {
    //                 let response = data.data;
    //                 let status = parseInt(response.Status);
    //                 setLoading(false);
    //                 setSubmitting(false);
    //                 if (response.AccessToken == null) {
    //                     setStatus(
    //                         intl.formatMessage({
    //                             id: response.ErrorMessage,
    //                         })
    //                     );
    //                 } else if (response.AccessToken != null) {
    //                     props.login(response);
    //                     localStorage.setItem("Token", response.AccessToken)
    //                 }
    //             })
    //             .catch((error) => {
    //                 console.log(error)
    //                 setLoading(false);
    //                 setSubmitting(false);
    //                 setStatus(
    //                     intl.formatMessage({
    //                         id: "نام کاربری یا رمز عبور صحیح نمیباشد",
    //                     })
    //                 );
    //             });
    //     },
    // });


    return (
        <div className="login-form login-signin" id="kt_login_signin_form">
            {/* begin::Head */}
            <div className="text-center mb-10 mb-lg-20">
                <h3 className="font-size-h1">
                    {/* <FormattedMessage id="AUTH.LOGIN.TITLE"/> */}
                    ورود ادمین
                </h3>
                <p className="text-muted font-weight-bold">
                    {/* <FormattedMessage id="AUTH.LOGIN.TITLE2"/> */}
                      پنل مدیریت
                </p>
            </div>
            {/* end::Head */}

            {/*begin::Form*/}
            <form
                onSubmit={formik.handleSubmit}
                className="form fv-plugins-bootstrap fv-plugins-framework"
            >
                {formik.status ? (
                    <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
                        <div className="alert-text font-weight-bold">{formik.status}</div>
                    </div>
                ) : (
                    <div>

                    </div>
                )}

                <div className="form-group fv-plugins-icon-container">
                    <input
                        placeholder="شماره مویایل"
                        type="text"
                        className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                            "mobile_number"
                        )}`}
                        name="mobile_number"
                        {...formik.getFieldProps("mobile_number")}
                    />
                    {formik.touched.mobile_number && formik.errors.mobile_number ? (
                        <div className="fv-plugins-message-container">
                            <div className="fv-help-block">{formik.errors.mobile_number}</div>
                        </div>
                    ) : null}
                </div>
                <div className="form-group fv-plugins-icon-container">
                    <input
                        placeholder="رمز عبور"
                        type="password"
                        className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                            "password"
                        )}`}
                        name="password"
                        {...formik.getFieldProps("password")}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="fv-plugins-message-container">
                            <div className="fv-help-block">{formik.errors.password}</div>
                        </div>
                    ) : null}
                </div>
                <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
                    <a
                        onClick={() => {
                            history.push('/auth/login-mobile')
                        }}
                        className="text-dark-50 text-hover-primary my-3 mr-2"
                        id="kt_login_forgot"
                    >
                        <FormattedMessage id="فراموشی رمز عبور" />
                    </a>
                    <button
                        id="submit_form"
                        type="submit"
                        disabled={formik.isSubmitting}
                        className={`btn btn-primary font-weight-bold px-9 py-4 my-3`}
                    >
                        <span>ورود</span>
                        {loading && <span className="ml-3 spinner spinner-white"></span>}
                    </button>
                </div>
            </form>
            {/*end::Form*/}
        </div>
    )
};
export default injectIntl(connect(null, auth.actions)(Login));
