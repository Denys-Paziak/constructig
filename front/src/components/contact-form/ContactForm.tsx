import React, { useState } from "react";
import { sendMessage } from "../../api/telegram";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    name: "",
    commentary: "",
    acceptedTerms: false,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const message = `
      🔔New Contact Form Submission🔔
      ------------------------------\n
      Email: ${formData.email}\n
      Phone: ${formData.phone}\n
      Name: ${formData.name}\n
      Commentary: ${formData.commentary}\n
    `;

    try {
      await sendMessage(message);

      setFormData({
        email: "",
        phone: "",
        name: "",
        commentary: "",
        acceptedTerms: false,
      });
    } catch (error) {
      console.error("Error sending message to Telegram", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-[60px]">
        <div className="flex flex-col gap-[40px]">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email *"
            required
            className="w-full p-4 border border-gray-300 rounded"
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full p-4 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-4 border border-gray-300 rounded"
          />
          <textarea
            name="commentary"
            value={formData.commentary}
            onChange={handleChange}
            placeholder="Commentary"
            className="w-full h-[120px] resize-none p-4 border border-gray-300 rounded"
          ></textarea>
        </div>
        <div className="flex gap-[20px]">
          <input
            type="checkbox"
            name="acceptedTerms"
            checked={formData.acceptedTerms}
            onChange={handleChange}
            className="h-5 w-5"
          />
          <label className="text-lg">
            I accept all{" "}
            <a
              href="#"
              className="text-blue-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              terms and conditions of the personal data processing policy
            </a>{" "}
            and consent to the processing of personal data
          </label>
        </div>
        <button
          className="w-fit py-[10px] px-[24px] text-white cursor-pointer uppercase outline-none border-none rounded-md"
          type="submit"
          style={{ backgroundColor: "#3649AD" }}
        >
          SEND
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
