/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link, Switch, Redirect } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import { ContentRoute } from "../../../../_metronic/layout"
import { connect, shallowEqual, useSelector } from "react-redux";
import { get_devices } from "../_redux/deviceCrud";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";


import { FormattedMessage, injectIntl } from "react-intl";
import * as device from "../_redux/deviceRedux";

function DeviceCard(props) {




    return (
        <>



            <li className="dcards__item">
                <div className="dcard">
                    <div className={`dcard__image  dcard__image--river`}></div>
                    <div className="dcard__content">
                        <div className="dcard__title">{props.name}</div>
                        <p className="dcard__text">
                            {props.model}
                        </p>
                        <NavLink className="menu-link" to={`/device/${props.id}`}>

                            <span className="menu-text">Show Details</span>
                        </NavLink>
                        {/* <button onClick={showDetial} className="btn btn--block dcard__btn">Show Details</button> */}
                    </div>
                </div>
            </li>

        </>
    );
}
export default injectIntl(connect(null, device.actions)(DeviceCard));
