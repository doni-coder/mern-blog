import React from "react";
import { FaFacebook,FaLinkedin,FaInstagram,FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import { footerVariants } from "../../utils/motion";

function Footer() {
  return (
    <div className="w-full px-10 h-auto pt-5 text-white bg-black">
      <motion.div variants={footerVariants} initial="hidden" whileInView={"show"} className="flex flex-col sm:flex-row gap-5 justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Blog.com</h1>
          <p className="text-[15px] text-green-700">Lorem ipsum dolor</p>
        </div>
        <div>
          <p className="text-[14px] text-center">Write Blog</p>
          <p className="text-[14px] text-center">Read Blog</p>
          <p className="text-[14px] text-center">Learn More</p>
        </div>
        <div>
          <ul>
            <li>About us</li>
            <li>Contact us</li>
          </ul>
        </div>
      </motion.div>
      <hr className="mt-4" />
      <div className="w-full flex justify-center py-7">
        <div className="text-center">
          <div className="flex gap-7">
            <FaFacebook className="text-[25px] hover:text-green-600 cursor-pointer"/>
            <FaLinkedin className="text-[25px] hover:text-green-600 cursor-pointer"/>
            <FaInstagram className="text-[25px] hover:text-green-600 cursor-pointer"/>
            <FaGithub className="text-[25px] hover:text-green-600 cursor-pointer"/>
          </div>
          <p className="mt-3">All copyright received</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
