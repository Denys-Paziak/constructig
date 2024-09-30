import MainButton from "../../../../components/main-button/MainButton";

const Hero = () => {
  return (
    <section className="w-full py-[100px] px-[20px]">
      <div className="container mx-auto">
        <div className="w-full flex flex-col items-center gap-[60px]">
          <h1 className="w-[80%] text-center text-4xl md:text-5xl lg:text-7xl text-black font-medium">
            <span style={{ color: "#3649AD" }}>We help you </span>
            build a successful online business
          </h1>
          <div className="w-full relative flex items-center gap-[60px] justify-between flex-col md:flex-row">
            <div className="w-[100%] md:w-[40%] relative z-[2] flex flex-col gap-[40px]">
              <p className="text-lg text-black leading-6">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                rerum facilis est et expedita distinctio. <br /> Nam libero
                tempore, cum soluta nobis est eligendi optio cumque nihil
                impedit quo minus id quod maxime placeat facere possimus, omnis
                voluptas assumenda est, omnis dolor repellendus.
              </p>
              <MainButton text={"Try now"} type={"button"} />
            </div>
            <div className="w-[100%] md:w-[60%]">
              <img src="../../public/hero-mockup.png" alt="hero mockup" />
            </div>
            <div
              className="absolute z-[1] bottom-0 w-full h-[120px]"
              style={{
                background:
                  "linear-gradient(0deg, #FFFFFF 15%, rgba(255, 255, 255, 0) 100%)",
              }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
