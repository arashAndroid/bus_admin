/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";

import { Link, Switch, Redirect } from "react-router-dom";
import { connect, shallowEqual, useSelector } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import * as sensor from "../_redux/sensorsRedux";
import { get_sensor_charts } from "../_redux/sensorsCrud";
import { useHistory } from "react-router-dom";
import SensorCard from "./SensorCard";
import HighchartsReact from 'highcharts-react-official';
//import Highcharts from 'highcharts';
import Highcharts from 'highcharts';
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
function SensorChartsPage(props) {

    const [isFirst, setIsFirst] = React.useState(true);
    const [currentData, setCurrentData] = React.useState([]);

    let { state } = useSelector(
        (state) => ({
            state: state.sensors
        }),
        shallowEqual
    );
    if (state === undefined) state = {};
    let history = useHistory();
    var sensorName = 'Name';

    // در این قسمت بررسی میکنم که آیا صفحه تازه باز شده یا خیر 
    // اگه تازه باز شده باشه، اطلاعات رو از سرویس با کد زیر دریافت میکنیم
    if (isFirst) {
        setIsFirst(false);
        if (state.is_sensor_FFTs_loaded == 0 || state.is_sensor_packet_infos_loaded == 0 || isFirst) {
            // فراخوانی سرویس برای دریافت اطلاعات نمودارها
            get_sensor_charts(props.id).then(res => {
                // Set FFT in state
                props.setSensorFFTs(res.data.FFT);
                // Set PacketInfo in state
                console.log("sensorChart res", res.data);
                props.setSensorPacketInfos(res.data.PacketInfo);
                props.setSensorPredictFailures(res.data.PredictFailure);
                sensorName = res.data.sensor_name;
            })
        }
    }
    // We will save the Y attribute of the FFT chart in this array. 
    var FFTChartY = [];
    var historicalChart = [];
    var predictFailureChart = [];

    var dataJanuary = [];
    var dataFebruary = [];
    var dataMarch = [];
    var dataApril = [];
    var dataMay = [];
    var dataJune = [];
    var dataJuly = [];
    var dataAugust = [];
    var dataSeptember = [];
    var dataOctober = [];
    var dataNovember = [];
    var dataDecember = [];

    //Checking if we have received the data from API
    if (state.sensorFFTs) {
        // This loops the FFT data and adds the Y attribute to the FFTChartY array
        for (let i = 0; i < state.sensorFFTs.length; i++) {
            const element = state.sensorFFTs[i];
            FFTChartY.push(element.y);
        }
    }
    if (state.sensorPacketInfos && state.sensorPacketInfos.length > 0) {

        var lastPacketData = state.sensorPacketInfos[state.sensorPacketInfos.length - 1].data;
        // This loops the data of the last packet info and adds the value attribute to the historicalChart array
        if (lastPacketData) {
            for (let i = 0; i < lastPacketData.length; i++) {
                const element = lastPacketData[i];
                historicalChart.push(element.value);
            }
        }

    }
    if (state.sensorPredictFailures && state.sensorPredictFailures.length > 0) {
        for (let i = 0; i < state.sensorPredictFailures.length; i++) {
            const element = state.sensorPredictFailures[i];
            var date = new Date(element.date);
            if ((date.getMonth() + 1) == 1) {
                dataJanuary.push(element.value)
            } else
                if ((date.getMonth() + 1) == 2) {
                    dataFebruary.push(element.value)
                } else
                    if ((date.getMonth() + 1) == 3) {
                        dataMarch.push(element.value)
                    } else
                        if ((date.getMonth() + 1) == 4) {
                            dataApril.push(element.value)
                        } else
                            if ((date.getMonth() + 1) == 5) {
                                dataMay.push(element.value)
                            } else
                                if ((date.getMonth() + 1) == 6) {
                                    dataJune.push(element.value)
                                } else
                                    if ((date.getMonth() + 1) == 7) {
                                        dataJuly.push(element.value)
                                    } else
                                        if ((date.getMonth() + 1) == 8) {
                                            dataAugust.push(element.value)
                                        } else
                                            if ((date.getMonth() + 1) == 9) {
                                                dataSeptember.push(element.value)
                                            } else
                                                if ((date.getMonth() + 1) == 10) {
                                                    dataOctober.push(element.value)
                                                } else
                                                    if ((date.getMonth() + 1) == 11) {
                                                        dataNovember.push(element.value)
                                                    } else
                                                        if ((date.getMonth() + 1) == 12) {
                                                            dataDecember.push(element.value)
                                                        }
        }
    }
    const getAverage = (monthValues) => {
        var sum = 0;
        var avg = 0;
        if (monthValues && monthValues.length > 0) {
            for (let i = 0; i < monthValues.length; i++) {
                const value = monthValues[i];
                sum = sum + value;
            }
            avg = sum / monthValues.length;
        }
        return avg;

    };

    // In options of the chart, the "data" property will be the FFTChartY array
    const optionsFFT = {
        title: {
            text: 'FFT Chart'
        },
        series: [{
            name: 'Sensor',
            color: 'blue',
            type: 'line',
            data: FFTChartY // We will set the FFTChartY array here
        }]
    }
    const optionsHistorical = {
        title: {
            text: 'Historical data of Sensor'
        },
        series: [{
            name: 'Sensor',
            color: 'green',
            type: 'line',
            data: historicalChart
        }]
    }
    const optionsPredictFailure = {
        chart: {
            type: 'areaspline'
        },
        title: {
            text: 'Predict device failure percentage'
        },
        legend: {

            verticalAlign: 'top',
            x: -500,
            y: 10,
            floating: true,
            borderWidth: 1,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
        },
        xAxis: {
            categories: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ]
        },
        yAxis: {
            title: {
                text: 'Failure percentage'
            }
            ,
            plotBands: [{ // visualize the weekend
                from: 40,
                to: 70,
                color: 'rgba(1, 1, 255, .2)'
            }, { // visualize the weekend
                from: 70,
                to: 100,
                color: 'rgba(255, 10, 13, .2)'
            }]
        },
        tooltip: {
            shared: true,
            valueSuffix: ' Percent'
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5
            }
        },
        series: [{

            name: 'Device1',
            data: [
                getAverage(dataJanuary), getAverage(dataFebruary),
                getAverage(dataMarch), getAverage(dataApril),
                getAverage(dataMay), getAverage(dataJune),
                getAverage(dataJuly), getAverage(dataAugust),
                getAverage(dataSeptember), getAverage(dataOctober),
                getAverage(dataNovember), getAverage(dataDecember)]
        }]
    }

    // The "state.sensorPacketInfos" holds the "packet_info" table and "data" table records. 
    // I have printed the value below. look for the "Packet Info :::::::" in the console.
    console.log('Packet Info :::::::', state.sensorPacketInfos);

    return (
        <>
            <div className="row" >
                {state.sensorFFTs != null ?

                    // This is the chart
                    <div className="col-lg-6">
                        <HighchartsReact
                            // containerProps={{ style: { height: "220px" } }}
                            highcharts={Highcharts}
                            options={optionsFFT}
                        />
                    </div> :
                    <p>No Data</p>
                }
                {state.sensorFFTs != null ?

                    // This is the chart
                    <div className="col-lg-6">
                        <HighchartsReact
                            // containerProps={{ style: { height: "220px" } }}
                            highcharts={Highcharts}
                            options={optionsHistorical}
                        />
                    </div> :
                    <p>No Data</p>
                }
            </div>
            {state.sensorFFTs != null ?

                // This is the chart
                <div className="col-lg-6">
                    <HighchartsReact
                        // containerProps={{ style: { height: "220px" } }}
                        highcharts={Highcharts}
                        options={optionsPredictFailure}
                    />
                </div> :
                <p>No Data</p>
            }

        </>
    );
}
export default injectIntl(connect(null, sensor.actions)(SensorChartsPage));
