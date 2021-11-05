import { useLottie, useLottieInteractivity } from "lottie-react";

const style = {
    height: 500,

  };
  const options = {
    animationData: require('../educationanimation2.json'),
  };

  const EducationAnimation = () => {
    const lottieObj = useLottie(options, style);
    const EducationAnimation = useLottieInteractivity({
      lottieObj,
      container: "MyContainerId",
      actions: [
        {
          start: 0,
          end: 1,
          type: "seek",
          frames: [0, 301]
        }
        ]
    });
    return EducationAnimation;
  };

  export default EducationAnimation;