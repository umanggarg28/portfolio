import React, { useEffect, useState } from "react"
import sanityClient from "../client"
import LazyShow from "./LazyShow";

export default function Project({parallax}) {
    const [projectData, setProjectData] = useState(null);

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

            <LazyShow>
            <div className="content-main-dad">
                    <div className="lottie-main" style={{marginRight: '2vh'}}>
                    <lottie-player
                        autoplay
                        loop
                        mode="normal"
                        id="project"
                        src="https://assets10.lottiefiles.com/packages/lf20_fmpbqwvd.json"
                        style={{
                            width: 400,
                            marginTop: -40
                        }}
                    />
                    </div>
                    <div className="content-box">
                        <div className="content text-white">
                        {/* <div className="project-content-box" style={{display: 'flex'}}>
                         <div className="project-display text-white rounded-lg sm:rounded-t-xl p-4 pb-6 sm:p-8 lg:p-4 lg:pb-6 xl:p-8 space-y-6 sm:space-y-8 lg:space-y-6 xl:space-y-8"> */}
                        <ul className="projects-grid">
                            {projectData && projectData.map((project, index) => (
                            <li className="project-individual rounded-lg p-4 pb-6 lg:p-4 lg:pb-6 space-y-6 lg:space-y-6">
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
                            </li>
                            ))}
                        </ul>
                        </div>
                    </div>
                </div>
                </LazyShow>     
                        
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