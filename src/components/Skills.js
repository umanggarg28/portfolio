import React, { useEffect, useState } from "react";
import sanityClient from "../client";
import LazyShow from "./LazyShow";
import anime from "animejs";

export default function Skills({useOnScreen, parallax}) {

  const rootRef = React.createRef();

  const onScreen = useOnScreen(rootRef);

    useEffect(() => {
        if (onScreen) {
          var textWrapper = document.querySelector('.skillsHeadingAnim');
          textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
  
          anime.timeline({loop: false})
              .add({
                  targets: '.skillsHeadingAnim .letter',
                  scale: [4,1],
                  opacity: [0,1],
                  translateZ: 0,
                  easing: "easeOutExpo",
                  duration: 950,
                  delay: (el, i) => 70*i
              }).add({
                  targets: '.skillsHeadingAnim',
                  opacity: 1,
                  duration: 1000,
                  easing: "easeOutExpo",
                  delay: 1000
              });
          }
      }, [onScreen]);

  const [skills, setSkillsData] = useState(null);

  useEffect(() => {

    sanityClient.fetch(`*[_type == "skills"]{
        skill_category,
        language
      }`).then((data) => setSkillsData(data))
      .catch(console.error);

  }, []);

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
                <h1 ref={rootRef} className="skillsHeadingAnim heading heading-skills">Professional Skills</h1>
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
                        <div className="content content-bg-skills text-white">
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
