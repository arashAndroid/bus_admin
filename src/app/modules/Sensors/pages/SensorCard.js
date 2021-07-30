/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { connect, shallowEqual, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";


import { FormattedMessage, injectIntl } from "react-intl";
import * as sensor from "../_redux/sensorsRedux";

function SensorCard(props) {

    const { showDetial } = props;

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
                        <button onClick={showDetial} className="btn btn--block dcard__btn">Show Details</button>
                        <NavLink className="menu-link" to={`/sensor/${props.id}/charts`}>

                            <span className="menu-text">Show Charts</span>
                        </NavLink>
                    </div>
                </div>
            </li>

        </>
    );
}
export default injectIntl(connect(null, sensor.actions)(SensorCard));
