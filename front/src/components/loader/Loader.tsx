import { TailSpin } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="w-full h-screen absolute t-0 l-0 r-0 b-0 shape_bg z-50 flex items-center justify-center">
      <TailSpin color="#fff" />
    </div>
  );
};

export default Loader;
