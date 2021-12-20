import React, { useEffect, useState } from "react";
import sanityClient from "../client";
import LazyShow from "./LazyShow";

export default function About({parallax}) {

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
        <section className="main-container">
        <div className="header-container">
            <div className="lottie-container">
                <lottie-player
                    id="userAnim"
                    hover
                    loop
                    mode="normal"
                    src="https://assets7.lottiefiles.com/packages/lf20_3hj053ag.json"
                    style={{width: 80, marginRight: '2vh'}}
                />
                </div>
            <h3 className="heading heading-about">A bit about me</h3>
        </div>
        <LazyShow>
            <div className="content-main-dad">
            <div className="lottie-main" style={{marginRight: 0}}>
            <lottie-player
                autoplay
                loop
                mode="normal"
                id="aboutAnim"
                // src="https://assets8.lottiefiles.com/packages/lf20_rcymylpo.json"
                src="https://assets9.lottiefiles.com/private_files/lf30_mqvces5q.json"
                style={{
                    width: '60vh'
                }}
                ></lottie-player>
            </div>
            <div className="content-box">
            <div className="content text-white">
            {/* <div className="about-display text-white rounded-lg sm:rounded-t-xl p-4 pb-6 sm:p-8 lg:p-4 lg:pb-6 xl:p-8 space-y-6 sm:space-y-8 lg:space-y-6 xl:space-y-8">                 */}
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
            </div>
            </div>
            </LazyShow>


            <div className="button-box">
            <button onClick={() => parallax.current.scrollTo(2)} className="contact-btn py-2 px-4">
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