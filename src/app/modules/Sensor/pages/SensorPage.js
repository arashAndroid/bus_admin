/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";

import { Link, Switch, Redirect } from "react-router-dom";
import { connect, shallowEqual, useSelector } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import * as sensor from "../_redux/sensorRedux";
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
import SensorFormDetail from "./SensorFormDetail";
import SensorForm from "./SensorForm";
import { get_Sensors, get_all_sensor, get_all_sensor_not_selected, add_sensor, editSensor, deleteSensor, getSensorById } from "../_redux/sensorCrud";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function SensorPage(props) {

  // const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [isFirst, setIsFirst] = React.useState(true);
  const [currentData, setCurrentData] = React.useState([]);
  const [updateMode, setUpdateMode] = React.useState(false);
  const [addNew, setAddNew] = React.useState(false);



  const handleClickOpen = (isNew) => {
    setCurrentData([])
    setUpdateMode(false);
    setAddNew(true);
    setOpen(true);

  };

  const handleClose = () => {
    setOpen(false);
    setOpen(false);
  };

  const [collapsedHeader, setCollapsedHeader] = useState(true);
  let { state } = useSelector(
    (state) => ({
      state: state.sensor
    }),
    shallowEqual
  );
  if (state === undefined) state = {};
  let history = useHistory();
  if (isFirst) {
    setIsFirst(false);
    if (state.is_sensors_loaded == 0 || isFirst) {
      console.log("sensorPage props", props);

      get_all_sensor(props.parent, props.parent_id).then(res => {
        props.setSensors(res.data)

      })
    }
  }

  function removeSensor(d) {
    var Data;
    if (props.parent == 'gateway') {
      Data = {
        id: d.id,
        gateway_id: '',
      }

    } else if (props.parent == 'device') {
      Data = {
        id: d.id,
        device_id: '',
      }
    } else {
      Data = {
        id: d.id,
      }
    }
    editSensor(Data, Data.id).then(res => {
      get_all_sensor(props.parent, props.parent_id).then(res => {
        props.setSensors(res.data);
        handleClose();
      })
    })
  }

  function showDetial(d) {


    getSensorById(d.id).then(res => {

      setAddNew(false);
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
              <SensorCard title={d.sensor_name} description={d.domain_name} img={d.img} showDetial={() => showDetial(d)} removeSensor={() => removeSensor(d)} />
            );
          }) :
            ' '
          }


          <li className="addLi">
            <div className="addNewDev">
              <h1 className="addDev" onClick={() => handleClickOpen(true)}>
                Add New +
                </h1>
            </div>
          </li>
        </ul>
      </div>

      <Dialog
        maxWidth={'md'} fullWidth={true} open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className="appbar">
          <Toolbar>
            <IconButton edge="start" className="appbarText" color="inherit" onClick={handleClose} aria-label="close">
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>
        {addNew ?
          <SensorForm parent={props.parent} parent_id={props.parent_id} handleClose={handleClose} currentData={currentData} updateMode={updateMode} />
          : <SensorFormDetail parent={props.parent} parent_id={props.parent_id} handleClose={handleClose} currentData={currentData} updateMode={updateMode} />
        }
      </Dialog>
    </>
  );
}
export default injectIntl(connect(null, sensor.actions)(SensorPage));
