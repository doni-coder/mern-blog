import React from "react";
import "./Card.css";
import { motion } from "framer-motion";
import { zoomIn } from "../../utils/motion";
import { Link } from "react-router-dom";

function Card({ title, _id, description, blogImage }) {
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
          <p href="#">
            <span className="title">{title}</span>
          </p>

          <p className="desc">
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
