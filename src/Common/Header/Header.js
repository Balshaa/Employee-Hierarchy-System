import React, { useRef } from "react";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";
import {NavLink} from "react-router-dom"
import "./header.css";

const navLinks = [
  {
    display: "Home",
    url: "./",
  },
  {
    display: "Admin",
    url: "./Admin",
  },
  {
    display: "Help",
    url: "./SignUp",
  },
  {

    display: "Login",
    url: "./Login",
  },
  // {
  //   display: "Student",
  //   url: "./Student",
  // },
  
  // {
  //   display: "Teacher",
  //   url: "./Teacher",
  // },
  // {
  //   display: "Record Officer",
  //   url: "./RecordOfficer",
  // },
  // {
  //   display: "Director",
  //   url: "./Director",
  // },
  // {
  //   display: "MERSU",
  //   url: "./MERSU",
  // },
  // {
  //   display: "Admin page",
  //   url: "./Admin",
  // },
];


const Header = () => {
  const menuRef = useRef();

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

  return (
    <header className="header"  position="fixed" >
    <Container>
    <nav>
      <div className="nav d-flex align-items-center gap-5">
        <div className="nav__menu" ref={menuRef} onClick={menuToggle}>
          <ul className="nav__list">
            <li className="nav__item">
              <div style={{ marginLeft: "0",  marginRight: "50" }}>
             <h3></h3>
              </div>
            </li>
            {navLinks.map((item, index) => (
              <li key={index} className="nav__item">
{/*            <Link to={item.url}>{item.display}</Link>
            */}              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
    <div className="mobile__menu">
      <span>
        <i className="ri-menu-line" onClick={menuToggle}></i>
      </span>
    </div>
  </Container>
    </header>
  );
};

export default Header;
