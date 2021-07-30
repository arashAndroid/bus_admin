/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";

import { Link, Switch, Redirect } from "react-router-dom";
import { connect, shallowEqual, useSelector } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import * as profile from "../_redux/profileRedux";
import { editProfile, getUserByToken } from "../_redux/profileCrud";
import { useHistory } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import { CircularProgress } from "@material-ui/core";


import { put, takeLatest } from "redux-saga/effects";

// import { makeStyles } from '@material-ui/core/styles';
import {
  Dialog, AppBar, Toolbar, IconButton, Typography, Button, List, ListItem,
  ListItemText, Divider, Slide, TextField,
  Select, MenuItem, FormControl, InputLabel
} from '@material-ui/core'



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function ProfilePage(props) {
  const { user } = useSelector(state => state.auth);
  // const { authToken } = useSelector(state => state.auth);
  // const classNameNameNamees = useStyles();
  const [open, setOpen] = React.useState(false);
  const [currentData, setCurrentData] = React.useState([]);

  const [first_name, setFirstName] = React.useState('');
  const [name, setName] = React.useState('');
  const [last_name, setLastName] = React.useState('');
  const [company_name, setCompanyName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [job_title, setJobTitle] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [city, setCity] = React.useState('');
  const [phone_fax, setPhoneFax] = React.useState('');
  const [phone_station, setPhoneStation] = React.useState('');
  const [credit_card_type, setCreditCardType] = React.useState('');
  const [credit_card_number, setCreditCardNumber] = React.useState('');
  const [credit_card_expire_month, setCreditCardExpireMonth] = React.useState('');
  const [credit_card_expire_year, setCreditCardExpireYear] = React.useState('');
  const [credit_name_of_card, setCreditNameOfCard] = React.useState('');
  const [credit_security_number, setCreditSecurityNumber] = React.useState('');
  const [web, setWeb] = React.useState('');
  const [tempData, setTempData] = React.useState(currentData)








  const [collapsedHeader, setCollapsedHeader] = useState(true);
  let { state } = useSelector(
    (state) => ({
      state: state.profile
    }),
    shallowEqual
  );
  if (state === undefined) state = {};
  let history = useHistory();


  function handleChange(val) {
    var temp = user;
    console.log('id = ', val.target.id);
    switch (val.target.id) {
      case 'first_name':

        temp.first_name = (val.target.value)
        console.log('first name = ', temp.first_name);
        setFirstName(temp.first_name)
        break;
      case 'last_name':
        temp.last_name = (val.target.value)
        setLastName(temp.last_name)
        break;
      case 'company_name':
        temp.company_name = (val.target.value)
        setCompanyName(temp.company_name)
        break;
      case 'phone':
        temp.phone = (val.target.value)
        setPhone(temp.phone)
        break;
      case 'email':
        temp.email = (val.target.value)
        setEmail(temp.email)
        break;
      case 'password':
        temp.password = (val.target.value)
        setPassword(temp.password)
        break;
      case 'job_title':
        temp.job_title = (val.target.value)
        setJobTitle(temp.job_title)
        break;
      case 'country':
        temp.country = (val.target.value)
        setCountry(temp.country)
        break;
      case 'city':
        temp.city = (val.target.value)
        setCity(temp.city)
        break;
      case 'phone_fax':
        temp.phone_fax = (val.target.value)
        setPhoneFax(temp.phone_fax)
        break;
      case 'phone_station':
        temp.phone_station = (val.target.value)
        setPhoneStation(temp.phone_station)
        break;
      case 'credit_card_type':
        temp.credit_card_type = (val.target.value)
        setCreditCardType(temp.credit_card_type)
        break;
      case 'credit_card_number':
        temp.credit_card_number = (val.target.value)
        setCreditCardNumber(temp.credit_card_number)
        break;
      case 'credit_card_expire_month':
        temp.credit_card_expire_month = (val.target.value)
        setCreditCardExpireMonth(temp.credit_card_expire_month)
        break;
      case 'credit_card_expire_year':
        temp.credit_card_expire_year = (val.target.value)
        setCreditCardExpireYear(temp.credit_card_expire_year)
        break;
      case 'credit_name_of_card':
        temp.credit_name_of_card = (val.target.value)
        setCreditNameOfCard(temp.credit_name_of_card)
        break;
      case 'credit_security_number':
        temp.credit_security_number = (val.target.value)
        setCreditSecurityNumber(temp.credit_security_number)
        break;
      case 'web':
        temp.web = (val.target.value)
        setWeb(temp.web)
        break;


      default:
        break;
    }




  }

  function onSubmitEdit(params) {

    let Data = {
      id: user.id,
      first_name: user.first_name,
      name: user.name,
      last_name: user.last_name,
      company_name: user.company_name,
      phone: user.phone,
      email: user.email,
      job_title: user.job_title,
      country: user.country,
      city: user.city,
      phone_fax: user.phone_fax,
      phone_station: user.phone_station,
      credit_card_type: user.credit_card_type,
      credit_card_number: user.credit_card_number,
      credit_card_expire_month: user.credit_card_expire_month,
      credit_card_expire_year: user.credit_card_expire_year,
      credit_name_of_card: user.credit_name_of_card,
      credit_security_number: user.credit_security_number,
      web: user.web,



    }


    // console.log("Data = ", Data)

    console.log("authToken = ", user);


    props.loadingUser(0);
    editProfile(Data).then(res => {
      getUserByToken().then(res2 => {
        const { data: user } = res2;
        // put(profile.actions.fulfillUser(user));
        props.fulfillUser(user);

      }).catch(err => {
        console.log("err on edit Profile");
        props.loadingUser(1);
        console.log(err);
      })

    }).catch(err => {
      console.log("err on getUser Profile");
      props.loadingUser(1);
      console.log(err);
    })


  }





  return (

    state.is_profiles_loaded == 1 ?

      <div>

        <main className="has-dflex-center">
          <section>
            <div className="lx-container-70">
              <div className="lx-row">
                <h1 className="title">Edit your profile</h1>
              </div>
              <div className="lx-row align-stretch">
                <div className="lx-column column-user-pic">
                  <div className="profile-pic bs-md">
                    <div className="pic bs-md">
                      <img src="https://i.pinimg.com/564x/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg" alt="" width="4024" height="6048" loading="lazy"></img>
                      <a id="change-avatar" className="lx-btn"><i className="fas fa-camera-retro"></i>&nbsp;&nbsp;Change your profile picture.</a>
                    </div>

                  </div>
                  <form action="get">
                    <div className="fieldset">
                      <label for="first_name">First Name</label>
                      <div className="input-wrapper">
                        <span className="icon"><i className="fas fa-user"></i></span>
                        <input type="text" id="first_name" value={user.first_name} onChange={handleChange}></input>
                      </div>

                    </div>
                    <div className="fieldset">
                      <label for="last_name">Last Name</label>
                      <div className="input-wrapper">
                        <span className="icon"><i className="fas fa-user"></i></span>
                        <input type="text" id="last_name" value={user.last_name} onChange={handleChange}></input>
                      </div>

                    </div>
                    <div className="fieldset">
                      <label for="username">Username</label>
                      <div className="input-wrapper">
                        <span className="icon"><i className="fas fa-user"></i></span>
                        <input type="text" id="username" value={user.username} onChange={handleChange} ></input>
                      </div>

                    </div>

                    <div className="fieldset">
                      <label for="email">E-mail</label>
                      <div className="input-wrapper">
                        <span className="icon"><i className="fas fa-envelope"></i></span>
                        <input type="email" id="email" value={user.email} onChange={handleChange} ></input>
                      </div>
                      <div id="email-helper" className="helper"></div>
                    </div>
                    <div className="fieldset">
                      <label for="phone">Cell Number</label>
                      <div className="input-wrapper">
                        <span className="icon"><i className="fas fa-phone"></i></span>
                        <input type="text" id="phone" value={user.phone} onChange={handleChange} ></input>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="lx-column">
                  <form action="get">


                    <div className="fieldset">
                      <label for="company_name">Company Name</label>
                      <div className="input-wrapper">
                        <span className="icon"><i className="fas fa-building"></i></span>
                        <input type="text" id="company_name" value={user.company_name} onChange={handleChange} ></input>
                      </div>
                    </div>
                    <div className="fieldset">
                      <label for="role">Role</label>
                      <div className="input-wrapper">
                        <span className="icon"><i className="fas fa-envelope"></i></span>
                        <input type="text" id="role" value={user.occupation} onChange={handleChange} ></input>
                      </div>
                    </div>
                    <div className="fieldset">
                      <label for="job_title">Job Title</label>
                      <div className="input-wrapper">
                        <span className="icon"><i className="fas fa-building"></i></span>
                        <input type="text" id="job_title" value={user.job_title} onChange={handleChange} ></input>
                      </div>

                    </div>
                    <div className="fieldset">
                      <label for="country">Country</label>
                      <div className="input-wrapper">
                        <span className="icon"><i className="fas fa-address-card"></i></span>
                        <input type="text" id="country" value={user.country} onChange={handleChange} ></input>
                      </div>
                    </div>
                    <div className="fieldset">
                      <label for="state">State/Province</label>
                      <div className="input-wrapper">
                        <span className="icon"><i className="fas fa-address-card"></i></span>
                        <input type="text" id="state" value={user.state} onChange={handleChange}></input>
                      </div>
                    </div>
                    <div className="fieldset">
                      <label for="city-id">City</label>
                      <div className="input-wrapper">
                        <span className="icon"><i className="fas fa-address-card"></i></span>
                        <input type="text" id="city" value={user.city} onChange={handleChange}></input>
                      </div>
                    </div>

                    <div className="fieldset">
                      <label for="phone_fax">Fax Number</label>
                      <div className="input-wrapper">
                        <span className="icon"><i className="fas fa-phone"></i></span>
                        <input type="email" id="phone_fax" value={user.phone_fax} onChange={handleChange} ></input>
                      </div>
                    </div>
                    <div className="fieldset">
                      <label for="zip_code">Zip / Postal Code</label>
                      <div className="input-wrapper">
                        <span className="icon"><i className="fas fa-envelope"></i></span>
                        <input type="email" id="zip_code" value={user.zip_code} onChange={handleChange}></input>
                      </div>
                    </div>


                    <div className="actions">
                      <a id="cancel" className="lx-btn"><i className="fas fa-ban"></i>&nbsp;&nbsp;Cancel</a>
                      <a id="clear" className="lx-btn"><i className="fas fa-broom"></i>&nbsp;&nbsp;Clean</a>
                      <a id="save" className="lx-btn" onClick={onSubmitEdit}><i className="fas fa-save"></i>&nbsp;&nbsp;Save</a>
                    </div>
                  </form>
                </div>
                <div className="lx-column">
                  <form action="get">
                    <div className="fieldset">
                      <label for="phone_station">Phone Number</label>
                      <div className="input-wrapper">
                        <span className="icon"><i className="fas fa-phone"></i></span>
                        <input type="text" id="phone_station" value={user.phone_station} onChange={handleChange} ></input>
                      </div>
                    </div>
                    <div className="fieldset">
                      <label for="web">Website Address</label>
                      <div className="input-wrapper">
                        <span className="icon"><i className="fas fa-globe"></i></span>
                        <input type="text" id="web" value={user.web} onChange={handleChange}></input>
                      </div>
                    </div>
                    <div className="fieldset">
                      <label for="credit_card_type">Credit Card Type</label>
                      <div className="input-wrapper">
                        <span className="icon"><i className="fas fa-credit-card"></i></span>
                        <input type="text" id="credit_card_type" value={user.credit_card_type} onChange={handleChange} ></input>
                      </div>
                    </div>
                    <div className="fieldset">
                      <label for="credit_card_number">Credit Card Number</label>
                      <div className="input-wrapper">
                        <span className="icon"><i className="fas fa-credit-card"></i></span>
                        <input type="text" id="credit_card_number" value={user.credit_card_number} onChange={handleChange} ></input>
                      </div>
                    </div>
                    <div className="fieldset">
                      <label for="credit_card_expire_month">Credit Card Expire Month</label>
                      <div className="input-wrapper">
                        <span className="icon"><i className="fas fa-credit-card"></i></span>
                        <input type="number" id="credit_card_expire_month" value={user.credit_card_expire_month} onChange={handleChange} ></input>
                      </div>
                    </div>
                    <div className="fieldset">
                      <label for="credit_card_expire_year">Credit Card Expire Year</label>
                      <div className="input-wrapper">
                        <span className="icon"><i className="fas fa-credit-card"></i></span>
                        <input type="number" id="credit_card_expire_year" value={user.credit_card_expire_year} onChange={handleChange} ></input>
                      </div>
                    </div>
                    <div className="fieldset">
                      <label for="credit_name_of_card">Credit Name of card</label>
                      <div className="input-wrapper">
                        <span className="icon"><i className="fas fa-credit-card"></i></span>
                        <input type="text" id="credit_name_of_card" value={user.credit_name_of_card} onChange={handleChange} ></input>
                      </div>
                    </div>
                    <div className="fieldset">
                      <label for="credit_security_number">Credit Security Number</label>
                      <div className="input-wrapper">
                        <span className="icon"><i className="fas fa-credit-card"></i></span>
                        <input type="text" id="credit_security_number" value={user.credit_security_number} onChange={handleChange}  ></input>
                      </div>
                    </div>


                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>

        <script src="https://use.fontawesome.com/releases/v5.14.0/js/all.js" defer crossorigin="anonymous" data-search-pseudo-elements></script>

      </div> :
      <div className="loading">
        {/* <img
          src={toAbsoluteUrl("/media/logos/logo-mini-md.png")}
        /> */}
        <CircularProgress className="splash-screen-spinner" />
      </div>
  );
}


export default injectIntl(connect(null, profile.actions)(ProfilePage));



