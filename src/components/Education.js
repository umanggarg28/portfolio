import React, { useEffect, useState } from "react";
import sanityClient from "../client";
import Moment from 'moment';
import LazyShow from "./LazyShow";

export default function Education({parallax}) {

  const [education, setEducationData] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "education"]{
            university_name,
            degree,
            date_from,
            date_to,
            place,
            gpa
      }`
      )
      .then((data) => setEducationData(data))
      .catch(console.error);

      // const MyLottie = document.getElementById("secondLottie");
      // MyLottie.getLottie().goToAndStop(45, true);

        // document
        // .getElementById("secondLottie")
        // .getLottie()
        // .playSegments([100, 300], true);
  }, []);

  console.log("education data:");
  console.log(education);

  return (
    <React.Fragment>
    <section className="main-container">
        <div className="header-container">
            <div className="lottie-container">
                <lottie-player
                  id="schoolAnim"
                  hover
                  loop
                  mode="normal"
                  src="https://assets4.lottiefiles.com/packages/lf20_3mvi6d9c.json"
                  style={{width: 80, marginRight:'2vh'}}
                />
            </div>
            <h3 className="heading heading-education">Schools and stuff</h3>
        </div>
        <LazyShow>
          <div className="content-main-dad">
                <div className="lottie-main" style={{marginRight: '-3vh'}}>
                  <lottie-player
                    autoplay
                    loop
                    mode="bounce"
                    id="secondLottie"
                    // src="https://assets8.lottiefiles.com/packages/lf20_1omohnse.json"
                    src="https://assets10.lottiefiles.com/private_files/lf30_G9r0Hr.json"
                    style={{width: 500}}
                  ></lottie-player>
                </div>
                <div className="content-box">
                        <div className="content text-white">
                          {education && education.map((educationData, index) => (
                              <div key={index} class="px-6 py-4">
                              <h3 className="education-data-heading">{educationData.university_name}</h3>
                              <p className="education-place">{educationData.place}</p>
                              <div style={{'display': 'flex', 'justify-content': 'space-between', marginTop: 10}}>
                                <p className="education-data-degree">{educationData.degree}</p>
                                <div className="education-data-dates">
                                  <p>{Moment(educationData.date_from).format('MMM yyyy')} - {Moment(educationData.date_to).format('MMM yyyy')}</p>
                                </div>
                              </div>
                              <div className="bar-mask">
                                <div className="bar"></div>
                              </div>
                              <div className="badge">
                                <div className="badge-content">{educationData.gpa}</div>
                              </div>
                              </div>
                          ))}
                        </div>        
                 </div>
            </div>
            </LazyShow>              
              
      <div className="button-box">
      <button onClick={() => parallax.current.scrollTo(6)} className="contact-btn py-2 px-4">
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
