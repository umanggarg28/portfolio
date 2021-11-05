import React, { useEffect, useState } from "react"
import sanityClient from "../client"

export default function Project() {
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
            <div className="experience-pic-box">
            <lottie-player
                autoplay
                loop
                mode="normal"
                id="project"
                // src="https://assets8.lottiefiles.com/packages/lf20_znhs1kb6.json"
                src="https://assets9.lottiefiles.com/private_files/lf30_vypf4qkd.json"
                style={{
                    height: 500,
                    marginLeft: 100
                }}
                ></lottie-player>
            </div>
            <div className="project-display text-white rounded-lg sm:rounded-t-xl p-4 pb-6 sm:p-8 lg:p-4 lg:pb-6 xl:p-8 space-y-6 sm:space-y-8 lg:space-y-6 xl:space-y-8">
            <h3 className="project-heading">Some projects</h3>
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
                    {/* <div>
                        <span>
                            <strong>Finished on</strong>:{" "}
                            {new Date(project.date).toLocaleDateString()}
                        </span>
                        <span>
                            <strong>Company</strong>:{" "}
                            {project.place}
                        </span>
                        <span>
                            <strong>Type</strong>:{" "}
                            {project.projectType}
                        </span>
                        <a
                            href={project.link}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            Visit the project{" "}
                            <span>
                            </span>
                        </a>
                        </div> */}
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
        </React.Fragment>
    );
}