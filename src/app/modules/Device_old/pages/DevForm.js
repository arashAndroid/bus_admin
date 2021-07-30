/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";

import { connect, shallowEqual, useSelector } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import * as device from "../_redux/deviceRedux";
import { get_devices, get_all_dev, add_dev, editDevice, deleteDevice } from "../_redux/deviceCrud";

import {
    Dialog, AppBar, Toolbar, IconButton, Typography, Button, List, ListItem,
    ListItemText, Divider, Slide, TextField,
    Select, MenuItem, FormControl, InputLabel
} from '@material-ui/core'

function DevForm(props) {
    const { handleClose, currentData, updateMode } = props;
    const [sensor_name, setSensorName] = React.useState('');
    const [sensor_password, setSensorPassword] = React.useState('');
    const [wifi_name, setWifiName] = React.useState('');
    const [wifi_password, setWifiPassword] = React.useState('');
    const [domain_name, setDomainName] = React.useState('');
    const [data_link, setDataLink] = React.useState('');
    const [time_delay, setTimeDelay] = React.useState('');
    const [filter, setFilter] = React.useState(0);
    const [run, setRun] = React.useState(0);
    const [fifo, setFifo] = React.useState(0);
    const [acceleromter, setacceleromter] = React.useState(0);
    const [self, setSelf] = React.useState(0);
    const [axis, setAxis] = React.useState(0);
    const [acc_bandwidth, setAccBandwidth] = React.useState(0);
    const [device_code, setDeviceCode] = React.useState(0);
    const [sensor_code, setSensorCode] = React.useState(0);
    const [device_app, setDeviceApp] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [ip, setIp] = React.useState('');
    const [sim, setSim] = React.useState('');
    // const [currentData , setCurrentData] = React.useState([]);
    const [tempData, setTempData] = React.useState(currentData)

    // setd(currentData)


    function onSubmit(params) {



        let Data = {
            title: sensor_name,
            img: 'dcard__image--flowers',
            description: 'This is a Temp Sensor',
            sensor_name: sensor_name,
            sensor_password: sensor_password,
            wifi_name: wifi_name,
            wifi_password: wifi_password,
            domain_name: domain_name,
            data_link: data_link,
            time_delay: time_delay,
            filter: filter,
            run: run,
            fifo: fifo,
            acceleromter: acceleromter,
            self: self,
            axis: axis,
            acc_bandwidth: acc_bandwidth,
            device_code: device_code,
            sensor_code: sensor_code,
            device_app: device_app,
            location: location,
            ip: ip,
            sim: sim

        }



        // UNCOMMENT THIS TO SEND DATA TO API 
        add_dev(Data).then(res => {
            get_all_dev().then(res => {
                props.setDevices(res.data)
            })
            handleClose();

        })


    }

    function onDelete(params) {

        deleteDevice(tempData.id).then(res => {
            get_all_dev().then(res => {
                props.setDevices(res.data)
                handleClose();

            })
        })
    }

    function onSubmitEdit(params) {



        let Data = {
            id: tempData.id,
            title: tempData.sensor_name,
            img: 'dcard__image--flowers',
            description: 'This is a Temp Sensor',
            sensor_name: tempData.sensor_name,
            sensor_password: tempData.sensor_password,
            wifi_name: tempData.wifi_name,
            wifi_password: tempData.wifi_password,
            domain_name: tempData.domain_name,
            data_link: tempData.data_link,
            time_delay: tempData.time_delay,
            filter: tempData.filter,
            run: tempData.run,
            fifo: tempData.fifo,
            acceleromter: tempData.acceleromter,
            self: tempData.self,
            axis: tempData.axis,
            acc_bandwidth: tempData.acc_bandwidth,
            device_code: tempData.device_code,
            sensor_code: tempData.sensor_code,
            device_app: tempData.device_app,
            location: tempData.location,
            ip: tempData.ip,
            sim: tempData.sim

        }


        console.log(Data)




        editDevice(Data, Data.id).then(res => {
            get_all_dev().then(res => {
                props.setDevices(res.data)
                handleClose();

            })

        })


    }



    function handleChange(val) {
        var temp = tempData;

        switch (val.target.name) {
            case 'sensor_name':
                temp.sensor_name = (val.target.value)
                setSensorName(temp.sensor_name)
                break;
            case 'sensor_password':
                temp.sensor_password = (val.target.value)

                setSensorPassword(temp.sensor_password)
                break;
            case 'wifi_name':
                temp.wifi_name = (val.target.value)

                setWifiName(temp.wifi_name)
                break;
            case 'wifi_password':
                temp.wifi_password = (val.target.value)

                setWifiPassword(temp.wifi_password)
                break;
            case 'domain_name':
                temp.domain_name = (val.target.value)

                setDomainName(temp.domain_name)
                break;
            case 'data_link':
                temp.data_link = (val.target.value)

                setDataLink(temp.data_link)
                break;
            case 'time_delay':
                temp.time_delay = (val.target.value)

                setTimeDelay(temp.time_delay)
                break;
            case 'filter':
                temp.filter = (val.target.value)

                setFilter(temp.filter)
                break;
            case 'run':
                temp.run = (val.target.value)
                setRun(temp.run)
                break;
            case 'fifo':
                temp.fifo = (val.target.value)

                setFifo(temp.fifo)
                break;
            case 'acceleromter':
                temp.acceleromter = (val.target.value)
                setacceleromter(temp.acceleromter)
                break;
            case 'self':
                temp.self = (val.target.value)
                setSelf(temp.self)
                break;
            case 'axis':
                temp.axis = (val.target.value)
                setAxis(temp.axis)
                break;
            case 'acc_bandwidth':
                temp.acc_bandwidth = (val.target.value)
                setAccBandwidth(temp.acc_bandwidth)
                break;
            case 'device_code':
                temp.device_code = (val.target.value)
                setDeviceCode(temp.device_code)
                break;

            case 'sensor_code':
                temp.sensor_code = (val.target.value)

                setSensorCode(temp.sensor_code)
                break;

            case 'device_app':
                temp.device_app = (val.target.value)

                setDeviceApp(temp.device_app)
                break;

            case 'location':
                temp.location = (val.target.value)

                setLocation(temp.location)
                break;

            case 'ip':
                temp.ip = (val.target.value)

                setIp(temp.ip)
                break;

            case 'sim':
                temp.sim = (val.target.value)

                setSim(temp.sim)
                break;




            default:
                break;
        }




    }



    return (
        <>

            <List>
                <ListItem  >
                    <TextField
                        onChange={handleChange}
                        name="sensor_name"
                        id="outlined-helperText"
                        label="Sensor Name"
                        variant="outlined"
                        value={tempData.sensor_name}

                    />
                    <TextField
                        onChange={handleChange}
                        name="sensor_password"
                        id="outlined-helperText"
                        label="Sensor Password"
                        variant="outlined"
                        value={tempData.sensor_password}

                    />
                    <TextField
                        onChange={handleChange}

                        name="wifi_name"
                        id="outlined-helperText"
                        label="Wifi Name"
                        variant="outlined"
                        value={tempData.wifi_name}

                    />

                </ListItem>
                <ListItem>
                    <TextField
                        onChange={handleChange}

                        name="wifi_password"
                        id="outlined-helperText"
                        label="Wifi Password"
                        variant="outlined"
                        value={tempData.wifi_password}

                    />
                    <TextField
                        onChange={handleChange}

                        name="domain_name"
                        id="outlined-helperText"
                        label="Domain Name"
                        variant="outlined"
                        value={tempData.domain_name}

                    />
                    <TextField
                        onChange={handleChange}

                        name="time_delay"
                        id="outlined-helperText"
                        label="Time Delay"
                        variant="outlined"
                        value={tempData.time_delay}

                    />
                </ListItem>
                <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                <ListItem >
                    <TextField
                        onChange={handleChange}


                        name="data_link"
                        id="outlined-helperText"
                        label="Get Data Link"
                        variant="outlined"
                        value={tempData.data_link}

                        style={{ width: '220px' }}

                    />
                    <FormControl variant="outlined" >
                        <InputLabel htmlFor="outlined-age-native-simple">Filter Selection</InputLabel>
                        <Select
                            native
                            style={{ width: '150px' }}
                            value={tempData.filter}

                            onChange={handleChange}
                            label="Filter Selection"
                            inputProps={{
                                name: 'filter',
                                id: 'outlined-age-native-simple',
                            }}
                        >
                            <option aria-label="None" value="" />
                            <option value={1}>Low Pass</option>
                            <option value={2}>High Pass</option>
                        </Select>
                    </FormControl>



                </ListItem>
                <ListItem>
                    <FormControl variant="outlined" >
                        <InputLabel htmlFor="outlined-age-native-simple">FIFO Mode Selection</InputLabel>
                        <Select
                            value={tempData.fifo}

                            onChange={handleChange}

                            native
                            style={{ width: '220px' }}

                            //onChange={handleChange}
                            label="FIFO mode selection"
                            inputProps={{
                                name: 'fifo',
                                id: 'outlined-age-native-simple',
                            }}
                        >
                            <option aria-label="None" value="" />
                            <option value={1}>Bypass mode</option>
                            <option value={2}>FIFO mode</option>
                            <option value={3}>Continuous-to-FIFO mode</option>
                            <option value={4}>Bypass-to-continuous mode</option>
                            <option value={5}>Continuous mode</option>
                            <option value={6}>Bypass-to-FIFO mode</option>


                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" >
                        <InputLabel htmlFor="outlined-age-native-simple">Run Deep Sleep</InputLabel>
                        <Select
                            value={tempData.run}

                            native
                            style={{ width: '150px' }}
                            onChange={handleChange}

                            label="Run Deep Sleep"
                            inputProps={{
                                name: 'run',
                                id: 'outlined-age-native-simple',
                            }}
                        >
                            <option aria-label="None" value="" />
                            <option value={1}>Yes</option>
                            <option value={2}>No</option>
                        </Select>
                    </FormControl>

                </ListItem>
                <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                <ListItem >
                    <FormControl variant="outlined" >
                        <InputLabel htmlFor="outlined-age-native-simple">acceleromter Full-scale Selection</InputLabel>
                        <Select
                            value={tempData.acceleromter}


                            native
                            style={{ width: '300px' }}
                            onChange={handleChange}
                            label="acceleromter full-scale selection:"
                            inputProps={{
                                name: 'acceleromter',
                                id: 'outlined-age-native-simple',
                            }}
                        >
                            <option aria-label="None" value="" />
                            <option value={1}>2G</option>
                            <option value={2}>4G</option>
                            <option value={2}>8G</option>
                            <option value={2}>16G</option>

                        </Select>
                    </FormControl>

                    <FormControl variant="outlined" >
                        <InputLabel htmlFor="outlined-age-native-simple">Self Test</InputLabel>
                        <Select
                            value={tempData.self}

                            onChange={handleChange}

                            native
                            style={{ width: '150px' }}

                            //onChange={handleChange}
                            label="Self-test:"
                            inputProps={{
                                name: 'self',
                                id: 'outlined-age-native-simple',
                            }}
                        >
                            <option aria-label="None" value="" />
                            <option value={1}>Normal mode</option>
                            <option value={2}>Positive sign self-test</option>
                            <option value={3}>Negative sign self-test</option>

                        </Select>
                    </FormControl>


                </ListItem>
                <ListItem>
                    <FormControl variant="outlined" >
                        <InputLabel htmlFor="outlined-age-native-simple">Axis Selection</InputLabel>
                        <Select
                            value={tempData.axis}

                            onChange={handleChange}

                            native
                            style={{ width: '150px' }}

                            //onChange={handleChange}
                            label="Axis Selection"
                            inputProps={{
                                name: 'axis',
                                id: 'outlined-age-native-simple',
                            }}
                        >
                            <option aria-label="None" value="" />
                            <option value={1}>3 axes (XYZ)</option>
                            <option value={2}>X-axis</option>
                            <option value={3}>Y-axis</option>
                            <option value={3}>Z-axis</option>


                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" >
                        <InputLabel htmlFor="outlined-age-native-simple">acceleromter Bandwidth Configurations</InputLabel>
                        <Select
                            value={tempData.acc_bandwidth}

                            onChange={handleChange}

                            native
                            style={{ width: '350px' }}

                            //onChange={handleChange}
                            label="FIFO mode selection"
                            inputProps={{
                                name: 'acc_bandwidth',
                                id: 'outlined-age-native-simple',
                            }}
                        >
                            <option aria-label="None" value="" />
                            <option value={1}>ODR/4</option>
                            <option value={2}>ODR/10</option>
                            <option value={3}>ODR/20</option>
                            <option value={4}>ODR/45</option>
                            <option value={5}>ODR/100</option>
                            <option value={6}>ODR/200</option>
                            <option value={7}>ODR/400</option>
                            <option value={8}>ODR/800</option>


                        </Select>
                    </FormControl>
                </ListItem>


                <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                <ListItem >

                    <TextField
                        value={tempData.device_code}
                        onChange={handleChange}
                        name="device_code"
                        id="outlined-helperText"
                        label="Device Code"
                        variant="outlined"
                    />
                    <TextField
                        value={tempData.sensor_code}
                        onChange={handleChange}
                        name="sensor_code"
                        id="outlined-helperText"
                        label="Sensor Code"
                        variant="outlined"
                    />
                    <TextField
                        onChange={handleChange}
                        name="device_app"
                        id="outlined-helperText"
                        label="Device Application"
                        variant="outlined"
                        value={tempData.device_app}

                    />

                </ListItem>
                <ListItem>
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
                        name="ip"
                        id="outlined-helperText"
                        label="IP"
                        variant="outlined"
                        value={tempData.ip}

                    />
                    <TextField
                        onChange={handleChange}
                        name="sim"
                        id="outlined-helperText"
                        label="Sim Number"
                        variant="outlined"
                        value={tempData.sim}

                    />

                </ListItem>
                <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                {
                    updateMode ?
                        <div>
                            <button id="sbtn" onClick={onSubmitEdit}></button>
                            <button id="dbtn" onClick={onDelete}></button>
                        </div>
                        :
                        <button id="sbtn" onClick={onSubmit}></button>



                }




            </List>
        </>
    );
}
export default injectIntl(connect(null, device.actions)(DevForm));
