import React from "react";
import LazyShow from "./LazyShow";

export default function Contact({parallax}) {

    return (
        <React.Fragment>
        <section className="main-container">
            <div className="header-container">
                <h3 className="heading heading-experience">Get in touch</h3>
            </div>
            <LazyShow>
                <div className="content-main-dad" style={{margin: '0 auto'}}>
                    <div className="content-box">
                    <div className="max-w-sm overflow-hidden">
                        <div style={{textAlign: 'center'}} className="px-6 py-4">
                            <p className="contact-inner">
                            I’m actively looking for any new opportunities in the US, and my inbox is always open. Have a job for me? I'd love to get in touch. Or even if you have a question or just want to say hi, I’ll try my best to get back to you!
                            </p>
                            <button id="btn-contact" style={{position: 'relative', zIndex: 9999}} className="font-normal hover:text-white py-2 px-4" href="mailto:umanggarg28@gmail.com">Say Hello</button>
                                <lottie-player
                                    hover
                                    loop
                                    mode="normal"
                                    src="https://assets6.lottiefiles.com/packages/lf20_uwos7l6e.json"
                                    style={{width: 200, marginTop: -160, marginLeft: 65}}
                                />
                        </div>
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
                            id="scrollButton1"
                            src="https://assets9.lottiefiles.com/packages/lf20_tlje6641.json"
                            style={{
                                height: 100,
                                marginTop: -30
                            }}
                    ></lottie-player>
                </button>
                </div>
            </section>
    </React.Fragment>
  );
}