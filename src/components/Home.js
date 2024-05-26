import React, { useEffect, useRef, useState } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import MainHero from "./MainHero";
import Education from "./Education";
import Experience from "./Experience";
import Skills from "./Skills";
import Project from "./Project";
import About from "./About";
import Contact from "./Contact";
import sanityClient from "../client";

export default function Home() {

  const parallax = useRef(null);
  const [authorData, setAuthorData] = useState(null);
  const [educationData, setEducationData] = useState(null);
  const [experienceData, setExperienceData] = useState(null);
  const [projectData, setProjectData] = useState(null);
  const [skillsData, setSkillsData] = useState(null);

  useEffect(() => {
    const fetchAuthorData = () => {
        sanityClient.fetch(`*[_type == "author"]{
          name,
          image,
          bio,
          featured_skills,
          main_page_headline
        }`).then((data) => setAuthorData(data))
        .catch(console.error);
      }
    fetchAuthorData();

    const fetchEducationData = () => {
        sanityClient.fetch(`*[_type == "education"]{
          university_name,
          degree,
          date_from,
          date_to,
          place,
          gpa
        }`).then((data) => setEducationData(data))
        .catch(console.error);
    }
    fetchEducationData();

    const fetchExperienceData = () => {
        sanityClient.fetch(`*[_type == "experience"]{
          company_name,
          job_title,
          date_from,
          date_to,
          place,
          description,
          link
        }`).then((data) => setExperienceData(data))
        .catch(console.error);
    }
    fetchExperienceData();

    const fetchProjectData = () => {
        sanityClient.fetch(`*[_type == "project"]{
          title,
          date,
          place,
          description,
          technologies_used,
          projectType,
          link,
          tags
      }`
      ).then((data)=>setProjectData(data))
      .catch(console.error)
    }
    fetchProjectData();

    const fetchSkillsData = () => {
        sanityClient.fetch(`*[_type == "skills"]{
          skill_category,
          language
        }`).then((data) => setSkillsData(data))
        .catch(console.error);
      }
      fetchSkillsData();

  }, []);
  console.log(authorData);


  function useOnScreen(ref, rootMargin = "0px") {
    // State and setter for storing whether element is visible
    const [isIntersecting, setIntersecting] = useState(false);
  
    useEffect(() => {
      
      let currentRef = null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          // Update our state when observer callback fires
          setIntersecting(entry.isIntersecting);
        },
        {
          rootMargin
        }
      );
      if (ref.current) {
        currentRef = ref.current;
        observer.observe(currentRef);
      }
      return () => {
        observer.unobserve(currentRef);
      };
    }, [ref, rootMargin]); // Empty array ensures that effect is only run on mount and unmount
  
    return isIntersecting;
    
  }

    const rootRef = useRef();

  return (
    <div>
      <Parallax ref={parallax} pages={7}>
        <ParallaxLayer
          offset={0}
          >
        </ParallaxLayer>


        <ParallaxLayer
          offset={1}
        >
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
        >
        </ParallaxLayer>

        <ParallaxLayer
          offset={3}
        >
        </ParallaxLayer>


        <ParallaxLayer
          offset={4}
        >
        </ParallaxLayer>

        <ParallaxLayer
          offset={5}
        >
        </ParallaxLayer>

        <ParallaxLayer
          offset={6}
        >
        </ParallaxLayer>
        {/* <ParallaxLayer
          offset={7}
          style={{ backgroundImage :  "linear-gradient(to right, #360033, #0b8793)"}} //education background-color
        /> */}

        {/* <ParallaxLayer
          offset={0}
          speed={0.2}
          factor={4}
          style={{
            backgroundImage: url("stars", true),
            backgroundSize: "cover",
          }}
        /> */}

        {/* <ParallaxLayer
          offset={1.3}
          speed={-0.3}
          style={{ pointerEvents: "none" }}
        >
          <img
            src={url("satellite4")}
            style={{ width: "10%", marginLeft: "35%", opacity: 0.7 }}
          />
        </ParallaxLayer> */}

        {/* <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.3 }}>
          <img
            src={education7}
            style={{ display: "block", width: "10%", marginLeft: "30%", marginTop: "2%"   }}
          />
          <img
            src={education2}
            style={{ display: "block", width: "10%", marginLeft: "5%" }}
          />
        </ParallaxLayer> */}

        {/* <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.2 }}>
          <img
            src={education1}
            style={{ display: "block", width: "15%", marginLeft: "30%" }}
          />
          <img
            src={education4}
            style={{ display: "block", width: "40%", marginLeft: "40%"}}
          />
        </ParallaxLayer> */}

        {/* <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.5 }}>
          <img
            src={education6}
            style={{ display: "block", width: "10%", marginLeft: "25%", marginTop: "2%" }}
          />
          <img
            src={education4}
            style={{ display: "block", width: "18%", marginLeft: "77%" }}
          />
        </ParallaxLayer> */}

        {/* <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>
          <img
            src={url("cloud")}
            style={{ display: "block", width: "20%", marginLeft: "60%" }}
          />
          <img
            src={education5}
            style={{ display: "block", width: "15%", marginLeft: "50%" }}
          />
          <img
            src={url("cloud")}
            style={{ display: "block", width: "10%", marginLeft: "80%" }}
          />
        </ParallaxLayer> */}

        {/* <ParallaxLayer offset={1.8} speed={0.4} style={{ opacity: 0.6 }}>
          <img
            src={education9}
            style={{ display: "block", width: "15%", marginLeft: "5%" }}
          />
          <img
            src={education9}
            style={{ display: "block", width: "15%", marginLeft: "75%" }}
          />
        </ParallaxLayer> */}

        {/* <ParallaxLayer
          offset={3}
          speed={-0.4}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <img src={url("earth")} style={{ width: "60%" }} />
        </ParallaxLayer> */}

        {/* <ParallaxLayer
          offset={3}
          speed={-0.3}
          style={{
            backgroundSize: "80%",
            backgroundPosition: "center",
            backgroundImage: url("clients", true),
          }}
        /> */}

        <ParallaxLayer
          id="mainHero"
          offset={0}
          // speed={0.2}
          style={{
            alignItems: "center",
            justifyContent: "center",
            // backgroundImage :  'linear-gradient(to right, #000000, #000000)'
          }}
        >
        <MainHero 
          useOnScreen={useOnScreen} 
          rootRef={rootRef} 
          parallax={parallax}
          author={authorData} 
        />
        </ParallaxLayer>

        <ParallaxLayer
          id="about"
          offset={1}
          // speed={0.2}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // backgroundImage :  'linear-gradient(to right, #000000, #000000)'
          }}
        >
        <About 
          useOnScreen={useOnScreen} 
          rootRef={rootRef} 
          parallax={parallax} 
          author={authorData} 
        />
        </ParallaxLayer>

          <ParallaxLayer
            id="education"
            offset={2}
            // speed={0.2}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              // backgroundImage :  'linear-gradient(to right, #000000, #000000)'
            }}
          >
          <Education 
            useOnScreen={useOnScreen} 
            rootRef={rootRef} 
            parallax={parallax} 
            education={educationData}
          />
        </ParallaxLayer>

        <ParallaxLayer
          id="experience"
          offset={3}
          // speed={0.1}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // backgroundImage :  'linear-gradient(to right, #000000, #000000)'
          }}
        >
          <Experience 
            useOnScreen={useOnScreen} 
            rootRef={rootRef} 
            parallax={parallax} 
            experience={experienceData}/>
        </ParallaxLayer>

        <ParallaxLayer
          id="projects"
          offset={4}
          // speed={0.1}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // backgroundImage :  'linear-gradient(to right, #000000, #000000)'
          }}
        >
          <Project 
            useOnScreen={useOnScreen} 
            rootRef={rootRef} 
            parallax={parallax} 
            projectData={projectData} />
        </ParallaxLayer>

        <ParallaxLayer
          id="skills"
          offset={5}
          // speed={0.1}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // backgroundImage :  'linear-gradient(to right, #000000, #000000)'
          }}
        >
          <Skills 
            useOnScreen={useOnScreen} 
            rootRef={rootRef} 
            parallax={parallax} 
            skills={skillsData} />
        </ParallaxLayer>

        <ParallaxLayer
          id="contact"
          offset={6}
          // speed={0.1}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // backgroundImage :  'linear-gradient(to right, #000000, #000000)'
          }}
        >
        <Contact useOnScreen={useOnScreen} rootRef={rootRef} parallax={parallax}/>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}
