import React from "react";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../ui/hero-highlight";
import { staggerContainer, textVariant } from "../../utils/motion";

function Hero() {
  return (
    <div className="w-full">
      <HeroHighlight className="relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className="absolute top-[17vh] md:top-[22vh] left-5 md:left-24 w-[90%]"
        >
          <motion.h1
            variants={textVariant(1)}
            initial="hidden"
            whileInView="show"
            className="text-white text-6xl font-bold text-green-600 relative"
          >
            Om prakash
          </motion.h1>
          <motion.p
            variants={textVariant(0.75)}
            initial="hidden"
            whileInView="show"
            className="text-white mt-3 mb-4 text-[18px]"
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur amet nemo iure omnis dolores nostrum mollitia eum porro fugiat officiis?
          </motion.p>
          <Highlight className="text-black dark:text-white text-3xl pl-3 pr-3">
            Om prakash
          </Highlight>
        </motion.div>
      </HeroHighlight>
    </div>
  );
}

export default Hero;
