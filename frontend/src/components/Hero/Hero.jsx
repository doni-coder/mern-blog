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
          className="absolute top-[17vh] md:top-[22vh] left-5 pr-3 md:left-24 w-[90%]"
        >
          <motion.h1
            variants={textVariant(1)}
            initial="hidden"
            whileInView="show"
            className=" text-6xl font-bold text-green-600 relative"
          >
          Create <br /> Blog spot
          </motion.h1>
          <motion.p
            variants={textVariant(0.75)}
            initial="hidden"
            whileInView="show"
            className="text-white mt-5 mb-4 text-[18px]"
          >
            Create your blog and share your knowledge in this platform , read other blog post from different author and shape your knowledge .
            This platform gives you freedom to share any kind of content <b>A-Z</b> .
          </motion.p>
          <Highlight className="text-black dark:text-white text-3xl pl-3 pr-3">
            share knowledge
          </Highlight>
        </motion.div>
      </HeroHighlight>
    </div>
  );
}

export default Hero;
