"use client";

import { useState } from "react";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Message:", message);
  };

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center py-10 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-blue-700">Contact & Location</h1>
        <p className="text-lg text-gray-600 mt-2">We’d love to hear from you! Reach out to us anytime.</p>
      </div>

      {/* Contact Container */}
      <div className="max-w-screen-lg w-full flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden">
        
        {/* Left Side: Contact Form */}
        <div className="w-full md:w-1/2 p-8 bg-blue-700 text-white">
          <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-lg font-medium">Email</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mt-2 rounded-md bg-white text-black border border-blue-300 focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-lg font-medium">Message</label>
              <textarea
                id="message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 mt-2 rounded-md bg-white text-black border border-blue-300 focus:ring-2 focus:ring-blue-400"
                rows={4}
              />
            </div>
            <button
              type="submit"
              className="w-full mt-4 p-3 bg-white text-blue-700 font-bold rounded-md hover:bg-blue-100 transition duration-300 shadow-md"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right Side: Map */}
        <div className="w-full md:w-1/2 bg-gray-100">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1217.8691363976122!2d38.75396480467733!3d9.012176365442276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b855234891dad%3A0xaeb993c09217fc14!2zQW1oYXJhIEJhbmsgUy5DIEhRL-GLqOGKoOGIm-GIqyDhiaPhipXhiq0g4YqgLuGImyDhi4vhipMg4YiY4Yi14Yiq4Yur4Ymk4Ym1!5e1!3m2!1sen!2set!4v1738953709736!5m2!1sen!2set"
            width="100%"
            height="100%"
            className="w-full h-[400px] md:h-full border-0 rounded-r-xl"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
