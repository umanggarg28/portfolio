import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
import { HashLink, NavHashLink } from 'react-router-hash-link';
import { SocialIcon } from "react-social-icons";
import "../App.css";
import logo from '../header1.svg';
import Education from "./Education";
import LogoAnimation from "./logoAnimation";


export default function NavBar({ navColor, navSize }) {
  return (
    <div className="container mx-auto justify-between fixed">
      <div className="block">
        <nav
          style={{
            backgroundColor: navColor,
            height: navSize,
            transition: "all 1s",
            paddingRight: 20,
            paddingLeft: 10,
          }}
        >
          <HashLink
            to="/"
            exact
            activeClassName="text-white"
            className="float-left bright heading-font inline-flex items-center tracking-widest"
          >
            {/* <img className="header-logo" src={logo} alt="logo"/> */}
            < LogoAnimation />
          </HashLink>
          <div className="float-right">
            <HashLink
              smooth to="#about"
              activeClassName="text-red-100 nav_item_active bg-red-700"
              className="pri-font whittish inline-flex item-center px-3 my-6 text-red-200"
            >ABOUT
            </HashLink>
            <HashLink
              smooth to="#experience"
              activeClassName="text-red-100 nav_item_active bg-red-700"
              className="pri-font whittish inline-flex item-center px-3 my-6 text-red-200"
            >EXPERIENCE
            </HashLink>
            <HashLink
              smooth to="#projects"
              activeClassName="text-red-100 nav_item_active bg-red-700"
              className="pri-font whittish inline-flex item-center px-3 my-6 text-red-200"
            >PROJECTS
            </HashLink>
            <HashLink
              smooth to="#skills"
              activeClassName="text-red-100 nav_item_active bg-red-700"
              className="pri-font whittish inline-flex item-center px-3 my-6 text-red-200"
            >SKILLS
            </HashLink>
            <HashLink
              smooth to="#education"
              activeClassName="text-red-100 nav_item_active bg-red-700"
              className="pri-font whittish inline-flex item-center px-3 my-6 text-red-200"
            >EDUCATION
            </HashLink>
            <HashLink
              smooth to="#contact"
              activeClassName="text-red-100 nav_item_active bg-red-700"
              className="pri-font whittish inline-flex item-center px-3 my-6 text-red-200"
            >CONTACT
            </HashLink>
          </div>
        </nav>
      </div>
    </div>
  );
}
