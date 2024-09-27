import React from "react";
import ContactForm from "../../../../components/contact-form/ContactForm";

const Contact = () => {
  return (
    <section className="w-full py-[160px] px-[20px]">
      <div className="container mx-auto">
        <div className="w-full flex flex-col gap-[60px]">
          <h2 className="text-center text-3xl md:text-4xl lg:text-6xl text-black font-medium">
            If you want to become our partner,{" "}
            <span style={{ color: "#3649AD" }}>contact us!</span>
          </h2>
          <div className="w-full flex gap-[60px] lg:gap-[140px] flex-col lg:flex-row">
            <div className="w-[100%] lg:w-[55%]">
              <ContactForm />
            </div>
            <div className="w-[100%] lg:w-[45%]">
              <p className="text-lg text-black">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga cupiditate non
                provident, similique sunt in culpa qui officia deserunt mollitia
                animi, id est laborum et dolorum fuga.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
