/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { connect, shallowEqual, useSelector } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import * as device from "../_redux/deviceRedux";
import { Close } from '@material-ui/icons'
import { CircularProgress } from "@material-ui/core";

import { get_devices, get_all_devices, addDevice, editDevice, deleteDevice, getDeviceById } from "../_redux/deviceCrud";

import {
    Dialog, AppBar, Toolbar, IconButton, Typography, Button, List, ListItem,
    ListItemText, Divider, Slide, TextField,
    Select, MenuItem, FormControl, InputLabel
} from '@material-ui/core'
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
function DeviceForm(props) {
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
    const [openDelete, setOpenDelete] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const [tempData, setTempData] = React.useState()
    console.log('device form currentData =', currentData);
    let history = useHistory();
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
    function onDelete(params) {
        deleteDevice(tempData.id).then(res => {
            get_all_devices().then(res => {
                props.setDevices(res.data)
                handleCloseDelete();
                history.push('/devices');
            })
        })
        // handleCloseDelete();

    }

    function onSubmitEdit(params) {
        setIsSubmitting(true);
        let Data = {
            id: tempData.id,
            name: tempData.name,
            model: tempData.model,
            production_year: tempData.production_year,
            production_series: tempData.production_series,
            manufacturer: tempData.manufacturer,
            brand: tempData.brand,

        }
        console.log(Data)
        editDevice(Data, Data.id).then(res => {
            get_all_devices().then(res => {
                props.setDevices(res.data)
                handleClose();
                setIsSubmitting(false);
            })
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
    const handleCloseDelete = () => {
        setOpenDelete(false);
        setOpenDelete(false);
    };
    const openOnDelete = () => {
        setOpenDelete(true);
    };

    if (!isLoaded) {
        getDeviceById(props.id).then(res => {
            setIsLoaded(true);
            console.log("details:", res.data)

            setCurrentData(res.data);
            setTempData(res.data);
            setUpdateMode(true);

        })
    }


    console.log('device form tempData =', tempData);

    return (
        <>
            <Dialog contentStyle={{ maxWidth: '900px' }} open={openDelete} onClose={handleCloseDelete} TransitionComponent={Transition}>
                <AppBar className="appbar">
                    <Toolbar>
                        <IconButton edge="start" className="appbarText" color="inherit" onClick={handleCloseDelete} aria-label="close">
                            <Close />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <h3 style={{ marginTop: 20, marginBottom: 20, marginLeft: 20 }}>Are You Sure?</h3>
                <div style={{ marginTop: 20, marginBottom: 20, marginRight: 20 }}>
                    <button id="dbtn" onClick={onDelete}></button>
                </div>

            </Dialog>
            {tempData ?
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
                    {
                        updateMode ?
                            <div>
                                <button id="sbtn" onClick={onSubmitEdit}></button>
                                <button id="dbtn" onClick={openOnDelete}></button>
                                {isSubmitting ? <p style={{ marginTop: 5, marginBottom: 5 }} >    Submitting ...    </p> : <div></div>}
                            </div>
                            :
                            <button id="sbtn" onClick={onSubmit}></button>
                    }
                    <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                </List> : <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "150px" }}><CircularProgress className="splash-screen-spinner" /></div>
            }
        </>
    );
}
export default injectIntl(connect(null, device.actions)(DeviceForm));
