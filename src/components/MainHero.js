import React, { useEffect, useState, useRef } from "react";
import Rellax from "rellax";
import TextAnimation from "react-animate-text";
import { useSpring, animated } from "react-spring";
import sanityClient from "../client";

export default function MainHero() {

    const [author, setAuthorData] = useState(null);

    const [flip, set] = useState(false);
    const props = useSpring({
      to: { opacity: 0 },
      from: { opacity: 1 },
      reset: false,
      reverse: true,
      delay: 1000,
      onRest: () => set(!flip),
    });

    const container = useRef(null);

    useEffect(() => {
        new Rellax(".animate", {
          speed: -10,
          center: false,
          wrapper: null,
          round: true,
          vertical: true,
          horizontal: false,
        });

        sanityClient.fetch(`*[_type == "author"]{
            name,
            image,
            bio,
            main_page_headline
          }`).then((data) => setAuthorData(data))
          .catch(console.error);
    }, []);


    return (
        <React.Fragment>
            <div className="box-transparent">
                <br></br>
                <TextAnimation charInterval="50">
                    <p className="about-description bright">Hello! I'm</p>
                </TextAnimation>
                <animated.h1
                style={props}
                className="text-xl text-green-100 cursive leading-none home-name"
                >
                    {author && author[0].name}
                </animated.h1>
                <h3 className="sub-heading">I build things for the <span>web</span>
                <lottie-player
                    autoplay
                    // controls
                    loop
                    mode="normal"
                    // src="https://assets9.lottiefiles.com/packages/lf20_5inj20n2.json"
                    src="https://assets3.lottiefiles.com/packages/lf20_bfdhvjtv.json"
                    style={{height: 150, marginLeft: -150, marginTop: -35, width: '55%'}}
                ></lottie-player>
                </h3>
                <div className="description">
                    <p className="about-description white">
                        {author && author[0].main_page_headline}
                    </p>
                </div>
                <br></br>
                <br></br>
                <button className="contact-btn bg-transparent text-white font-normal hover:text-white py-2 px-4 border hover:border-transparent rounded float-right">Get in touch</button>
            </div>
            <div className="home-pic-box" ref={container}>
                {/* <CursorHorizontalSync /> */}
                <lottie-player
                autoplay
                loop
                mode="normal"
                id="aboutAnim"
                src="https://assets1.lottiefiles.com/packages/lf20_tpozrkv0.json"
                style={{
                    height: 400,
                    marginRight: 70,
                    marginTop: 20,
                }}
                ></lottie-player>
            </div>
    </React.Fragment>
  );
}