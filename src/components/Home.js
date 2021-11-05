import React, { useEffect, useRef, useState } from "react";
import Rellax from "rellax";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import MainHero from "./MainHero";
import Education from "./Education";
import Experience from "./Experience";
import Skills from "./Skills";
import Project from "./Project";
import About from "./About";


export default function Home() {
  // Little helpers ...
  const url = (name, wrap = false) =>
    `${
      wrap ? "url(" : ""
    }https://awv3node-homepage.surge.sh/build/assets/${name}.svg${
      wrap ? ")" : ""
    }`;

  const parallax = useRef(null);


  useEffect(() => {
    new Rellax(".animate", {
      speed: -10,
      center: false,
      wrapper: null,
      round: true,
      vertical: true,
      horizontal: false,
    });

}, []);


  return (
    <div>
      <Parallax ref={parallax} pages={7}>
        <ParallaxLayer
          offset={0}
          speed={1}
          style={{ backgroundImage: 'linear-gradient( -40deg, #240b36 0%, #c31432 100%)'}} //main background-color
        />
        <ParallaxLayer
          offset={1}
          speed={1}
          style={{ backgroundImage: 'linear-gradient( 99deg, rgba(115,18,81,1) 10.6%, rgba(28,28,28,1) 118% )'}} //about background-color
        />
        <ParallaxLayer
          offset={2}
          speed={1}
          style={{ backgroundImage: 'linear-gradient(to right, #ad5389, #3c1053)' }} //experience background-color
        />
        <ParallaxLayer
          offset={3}
          speed={1}
          style={{ backgroundImage :  "linear-gradient(to right, #000428, #004e92)"}} //projects background-color
        />

        <ParallaxLayer
          offset={4}
          speed={1}
          style={{ backgroundImage: "linear-gradient(to right, #23074d, #cc5333)"}} //skills background-color
        />

        <ParallaxLayer
          offset={5}
          speed={1}
          style={{ backgroundImage :  "linear-gradient(to right, #360033, #0b8793)"}} //education background-color
        />

        <ParallaxLayer
          offset={6}
          speed={1}
          style={{ backgroundImage :  "linear-gradient(to right, #360033, #0b8793)"}} //education background-color
        />

        {/* <ParallaxLayer
          offset={0}
          speed={0}
          factor={4}
          style={{
            backgroundImage: url("stars", true),
            backgroundSize: "cover",
          }}
        /> */}

        {/* <ParallaxLayer
          offset={1.3}
          speed={-0.3}
          style={{ pointerEvents: "none" }}
        >
          <img
            src={url("satellite4")}
            style={{ width: "10%", marginLeft: "35%", opacity: 0.7 }}
          />
        </ParallaxLayer> */}

        {/* <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.3 }}>
          <img
            src={education7}
            style={{ display: "block", width: "10%", marginLeft: "30%", marginTop: "2%"   }}
          />
          <img
            src={education2}
            style={{ display: "block", width: "10%", marginLeft: "5%" }}
          />
        </ParallaxLayer> */}

        {/* <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.2 }}>
          <img
            src={education1}
            style={{ display: "block", width: "15%", marginLeft: "30%" }}
          />
          <img
            src={education4}
            style={{ display: "block", width: "40%", marginLeft: "40%"}}
          />
        </ParallaxLayer> */}

        {/* <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.5 }}>
          <img
            src={education6}
            style={{ display: "block", width: "10%", marginLeft: "25%", marginTop: "2%" }}
          />
          <img
            src={education4}
            style={{ display: "block", width: "18%", marginLeft: "77%" }}
          />
        </ParallaxLayer> */}

        {/* <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>
          <img
            src={url("cloud")}
            style={{ display: "block", width: "20%", marginLeft: "60%" }}
          />
          <img
            src={education5}
            style={{ display: "block", width: "15%", marginLeft: "50%" }}
          />
          <img
            src={url("cloud")}
            style={{ display: "block", width: "10%", marginLeft: "80%" }}
          />
        </ParallaxLayer> */}

        {/* <ParallaxLayer offset={1.8} speed={0.4} style={{ opacity: 0.6 }}>
          <img
            src={education9}
            style={{ display: "block", width: "15%", marginLeft: "5%" }}
          />
          <img
            src={education9}
            style={{ display: "block", width: "15%", marginLeft: "75%" }}
          />
        </ParallaxLayer> */}

        {/* <ParallaxLayer
          offset={3}
          speed={-0.4}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <img src={url("earth")} style={{ width: "60%" }} />
        </ParallaxLayer> */}

        {/* <ParallaxLayer
          offset={3}
          speed={-0.3}
          style={{
            backgroundSize: "80%",
            backgroundPosition: "center",
            backgroundImage: url("clients", true),
          }}
        /> */}

        <ParallaxLayer
          offset={0}
          speed={0}
          onClick={() => parallax.current.scrollTo(1)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
        <MainHero />
        </ParallaxLayer>

        <ParallaxLayer
          id="about"
          offset={1}
          speed={0}
          onClick={() => parallax.current.scrollTo(2)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
        <About />
        </ParallaxLayer>

        <ParallaxLayer
          id="experience"
          offset={2}
          // speed={0.1}
          onClick={() => parallax.current.scrollTo(3)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Experience />
        </ParallaxLayer>

        <ParallaxLayer
          id="projects"
          offset={3}
          // speed={0.1}
          onClick={() => parallax.current.scrollTo(4)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Project />
        </ParallaxLayer>

        <ParallaxLayer
          id="skills"
          offset={4}
          // speed={0.1}
          onClick={() => parallax.current.scrollTo(5)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Skills />
        </ParallaxLayer>

        <ParallaxLayer
          id="education"
          offset={5}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => parallax.current.scrollTo(6)}
        >
          <Education />
        </ParallaxLayer>

        <ParallaxLayer
          id="contact"
          offset={6}
          speed={-0}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => parallax.current.scrollTo(0)}
        >
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}
