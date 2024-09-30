const HowItWorks = () => {
  return (
    <section
      className="w-full py-[40px] px-[20px]"
      style={{ background: "#F5F4ED" }}
    >
      <div className="w-full container mx-auto">
        <div className="w-full flex gap-[60px] md:gap-[180px] flex-col md:flex-row">
          <div className="flex items-center justify-center">
            <img
              className="min-w-[260px] h-auto"
              src="../../public/how-it-works-phone.png"
              alt="phone mockup"
            />
          </div>
          <div className="w-full flex flex-col gap-[30px] md:gap-[60px]">
            <h2 className="text-black font-medium text-3xl md:text-4xl lg:text-5xl">
              How it works
            </h2>
            <div className="flex flex-col gap-[20px]">
              <p className="text-lg text-black">
                Our goal is to make your business more efficient by helping you
                focus on what you do best - creating unforgettable experiences
                for your customers.
              </p>
              <p className="text-lg text-black">
                Menualista includes a wide range of functionality that allows
                you to integrate the system into any business process. From POS
                terminals to HR and financial management, the platform covers
                all aspects of the restaurant business.
              </p>
              <p className="text-lg text-black">
                With Menualista, you'll get support at every stage of your
                restaurant's operation - from order acceptance to analytics and
                reporting. And all this in one powerful and convenient platform
                that allows you to manage your business from any location and
                device.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
