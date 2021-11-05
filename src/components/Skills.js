import React, { useEffect, useState } from "react";
import sanityClient from "../client";

export default function Skills() {

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
      <div className="skills-display">
      <h3 className="skills-heading">Professional Skills</h3>
      <div className="skills-description max-w-sm overflow-hidden">
      {skills && skills.map((skillsData) => (
        <div class="px-6 py-4">
        <h3 className="skills-data-heading">{skillsData.skill_category}</h3>
          <p className="skills-data-degree">{skillsData.language}</p>
          </div>
      ))}
      </div>
      </div>
      <div className="education-pic-box">
        <lottie-player
          autoplay
          loop
          mode="normal"
          src="https://assets6.lottiefiles.com/packages/lf20_miikvucn.json"
          style={{height: 600}}
        ></lottie-player>
      </div>
    </React.Fragment>
  );
}
