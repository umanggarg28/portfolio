import { useLottie, useLottieInteractivity } from "lottie-react";

const style = {
    height: 80,
  };
  const options = {
    animationData: require('../headeranimation11.json'),
  };

  const LogoAnimation = () => {
    const lottieObj = useLottie(options, style);
    const LogoAnimation = useLottieInteractivity({
      lottieObj,
      mode: "scroll",
      actions: [
          {
            position: { x: [0, 1], y: [-1, 2] },
            type: "seek",
            frames: [0, 30],
          },
          {
            position: { x: 0, y: 1 },
            type: "stop",
            frames: [5],
          }
        ]
    });
    return LogoAnimation;
  };

  export default LogoAnimation;