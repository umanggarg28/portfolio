import React, { useEffect, useState } from "react";
import Rellax from "rellax";
import TextAnimation from "react-animate-text";
import { useSpring, animated } from "react-spring";
import sanityClient from "../client";
import LazyShow from "./LazyShow";

export default function MainHero({parallax}) {

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

    // const container = useRef(null);
    

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
        <section className="main-container">
            <div className="box-transparent">
            <LazyShow>
                <div className="box-content">
                <TextAnimation charInterval="50">
                    <p className="about-description bright">Hello! I'm</p>
                </TextAnimation>
                <animated.h1
                style={props}
                className="text-xl text-green-100 cursive leading-none home-name"
                >
                    {author && author[0].name}
                </animated.h1>
                <h3 className="sub-heading">I build things for the web
                <lottie-player
                    id="webAnim"
                    autoplay
                    loop
                    mode="normal"
                    // src="https://assets9.lottiefiles.com/packages/lf20_5inj20n2.json"
                    src="https://assets3.lottiefiles.com/packages/lf20_bfdhvjtv.json"
                    style={{height: 250, marginLeft: -150, marginTop: -75, width: '55%'}}
                ></lottie-player>
                </h3>
                <div className="description">
                    <p className="about-description white">
                        {author && author[0].main_page_headline}
                    </p>
                </div>
                </div>
            </LazyShow>
            </div>
            {/* <div className="home-pic-box" ref={container}>
                <lottie-player
                hover
                loop
                mode="normal"
                id="mainAnim" */}
                {/* // src="https://assets1.lottiefiles.com/packages/lf20_tpozrkv0.json"
                // src="https://assets9.lottiefiles.com/packages/lf20_tpbyhgfu.json"
                // src="https://assets4.lottiefiles.com/packages/lf20_kw2yp643.json"
                // src="https://assets10.lottiefiles.com/packages/lf20_gy6w24sr.json"
                // src="https://assets8.lottiefiles.com/packages/lf20_ufkgreod.json"
                // src="https://assets3.lottiefiles.com/packages/lf20_ri0tw20g.json"
                // src="https://assets4.lottiefiles.com/packages/lf20_xhgpxevg.json"
                // src="https://assets2.lottiefiles.com/packages/lf20_xhgpxevg.json"
                // src="https://assets9.lottiefiles.com/packages/lf20_k82barmh.json" */}
                {/* style={{
                    height: 750,
                    marginRight: 80,
                    marginTop:80
                }}
                ></lottie-player>
            </div> */}
            <div className="button-box">
                <button onClick={() => parallax.current.scrollTo(1)} className="contact-btn">
                    <lottie-player
                            autoplay
                            loop
                            mode="normal"
                            id="scrollButton1"
                            src="https://assets2.lottiefiles.com/packages/lf20_go4bqcz3.json"
                            style={{
                                width: 60,
                                marginTop:'2vh'
                            }}
                    ></lottie-player>
                </button>
            </div>
            </section>
    </React.Fragment>
  );
}