import React, { useEffect, useState } from "react";
import sanityClient from "../client";
import Moment from 'moment';

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
      <div id="education-top-div" className="inline-grid">
              <div className="education-header-container">
                <h3 className="education-heading">Schools and stuff</h3>
                <lottie-player
                  id="schoolAnim"
                  autoplay
                  // controls
                  loop
                  mode="normal"
                  src="https://assets10.lottiefiles.com/packages/lf20_6kyyqxp7.json"
                  style={{height: 70, marginLeft: -70, marginTop: -150, width: '55%'}}
                />
                </div>
                <div className="education-pic-box">
                  <lottie-player
                    autoplay
                    // controls
                    loop
                    mode="normal"
                    id="secondLottie"
                    // src="https://assets8.lottiefiles.com/packages/lf20_1omohnse.json"
                    src="https://assets10.lottiefiles.com/private_files/lf30_G9r0Hr.json"
                    
                  ></lottie-player>
                </div>
            </div>


      <div className="education-display">
      <div style={{display: 'grid'}}>
 
      </div>
      <div className="education-description max-w-sm overflow-hidden">
      {education && education.map((educationData, index) => (
          <div key={index} class="px-6 py-4">
          <h3 className="education-data-heading">{educationData.university_name}</h3>
          <p className="education-place">{educationData.place}</p>
          <div style={{'display': 'flow-root', marginTop: 10}}>
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
      <div className="button-box">
      <button onClick={() => parallax.current.scrollTo(6)} className="contact-btn py-2 px-4">
                <lottie-player
                        autoplay
                        loop
                        mode="normal"
                        id="scrollButton"
                        src="https://assets6.lottiefiles.com/packages/lf20_RbdjIx.json"
                        style={{
                            height: 60
                        }}
                ></lottie-player>
            </button>
            </div>
    </React.Fragment>
  );
}
