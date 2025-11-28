import React, { useEffect } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { PrefetchPageLinks } from "react-router-dom";
import { NavLink, useLocation } from "react-router-dom";
const Footer = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to the top of the page when the route changes
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <div className="md:mx-10 ">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm ">
        {/* left section */}
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            {" "}
            DocApp is an intuitive and user-friendly doctor appointment booking
            platform designed to simplify healthcare access. With DocApp,
            patients can effortlessly find, book, and manage appointments with
            doctors across various specialties. The platform features advanced
            search filters, enabling users to find doctors based on location,
            specialty, availability, and patient reviews.
          </p>
        </div>

        {/* center section */}
        <div className="">
          <p className="text-xl font-medium mb-5">Company</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About Us</NavLink>
            <NavLink to="/contact">Contact Us</NavLink>
            {/* <NavLink to='/'>Privacy Policy</NavLink> */}
          </ul>
        </div>

        {/* right section */}

        <div>
          <p className="text-xl font-medium mb-5">Get in Touch</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+91-2084422881</li>
            <li>doctor_bvn@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        {/* ---------  Copyright text  ----- */}
        <hr />
        <p className="text-gray-800 py-5 text-sm text-center">
          Copyright 2025@ Doctors - All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
