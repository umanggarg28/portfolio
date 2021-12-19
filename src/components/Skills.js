import React, { useEffect, useState } from "react";
import sanityClient from "../client";
import LazyShow from "./LazyShow";

export default function Skills({parallax}) {

  const [skills, setSkillsData] = useState(null);

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
          <section className="main-container">
            <div className="header-container">
               <div className="lottie-container">
                    <lottie-player
                      hover
                      loop
                      mode="normal"
                      src="https://assets10.lottiefiles.com/packages/lf20_optuv2ro.json"
                      style={{width: 70, marginRight: '2vh'}}
                    />
                </div>
                <h3 className="heading heading-skills">Professional Skills</h3>
            </div>
            <LazyShow>
              <div className="content-main-dad">
                <div className="lottie-main">
                    <lottie-player
                      id="skillsAnim"
                      autoplay
                      loop
                      mode="normal"
                      src="https://assets6.lottiefiles.com/packages/lf20_miikvucn.json"
                      style={{width: 500,
                        marginTop: 40,
                        marginLeft:40
                      }}
                    ></lottie-player>
                  </div>
                  <div className="content-box">
                        <div className="content text-white">
                        {skills && skills.map((skillsData) => (
                          <div class="px-6 py-4">
                          <h3 className="skills-data-heading">{skillsData.skill_category}</h3>
                            <p className="skills-data-degree">{skillsData.language}</p>
                            </div>
                        ))}
                        </div>
                    </div>
                    </div>
              </LazyShow>         
      <div className="button-box">
      <button onClick={() => parallax.current.scrollTo(5)} className="contact-btn py-2 px-4">
          <lottie-player
                  hover
                  loop
                  mode="normal"
                  id="scrollButton1"
                  src="https://assets9.lottiefiles.com/packages/lf20_tlje6641.json"
                  style={{
                  }}
          ></lottie-player>
        </button>
        </div>
        </section>
    </React.Fragment>
  );
}
