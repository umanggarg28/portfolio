import React, { useEffect, useState, useRef } from "react"
import sanityClient from "../client"
import { motion, useAnimation } from "framer-motion";

export default function Project({parallax}) {

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

    const [projectData, setProjectData] = useState(null);
    const rootRef = useRef();
    const onScreen = useOnScreen(rootRef);
    const controls = useAnimation();

    useEffect(() => {
        if (onScreen) {
        controls.start(i => ({
          opacity: 1,
          x: 0,
          transition: { delay: i * 0.2 },
        }))
        }
      }, [onScreen, controls])

    useEffect(() => {
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
    }, []);

    return (
        <React.Fragment>    
        <section className="main-container">
            <div className="header-container" style={{marginTop: '10vh'}}>
                    <div className="lottie-container">
                        <lottie-player
                            autoplay
                            loop
                            mode="normal"
                            src="https://assets1.lottiefiles.com/packages/lf20_3luimzqq.json"
                            style={{width: 70, marginRight: '2vh', marginLeft: '2vh'}}
                        />
                    </div>
                <h3 className="heading heading-project">Some projects</h3>
            </div>

            <div className="content-main-dad">
                    <div className="lottie-main" style={{marginRight: '2vh'}}>
                    <lottie-player
                        autoplay
                        loop
                        mode="normal"
                        id="project"
                        // src="https://assets10.lottiefiles.com/packages/lf20_fmpbqwvd.json"
                        src="https://assets3.lottiefiles.com/packages/lf20_ihsy8p2a.json"
                        style={{
                            width: 400,
                            marginTop: -40
                        }}
                    />
                    </div>
                    <div className="content-box">
                        <div className="content text-white">
                        <ul 
                                ref={rootRef}
                                className="projects-grid"
                            >
                            {projectData && projectData.map((project, index) => (
                            <motion.li
                                initial={{ opacity: 0, x: -100 }}
                                custom={index}
                                animate={controls}
                                className="project-individual rounded-lg p-4 pb-6 lg:p-4 lg:pb-6 space-y-6 lg:space-y-6"
                            >
                            <header>
                                <div className="project-top">
                                <h3>
                                    <a
                                    href={project.link}
                                    alt={project.title}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    >{project.title}</a>
                                </h3>
                                </div>
                                <div className="project-description" >
                                    <p>{project.description}</p>
                                    <a
                                        href={project.link}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                    </a>
                                </div>
                            </header>
                            <footer>
                                <ul class="project-tech-list">
                                    {project.technologies_used && project.technologies_used.split(',').map((item)=> <li>{item.toUpperCase()}{"\n"}</li>)}
                                </ul>
                            </footer>
                            </motion.li>
                            ))}
                        </ul>
                        </div>
                    </div>
                </div>

            <div className="button-box">
            <button onClick={() => parallax.current.scrollTo(4)} className="contact-btn py-2 px-4">
                <lottie-player
                        autoplay
                        loop
                        mode="normal"
                        id="scrollButton"
                        src="https://assets6.lottiefiles.com/packages/lf20_RbdjIx.json"
                        style={{
                            width: 50,
                            zIndex: 99999
                        }}
                ></lottie-player>
            </button>
            </div>
            </section>
        </React.Fragment>
    );
}