/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link, Switch, Redirect } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import { ContentRoute } from "../../../../_metronic/layout"
import { connect, shallowEqual, useSelector } from "react-redux";
import { get_sensors } from "../_redux/sensorCrud";


import { FormattedMessage, injectIntl } from "react-intl";
import * as sensor from "../_redux/sensorRedux";

function SensorCard(props) {

    const { showDetial } = props;
    const { removeSensor } = props;

    return (
        <>
            <li className="dcards__item">
                <div className="dcard">
                    <div className={`dcard__image  dcard__image--river`}></div>
                    <div className="dcard__content">
                        <div className="dcard__title">{props.title}</div>
                        <p className="dcard__text">
                            {props.description}
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <button onClick={showDetial} className="btn dcard__btn">Show Details</button>
                            <button onClick={removeSensor} className="btn dcard__btn" style={{ color: 'red' }}>Remove</button>
                        </div>

                    </div>
                </div>
            </li>

        </>
    );
}
export default injectIntl(connect(null, sensor.actions)(SensorCard));
