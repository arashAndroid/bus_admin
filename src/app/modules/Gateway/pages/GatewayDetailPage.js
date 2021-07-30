/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";

import { Link, Switch, Redirect } from "react-router-dom";
import { connect, shallowEqual, useSelector } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import * as gateway from "../_redux/gatewayRedux";
import { get_gateways, get_all_gateways, addGateway, getGatewayById } from "../_redux/gatewayCrud";
import { useHistory } from "react-router-dom";
import GatewayCard from "./GatewayCard";
// import { makeStyles } from '@material-ui/core/styles';
import {
    Dialog, AppBar, Toolbar, IconButton, Typography, Button, List, ListItem,
    ListItemText, Divider, Slide, TextField,
    Select, MenuItem, FormControl, InputLabel
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import $ from 'jquery';
import GatewayForm from "./GatewayForm";
import SensorPage from "../../Sensor/pages/SensorPage"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function GatewayDetailPage(props) {

    // const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [currentData, setCurrentData] = React.useState({});
    const [updateMode, setUpdateMode] = React.useState(false);





    const handleClose = () => {
        setOpen(false);
        setOpen(false);
    };

    const [collapsedHeader, setCollapsedHeader] = useState(true);
    let { state } = useSelector(
        (state) => ({
            state: state.gateway
        }),
        shallowEqual
    );
    if (state === undefined) state = {};
    console.log('props = ', props.id);
    let history = useHistory();


    return (
        <>

            <GatewayForm handleClose={handleClose} id={props.id} currentData={currentData} updateMode={updateMode} />

            <h2>Sensors</h2>
            <div style={{ marginTop: 5, marginBottom: 5 }} ></div>
            <SensorPage parent_id={props.id} parent="gateway" />
        </>
    );
}
export default injectIntl(connect(null, gateway.actions)(GatewayDetailPage));
