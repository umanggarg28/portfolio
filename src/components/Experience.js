import React, { useEffect, useState } from "react";
import sanityClient from "../client";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Moment from 'moment';
import ExperienceAnimation from "./experienceAnimation";

export default function Experience() {

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
      <div className="experience-display text-white rounded-lg sm:rounded-t-xl p-4 pb-6 sm:p-8 lg:p-4 lg:pb-6 xl:p-8 space-y-6 sm:space-y-8 lg:space-y-6 xl:space-y-8">
      <h3 className="experience-heading">Where I've worked</h3>
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
            <div style={{float: 'left'}}>
              <p className="experience-place">{experienceData.place}</p>
            </div>
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
            // height: 600,
            marginRight: 30
          }}
        ></lottie-player>
      </div>
    </React.Fragment>
  );
}
