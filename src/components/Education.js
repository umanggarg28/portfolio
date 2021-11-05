import React, { useEffect, useState } from "react";
import sanityClient from "../client";
import Moment from 'moment';
import EducationAnimation from "./educationAnimation";
import * as LottiePlayer from "@lottiefiles/lottie-player";

export default function Education() {

  const [education, setEducationData] = useState(null);

  const url = (name, wrap = false) =>
    `${
      wrap ? "url(" : ""
    }https://awv3node-homepage.surge.sh/build/assets/${name}.svg${
      wrap ? ")" : ""
    }`;

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
      <div className="education-pic-box">
        {/* <EducationAnimation /> */}
        <lottie-player
          autoplay
          // controls
          loop
          mode="normal"
          id="secondLottie"
          // src="https://assets6.lottiefiles.com/private_files/lf30_YWyaYi.json"
          src="https://assets8.lottiefiles.com/packages/lf20_1omohnse.json"
          style={{height: 500}}
        ></lottie-player>
      </div>
      <div className="education-display">
      <h3 className="education-heading">Schools and stuff</h3>
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
    </React.Fragment>
  );
}
