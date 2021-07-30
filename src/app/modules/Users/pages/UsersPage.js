/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";

import { Link, Switch, Redirect } from "react-router-dom";
import { connect, shallowEqual, useSelector } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import * as users from "../_redux/userRedux";
import { get_all_users } from "../_redux/userCrud";
import { useHistory } from "react-router-dom";
import UsersTable from "../../Users/pages/UsersTable";
import {
  Dialog, AppBar, Toolbar, IconButton, Typography, Button, List, ListItem,
  ListItemText, Divider, Slide, TextField,
  Select, MenuItem, FormControl, InputLabel
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import $ from 'jquery';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function UsersPage(props) {

  const [isLoaded, setIsLoaded] = React.useState(false);
  let { state } = useSelector(
    (state) => ({
      state: state.users
    }),
    shallowEqual
  );
  if (state === undefined) state = {};


  if (state.is_users_loaded == 0 || !isLoaded) {


    get_all_users().then(res => {
      console.log("res", res);
      setIsLoaded(true);
      props.setUsers(res.data)
    })


  }

  console.log('users 1= ', state.users);
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <UsersTable users={state.users} />
      </div>


    </>
  );
}
export default injectIntl(connect(null, users.actions)(UsersPage));
