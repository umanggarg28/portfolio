import React, { useEffect, useRef } from "react";
import Rellax from "rellax";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import MainHero from "./MainHero";
import Education from "./Education";
import Experience from "./Experience";
import Skills from "./Skills";
import Project from "./Project";
import About from "./About";
import Contact from "./Contact";

export default function Home() {

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
          style={{ 
            // background: '#1b1363'
            // backgroundImage: 'linear-gradient(to top, #86377b 20%, #27273c 80%)'
        }} //main background-color
        >
          <div>
          <lottie-player
              autoplay
              loop
              mode="bounce"
              id="mainherobg"
              // data-preserve-aspect-ratio ="xMinYMin slice"
              data-preserve-aspect-ratio ="xMidYMid slice"
              // background="darkslategray"
              // src="https://assets7.lottiefiles.com/packages/lf20_zprb9vzj.json"
              // src="https://assets9.lottiefiles.com/packages/lf20_lq0d2x0h.json" rocket
              src="https://assets4.lottiefiles.com/packages/lf20_pQHwaL.json"
              // src="https://assets8.lottiefiles.com/packages/lf20_kov0rtv5.json"
              style={{
                  height: '100%'
              }}
              ></lottie-player>
              </div>
        </ParallaxLayer>


        <ParallaxLayer
          offset={1}
        >
            <div>
          <lottie-player
              autoplay
              loop
              mode="bounce"
              id="aboutbg"
              src="https://assets7.lottiefiles.com/private_files/lf30_3zjr9l1k.json"
              style={{
                  height: '100%'
              }}
              ></lottie-player>
          </div>
        </ParallaxLayer>


        <ParallaxLayer
          offset={2}
        >
          <div>
            <lottie-player
              autoplay
              loop
              mode="bounce"
              id="experiencebg"
              background='linear-gradient(to right, #000428, #004e92)'
              src="https://assets8.lottiefiles.com/packages/lf20_pbgzoeho.json"
              style={{
                  height: '100%'
              }}
              ></lottie-player>
          </div>
        </ParallaxLayer>


        <ParallaxLayer
          offset={3}
          // style={{ backgroundImage :  "linear-gradient(to right, #000428, #004e92)"}} //projects background-color
        >
          <div>
            <lottie-player
              autoplay
              loop
              mode="normal"
              id="projectsbg"
              src="https://assets6.lottiefiles.com/packages/lf20_xROXkJ.json"
              style={{
                  height: '100%'
              }}
              ></lottie-player>
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={4}
        >
          <div>
            <lottie-player
                autoplay
                loop
                id="skillsbg"
                mode="normal"
                src="https://assets7.lottiefiles.com/datafiles/csP6U2eWv5hDhkq/data.json"
                style={{
                    height: '100%'
                }}
                ></lottie-player>
            </div>
      </ParallaxLayer>

        <ParallaxLayer
          offset={5}
        >
        <div>
          <lottie-player
              autoplay
              loop
              id="educationbg"
              mode="bounce"
              background=  "linear-gradient(to right, #360033, #0b8793)"
              // background='linear-gradient(to right, #23074d, #cc5333)'
              src="https://assets9.lottiefiles.com/packages/lf20_p11ajyds.json"
              // background='linear-gradient( 99deg, #1C0F55 10.6%, rgba(28,28,28,1) 118% )'
              // src="https://assets4.lottiefiles.com/packages/lf20_WAPsSQ.json"
              // src="https://assets2.lottiefiles.com/packages/lf20_qsgqcwag.json" underwater
              style={{
                  height: '100%'
              }}
              ></lottie-player>
          </div>
          </ParallaxLayer>

        <ParallaxLayer
          offset={6}
          ><div>
            <lottie-player
                autoplay
                loop
                id="contactbg"
                mode="normal"
                // background=  "darkslategray"
                src="https://assets7.lottiefiles.com/packages/lf20_gTE2BO.json"
                // src="https://assets10.lottiefiles.com/packages/lf20_zxbzlgot.json"
                style={{
                    height: '100%'
                }}
                ></lottie-player>
          </div>
        </ParallaxLayer>
        {/* <ParallaxLayer
          offset={7}
          style={{ backgroundImage :  "linear-gradient(to right, #360033, #0b8793)"}} //education background-color
        /> */}

        {/* <ParallaxLayer
          offset={0}
          speed={0.2}
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
          id="mainHero"
          offset={0}
          // speed={0.1}
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
        <MainHero parallax={parallax}/>
        </ParallaxLayer>

        <ParallaxLayer
          id="about"
          offset={1}
          // speed={0.1}
          style={{
            alignItems: "center",
            justifyContent: "center",
            // backgroundImage: 'linear-gradient( 99deg, rgba(115,18,81,1) 10.6%, rgba(28,28,28,1) 118% )'
          }}
        >
        <About parallax={parallax} />
        </ParallaxLayer>

        <ParallaxLayer
          id="experience"
          offset={2}
          // speed={0.1}
          style={{
            alignItems: "center",
            justifyContent: "center",
            // backgroundImage: 'linear-gradient(to right, #ad5389, #3c1053)'
          }}
        >
          <Experience parallax={parallax} />
        </ParallaxLayer>

        <ParallaxLayer
          id="projects"
          offset={3}
          // speed={0.1}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // backgroundImage :  'linear-gradient(to right, #000428, #004e92)'
          }}
        >
          <Project parallax={parallax} />
        </ParallaxLayer>

        <ParallaxLayer
          id="skills"
          offset={4}
          // speed={0.1}
          style={{
            alignItems: "center",
            justifyContent: "center",
            // backgroundImage: "linear-gradient(to right, #23074d, #cc5333)"
          }}
        >
          <Skills parallax={parallax} />
        </ParallaxLayer>

        <ParallaxLayer
          id="education"
          offset={5}
          // speed={0.1}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // backgroundImage :  "linear-gradient(to right, #360033, #0b8793)"
          }}
        >
          <Education parallax={parallax} />
        </ParallaxLayer>

        <ParallaxLayer
          id="contact"
          offset={6}
          // speed={0.1}
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
        <Contact parallax={parallax}/>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}
