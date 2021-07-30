/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";

import { Link, Switch, Redirect } from "react-router-dom";
import { connect, shallowEqual, useSelector } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import * as sensor from "../_redux/sensorsRedux";
import { get_sensors, get_all_sensor, add_sensor, getSensorById } from "../_redux/sensorsCrud";
import { useHistory } from "react-router-dom";
import SensorCard from "./SensorCard";
// import { makeStyles } from '@material-ui/core/styles';
import {
  Dialog, AppBar, Toolbar, IconButton, Typography, Button, List, ListItem,
  ListItemText, Divider, Slide, TextField,
  Select, MenuItem, FormControl, InputLabel
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import $ from 'jquery';
import SensorForm from "./SensorForm";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function SensorPage(props) {

  // const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [isFirst, setIsFirst] = React.useState(true);
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
      state: state.sensors
    }),
    shallowEqual
  );
  if (state === undefined) state = {};
  let history = useHistory();
  if (isFirst) {
    setIsFirst(false);
    if (state.is_sensors_loaded == 0 || isFirst) {
      console.log("sensorPage props", props);

      get_all_sensor().then(res => {
        props.setSensors(res.data)
        console.log("sensorPage is_sensors_loaded", state.is_sensors_loaded);

      })
    }
  }



  function showDetial(d) {

    getSensorById(d.id).then(res => {
      console.log("details Sensor:", res.data)
      setCurrentData(res.data)
      setUpdateMode(true);
      setOpen(true)


    })

  }


  return (
    <>
      <div className="d-flex flex-column flex-root">
        <ul className="dcards">

          {state.sensors != null ? state.sensors.map(d => {
            return (
              <SensorCard id={d.id} title={d.sensor_name} description={d.description} img={d.img} showDetial={() => showDetial(d)} />
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

      <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className="appbar">
          <Toolbar>
            <IconButton edge="start" className="appbarText" color="inherit" onClick={handleClose} aria-label="close">
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>
        <SensorForm handleClose={handleClose} currentData={currentData} updateMode={updateMode} />

      </Dialog>
    </>
  );
}
export default injectIntl(connect(null, sensor.actions)(SensorPage));
