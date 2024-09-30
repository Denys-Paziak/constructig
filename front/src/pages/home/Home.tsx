import MainHeader from "../../components/main-header/MainHeader";
import MainFooter from "../../components/main-footer/MainFooter";
import Hero from "./components/hero/Hero";
import HowItWorks from "./components/how-it-works/HowItWorks";
import OurPartners from "./components/our-partners/OurPartners";
import WhyUs from "./components/why-us/WhyUs";
import Contact from "./components/contact/Contact";
import Events from "./components/events/Events";

const Home = () => {
  return (
    <>
      <MainHeader />
      <Hero />
      <HowItWorks />
      <OurPartners />
      <Events />
      <WhyUs />
      <Contact />
      <MainFooter />
    </>
  );
};

export default Home;
