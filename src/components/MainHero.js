import React, { useEffect, useState } from "react";
import TextAnimation from "react-animate-text";
import { useSpring, animated } from "react-spring";
import LazyShow from "./LazyShow";
import anime from "animejs";

export default function MainHero({useOnScreen, parallax, author}) {

    const rootRef = React.createRef();

    const onScreen = useOnScreen(rootRef);

    const [flip, set] = useState(false);
    const props = useSpring({
      to: { opacity: 0 },
      from: { opacity: 1 },
      reset: false,
      reverse: true,
      delay: 1000,
      onRest: () => set(!flip),
    });

    useEffect(() => {
        if (onScreen) {
          var textWrapper = document.querySelector('.mainHeadingAnim');
          textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
  
          anime.timeline({loop: false})
              .add({
                  targets: '.mainHeadingAnim .letter',
                  scale: [4,1],
                  opacity: [0,1],
                  translateZ: 0,
                  easing: "easeOutExpo",
                  duration: 950,
                  delay: (el, i) => 70*i
              }).add({
                  targets: '.mainHeadingAnim',
                  opacity: 1,
                  duration: 1000,
                  easing: "easeOutExpo",
                  delay: 1000
              });
          }
      }, [onScreen]);

    // const container = useRef(null);

    return (
        <React.Fragment>
        <section className="main-container">
            <div className="box-transparent">
            <LazyShow>
                <div className="box-content">
                <TextAnimation charInterval="50">
                    <p className="about-description bright">Hello, I'm</p>
                </TextAnimation>
                <animated.h1
                style={props}
                className="text-xl text-green-100 cursive leading-none home-name"
                >
                    {author && author[0].name}!
                </animated.h1>
                <h1 ref={rootRef} className="mainHeadingAnim heading-mainhero">{'{'} I build things for the web {'}'}</h1>
                {/* <lottie-player
                    id="webAnim"
                    autoplay
                    loop
                    mode="normal"
                    // src="https://assets9.lottiefiles.com/packages/lf20_5inj20n2.json"
                    src="https://assets3.lottiefiles.com/packages/lf20_bfdhvjtv.json"
                    style={{height: 300, marginLeft: 375, marginTop: -195, width: '55%', position: 'fixed'}}
                ></lottie-player> */}
                <div className="description">
                    <p className="about-description">
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
                            // src="https://assets2.lottiefiles.com/packages/lf20_go4bqcz3.json"
                            // style={{
                            //     width: 60,
                            //     marginTop:'2vh'
                            // }}
                            src="https://assets6.lottiefiles.com/packages/lf20_RbdjIx.json"
                            style={{
                                width: 40,
                                marginTop: 50
                            }}
                    ></lottie-player>
                </button>
            </div>
            </section>
    </React.Fragment>
  );
}