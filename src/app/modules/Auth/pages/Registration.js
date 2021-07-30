import React, { useState } from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import { FormControl, InputLabel, Select } from '@material-ui/core'
import { Link } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import { register } from "../_redux/authCrud";

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  name: "",
  phone: "",
  company_name: "",
  password: "",
  role: "",
  changepassword: "",
  acceptTerms: false,
};

function Registration(props) {
  const { intl } = props;
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");
  const RegistrationSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(2, "Minimum 2 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    last_name: Yup.string()
      .min(2, "Minimum 2 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    company_name: Yup.string()
      .min(2, "Minimum 2 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    phone: Yup.string()
      .min(10, "Minimum 10 symbols")
      .max(12, "Maximum 12 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    email: Yup.string()
      .email("Wrong email format")
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    name: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),

    role: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    password: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    changepassword: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      )
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Password and Confirm Password didn't match"
        ),
      }),
    acceptTerms: Yup.bool().required(
      "You must accept the terms and conditions"
    ),
  });

  const enableLoading = () => {
    setLoading(true);
  };

  const handleChange = (e) => {
    setRole(e.target.value)
  }

  const disableLoading = () => {
    setLoading(false);
  };

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
    validationSchema: RegistrationSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      enableLoading();
      register(values.email, values.first_name, values.last_name, values.phone, values.company_name, values.name, values.password, values.role)
        .then(({ data: { accessToken } }) => {

          props.register(accessToken);
          disableLoading();
        })
        .catch((error) => {
          console.log('error', error);

          // error.then((e) => {
          //   console.log('message', e);
          // })
          setSubmitting(false);
          // console.log('data', error.response.data);
          // console.log('message', error.response.data.errors.email[0]);


          setStatus(
            intl.formatMessage({
              id: error.response.data.errors.email[0],
            })
          );
          disableLoading();
        });
    },
  });

  return (
    <div className="login-form login-signin" style={{ display: "block" }}>
      <div className="text-center mb-10 mb-lg-20">
        <h3 className="font-size-h1">
          <FormattedMessage id="AUTH.REGISTER.TITLE" />
        </h3>
        <p className="text-muted font-weight-bold">
          Enter your details to create your account
        </p>
      </div>

      <form
        id="kt_login_signin_form"
        className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
        onSubmit={formik.handleSubmit}
      >
        {/* begin: Alert */}
        {formik.status && (
          <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
            <div className="alert-text font-weight-bold">{formik.status}</div>
          </div>
        )}
        {/* end: Alert */}

        {/* begin: First name */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="First name"
            type="text"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "first_name"
            )}`}
            name="first_name"
            {...formik.getFieldProps("first_name")}
          />
          {formik.touched.first_name && formik.errors.first_name ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.first_name}</div>
            </div>
          ) : null}
        </div>
        {/* end: First name */}
        {/* begin: Last Name */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Last Name"
            type="text"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "last_name"
            )}`}
            name="last_name"
            {...formik.getFieldProps("last_name")}
          />
          {formik.touched.last_name && formik.errors.last_name ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.last_name}</div>
            </div>
          ) : null}
        </div>
        {/* end: Last Name */}

        {/* begin: Email */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Email"
            type="email"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "email"
            )}`}
            name="email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.email}</div>
            </div>
          ) : null}
        </div>
        {/* end: Email */}

        {/* begin: Username */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="User name"
            type="text"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "name"
            )}`}
            name="name"
            {...formik.getFieldProps("name")}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.name}</div>
            </div>
          ) : null}
        </div>
        {/* end: Username */}
        {/* begin: Phone */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Phone"
            type="text"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "phone"
            )}`}
            name="phone"
            {...formik.getFieldProps("phone")}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.phone}</div>
            </div>
          ) : null}
        </div>
        {/* end: phone */}
        {/* begin: Company name */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Company name"
            type="text"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "company_name"
            )}`}
            name="company_name"
            {...formik.getFieldProps("company_name")}
          />
          {formik.touched.company_name && formik.errors.company_name ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.company_name}</div>
            </div>
          ) : null}
        </div>
        {/* end: Company name */}


        {/* begin: role */}
        <div className="form-group fv-plugins-icon-container">


          <select className="form-control form-control-solid h-auto py-5 px-6"
            placeholder="Select Role" name="role"
            id="role" form="roleForm"
            onChange={handleChange}
            value={role}
            {...formik.getFieldProps("role")}

          >
            <option className="selectRole" value="">Select Role</option>
            <option value="1">Admin</option>
            <option value="2">Customer</option>
            <option value="3">Serviceman</option>
            <option value="4">Supplier</option>
          </select>


          {formik.touched.role && formik.errors.role ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.role}</div>
            </div>
          ) : null}
        </div>
        {/* end: role */}

        {/* begin: Password */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Password"
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
        {/* end: Password */}

        {/* begin: Confirm Password */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Confirm Password"
            type="password"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "changepassword"
            )}`}
            name="changepassword"
            {...formik.getFieldProps("changepassword")}
          />
          {formik.touched.changepassword && formik.errors.changepassword ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                {formik.errors.changepassword}
              </div>
            </div>
          ) : null}
        </div>
        {/* end: Confirm Password */}

        {/* begin: Terms and Conditions */}
        <div className="form-group">
          <label className="checkbox">
            <input
              type="checkbox"
              name="acceptTerms"
              {...formik.getFieldProps("acceptTerms")}
            />
            I agree the{" "}
            <Link to="/terms" target="_blank" rel="noopener noreferrer">
              Terms & Conditions
            </Link>
            .
            <span />
          </label>
          {formik.touched.acceptTerms && formik.errors.acceptTerms ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.acceptTerms}</div>
            </div>
          ) : null}
        </div>
        {/* end: Terms and Conditions */}
        <div className="form-group d-flex flex-wrap flex-center">
          <button
            type="submit"
            disabled={formik.isSubmitting || !formik.values.acceptTerms}
            className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4"
          >
            <span>Submit</span>
            {loading && <span className="ml-3 spinner spinner-white"></span>}
          </button>

          <Link to="/auth/login">
            <button
              type="button"
              className="btn btn-light-primary font-weight-bold px-9 py-4 my-3 mx-4"
            >
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default injectIntl(connect(null, auth.actions)(Registration));
