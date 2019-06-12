import React from "react";
import { Link } from "react-router-dom";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
// reactstrap components
import {
  Button,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

class Header extends React.Component {
  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
  }
  nav = {
    "z-index": 1000
  };
  render() {
    return (
      <div>
        <header className="header-global header">
          <Navbar
            className="navbar navbar-expand-lg navbar-light bg-light"
            expand="lg"
            id="navbar-main"
          >
            <Container>
              <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
                <img
                  alt="..."
                  className="px-1"
                  src={require("assets/img/brand/argon-react-white.png")}
                />
                TRANXIT
              </NavbarBrand>
              <button className="navbar-toggler" id="navbar_global">
                <span className="navbar-toggler-icon" />
              </button>
              <UncontrolledCollapse navbar toggler="#navbar_global">
                <div className="navbar-collapse-header">
                  <Row>
                    <Col className="collapse-brand" xs="6">
                      <Link to="/">
                        {/* <img alt="..." src={require('assets/img/brand/argon-react.png')} /> */}
                        TRANXIT Technology
                      </Link>
                    </Col>
                    <Col className="collapse-close" xs="6">
                      <button className="navbar-toggler" id="navbar_global">
                        <span />
                        <span />
                      </button>
                    </Col>
                    <Col className="collapse-close" xs="6">
                      <button className="navbar-toggler" id="navbar_global">
                        <Link to="/create" />
                        <span />
                        <span />
                      </button>
                    </Col>
                  </Row>
                </div>
                <Nav
                  className="navbar-nav-hover align-items-lg-center"
                  navbar
                />
              </UncontrolledCollapse>
            </Container>
          </Navbar>
        </header>
      </div>
    );
  }
}

export default Header;
