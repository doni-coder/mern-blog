import React from "react";
import "./Card.css";
import { motion } from "framer-motion";
import { zoomIn } from "../../utils/motion";
import { Link } from "react-router-dom";
import { FiEye } from "react-icons/fi";

function Card({ title, _id, description, blogImage, views }) {
  return (
    <motion.div
      variants={zoomIn(0.2, 0.5)}
      initial="hidden"
      whileInView="show"
      className="card h-max"
    >
      <Link to={`/read-blogs/${_id}`}>
        <div className="image">
          <img className="" src={blogImage} alt="" />
        </div>
        <div className="content">
          <div className="flex justify-between items-center">
            <div>
              <span className="title">{title}</span>
            </div>
            <div className="flex pt-0 gap-2 ">
              <FiEye className="text-[20px] text-gray-200" />
              <span className="text-gray-200 text-[15px]">{views}</span>
            </div>
          </div>

          <p className="desc pt-2">
            {description.length < 90
              ? description
              : description.slice(0, 90) + "..."}
          </p>

          <p className="action" href="#">
            Find out more
            <span aria-hidden="true">→</span>
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

export default Card;
