import React from "react";
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { List, FormControlLabel, Checkbox, Card } from '@material-ui/core'
import axios from "axios";







// export const GET_SENSOR_URL = 'http://127.0.0.1:8000/api/auth/sensors'
export const GET_SENSOR_URL = 'http://api.monosens.com/api/auth/sensors'

function get_all_sensor(parent, parentId) {
    if (parent) {

        return axios.get(`${GET_SENSOR_URL}/${parent}/${parentId}`);

    } else {
        return axios.get(GET_SENSOR_URL);
    }
    // return fetch(GET_SENSOR_URL);
}
function get_sensor_charts(sensorId) {
    return axios.get(`${GET_SENSOR_URL}/dashboard/${sensorId}`);
}


export function Demo1Dashboard() {
    const [isFirst, setIsFirst] = React.useState(true);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [sensorList, setSensorList] = React.useState([]);
    const [seriesFFT, setSeriesFFT] = React.useState([]);
    const [seriesHistorical, setSeriesHistorical] = React.useState([]);
    const [seriesPredictFailure, setSeriesPredictFailure] = React.useState([]);
    if (isFirst) {
        setIsFirst(false);
        if (!isLoaded) {
            get_all_sensor().then(res => {
                var sensors = res.data;
                if (sensors && sensors.length > 0) {
                    for (let i = 0; i < sensors.length; i++) {
                        console.log("dashboardSensors sensor", sensors[i]);
                        // sensors[i].push({ 'checked': false });
                        if (i == 0) {
                            sensors[i].checked = true;
                        } else {
                            sensors[i].checked = false;
                        }


                    }
                    setSensorList(res.data);
                    console.log("dashboardSensors sensors", sensors);
                    var sensors = res.data;
                    var sensorId = res.data[0].id;
                    get_sensor_charts(res.data[0].id).then(res => {
                        console.log("dashboardSensors First Chart res FFT", res.data);
                        var FFTChartY = [];
                        if (res.data.FFT) {
                            // This loops the FFT data and adds the Y attribute to the FFTChartY array
                            for (let i = 0; i < res.data.FFT.length; i++) {
                                const element = res.data.FFT[i];
                                FFTChartY.push(element.y);
                            }
                        }

                        var temp = seriesFFT;
                        temp.push({
                            id: sensorId,
                            name: res.data.sensor_name,
                            type: 'line',
                            data: FFTChartY // We will set the FFTChartY array here
                        });
                        console.log("dashboardSensors temp FFT", temp);
                        setSeriesFFT(temp);
                        var historicalChart = [];
                        if (res.data.PacketInfo && res.data.PacketInfo.length > 0) {
                            var lastPacketData = res.data.PacketInfo[res.data.PacketInfo.length - 1].data;
                            // This loops the data of the last packet info and adds the value attribute to the historicalChart array
                            if (lastPacketData) {
                                for (let i = 0; i < lastPacketData.length; i++) {
                                    const element = lastPacketData[i];
                                    historicalChart.push(element.value);
                                }
                            }
                        }
                        var temp2 = seriesHistorical;
                        temp2.push({
                            id: sensorId,
                            name: res.data.sensor_name,
                            type: 'line',
                            data: historicalChart // We will set the FFTChartY array here
                        });
                        console.log("dashboardSensors temp2 Historical", temp2);
                        setSeriesHistorical(temp2);


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

                        if (res.data.PredictFailure && res.data.PredictFailure.length > 0) {
                            for (let i = 0; i < res.data.PredictFailure.length; i++) {
                                const element = res.data.PredictFailure[i];
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
                        predictFailureChart = [
                            getAverage(dataJanuary), getAverage(dataFebruary),
                            getAverage(dataMarch), getAverage(dataApril),
                            getAverage(dataMay), getAverage(dataJune),
                            getAverage(dataJuly), getAverage(dataAugust),
                            getAverage(dataSeptember), getAverage(dataOctober),
                            getAverage(dataNovember), getAverage(dataDecember)];
                        var temp3 = seriesPredictFailure;
                        temp3.push({
                            id: sensorId,
                            name: res.data.sensor_name,
                            type: 'line',
                            data: predictFailureChart // We will set the FFTChartY array here
                        });
                        console.log("dashboardSensors temp2 seriesPredictFailure", temp3);
                        setSeriesPredictFailure(temp3);
                        setIsLoaded(true);

                    })
                }
            })
        }
    }


    console.log("dashboardSensors seriesFFT", seriesFFT);
    console.log("dashboardSensors sensors", sensorList);
    var optionsFFT = {
        title: {
            text: 'FFT Chart'
        },
        series: seriesFFT
    }
    var optionsHistorical = {
        title: {
            text: 'Historical data of Sensor'
        },
        series: seriesHistorical
    }
    var optionsPredictFailure = {
        chart: {
            type: 'areaspline'
        },
        title: {
            text: 'Predict device failure percentage'
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
        series: seriesPredictFailure
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
    const addNewSensor = (id, e) => {
        setIsLoaded(false);
        var isTimeout = false;
        var gotResult = false;
        var cantGetResult = false;
        var isChecked = false;
        // console.log("e.target.checked = ", e.target.checked);
        console.log('id = ', id);
        var sensors = sensorList;
        for (let i = 0; i < sensors.length; i++) {
            if (sensors[i].id == id) {
                sensors[i].checked = !sensors[i].checked;
                isChecked = sensors[i].checked;
            }
        }
        setSensorList(sensors);
        if (isChecked) {
            get_sensor_charts(id).then(res => {
                console.log("dashboardSensors add Chart res ", res.data);
                var FFTChartY = [];
                if (res.data.FFT && res.data.FFT.length > 0) {
                    // This loops the FFT data and adds the Y attribute to the FFTChartY array
                    for (let i = 0; i < res.data.FFT.length; i++) {
                        const element = res.data.FFT[i];
                        FFTChartY.push(element.y);
                    }
                }
                var temp = seriesFFT;
                temp.push({
                    id: id,
                    name: res.data.sensor_name,
                    type: 'line',
                    data: FFTChartY // We will set the FFTChartY array here
                });
                console.log("dashboardSensors add temp", temp);
                setSeriesFFT(temp);

                var historicalChart = [];
                if (res.data.PacketInfo && res.data.PacketInfo.length > 0) {
                    var lastPacketData = res.data.PacketInfo[res.data.PacketInfo.length - 1].data;
                    // This loops the data of the last packet info and adds the value attribute to the historicalChart array
                    if (lastPacketData) {
                        for (let i = 0; i < lastPacketData.length; i++) {
                            const element = lastPacketData[i];
                            historicalChart.push(element.value);
                        }
                    }
                }
                var temp2 = seriesHistorical;
                temp2.push({
                    id: id,
                    name: res.data.sensor_name,
                    type: 'line',
                    data: historicalChart // We will set the FFTChartY array here
                });
                console.log("dashboardSensors temp2 historical", temp2);
                setSeriesHistorical(temp2);

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

                if (res.data.PredictFailure && res.data.PredictFailure.length > 0) {
                    for (let i = 0; i < res.data.PredictFailure.length; i++) {
                        const element = res.data.PredictFailure[i];
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
                predictFailureChart = [
                    getAverage(dataJanuary), getAverage(dataFebruary),
                    getAverage(dataMarch), getAverage(dataApril),
                    getAverage(dataMay), getAverage(dataJune),
                    getAverage(dataJuly), getAverage(dataAugust),
                    getAverage(dataSeptember), getAverage(dataOctober),
                    getAverage(dataNovember), getAverage(dataDecember)];
                var temp3 = seriesPredictFailure;
                temp3.push({
                    id: id,
                    name: res.data.sensor_name,
                    type: 'line',
                    data: predictFailureChart // We will set the FFTChartY array here
                });
                console.log("dashboardSensors add temp3 seriesPredictFailure", temp3);
                setSeriesPredictFailure(temp3);

                gotResult = true;
                if ((isTimeout && gotResult) || (isTimeout && cantGetResult)) {
                    setIsLoaded(true);
                }



            }).catch(err => {
                console.log("dashboardSensors err", err);
                cantGetResult = true;
                if ((isTimeout && gotResult) || (isTimeout && cantGetResult)) {
                    setIsLoaded(true);
                }
            })
        } else {

            var temp = seriesFFT;
            const newList = temp.filter((item) => item.id !== id);
            console.log("dashboardSensors remove temp", newList);
            setSeriesFFT(newList);
            var temp2 = seriesHistorical;
            const newList2 = temp2.filter((item) => item.id !== id);
            console.log("dashboardSensors remove temp2", newList2);
            setSeriesHistorical(newList2);
            var temp3 = seriesPredictFailure;
            const newList3 = temp3.filter((item) => item.id !== id);
            console.log("dashboardSensors remove temp3", newList3);
            setSeriesPredictFailure(newList3);
            gotResult = true;
            if ((isTimeout && gotResult) || (isTimeout && cantGetResult)) {
                setIsLoaded(true);
            }

        }

        setTimeout(() => {
            isTimeout = true;
            if ((isTimeout && gotResult) || (isTimeout && cantGetResult)) {
                setIsLoaded(true);
            }

        }, 1000);
    }

    return (
        <div>

            {
                (isLoaded) ?

                    <div>
                        <div>
                            <List style={{ display: 'inline-flex' }} >
                                {sensorList.map(i => {
                                    return (
                                        <Card key={i.id} style={{ marginRight: 5, paddingLeft: 5 }}>
                                            <FormControlLabel
                                                control={<Checkbox key={i.id} checked={i.checked} onChange={(e) => { addNewSensor(i.id, e) }} />}
                                                label={i.sensor_name}
                                            />

                                        </Card>

                                    );
                                })}
                            </List>
                        </div>
                        <div className="row" >
                            <div className="col-lg-6">
                                <HighchartsReact
                                    containerProps={{ style: { height: "320px" } }}
                                    highcharts={Highcharts}
                                    options={optionsFFT}
                                />
                            </div>
                            <div className="col-lg-6">
                                <HighchartsReact
                                    containerProps={{ style: { height: "320px" } }}
                                    highcharts={Highcharts}
                                    options={optionsPredictFailure}
                                />
                            </div>

                        </div>
                        <div className="col-lg-12">
                            <HighchartsReact
                                containerProps={{ style: { height: "220px" } }}
                                highcharts={Highcharts}
                                options={optionsHistorical}
                            />
                        </div>

                    </div>
                    : <div>Loading</div>}

        </div>
    );
}
