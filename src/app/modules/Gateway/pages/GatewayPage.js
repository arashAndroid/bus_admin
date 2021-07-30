/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";

import { Link, Switch, Redirect } from "react-router-dom";
import { connect, shallowEqual, useSelector } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import * as gateway from "../_redux/gatewayRedux";
import { get_gateways, get_all_gateways, addGateway, getGatewayById } from "../_redux/gatewayCrud";
import { useHistory } from "react-router-dom";
import GatewayCard from "./GatewayCard";
// import { makeStyles } from '@material-ui/core/styles';
import {
  Dialog, AppBar, Toolbar, IconButton, Typography, Button, List, ListItem,
  ListItemText, Divider, Slide, TextField,
  Select, MenuItem, FormControl, InputLabel
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import $ from 'jquery';
import AddGatewayForm from "./AddGatewayForm";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function GatewayPage(props) {

  // const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [currentData, setCurrentData] = React.useState([]);
  const [updateMode, setUpdateMode] = React.useState(false);



  const handleClickOpen = () => {
    setCurrentData([])
    setUpdateMode(false);
    setOpen(true);

  };

  const handleClose = () => {
    setOpen(false);
    setOpen(false);
  };

  const [collapsedHeader, setCollapsedHeader] = useState(true);
  let { state } = useSelector(
    (state) => ({
      state: state.gateway
    }),
    shallowEqual
  );
  if (state === undefined) state = {};
  let history = useHistory();


  if (state.is_gateways_loaded == 0) {


    get_all_gateways().then(res => {
      console.log("res", res);
      props.setGateways(res.data)
    })

  }


  console.log('props = ', props);
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <ul className="dcards">

          {state.gateways != null ? state.gateways.map(d => {
            return (
              <GatewayCard id={d.id} name={d.name} url={d.url} />
            );
          }) :
            ' '
          }


          <li className="addLi">
            <div className="addNewDev">
              <h1 className="addDev" onClick={handleClickOpen}>
                Add New +
                </h1>
            </div>
          </li>
        </ul>
      </div>

      <Dialog contentStyle={{ maxWidth: '900px' }} open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className="appbar">
          <Toolbar>
            <IconButton edge="start" className="appbarText" color="inherit" onClick={handleClose} aria-label="close">
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>
        <AddGatewayForm handleClose={handleClose} currentData={currentData} />

      </Dialog>
    </>
  );
}
export default injectIntl(connect(null, gateway.actions)(GatewayPage));
