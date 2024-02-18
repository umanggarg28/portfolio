import React from "react";
import { HashLink } from 'react-router-hash-link';
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
            paddingRight: 20,
            paddingLeft: 10,
          }}
        >
          <HashLink
            smooth to="#mainHero"
            exact
            activeClassName="text-white"
          >
            <div className="float-left bright heading-font inline-flex items-center tracking-widest">
            <lottie-player
              autoplay
              loop
              mode="normal"
              id="logoLottie"
              src="https://assets4.lottiefiles.com/packages/lf20_buulmwlq.json" // Logo
              // src="https://assets8.lottiefiles.com/packages/lf20_cc80aute.json"
              style={{height: 150,
                      marginLeft: -30,
                      marginTop: -20
                    }}
            ></lottie-player>
            </div>
          </HashLink>
          <div className="nav-right float-right">
            <HashLink
              smooth to="#about"
              activeClassName="text-red-100 nav_item_active bg-red-700"
              className="whittish inline-flex item-center px-3 my-6 text-red-200"
            >About
            </HashLink>
            <HashLink
              smooth to="#experience"
              activeClassName="text-red-100 nav_item_active bg-red-700"
              className="whittish inline-flex item-center px-3 my-6 text-red-200"
            >Experience
            </HashLink>
            <HashLink
              smooth to="#projects"
              activeClassName="text-red-100 nav_item_active bg-red-700"
              className="whittish inline-flex item-center px-3 my-6 text-red-200"
            >Projects
            </HashLink>
            <HashLink
              smooth to="#skills"
              activeClassName="text-red-100 nav_item_active bg-red-700"
              className="whittish inline-flex item-center px-3 my-6 text-red-200"
            >Skills
            </HashLink>
            <HashLink
              smooth to="#education"
              activeClassName="text-red-100 nav_item_active bg-red-700"
              className="whittish inline-flex item-center px-3 my-6 text-red-200"
            >Education
            </HashLink>
            <HashLink
              smooth to="#contact"
              activeClassName="text-red-100 nav_item_active bg-red-700"
              className="whittish inline-flex item-center px-3 my-6 text-red-200"
            >Contact
            </HashLink>
            {/* <HashLink
              activeClassName="text-red-100 nav_item_active bg-red-700"
              className="pri-font whittish inline-flex item-center px-3 my-6 text-red-200"
              to="/public/Resume.pdf" target="_blank" download>Resume
            </HashLink> */}
          </div>
        </nav>
      </div>
    </div>
  );
}
