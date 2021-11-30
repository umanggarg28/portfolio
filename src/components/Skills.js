import React, { useEffect, useState } from "react";
import sanityClient from "../client";

export default function Skills({parallax}) {

  const [skills, setSkillsData] = useState(null);

  const url = (name, wrap = false) =>
    `${
      wrap ? "url(" : ""
    }https://awv3node-homepage.surge.sh/build/assets/${name}.svg${
      wrap ? ")" : ""
    }`;

  useEffect(() => {

    sanityClient.fetch(`*[_type == "skills"]{
        skill_category,
        language
      }`).then((data) => setSkillsData(data))
      .catch(console.error);

  }, []);

  console.log("skills data:");
  console.log(skills);

  return (
    <React.Fragment>
      <div style={{display: 'inline-grid'}}>
                <div className="skills-header-container">
                <h3 className="skills-heading">Professional Skills</h3>
                <lottie-player
                  autoplay
                  // controls
                  loop
                  mode="normal"
                  src="https://assets9.lottiefiles.com/packages/lf20_qp95sgvg.json"
                  style={{height: 80, marginLeft: 390, marginTop: -160, width: '55%'}}
                />
                </div>
                <div className="skills-pic-box">
                  <lottie-player
                    id="skillsAnim"
                    autoplay
                    loop
                    mode="normal"
                    src="https://assets6.lottiefiles.com/packages/lf20_miikvucn.json"
                    style={{height: 300,
                      marginTop: 40
                    }}
                  ></lottie-player>
                </div>
            </div>


      <div className="skills-display">
      <div className="skills-description max-w-sm overflow-hidden">
      {skills && skills.map((skillsData) => (
        <div class="px-6 py-4">
        <h3 className="skills-data-heading">{skillsData.skill_category}</h3>
          <p className="skills-data-degree">{skillsData.language}</p>
          </div>
      ))}
      </div>
      </div>
      <div className="button-box">
      <button onClick={() => parallax.current.scrollTo(5)} className="contact-btn py-2 px-4">
          <lottie-player
                  hover
                  loop
                  mode="normal"
                  id="scrollButton1"
                  src="https://assets9.lottiefiles.com/packages/lf20_tlje6641.json"
                  style={{
                      height: 100
                  }}
          ></lottie-player>
        </button>
        </div>
    </React.Fragment>
  );
}
