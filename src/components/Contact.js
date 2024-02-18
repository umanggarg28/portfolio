import React, {useEffect} from "react";
import LazyShow from "./LazyShow";
import anime from "animejs";

export default function Contact({useOnScreen, parallax}) {

    const rootRef = React.createRef();

    const onScreen = useOnScreen(rootRef);

    useEffect(() => {
        if (onScreen) {
          var textWrapper = document.querySelector('.contactHeadingAnim');
          textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
  
          anime.timeline({loop: false})
              .add({
                  targets: '.contactHeadingAnim .letter',
                  scale: [4,1],
                  opacity: [0,1],
                  translateZ: 0,
                  easing: "easeOutExpo",
                  duration: 950,
                  delay: (el, i) => 70*i
              }).add({
                  targets: '.contactHeadingAnim',
                  opacity: 1,
                  duration: 1000,
                  easing: "easeOutExpo",
                  delay: 1000
              });
          }
      }, [onScreen]);

    return (
        <React.Fragment>
        <section className="main-container">
            <div className="header-container">
                <h1 ref={rootRef} className="contactHeadingAnim heading content heading-experience">Get in touch</h1>
            </div>
            <LazyShow>
                <div className="content-main-dad" style={{margin: '0 auto'}}>
                    {/* <div className="lottie-main" style={{marginRight: 0}}>
                    <lottie-player
                        autoplay
                        loop
                        mode="normal"
                        id="contactAnim"
                        src="https://assets10.lottiefiles.com/packages/lf20_vpzw63hs.json"
                        style={{
                            width: '60vh'
                        }}
                        ></lottie-player>
                    </div> */}
                    <div className="content-box">
                    {/* <div className="max-w-sm overflow-hidden"> */}
                        <div style={{textAlign: 'center'}} className="px-6 py-4">
                            <p className="contact-inner">
                            I’m actively looking for any new opportunities in the US, and my inbox is always open. Have a job for me? I'd love to get in touch. Or even if you have a question or just want to say hi, I’ll try my best to get back to you!
                            </p>
                            <a id="btn-contact" style={{fontSize:34, position: 'relative', zIndex: 9999}} className="font-normal hover:text-white py-2 px-4" target="_blank" rel="noreferrer" href="mailto:umanggarg28@gmail.com"> Say Hello!</a>
                                <lottie-player
                                    hover
                                    loop
                                    mode="normal"
                                    // src="https://assets6.lottiefiles.com/packages/lf20_uwos7l6e.json"
                                    // src="https://assets9.lottiefiles.com/packages/lf20_osjfyiii.json"
                                    style={{width: 240, marginTop: -122, marginLeft: 43}}
                                />
                        {/* </div> */}
                        </div>
                    </div>
                </div>
                </LazyShow>

                <div className="button-box">
                <button onClick={() => parallax.current.scrollTo(0)} className="contact-btn py-2 px-4">
                    <lottie-player
                            autoplay
                            loop
                            mode="normal"
                            id="scrollButton"
                            src="https://assets6.lottiefiles.com/packages/lf20_RbdjIx.json"
                            style={{
                                width: 50
                            }}
                    ></lottie-player>
                </button>
                </div>
            </section>
    </React.Fragment>
  );
}