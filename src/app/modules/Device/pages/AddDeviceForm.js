/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";

import { connect, shallowEqual, useSelector } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import * as device from "../_redux/deviceRedux";
import { CircularProgress } from "@material-ui/core";

import { get_devices, get_all_devices, addDevice, editDevice, deleteDevice, getDeviceById } from "../_redux/deviceCrud";

import {
    Dialog, AppBar, Toolbar, IconButton, Typography, Button, List, ListItem,
    ListItemText, Divider, Slide, TextField,
    Select, MenuItem, FormControl, InputLabel
} from '@material-ui/core'

function AddDeviceForm(props) {
    console.log('device form props =', props);
    const { handleClose } = props;
    const [name, setName] = React.useState('');
    const [model, setModel] = React.useState('');
    const [production_year, setProductionYear] = React.useState('');
    const [production_series, setProductionSeries] = React.useState('');
    const [manufacturer, setManufacturer] = React.useState('');
    const [brand, setBrand] = React.useState('');
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [currentData, setCurrentData] = React.useState({});
    const [updateMode, setUpdateMode] = React.useState(false);

    const [tempData, setTempData] = React.useState(currentData)
    console.log('device form currentData =', currentData);
    function onSubmit(params) {
        let Data = {

            name: name,
            model: model,
            production_year: production_year,
            production_series: production_series,
            manufacturer: manufacturer,
            brand: brand,


        }
        addDevice(Data).then(res => {
            get_all_devices().then(res => {
                props.setDevices(res.data)
            })
            handleClose();

        })
    }


    function handleChange(val) {
        var temp = tempData;

        switch (val.target.name) {
            case 'name':
                temp.name = (val.target.value)
                setName(temp.name)
                break;
            case 'model':
                temp.model = (val.target.value)

                setModel(temp.model)
                break;
            case 'production_year':
                temp.production_year = (val.target.value)

                setProductionYear(temp.production_year)
                break;
            case 'production_series':
                temp.production_series = (val.target.value)

                setProductionSeries(temp.production_series)
                break;
            case 'manufacturer':
                temp.manufacturer = (val.target.value)

                setManufacturer(temp.manufacturer)
                break;
            case 'brand':
                temp.brand = (val.target.value)

                setBrand(temp.brand)
                break;

            default:
                break;
        }

    }


    console.log('device form tempData =', tempData);

    return (
        <>

            <List>
                <ListItem  >
                    <TextField
                        onChange={handleChange}
                        name="name"
                        id="outlined-helperText"
                        label="Device Name"
                        variant="outlined"
                        value={tempData.name}

                    />
                    <TextField
                        onChange={handleChange}
                        name="model"
                        id="outlined-helperText"
                        label="Device Model"
                        variant="outlined"
                        value={tempData.model}

                    />
                    <TextField
                        onChange={handleChange}

                        name="production_year"
                        id="outlined-helperText"
                        label="Production Year"
                        variant="outlined"
                        value={tempData.production_year}

                    />


                </ListItem>

                <div style={{ marginTop: 5, marginBottom: 5 }} ></div>
                <ListItem  >
                    <TextField
                        onChange={handleChange}

                        name="manufacturer"
                        id="outlined-helperText"
                        label="Manufacturer"
                        variant="outlined"
                        value={tempData.manufacturer}

                    />
                    <TextField
                        onChange={handleChange}

                        name="brand"
                        id="outlined-helperText"
                        label="Brand"
                        variant="outlined"
                        value={tempData.brand}

                    />
                </ListItem>

                <div style={{ marginTop: 5, marginBottom: 5 }} ></div>

                <button id="sbtn" onClick={onSubmit}></button>

                <Divider style={{ marginTop: 20, marginBottom: 20 }} />
            </List>
        </>
    );
}
export default injectIntl(connect(null, device.actions)(AddDeviceForm));
