import { TailSpin } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="w-full h-screen fixed top-0 left-0 shape_bg z-[1000] flex items-center justify-center">
      <TailSpin color="#fff" />
    </div>
  );
};

export default Loader;
