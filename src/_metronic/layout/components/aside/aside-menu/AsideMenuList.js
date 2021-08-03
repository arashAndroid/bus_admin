/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";

export function AsideMenuList({ layoutProps }) {
  const location = useLocation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url) ?
      ` ${!hasSubmenu && "menu-item-active"} menu-item-open ` :
      "";
  };

  return (
    <>
      { /* begin::Menu Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        { /*begin::1 Level*/}
        <li className={`menu-item ${getMenuItemActive("/dashboard", false)}`}
          aria-haspopup="true" >
          < NavLink className="menu-link"
            to="/dashboard" >
            <span className="svg-icon menu-icon" >
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text" > داشبورد </span>
          </NavLink>
        </li>

        <li className={`menu-item menu-item-submenu ${getMenuItemActive(
          "/react-bootstrap", true
        )}`}
          aria-haspopup="true"
          data-menu-toggle="hover" >
          <NavLink className="menu-link menu-toggle" to="/react-bootstrap" >
            <span className="svg-icon menu-icon" >
              <SVG src={toAbsoluteUrl("/media/svg/icons/Shopping/Box2.svg")} />
            </span>
            <span className="menu-text" > مدیریت اطلاعات پایه </span>
            <i className="menu-arrow" />
          </NavLink>
          <div className="menu-submenu">
            <ul className="menu-subnav">
              <ul className="menu-subnav">
                <li className={`menu-item ${getMenuItemActive(
                  "/cities"
                )}`}
                  aria-haspopup="true">
                  <NavLink className="menu-link" to="/cities">
                    <span className="svg-icon menu-icon" >
                      <SVG src={toAbsoluteUrl("/media/svg/icons/Shopping/Box2.svg")} />
                    </span>
                    <span className="menu-text" > شهر ها </span>
                  </NavLink>
                </li>
                { /*end::2 Level*/}
                <li className={`menu-item ${getMenuItemActive(
                  "/busTypes"
                )}`}
                  aria-haspopup="true">
                  <NavLink className="menu-link" to="/busTypes">
                    <span className="svg-icon menu-icon" >
                      <SVG src={toAbsoluteUrl("/media/svg/icons/Shopping/Box2.svg")} />
                    </span>
                    <span className="menu-text" >انواع اتوبوس</span>
                  </NavLink>
                </li>
                { /*end::2 Level*/}
                <li className={`menu-item ${getMenuItemActive(
                  "/buses"
                )}`}
                  aria-haspopup="true">
                  <NavLink className="menu-link" to="/buses">
                    <span className="svg-icon menu-icon" >
                      <SVG src={toAbsoluteUrl("/media/svg/icons/Shopping/Box2.svg")} />
                    </span>
                    <span className="menu-text" >اتوبوس</span>
                  </NavLink>
                </li>
                { /*end::2 Level*/}

                { /*end::2 Level*/}
              </ul>
            </ul>
          </div>
        </li>
        <li className={`menu-item ${getMenuItemActive("/travels", false)}`}
          aria-haspopup="true" >
          <NavLink className="menu-link" to="/travels">
            <span className="svg-icon menu-icon" >
              <SVG src={toAbsoluteUrl("/media/svg/icons/Shopping/Box2.svg")} />
            </span>
            <span className="menu-text" > سفرها </span>
          </NavLink>
        </li>





      </ul>

      { /* end::Menu Nav */}
    </>
  );
}