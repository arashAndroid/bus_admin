import React from "react";
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import {
    MixedWidget1,
    MixedWidget14,
    ListsWidget9,
    StatsWidget11,
    StatsWidget12,
    ListsWidget1,
    AdvanceTablesWidget2,
    AdvanceTablesWidget4,
    ListsWidget3,
    ListsWidget4,
    ListsWidget8
} from "../widgets";
import { Card } from '@material-ui/core'
const options = {
    title: {
        text: 'Demo 1'
    },
    series: [{
        type: 'line',
        data: [1, 2, 3, 4, 3, 2, 1, 6, 6, 3, 4]
    },
    {
        type: 'line',
        data: [2, 1, 1, 3, 4, 5, 6, 4, 2, 1, 4]
    },
    {
        type: 'line',
        data: [1, 1, 1, 3, 2, 3, 1, 3, 6, 6, 4]
    }]
}
const options5 = {
    title: {
        text: 'Demo 5'
    },
    series: [{
        type: 'bar',
        data: [1, 2, 3, 4, 3, 2, 1, 6, 6, 3, 4]
    }

    ]
}

const options2 = {
    title: {
        text: 'Demo 2'
    },
    series: [{
        type: 'bar',
        data: [1, 2, 3, 4, 3, 2, 1, 6, 6, 3, 4]
    },
    {
        type: 'bar',
        data: [2, 1, 1, 3, 4, 5, 6, 4, 2, 1, 4]
    },
    {
        type: 'bar',
        data: [1, 1, 1, 3, 2, 3, 1, 3, 6, 6, 4]
    }]
}


const options3 = {
    chart: {
        type: 'areaspline'
    },
    title: {
        text: 'Average fruit consumption during one week'
    },
    legend: {

        verticalAlign: 'top',
        x: 150,
        y: 100,
        floating: true,
        borderWidth: 1,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
    },
    xAxis: {
        categories: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
        ],
        plotBands: [{ // visualize the weekend
            from: 4.5,
            to: 6.5,
            color: 'rgba(68, 170, 213, .2)'
        }]
    },
    yAxis: {
        title: {
            text: 'Fruit units'
        }
    },
    tooltip: {
        shared: true,
        valueSuffix: ' units'
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
        name: 'John',
        data: [3, 4, 3, 5, 4, 10, 12]
    }, {
        name: 'Jane',
        data: [1, 3, 4, 3, 3, 5, 4]
    }]
}


const options4 = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Browser market shares'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
    },
    series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
            name: 'Chrome',
            y: 61.41,
            sliced: true,
            selected: true
        }, {
            name: 'Internet Explorer',
            y: 11.84
        }, {
            name: 'Firefox',
            y: 10.85
        }, {
            name: 'Edge',
            y: 4.67
        }, {
            name: 'Safari',
            y: 4.18
        }, {
            name: 'Sogou Explorer',
            y: 1.64
        }, {
            name: 'Opera',
            y: 1.6
        }, {
            name: 'QQ',
            y: 1.2
        }, {
            name: 'Other',
            y: 2.61
        }]
    }]
}




export function Demo1Dashboard() {

    return (<div>

        <div className="row" style={{ height: "250px", marginTop: 10, marginBottom: 10 }} >
            <div className="col-lg-12" style={{ marginTop: 10, marginBottom: 10 }}>
                <Card style={{ marginTop: 10, marginBottom: 10 }}>
                    <HighchartsReact
                        containerProps={{ style: { height: "250px" } }}
                        highcharts={Highcharts}
                        options={options}
                    />
                </Card>
            </div>




        </div>


        <div className="row" style={{ height: "250px", marginTop: 10, marginBottom: 10 }}>
            <div className="col-lg-6" style={{ marginTop: 10, marginBottom: 10 }}>
                <Card style={{ marginTop: 10, marginBottom: 10 }}>

                    <HighchartsReact
                        containerProps={{ style: { height: "250px" } }}
                        highcharts={Highcharts}
                        options={options5}
                    />
                </Card>
            </div>

            <div className="col-lg-6" style={{ marginTop: 10, marginBottom: 10 }}>
                <Card style={{ marginTop: 10, marginBottom: 10 }}>

                    <HighchartsReact
                        containerProps={{ style: { height: "250px" } }}
                        highcharts={Highcharts}
                        options={options}
                    />
                </Card>
            </div>


        </div>

        <div className="row" style={{ marginTop: 10, marginBottom: 10 }}>
            <div className="col-lg-12" style={{ marginTop: 10, marginBottom: 10 }}>
                <Card style={{ marginTop: 10, marginBottom: 10 }}>

                    <HighchartsReact
                        highcharts={Highcharts}
                        options={options2}
                    />
                </Card>

            </div>









        </div>



    </div>);
}
