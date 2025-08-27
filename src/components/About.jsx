/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */

import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => {
  return(
  <Tilt className="xs:w-[350px] w-full">
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary rounded-[20px] py-5 px-1s2 min-h-[280px] flex justify-evenly items-center flex-col"
      >
        <img
          src={icon}
          alt="web-development"
          className="w-16 h-16 object-contain"
        />

        <h3 className="text-white text-[20px] font-bold text-center">
          {title}
        </h3>
      </div>
    </motion.div>
    </Tilt>
  );
};

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()} className="mt-4">
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-5.5xl leading-[30px]"
      >
I’m a backend-focused software developer with expertise in distributed systems, machine learning, and
full-stack development. My work centers on building scalable APIs and optimizing databases (PostgreSQL, MongoDB, Redis)
while designing fault-tolerant services using frameworks like Node.js, Django, and Flask. I have hands-on experience
with distributed data pipelines and streaming systems such as Kafka and Spark, ensuring reliability and high throughput
in large-scale environments. <br />

Beyond backend infrastructure, I deploy ML models with TensorFlow and PyTorch, integrating them into production-ready
systems on AWS and GCP. I also build full-stack applications using React, Angular, and Next.js, tying together robust
backend services with clean, user-friendly interfaces. <br />

My goal is to bring these pieces together: backend infrastructure, distributed systems, and machine learning, to
deliver intelligent, reliable, and scalable solutions.
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
