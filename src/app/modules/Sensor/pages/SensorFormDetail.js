/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";

import { connect, shallowEqual, useSelector } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import * as sensor from "../_redux/sensorRedux";
import { get_Sensors, get_all_sensor, add_sensor, editSensor, deleteSensor } from "../_redux/sensorCrud";

import {
    Dialog, AppBar, Toolbar, IconButton, Typography, Button, List, ListItem,
    ListItemText, Divider, Slide, TextField,
    Select, MenuItem, FormControl, InputLabel
} from '@material-ui/core'

function SensorFormDetail(props) {
    const { handleClose, currentData, updateMode } = props;
    const [accelerometer, setAccelerometer] = React.useState();
    const [filterselection, setFilterSelection] = React.useState();
    const [selftest, setSelftest] = React.useState();
    const [axis, setAxis] = React.useState();
    const [fifo, setFifo] = React.useState();
    const [lpf2, setLpf2] = React.useState();
    const [lpf2_xl_en, setLpf2XlEn] = React.useState();
    const [sensor_name, setSensorName] = React.useState();
    const [sensor_password, setSensorPassword] = React.useState();
    const [wifi_name, setWifiName] = React.useState();
    const [wifi_password, setWifiPassword] = React.useState();
    const [domain_name, setDomainName] = React.useState();
    const [get_data_link, setGetDataLink] = React.useState();
    const [timedelay, setTimeDelay] = React.useState();
    const [deepsleep, setDeepSleep] = React.useState();
    const [isdel, setIsDel] = React.useState();
    const [numberofdata, setNumberOfData] = React.useState();
    const [power, setPower] = React.useState();
    const [continuousdata, setContinuousData] = React.useState();
    const [update_url, setUpdateUrl] = React.useState();
    const [update_servername, setUpdateServername] = React.useState();
    const [initiateSensor, setInitiateSensor] = React.useState();
    const [update_available, setUpdateAvailable] = React.useState();
    const [gateway_id, setGatewayId] = React.useState();
    const [device_id, setDeviceId] = React.useState();
    const [user_id, setUserId] = React.useState();
    const [tempData, setTempData] = React.useState(currentData)


    function onSubmit(params) {
        let Data = {
            title: sensor_name,
            img: 'dcard__image--flowers',
            accelerometer: accelerometer,
            filterselection: filterselection,
            selftest: selftest,
            axis: axis,
            fifo: fifo,
            lpf2: lpf2,
            lpf2_xl_en: lpf2_xl_en,
            sensor_name: sensor_name,
            sensor_password: sensor_password,
            wifi_name: wifi_name,
            wifi_password: wifi_password,
            domain_name: domain_name,
            get_data_link: get_data_link,
            timedelay: timedelay,
            deepsleep: deepsleep,
            isdel: isdel,
            numberofdata: numberofdata,
            power: power,
            continuousdata: continuousdata,
            update_url: update_url,
            update_servername: update_servername,
            initiateSensor: initiateSensor,
            update_available: update_available,
            gateway_id: props.parent == 'gateway' ? props.parent_id : "",
            device_id: props.parent == 'device' ? props.parent_id : "",
            user_id: user_id

        }



        // UNCOMMENT THIS TO SEND DATA TO API 
        add_sensor(Data).then(res => {
            get_all_sensor(props.parent, props.parent_id).then(res => {
                props.setSensors(res.data)
            })
            handleClose();

        })


    }

    function onDelete(params) {

        deleteSensor(tempData.id).then(res => {
            get_all_sensor(props.parent, props.parent_id).then(res => {
                props.setSensors(res.data)
                handleClose();

            })
        })
    }

    function onSubmitEdit(params) {



        let Data = {
            id: tempData.id,
            title: tempData.sensor_name,
            img: 'dcard__image--flowers',
            accelerometer: accelerometer,
            filterselection: filterselection,
            selftest: selftest,
            axis: axis,
            fifo: fifo,
            lpf2: lpf2,
            lpf2_xl_en: lpf2_xl_en,
            sensor_name: sensor_name,
            sensor_password: sensor_password,
            wifi_name: wifi_name,
            wifi_password: wifi_password,
            domain_name: domain_name,
            get_data_link: get_data_link,
            timedelay: timedelay,
            deepsleep: deepsleep,
            isdel: isdel,
            numberofdata: numberofdata,
            power: power,
            continuousdata: continuousdata,
            update_url: update_url,
            update_servername: update_servername,
            initiateSensor: initiateSensor,
            update_available: update_available,
            user_id: user_id


        }


        console.log(Data)




        editSensor(Data, Data.id).then(res => {
            get_all_sensor(props.parent, props.parent_id).then(res => {
                props.setSensors(res.data);
                handleClose();

            })

        })


    }



    function handleChange(val) {
        var temp = tempData;

        switch (val.target.name) {
            case 'accelerometer':
                temp.accelerometer = (val.target.value)
                setAccelerometer(temp.accelerometer)
                break;
            case 'filterselection':
                temp.filterselection = (val.target.value)

                setFilterSelection(temp.filterselection)
                break;
            case 'selftest':
                temp.selftest = (val.target.value)

                setSelftest(temp.selftest)
                break;
            case 'axis':
                temp.axis = (val.target.value)

                setAxis(temp.axis)
                break;
            case 'fifo':
                temp.fifo = (val.target.value)

                setFifo(temp.fifo)
                break;
            case 'lpf2':
                temp.lpf2 = (val.target.value)

                setLpf2(temp.lpf2)
                break;
            case 'lpf2_xl_en':
                temp.lpf2_xl_en = (val.target.value)

                setLpf2XlEn(temp.lpf2_xl_en)
                break;
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
            case 'get_data_link':
                temp.get_data_link = (val.target.value)

                setGetDataLink(temp.get_data_link)
                break;
            case 'timedelay':
                temp.timedelay = (val.target.value)
                setTimeDelay(temp.timedelay)
                break;
            case 'deepsleep':
                temp.deepsleep = (val.target.value)
                setDeepSleep(temp.deepsleep)
                break;
            case 'isdel':
                temp.isdel = (val.target.value)
                setIsDel(temp.isdel)
                break;
            case 'numberofdata':
                temp.numberofdata = (val.target.value)
                setNumberOfData(temp.numberofdata)
                break;
            case 'power':
                temp.power = (val.target.value)
                setPower(temp.power)
                break;

            case 'continuousdata':
                temp.continuousdata = (val.target.value)

                setContinuousData(temp.continuousdata)
                break;

            case 'update_url':
                temp.update_url = (val.target.value)

                setUpdateUrl(temp.update_url)
                break;

            case 'update_servername':
                temp.update_servername = (val.target.value)

                setUpdateServername(temp.update_servername)
                break;

            case 'initiateSensor':
                temp.initiateSensor = (val.target.value)

                setInitiateSensor(temp.initiateSensor)
                break;
            case 'update_available':
                temp.update_available = (val.target.value)

                setUpdateAvailable(temp.update_available)
                break;
            case 'gateway_id':
                temp.gateway_id = (val.target.value)

                setGatewayId(temp.gateway_id)
                break;
            case 'device_id':
                temp.device_id = (val.target.value)

                setDeviceId(temp.device_id)
                break;
            case 'user_id':
                temp.user_id = (val.target.value)

                setUserId(temp.user_id)
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


                </ListItem>
                <ListItem>
                    <TextField
                        onChange={handleChange}

                        name="wifi_name"
                        id="outlined-helperText"
                        label="Wifi Name"
                        variant="outlined"
                        value={tempData.wifi_name}

                    />
                    <TextField
                        onChange={handleChange}

                        name="wifi_password"
                        id="outlined-helperText"
                        label="Wifi Password"
                        variant="outlined"
                        value={tempData.wifi_password}

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
export default injectIntl(connect(null, sensor.actions)(SensorFormDetail));
