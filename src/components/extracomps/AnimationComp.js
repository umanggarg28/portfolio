import { useLottie, useLottieInteractivity } from "lottie-react";

const style = {
    height: 400,
    marginRight: 70,
    // border: 3,
    // borderStyle: "solid",
    // borderRadius: 7,
    // backgroundColor: "#001F41",
    marginTop: 20,
    // boxShadow: "0 10px 30px -10px #020c1bb3",
    // backgroundImage: "radial-gradient(farthest-corner at 40px 40px, #001F41 0%, #001629 100%)",
    // opacity: 0.5 
  };
  const options = {
    animationData: require('../code-animation11.json'),
  };

  const CursorHorizontalSync = () => {
    const lottieObj = useLottie(options, style);
    const Animation = useLottieInteractivity({
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
            frames: [24],
          },
          {
            visibility: [0, 1],
            type: "loop",
            frames: [0, 179],
          },
        // {
        //   visibility: [0.45, 1.0],
        //   type: "loop",
        //   frames: [45, 60],
        // },
      ],
    });
    return Animation;
  };

  export default CursorHorizontalSync;