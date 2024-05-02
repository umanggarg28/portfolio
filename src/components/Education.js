import React, { useEffect } from "react";
import Moment from 'moment';
import LazyShow from "./LazyShow";
import anime from "animejs";

export default function Education({useOnScreen, parallax, education}) {

  const rootRef = React.createRef();

  const onScreen = useOnScreen(rootRef);

    useEffect(() => {
        if (onScreen) {
          console.log('education fired')
          var textWrapper = document.querySelector('.educationHeadingAnim');
          textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
  
          anime.timeline({loop: false})
              .add({
                  targets: '.educationHeadingAnim .letter',
                  scale: [4,1],
                  opacity: [0,1],
                  translateZ: 0,
                  easing: "easeOutExpo",
                  duration: 950,
                  delay: (el, i) => 70*i
              }).add({
                  targets: '.educationHeadingAnim',
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
            <h1 ref={rootRef} className="educationHeadingAnim heading content heading-education">/ education</h1>
        </div>
        <LazyShow>
          <div className="content-main-dad">
                <div className="content-box">
                        <div className="content text-white">
                          {education && education.map((educationData, index) => (
                              <div key={index} class="education-box px-6 py-6">
                              <h3 className="education-data-heading">{educationData.university_name}</h3>
                              <p className="education-place">{educationData.place}</p>
                              <div>
                                 {/* style={{'display': 'flex', 'justify-content': 'space-between', marginTop: 10}}> */}
                                <p className="education-data-degree">{educationData.degree}</p>
                                <div className="education-data-dates">
                                  <p>{Moment(educationData.date_from).format('MMM yyyy')} - {Moment(educationData.date_to).format('MMM yyyy')}</p>
                                </div>
                              </div>
                              {/* <div className="bar-mask">
                                <div className="bar"></div>
                              </div> */}
                              <div className="badge">
                                <div className="badge-content">GPA: {educationData.gpa}</div>
                              </div>
                              </div>
                          ))}
                        </div>        
                 </div>
            </div>
            </LazyShow>              

      <div className="button-box">
      <button onClick={() => parallax.current.scrollTo(3)} className="contact-btn py-2 px-4">
                <lottie-player
                        autoplay
                        loop
                        mode="normal"
                        id="scrollButton"
                        src="https://assets6.lottiefiles.com/packages/lf20_RbdjIx.json"
                        style={{
                            width: 40
                        }}
                ></lottie-player>
            </button>
            </div>
            </section>
    </React.Fragment>
  );
}
