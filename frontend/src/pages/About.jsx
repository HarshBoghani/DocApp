import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          About <span className="font-medium text-gray-600">Us</span>
        </p>
      </div>

      <div className="flex md:flex-row flex-col my-10 gap-12">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.about_image}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600 ">
          <p>
            At DocApp, we believe that accessing quality healthcare should be
            simple, seamless, and stress-free. Founded with a mission to
            transform the way people connect with medical professionals, our
            platform bridges the gap between patients and doctors, ensuring
            timely appointments. Whether you’re looking for a
            general physician or a specialist, DocApp is your trusted partner
            in finding the right healthcare provider quickly and efficiently.
          </p>
          <p>
            We are committed to empowering patients with the tools to make
            informed decisions about their health while supporting doctors with
            a streamlined appointment management system.
          </p>
          <b className="text-gray-800 ">Our Vision</b>
          <p>
            Our vision is to create a world where healthcare is accessible to
            everyone, regardless of location or time. By leveraging technology,
            we aim to eliminate the barriers between patients and doctors,
            fostering a healthier and more connected society. We envision
            DocApp as a global leader in healthcare solutions, setting a new
            standard for convenience, reliability, and trust in medical
            services. 
          </p>
        </div>
      </div>
      <div className="text-gray-500 text-xl my-4">
        <p>
          WHY <span className="text-gray-600 font-medium">CHOOSE US</span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row mb-20">
        <div className="border border-gray-300 p-16 gap-5 hover:bg-primary cursor-pointer transition-all  duration-500 ">
          <b className="text-gray-700">EFFICIENCY:</b>
          <p className="text-gray-500">
            Streamlined appointment scheduling that fits into your busy
            lifestyle.
          </p>
        </div>
        <div className="border border-gray-300 p-16 hover:bg-primary cursor-pointer ">
          <b className="text-gray-700">CONVENIENCE:</b>
          <p className="text-gray-500">
            Access to a network of trusted healthcare professionals in your
            area.
          </p>
        </div>
        <div className="border border-gray-300 p-16 hover:bg-primary cursor-pointer ">
          <b className="text-gray-700">PERSONALIZATION:</b>
          <p className="text-gray-500">
            Tailored recommendations and reminders to help you stay on top of
            your health.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
