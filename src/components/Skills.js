import React, { useEffect } from "react";
import LazyShow from "./LazyShow";
import anime from "animejs";

export default function Skills({useOnScreen, parallax, skills}) {

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

  return (
    <React.Fragment>
          <section className="main-container">
            <div className="header-container">
                <h1 ref={rootRef} className="skillsHeadingAnim heading content heading-skills">/ professional skills</h1>
            </div>
            <LazyShow>
              <div className="content-main-dad">
                  <div className="content-box">
                        <div className="content text-white">
                          <div className="skills-box">
                        {skills && skills.map((skillsData) => (
                          <div class="px-6 py-4">
                          <h3 className="skills-data-heading">{skillsData.skill_category}</h3>
                            <p className="skills-data-degree">{skillsData.language}</p>
                            </div>
                        ))}
                        </div>
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
                    width: 40
                }}
        ></lottie-player>
        </button>
        </div>
        </section>
    </React.Fragment>
  );
}
