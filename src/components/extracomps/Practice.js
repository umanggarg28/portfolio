import React, { useEffect } from "react";
import landscape from '../landscape.svg'
import gsap from "gsap";

export default function Practice() {

    useEffect(() => {

        const tl = gsap.timeline({
          defaults: {
              ease: "none"
          },
          scrollTrigger: {
              start: 0,
              end: "max",
              scrub: 2
          }
      });
      
      gsap.utils.toArray("[data-depth]").forEach((layer) => {
          tl.to(layer, { y: layer.dataset.depth * -3 }, 0);
      });
      
      tl.to("parallax", { '--sunset': "#f99f95", ease: "none", duration: 0.2 }, 0);
        
    }, []);


    return (
        <React.Fragment>
            <img id="parallax" src={landscape} alt="React Logo" />
        </React.Fragment>
    );
}