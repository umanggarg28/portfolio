import React, { useEffect, useState } from "react";
import sanityClient from "../client";

export default function About() {

    const [author, setAuthorData] = useState(null);

    useEffect(() => {

        sanityClient.fetch(`*[_type == "author"]{
            name,
            image,
            bio,
            featured_skills
          }`).then((data) => setAuthorData(data))
          .catch(console.error);
    }, []);


    return (
        <React.Fragment>
            <div className="about-display text-white rounded-lg sm:rounded-t-xl p-4 pb-6 sm:p-8 lg:p-4 lg:pb-6 xl:p-8 space-y-6 sm:space-y-8 lg:space-y-6 xl:space-y-8">
            <h3 className="about-heading">A bit about me ..</h3>
           <div className="inner">
               <div className="about-me">
                   <div>
                   <p>{author && author[0].bio}</p>
                   </div>
                   <ul className="skills-list">
                    {author && author.map((authorData, index) => (
                        authorData.featured_skills && authorData.featured_skills.split(',').map((item)=> <li>{item}{"\n"}</li>)
                    ))}
                    </ul>
                </div>
            </div>
            </div>
        </React.Fragment>
    );
}