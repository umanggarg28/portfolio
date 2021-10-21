import React, { useEffect, useState } from "react";
import sanityClient from "../client";

export default function Education() {
  const [education, setEducationData] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "education"]{
            university_name,
            degree,
            date_from,
            date_to,
            place,
            gpa
      }`
      )
      .then((data) => setEducationData(data))
      .catch(console.error);
  }, []);

  console.log("education data:");
  console.log(education);

  return (
    <div>
      <h1>Education Page!</h1>
      {education && education.map((value) => (
        <h3>{value.university_name}</h3>
      ))}
    </div>
  );
}
