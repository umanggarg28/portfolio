import React, { useEffect, useState } from "react";
import sanityClient from "../client";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Moment from 'moment';
import ExperienceAnimation from "./experienceAnimation";

export default function Experience({parallax}) {

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


  const url = (name, wrap = false) =>
    `${
      wrap ? "url(" : ""
    }https://awv3node-homepage.surge.sh/build/assets/${name}.svg${
      wrap ? ")" : ""
    }`;

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
    <div className="experience-header-container" style={{display: 'block'}}>
    <h3 className="experience-heading">Where I've worked</h3>
          <lottie-player
              id="experienceAnim"
              autoplay
              // controls
              loop
              mode="normal"
              src="https://assets1.lottiefiles.com/packages/lf20_q7fhy4ya.json"
              style={{height: 80, marginLeft: 240, marginTop: -80, width: '55%'}}
            />
    </div>
    <div className="experience-content-box">
      <div style={{display: 'flex'}}>
      <div className="experience-display text-white">
      <Box
        sx={{ flexGrow: 2, bgcolor: 'background.paper', display: 'flex', marginLeft: 20 }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="experience tab"
          sx={{ borderRight: 1, borderColor: 'divider' }}
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
            <p className="experience-place">{experienceData.place}</p>
            <div className="experience-data-dates">
              <p>{Moment(experienceData.date_from).format('MMM yyyy')} - {Moment(experienceData.date_to).format('MMM yyyy')}</p>
            </div>
            <p className="experience-description">{experienceData.description}</p>
            {/* <p>{experienceData.link}</p> */}
          </TabPanel>
      ))}
      </Box>
      </div>
      <div className="experience-pic-box">
      <lottie-player
          autoplay
          loop
          mode="normal"
          id="experienceAnim"
          src="https://assets7.lottiefiles.com/packages/lf20_hske6rvv.json"
          style={{
            height: 600,
            marginRight: 30,
            marginTop: -150
          }}
        ></lottie-player>
        </div>      
        </div>
        </div>
        <div className="button-box">
        <button className="contact-btn" onClick={() => parallax.current.scrollTo(3)}>
          <lottie-player
                  hover
                  loop
                  mode="normal"
                  id="scrollButton1"
                  src="https://assets9.lottiefiles.com/packages/lf20_tlje6641.json"
                  style={{
                      height: 100,
                      marginTop: -60
                  }}
          ></lottie-player>
        </button>
        </div>
    </React.Fragment>
  );
}
