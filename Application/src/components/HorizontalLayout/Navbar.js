import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Row, Col, Collapse } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import classname from "classnames";

//i18n
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";

const Navbar = props => {

  const [dashboard, setdashboard] = useState(false);
  const [ui, setui] = useState(false);
  const [cloudredi, setCloudRedi] = useState(false);
  const [techknow, setTechKnow] = useState(false);

  useEffect(() => {
    var matchingMenuItem = null;
    var ul = document.getElementById("navigation");
    var items = ul.getElementsByTagName("a");
    for (var i = 0; i < items.length; ++i) {
      if (props.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  });

  function activateParentDropdown(item) {
    item.classList.add("active");
    const parent = item.parentElement;
    if (parent) {
      parent.classList.add("active"); // li
      const parent2 = parent.parentElement;
      parent2.classList.add("active"); // li
      const parent3 = parent2.parentElement;
      if (parent3) {
        parent3.classList.add("active"); // li
        const parent4 = parent3.parentElement;
        if (parent4) {
          parent4.classList.add("active"); // li
          const parent5 = parent4.parentElement;
          if (parent5) {
            parent5.classList.add("active"); // li
            const parent6 = parent5.parentElement;
            if (parent6) {
              parent6.classList.add("active"); // li
            }
          }
        }
      }
    }
    return false;
  }

  return (
    <React.Fragment>
      <div className="topnav">
        <div className="container-fluid">
          <nav
            className="navbar navbar-light navbar-expand-lg topnav-menu"
            id="navigation"
          >
            <Collapse
              isOpen={props.leftMenu}
              className="navbar-collapse"
              id="topnav-menu-content"
            >
              <ul className="navbar-nav">

                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle arrow-none"
                    onClick={e => {
                      e.preventDefault();
                      setTechKnow(!techknow);
                    }}
                    to="/techknow"
                  >
                    <i className="mdi mdi-monitor-eye me-2"></i>
                    {props.t("TechKnow")} {props.menuOpen}
                    <div className="arrow-down"></div>
                  </Link>
                  <div
                    className={classname("dropdown-menu",
                    { show: techknow }
                       )}
                  >
                    <Link to="/autograph" className="dropdown-item">
                      {props.t("AutoGraph")}
                    </Link>
                    <Link to="/livegraph" className="dropdown-item">
                      {props.t("LiveGraph")}
                    </Link>
                    <Link to="/RouteOpt" className="dropdown-item">
                      {props.t("Route Analysis & Optimization")}
                    </Link>
                    <Link to="/rcaa" className="dropdown-item">
                      {props.t("RCAA")}
                    </Link>
                  </div>
                </li>


                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle arrow-none"
                    onClick={e => {
                      e.preventDefault();
                      setCloudRedi(!cloudredi);
                    }}
                    to="/cloudredi"
                  >
                    <i className="mdi mdi-cloud-check-outline me-2"></i>
                    {props.t("CloudRedi")} {props.menuOpen}
                    <div className="arrow-down"></div>
                  </Link>
                  <div
                    className={classname("dropdown-menu", { show: cloudredi })}
                  >
                    <Link to="/MonoMic" className="dropdown-item">
                      {props.t("Mono to Micro")}
                    </Link>
                    <Link to="/containerization_model" className="dropdown-item">
                      {props.t("App Containerization")}
                    </Link>
                    <Link to="/AppRat" className="dropdown-item">
                      {props.t("App Rationalization")}
                    </Link>
                    <Link to="/hardware_2_cloud" className="dropdown-item">
                      {props.t("Hardware to Cloud")}
                    </Link>
                  </div>
                </li>
              </ul>
            </Collapse>
          </nav>
        </div>
      </div>
    </React.Fragment>
  );
};


Navbar.propTypes = {
  leftMenu: PropTypes.any,
  location: PropTypes.any,
  menuOpen: PropTypes.any,
  t: PropTypes.any,
};

const mapStatetoProps = state => {
  const { leftMenu } = state.Layout;
  return { leftMenu };
};

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(Navbar))
);
