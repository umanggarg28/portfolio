import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import "../App.css";

export default function NavBar({ navColor, navSize }) {
  return (
    <div className="container mx-auto justify-between fixed">
      <div className="block">
        <nav
          style={{
            backgroundColor: navColor,
            height: navSize,
            transition: "all 1s",
          }}
        >
          <NavLink
            to="/"
            exact
            activeClassName="text-white"
            className="float-left bright heading-font inline-flex items-center my-4 px-3 ml-4 text-white-200 text-4xl tracking-widest"
          >
            UG
          </NavLink>
          <div className="float-right">
            <NavLink
              to="/about"
              activeClassName="text-red-100 bg-red-700"
              className="pri-font whittish inline-flex item-center px-3 my-6 text-red-200"
            >
              <span className="bright">01.</span>ABOUT
            </NavLink>
            <NavLink
              to="/experience"
              activeClassName="text-red-100 bg-red-700"
              className="pri-font whittish inline-flex item-center px-3 my-6 text-red-200"
            >
              <span className="bright">02.</span>EXPERIENCE
            </NavLink>
            <NavLink
              to="/education"
              activeClassName="text-red-100 bg-red-700"
              className="pri-font whittish inline-flex item-center px-3 my-6 text-red-200"
            >
              <span className="bright">01.</span>EDUCATION
            </NavLink>
            <NavLink
              to="/skills"
              activeClassName="text-red-100 bg-red-700"
              className="pri-font whittish inline-flex item-center px-3 my-6 text-red-200"
            >
              <span className="bright">01.</span>SKILLS
            </NavLink>
            <NavLink
              to="/project"
              activeClassName="text-red-100 bg-red-700"
              className="pri-font whittish inline-flex item-center px-3 my-6 text-red-200"
            >
              <span className="bright">03.</span>WORK
            </NavLink>
            <NavLink
              to="/contact"
              activeClassName="text-red-100 bg-red-700"
              className="pri-font whittish inline-flex item-center px-3 my-6 text-red-200"
            >
              <span className="bright">04.</span>CONTACT
            </NavLink>
          </div>
        </nav>
      </div>
    </div>
  );
}
