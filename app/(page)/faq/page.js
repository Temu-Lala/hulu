"use client";

import { useState } from "react";
import {
  FiChevronDown,
  FiChevronUp,
  FiMapPin,
  FiDollarSign,
  FiRefreshCcw,
  FiBriefcase,
  FiGlobe,
  FiCreditCard,
  FiShield,
  FiCheckCircle,
} from "react-icons/fi";

const faqs = [
  {
    question: "Do you accept commission before we get the job?",
    answer:
      "No, we do not charge any commission before you secure a job. Our goal is to ensure job seekers find employment before any payment obligations arise.",
    icon: <FiBriefcase className="text-blue-500 text-5xl" />,
  },
  {
    question: "Where is your location?",
    answer:
      "Our office is located in Addis Ababa, Dembel, Amhara Bank Head Office, 1st Floor, Room 112.",
    icon: <FiMapPin className="text-red-500 text-5xl" />,
  },
  {
    question: "How much do we pay for registration?",
    answer:
      "no commission is taken for registrations.",
    icon: <FiDollarSign className="text-green-500 text-5xl" />,
  },
  {
    question:
      "If we pay once for registration and want to find another job later, do we pay again?",
    answer:
      "No, once you pay the registration fee, you do not have to pay again if you want to find another job through our service.",
    icon: <FiRefreshCcw className="text-purple-500 text-5xl" />,
  },
  {
    question: "Do you have branches other than Addis Ababa?",
    answer:
      "No, we currently operate only in Addis Ababa. However, we are working on expanding our services in the future.",
    icon: <FiGlobe className="text-blue-500 text-5xl" />,
  },
  {
    question: "Is the commission paid every month or once from our monthly salary?",
    answer:
      "No, commission is only deducted once from your first salary, not on a monthly basis.",
    icon: <FiCreditCard className="text-yellow-500 text-5xl" />,
  },
  {
    question: "If we do not get the job or are not hired by a company, is the commission refunded?",
    answer:
      "Yes, any commission paid is refundable anytime if you do not secure a job.",
    icon: <FiShield className="text-gray-500 text-5xl" />,
  },
  {
    question: "Are you certified?",
    answer:
      "Yes, we are a fully certified and legally registered job placement agency. Our certification ensures compliance with industry standards and guarantees reliable services.",
    icon: <FiCheckCircle className="text-green-500 text-5xl" />,
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center py-10 px-4">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-8 text-center">
        Hulu General Commission FAQ
      </h1>
      <div className="flex flex-wrap justify-center gap-6 max-w-6xl">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white shadow-xl rounded-xl p-6 w-80 transition-transform transform hover:scale-105 flex flex-col items-center text-center"
          >
            {/* Icon at the Top */}
            <div className="mb-3">{faq.icon}</div>

            {/* Question */}
            <h3 className="text-lg font-semibold text-blue-700">{faq.question}</h3>

            {/* Expand Button */}
            <button
              onClick={() => toggleFAQ(index)}
              className="mt-3 flex justify-center items-center w-10 h-10 rounded-full bg-blue-100 hover:bg-blue-200 transition"
            >
              {openIndex === index ? (
                <FiChevronUp className="text-blue-700 text-2xl" />
              ) : (
                <FiChevronDown className="text-blue-700 text-2xl" />
              )}
            </button>

            {/* Answer (Only Show When Open) */}
            {openIndex === index && (
              <p className="mt-3 text-gray-600 text-md leading-relaxed animate-fade-in">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
