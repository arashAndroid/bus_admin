/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";
import { connect, shallowEqual, useSelector } from "react-redux";


export function AsideMenuList({ layoutProps }) {
  const { user } = useSelector(state => state.auth);
  const location = useLocation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu && "menu-item-active"} menu-item-open `
      : "";
  };
  console.log('is admin', user.role);
  return (
    <>
      {/* begin::Menu Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive("/dashboard", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/dashboard">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">Dashboard</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}
        {/*begin::1 Level*/}


        {user.role == 'admin' ?
          <li
            className={`menu-item ${getMenuItemActive("/users", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/users">
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
              </span>
              <span className="menu-text">Users</span>
            </NavLink>
          </li> : <div></div>}
        {/*end::1 Level*/}

        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive("/devices", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/devices">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Home/Box.svg")} />
            </span>
            <span className="menu-text">Devices</span>
          </NavLink>
        </li>
        <li
          className={`menu-item ${getMenuItemActive("/gateways", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/gateways">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Home/Box.svg")} />
            </span>
            <span className="menu-text">Gateways</span>
          </NavLink>
        </li>
        <li
          className={`menu-item ${getMenuItemActive("/sensors", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/sensors">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Home/Box.svg")} />
            </span>
            <span className="menu-text">Sensors</span>
          </NavLink>
        </li>
        <li
          className={`menu-item ${getMenuItemActive("/builder1", false)}`}
          aria-haspopup="true"
        >
          <div className="menu-link" to="/builder1">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Communication/Chat1.svg")} />
            </span>
            <span className="menu-text">Chat</span>
          </div>
        </li>


        <li
          className={`menu-item ${getMenuItemActive("/builder2", false)}`}
          aria-haspopup="true"
        >
          <div className="menu-link">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Text/Text.svg")} />
            </span>
            <span className="menu-text">Notes</span>
          </div>
        </li>


        <li
          className={`menu-item ${getMenuItemActive("/builder3", false)}`}
          aria-haspopup="true"
        >
          <div className="menu-link" to="/builder3">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Home/Library.svg")} />
            </span>
            <span className="menu-text">Reports</span>
          </div>
        </li>

        <li
          className={`menu-item ${getMenuItemActive("/builder4", false)}`}
          aria-haspopup="true"
        >
          <div className="menu-link" to="/builder4">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Home/Alarm-clock.svg")} />
            </span>
            <span className="menu-text">Alarms</span>
          </div>
        </li>

        <li
          className={`menu-item ${getMenuItemActive(
            "/e-commerce/customers"
          )}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/e-commerce/customers">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/General/User.svg")} />
            </span>
            <span className="menu-text">Serviceman List</span>
          </NavLink>
        </li>

        <li
          className={`menu-item ${getMenuItemActive(
            "/e-commerce/products"
          )}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/e-commerce/products">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/General/Folder.svg")} />
            </span>
            <span className="menu-text">Seuppliers List</span>
          </NavLink>
        </li>

      </ul>

      {/* end::Menu Nav */}
    </>
  );
}
