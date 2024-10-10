interface Props {
  bodyColorBg: { r: string; g: string; b: string; a: string };
}

const Baner = ({ bodyColorBg }: Props) => {
  return (
    <div
      className={"pt-[50px] md:pt-[100px]"}
      style={{
        background: `rgba(${bodyColorBg.r}, ${bodyColorBg.g}, ${bodyColorBg.b}, ${bodyColorBg.a})`,
      }}
    >
      <img
        className={
          "object-cover w-[80%] mx-auto cursor-pointer lg:w-[50%] md:block"
        }
        src="../../banner.png"
        alt={"bannerbg"}
      />
    </div>
  );
};

export default Baner;
