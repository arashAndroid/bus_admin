/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";

import { connect, shallowEqual, useSelector } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import * as sensor from "../_redux/sensorRedux";
import { get_Sensors, get_all_sensor, get_all_sensor_not_selected, add_sensor, editSensor, deleteSensor } from "../_redux/sensorCrud";

import SensorCardNotSelected from "./SensorCardNotSelected";
import {
    Dialog, AppBar, Toolbar, IconButton, Typography, Button, List, ListItem,
    ListItemText, Divider, Slide, TextField,
    Select, MenuItem, FormControl, InputLabel
} from '@material-ui/core'

function SensorForm(props) {
    const { handleClose, currentData } = props;

    // const [currentData , setCurrentData] = React.useState([]);
    const [tempData, setTempData] = React.useState(currentData);
    const [isLoaded, setIsLoaded] = React.useState(false);
    let { state } = useSelector(
        (state) => ({
            state: state.sensor
        }),
        shallowEqual
    );
    if (state === undefined) state = {};
    // setd(currentData)



    function chooseSensor(d) {
        var Data;
        if (props.parent == 'gateway') {
            Data = {
                id: d.id,
                gateway_id: props.parent_id,
            }

        } else if (props.parent == 'device') {
            Data = {
                id: d.id,
                device_id: props.parent_id,
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
    if (!isLoaded) {
        console.log("sensorPage props", props);
        get_all_sensor_not_selected(props.parent, props.parent_id).then(res => {
            setIsLoaded(true);
            props.setSensorsNotSelected(res.data);
        })
    }
    return (
        <>

            <div style={{ minHeight: '300px', }} className="d-flex flex-column flex-root">
                <ul className="dcards">
                    {state.sensors_not_selected != null ? state.sensors_not_selected.map(d => {
                        return (
                            <SensorCardNotSelected title={d.sensor_name} description={d.description} img={d.img} chooseSensor={() => chooseSensor(d)} />
                        );
                    }) :
                        <div>
                            <h3 style={{ marginTop: 20, marginRight: 20, marginLeft: 20, marginBottom: 20 }}>No Sensors</h3>
                        </div>
                    }
                </ul>
            </div>

        </>
    );
}
export default injectIntl(connect(null, sensor.actions)(SensorForm));
