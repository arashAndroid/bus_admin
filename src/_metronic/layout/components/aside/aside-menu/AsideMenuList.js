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
                  "/countries"
                )}`}
                  aria-haspopup="true">
                  <NavLink className="menu-link" to="/countries">
                    <span className="svg-icon menu-icon" >
                      <SVG src={toAbsoluteUrl("/media/svg/icons/Shopping/Box2.svg")} />
                    </span>
                    <span className="menu-text" > کشور ها </span>
                  </NavLink>
                </li>
                { /*end::2 Level*/}
                { /*begin::2 Level*/}
                <li className={`menu-item ${getMenuItemActive(
                  "/provinces"
                )}`}
                  aria-haspopup="true" >
                  <NavLink className="menu-link"
                    to="/provinces" >
                    < span className="svg-icon menu-icon" >
                      <SVG src={toAbsoluteUrl("/media/svg/icons/Shopping/Box2.svg")}
                      />
                    </span>
                    <span className="menu-text" > استان ها </span>
                  </NavLink>
                </li>
                <li className={`menu-item ${getMenuItemActive(
                  "/townships"
                )}`}
                  aria-haspopup="true" >
                  <NavLink className="menu-link"
                    to="/townships" >
                    < span className="svg-icon menu-icon" >
                      <SVG src={toAbsoluteUrl("/media/svg/icons/Shopping/Box2.svg")}
                      />
                    </span>
                    <span className="menu-text" > شهر ها </span>
                  </NavLink>
                </li>
                <li className={`menu-item ${getMenuItemActive(
                  "/car_brands"
                )}`}
                  aria-haspopup="true" >
                  <NavLink className="menu-link"
                    to="/car_brands" >
                    < span className="svg-icon menu-icon" >
                      <SVG src={toAbsoluteUrl("/media/svg/icons/Shopping/Box2.svg")}
                      />
                    </span>
                    <span className="menu-text" > برندهای خودرو </span>
                  </NavLink>
                </li>
                <li className={`menu-item ${getMenuItemActive(
                  "/car_types"
                )}`}
                  aria-haspopup="true" >
                  <NavLink className="menu-link"
                    to="/car_types" >
                    < span className="svg-icon menu-icon" >
                      <SVG src={toAbsoluteUrl("/media/svg/icons/Shopping/Box2.svg")}
                      />
                    </span>
                    <span className="menu-text" > انواع خودرو </span>
                  </NavLink>
                </li>
                <li className={`menu-item ${getMenuItemActive(
                  "/cars"
                )}`}
                  aria-haspopup="true" >
                  <NavLink className="menu-link"
                    to="/cars" >
                    < span className="svg-icon menu-icon" >
                      <SVG src={toAbsoluteUrl("/media/svg/icons/Shopping/Box2.svg")}
                      />
                    </span>
                    <span className="menu-text" > خودرو ها </span>
                  </NavLink>
                </li>
                <li className={`menu-item ${getMenuItemActive(
                  "/drivers"
                )}`}
                  aria-haspopup="true" >
                  <NavLink className="menu-link"
                    to="/drivers" >
                    < span className="svg-icon menu-icon" >
                      <SVG src={toAbsoluteUrl("/media/svg/icons/Shopping/Box2.svg")}
                      />
                    </span>
                    <span className="menu-text" > رانندگان </span>
                  </NavLink>
                </li>
                <li className={`menu-item ${getMenuItemActive(
                  "/servants"
                )}`}
                  aria-haspopup="true" >
                  <NavLink className="menu-link"
                    to="/servants" >
                    < span className="svg-icon menu-icon" >
                      <SVG src={toAbsoluteUrl("/media/svg/icons/Shopping/Box2.svg")}
                      />
                    </span>
                    <span className="menu-text" > خدمه </span>
                  </NavLink>
                </li>
                <li className={`menu-item ${getMenuItemActive(
                  "/stations"
                )}`}
                  aria-haspopup="true" >
                  <NavLink className="menu-link"
                    to="/stations" >
                    < span className="svg-icon menu-icon" >
                      <SVG src={toAbsoluteUrl("/media/svg/icons/Shopping/Box2.svg")}
                      />
                    </span>
                    <span className="menu-text" > ایستگاه ها </span>
                  </NavLink>
                </li>
                <li className={`menu-item ${getMenuItemActive(
                  "/directions"
                )}`}
                  aria-haspopup="true" >
                  <NavLink className="menu-link"
                    to="/directions" >
                    < span className="svg-icon menu-icon" >
                      <SVG src={toAbsoluteUrl("/media/svg/icons/Shopping/Box2.svg")}
                      />
                    </span>
                    <span className="menu-text" > مسیر ها </span>
                  </NavLink>
                </li>
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