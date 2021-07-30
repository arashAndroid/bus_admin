/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link, Switch, Redirect } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import { ContentRoute } from "../../../../_metronic/layout"
import { connect, shallowEqual, useSelector } from "react-redux";
import { get_gateways } from "../_redux/gatewayCrud";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";


import { FormattedMessage, injectIntl } from "react-intl";
import * as gateway from "../_redux/gatewayRedux";

function GatewayCard(props) {




    return (
        <>



            <li className="dcards__item">
                <div className="dcard">
                    <div className={`dcard__image  dcard__image--river`}></div>
                    <div className="dcard__content">
                        <div className="dcard__title">{props.name}</div>
                        <p className="dcard__text">
                            {props.url}
                        </p>
                        <NavLink className="menu-link" to={`/gateway/${props.id}`}>

                            <span className="menu-text">Show Details</span>
                        </NavLink>
                        {/* <button onClick={showDetial} className="btn btn--block dcard__btn">Show Details</button> */}
                    </div>
                </div>
            </li>

        </>
    );
}
export default injectIntl(connect(null, gateway.actions)(GatewayCard));
