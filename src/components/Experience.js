import React, { useEffect, useState } from "react";
import sanityClient from "../client";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Moment from 'moment';
import LazyShow from "./LazyShow";
import anime from "animejs";

export default function Experience({useOnScreen, parallax}) {

  const rootRef = React.createRef();
  
  const onScreen = useOnScreen(rootRef);

    useEffect(() => {
        if (onScreen) {
          var textWrapper = document.querySelector('.experienceHeadingAnim');
          textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
  
          anime.timeline({loop: false})
              .add({
                  targets: '.experienceHeadingAnim .letter',
                  scale: [4,1],
                  opacity: [0,1],
                  translateZ: 0,
                  easing: "easeOutExpo",
                  duration: 950,
                  delay: (el, i) => 70*i
              }).add({
                  targets: '.experienceHeadingAnim',
                  opacity: 1,
                  duration: 1000,
                  easing: "easeOutExpo",
                  delay: 1000
              });
          }
      }, [onScreen]);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

   const a11yProps = (index) => {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

  const [experience, setExperienceData] = useState(null);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  // const url = (name, wrap = false) =>
  //   `${
  //     wrap ? "url(" : ""
  //   }https://awv3node-homepage.surge.sh/build/assets/${name}.svg${
  //     wrap ? ")" : ""
  //   }`;

  useEffect(() => {

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

  }, []);

  console.log("experience data:");
  console.log(experience);

  return (
    <React.Fragment>
    <section className="main-container">
        <div className="header-container">
            {/* <div className="lottie-container">
                  <lottie-player
                      id="experienceAnim"
                      hover
                      loop
                      mode="normal"
                      src="https://assets1.lottiefiles.com/packages/lf20_lhijyuoc.json"
                      style={{width: 80, marginRight: '2vh'}}
                    />
              </div> */}
              <h1 ref={rootRef} className="experienceHeadingAnim heading content heading-experience">Where I've worked</h1>
          </div>

    <LazyShow>
        <div className="content-main-dad">
        <div className="lottie-main">
            <lottie-player
                hover
                loop
                mode="normal"
                id="experienceAnim"
                // src="https://assets7.lottiefiles.com/packages/lf20_hske6rvv.json"
                src="https://lottie.host/4c6313b9-aade-4a7e-9ad5-573fb19cac82/g9f0ZUbvAQ.json"
                style={{
                  width: 350,
                  marginTop: 20,
                  marginLeft:60
                }}
              ></lottie-player>
            </div>    
          <div className="content-box">
            <div className="content text-white">
            <div className="content-bg-experience">
              <Box
                sx={{ flexGrow: 0, display: 'flex', marginLeft: -10 }}
              >
                <Tabs
                  orientation="vertical"
                  variant="scrollable"
                  value={value}
                  onChange={handleChange}
                  aria-label="experience tab"
                  sx={{ borderRight: 2, borderColor: 'divider', paddingTop: 2.5 }}
                >
                  {experience && experience.map((experienceData, index) => (
                      <Tab className="experience-tab" label={experienceData.company_name}
                        {...a11yProps(index)} />
                    ))}
                </Tabs>
                {experience && experience.map((experienceData, index) => (
                <TabPanel value={value} index={index}>
                    <p className="experience-jobtitle">{experienceData.job_title} @</p>
                    <h3 className="experience-data-heading">{experienceData.company_name}</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                      <p className="experience-place">{experienceData.place}</p>
                      <div className="experience-data-dates">
                        <p>{Moment(experienceData.date_from).format('MMM yyyy')} - {Moment(experienceData.date_to).format('MMM yyyy')}</p>
                      </div>
                    </div>
                    <p className="experience-description">{experienceData.description}</p>
                    {/* <p>{experienceData.link}</p> */}
                  </TabPanel>
              ))}
              </Box>
              </div>
            </div>
          </div>  
        </div>
      </LazyShow>

        <div className="button-box">
        <button className="contact-btn" onClick={() => parallax.current.scrollTo(4)}>
          {/* <lottie-player
                  hover
                  loop
                  mode="normal"
                  id="scrollButton1"
                  src="https://assets9.lottiefiles.com/packages/lf20_tlje6641.json"
                  style={{
                      marginTop: -50
                  }}
          ></lottie-player> */}
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
