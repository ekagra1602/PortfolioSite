import { motion } from "framer-motion";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { slideIn, staggerContainer } from "../utils/motion";
import { FaLinkedin } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";

import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <motion.section
      variants={staggerContainer()}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: true, amount: 0.1 }}
      className="max-w-screen-xl mx-auto py-16 px-6 sm:px-16 relative z-0 contact-section"
      id="contact"
    >
      <span className="hash-span" id="contact">
        &nbsp;
      </span>
      <div
        className={`xl:mt-12 flex lg:flex-row flex-col-reverse gap-10 overflow-hidden`}
      >
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className="flex-[0.75] bg-black-100 py-12 px-16 rounded-2xl shadow-lg shadow-black-200 mt-8"
        >
          <p className={styles.sectionSubText}>Get in touch</p>
          <h3 className="text-4xl font-bold text-white">Contact</h3>

          <div className="mt-12 flex flex-col gap-8">
            <div>
              <p className="text-secondary text-lg">Name:</p>
              <p className="text-white font-medium text-xl">Ekagra Gupta</p>
            </div>
            <div>
              <p className="text-secondary text-lg">Phone No:</p>
              <p className="text-white font-medium text-xl">+1 (602)-515-5268</p>
            </div>
            
            <div>
              <p className="text-secondary text-lg">Get in touch on LinkedIn</p>
              <Link to="https://www.linkedin.com/in/ekagra16">
              <div className="flex justify-start items-center mt-2 py-3 hover:bg-black-200 rounded-lg px-4 transition-colors duration-200">
                <FaLinkedin className="text-3xl text-blue-600" />
                <p className="ml-4 text-white font-medium text-xl">Ekagra Gupta</p>
              </div></Link>
            </div>
            
            <div>
              <p className="text-secondary text-lg">Send me an email</p>
              <div className="flex justify-start items-center mt-2 py-3">
                <Link to="mailto:egupta3@asu.edu">
                  <div className="flex hover:bg-black-200 rounded-lg px-4 transition-colors duration-200">
                    <MdOutlineMail className="text-3xl text-white" />
                    <p className="ml-4 text-white font-medium text-xl">egupta3@asu.edu</p>
                  </div>
                </Link>
              </div> 
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="xl:flex-1 xl:h-auto md:h-[600px] h-[400px]"
        >
          <EarthCanvas />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Contact;
