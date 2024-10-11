import MainButton from "../../../../components/main-button/MainButton";

const WhyUs = () => {
  return (
    <section
      className="w-full py-[40px] px-[20px]"
      style={{ background: "#F5F4ED" }}
    >
      <div className="container mx-auto">
        <div className="w-full flex flex-col gap-[120px]">
          <div className="w-full flex flex-col items-center gap-[60px]">
            <div className="w-[80%] flex flex-col gap-[30px]">
              <h2 className="text-center select-none text-4xl md:text-5xl lg:text-7xl text-black font-medium">
                Why choose <span style={{ color: "#3649AD" }}>Menualista</span>
              </h2>
              <p
                className="text-center text-1xl lg:text-2xl"
                style={{ color: "#AFAFAF" }}
              >
                Fusce sapien ex, bibendum et sapien eget, iaculis sodales
                tortor. In pharetra dignissim sem quis mattis. Curabitur et
                pretium urna. Sed rhoncus nibh varius est ultricies, a faucibus
                leo tempor.
              </p>
            </div>
            <div className="w-full flex items-center justify-between flex-wrap flex-col md:flex-row gap-[30px]">
              <div className="flex flex-col gap-[16px]">
                <p className="text-lg text-center text-black font-semibold">
                  Partners:
                </p>
                <span
                  className="text-4xl text-center md:text-6xl font-normal"
                  style={{ color: "#3649AD" }}
                >
                  120
                </span>
              </div>
              <div className="flex flex-col gap-[16px]">
                <p className="text-lg text-center text-black font-semibold">
                  Cities:
                </p>
                <span
                  className="text-4xl text-center md:text-6xl font-normal"
                  style={{ color: "#3649AD" }}
                >
                  15
                </span>
              </div>
              <div className="flex flex-col gap-[16px]">
                <p className="text-lg text-center text-black font-semibold">
                  Conversion:
                </p>
                <span
                  className="text-4xl text-center md:text-6xl font-normal"
                  style={{ color: "#3649AD" }}
                >
                  9%
                </span>
              </div>
              <div className="flex flex-col gap-[16px]">
                <p className="text-lg text-center text-black font-semibold">
                  Users:
                </p>
                <span
                  className="text-4xl text-center md:text-6xl font-normal"
                  style={{ color: "#3649AD" }}
                >
                  5,000+
                </span>
              </div>
            </div>
          </div>
          <div className="w-full flex items-center gap-[60px] md:gap-[138px] flex-col md:flex-row">
            <div className="w-[100%] md:w-[60%] flex flex-col gap-[40px]">
              <p className="text-lg text-black">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga cupiditate non
                provident, similique sunt in culpa qui officia deserunt mollitia
                animi, id est laborum et dolorum fuga.{" "}
              </p>
              <MainButton text={"try now"} type={"button"} />
            </div>
            <div className="w-[100%] md:w-[40%]">
              <img
                className="w-full"
                src="../why-us-banner.jpg"
                alt="why us banner"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
