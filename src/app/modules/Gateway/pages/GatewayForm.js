/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { connect, shallowEqual, useSelector } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import * as gateway from "../_redux/gatewayRedux";
import { Close } from '@material-ui/icons'
import { CircularProgress } from "@material-ui/core";

import { get_gateways, get_all_gateways, addGateway, editGateway, deleteGateway, getGatewayById } from "../_redux/gatewayCrud";

import {
    Dialog, AppBar, Toolbar, IconButton, Typography, Button, List, ListItem,
    ListItemText, Divider, Slide, TextField,
    Select, MenuItem, FormControl, InputLabel
} from '@material-ui/core'
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
function GatewayForm(props) {
    console.log('gateway form props =', props);
    const { handleClose } = props;
    const [name, setName] = React.useState('');
    const [url, setUrl] = React.useState('');
    const [serial_number, setSerialNumber] = React.useState('');
    const [ip, setIp] = React.useState('');
    const [sim_number, setSimNumber] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [connection_type, setConnectionType] = React.useState('');
    const [connection_user, setConnectionUser] = React.useState(0);
    const [connection_password, setConnectionPassword] = React.useState(0);
    const [wifi_name, setWifiName] = React.useState(0);
    const [model, setModel] = React.useState(0);
    const [install_date, setInstallDate] = React.useState(0);
    const [port_count, setPortCount] = React.useState(0);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [currentData, setCurrentData] = React.useState({});
    const [updateMode, setUpdateMode] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const [tempData, setTempData] = React.useState()
    console.log('gateway form currentData =', currentData);
    let history = useHistory();
    function onSubmit(params) {
        let Data = {

            name: name,
            url: url,
            serial_number: serial_number,
            ip: ip,
            sim_number: sim_number,
            location: location,
            connection_type: connection_type,
            connection_user: connection_user,
            connection_password: connection_password,
            wifi_name: wifi_name,
            model: model,
            install_date: install_date,
            port_count: port_count

        }
        addGateway(Data).then(res => {
            get_all_gateways().then(res => {
                props.setGateways(res.data)
            })
            handleClose();

        })
    }
    function onDelete(params) {
        deleteGateway(tempData.id).then(res => {
            get_all_gateways().then(res => {
                props.setGateways(res.data)
                handleCloseDelete();
                history.push('/gateways');
            })
        })
        // handleCloseDelete();

    }

    function onSubmitEdit(params) {
        setIsSubmitting(true);
        let Data = {
            id: tempData.id,
            name: tempData.name,
            url: tempData.url,
            serial_number: tempData.serial_number,
            ip: tempData.ip,
            sim_number: tempData.sim_number,
            location: tempData.location,
            connection_type: tempData.connection_type,
            connection_user: tempData.connection_user,
            connection_password: tempData.connection_password,
            wifi_name: tempData.wifi_name,
            model: tempData.model,
            install_date: tempData.install_date,
            port_count: tempData.port_count

        }
        console.log(Data)
        editGateway(Data, Data.id).then(res => {
            get_all_gateways().then(res => {
                props.setGateways(res.data)
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
            case 'url':
                temp.url = (val.target.value)

                setUrl(temp.url)
                break;
            case 'serial_number':
                temp.serial_number = (val.target.value)

                setSerialNumber(temp.serial_number)
                break;
            case 'ip':
                temp.ip = (val.target.value)

                setIp(temp.ip)
                break;
            case 'sim_number':
                temp.sim_number = (val.target.value)

                setSimNumber(temp.sim_number)
                break;
            case 'location':
                temp.location = (val.target.value)

                setLocation(temp.location)
                break;
            case 'connection_type':
                temp.connection_type = (val.target.value)

                setConnectionType(temp.connection_type)
                break;
            case 'connection_user':
                temp.connection_user = (val.target.value)

                setConnectionUser(temp.connection_user)
                break;
            case 'connection_password':
                temp.connection_password = (val.target.value)
                setConnectionPassword(temp.connection_password)
                break;
            case 'wifi_name':
                temp.wifi_name = (val.target.value)

                setWifiName(temp.wifi_name)
                break;
            case 'model':
                temp.accelermodelomter = (val.target.value)
                setModel(temp.model)
                break;
            case 'install_date':
                temp.install_date = (val.target.value)
                setInstallDate(temp.install_date)
                break;
            case 'port_count':
                temp.port_count = (val.target.value)
                setPortCount(temp.port_count)
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
        getGatewayById(props.id).then(res => {
            setIsLoaded(true);
            console.log("details:", res.data)

            setCurrentData(res.data);
            setTempData(res.data);
            setUpdateMode(true);

        })
    }


    console.log('gateway form tempData =', tempData);

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
                            label="Gateway Name"
                            variant="outlined"
                            value={tempData.name}

                        />
                        <TextField
                            onChange={handleChange}
                            name="url"
                            id="outlined-helperText"
                            label="Gateway URL"
                            variant="outlined"
                            value={tempData.url}

                        />
                        <TextField
                            onChange={handleChange}

                            name="serial_number"
                            id="outlined-helperText"
                            label="Serial Number"
                            variant="outlined"
                            value={tempData.serial_number}

                        />
                        <TextField
                            onChange={handleChange}

                            name="ip"
                            id="outlined-helperText"
                            label="Gateway IP"
                            variant="outlined"
                            value={tempData.ip}

                        />
                        <TextField
                            onChange={handleChange}

                            name="sim_number"
                            id="outlined-helperText"
                            label="Sim Number"
                            variant="outlined"
                            value={tempData.sim_number}

                        />

                    </ListItem>

                    <div style={{ marginTop: 5, marginBottom: 5 }} ></div>
                    <ListItem >
                        <TextField
                            onChange={handleChange}

                            name="location"
                            id="outlined-helperText"
                            label="Location"
                            variant="outlined"
                            value={tempData.location}

                        />
                        <TextField
                            onChange={handleChange}
                            name="connection_type"
                            id="outlined-helperText"
                            label="Connection Type"
                            variant="outlined"
                            value={tempData.connection_type}

                            style={{ width: '220px' }}

                        />
                        <TextField
                            value={tempData.connection_user}
                            onChange={handleChange}
                            name="connection_user"
                            id="outlined-helperText"
                            label="Connection User"
                            variant="outlined"
                        />
                        <TextField
                            value={tempData.connection_password}
                            onChange={handleChange}
                            name="connection_password"
                            id="outlined-helperText"
                            label="Connection Password"
                            variant="outlined"
                        />



                    </ListItem>
                    <div style={{ marginTop: 5, marginBottom: 5 }} ></div>
                    <ListItem >
                        <FormControl variant="outlined" >
                            <InputLabel htmlFor="outlined-age-native-simple">Gateway Model</InputLabel>
                            <Select
                                native
                                style={{ width: '150px' }}
                                value={tempData.model}

                                onChange={handleChange}
                                label="Gateway Model"
                                inputProps={{
                                    name: 'model',
                                    id: 'outlined-age-native-simple',
                                }}
                            >
                                <option aria-label="None" value="" />
                                <option value={1}>Model 1</option>
                                <option value={2}>Model 2</option>
                                <option value={3}>Model 3</option>
                            </Select>
                        </FormControl>



                        <TextField
                            onChange={handleChange}
                            name="wifi_name"
                            id="outlined-helperText"
                            label="Wi-fi Name"
                            variant="outlined"
                            value={tempData.wifi_name}

                        />
                        <TextField

                            onChange={handleChange}
                            name="install_date"
                            id="outlined-helperText"
                            label="Install Date"
                            variant="outlined"
                            value={tempData.install_date}

                        />
                        <TextField
                            onChange={handleChange}
                            name="port_count"
                            id="outlined-helperText"
                            label="Port Count"
                            variant="outlined"
                            value={tempData.port_count}

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
export default injectIntl(connect(null, gateway.actions)(GatewayForm));
