import { useLottie, useLottieInteractivity } from "lottie-react";

const style = {
    height: 600,
    marginRight: 30

  };
  const options = {
    animationData: require('../experienceanimation.json'),
  };

  const ExperienceAnimation = () => {
    const lottieObj = useLottie(options, style);
    const ExperienceAnimation = useLottieInteractivity({
      lottieObj,
      mode: "cursor",
      actions: [
        {
            position: { x: [0, 1], y: [-1, 2] },
            type: "seek",
            frames: [0, 100],
          },
          {
            position: { x: -1, y: -1 },
            type: "stop",
            frames: [100],
          },
          {
            visibility: [0, 1],
            type: "loop",
            frames: [0, 200],
          },
        ]
    });
    return ExperienceAnimation;
  };

  export default ExperienceAnimation;