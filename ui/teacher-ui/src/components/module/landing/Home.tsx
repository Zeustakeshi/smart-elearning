import { BlurFadeText } from "./BlurFadeText";
import ButtonGlass from "./ButtonGlass";

export const Home = () => {
  return (
    <div className="flex items-center justify-center m-2">
      <img
        src="https://res.cloudinary.com/dqwxudyzu/image/upload/v1751690522/benner_vefxnr.png"
        alt="benner"
        className="relative w-full h-auto object-cover items-center"
      />
      <div className="absolute top-20">
        <div className="flex flex-col justify-center items-center">
          <BlurFadeText />
          <ButtonGlass />
        </div>
      </div>
    </div>
  );
};
