import { motion } from "framer-motion";


import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { FaLinkedin } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";


import { Link } from "react-router-dom";

const Contact = () => {

  return (
    <div
      className={`xl:mt-12 flex lg:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 py-10 pl-12 rounded-2xl shadow-lg shadow-black-200"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <div className="mt-8 flex flex-col gap-6">
          <div>
            <p className="text-secondary">Name:</p>
            <p className="text-white font-medium">Ekagra Gupta</p>
          </div>
          <div>
            <p className="text-secondary">Phone No:</p>
            <p className="text-white font-medium">+1 (602)-515-5268</p>
          </div>
          
          <div>
            <p className="text-secondary">Get in touch on LinkedIn</p>
            <Link to="https://www.linkedin.com/in/ekagra16">
            <div className="flex justify-start items-center mt-1 py-1 hover:bg-black-200 rounded-lg px-2 transition-colors duration-200">
              <FaLinkedin className="text-2xl text-blue-600" />
              <p className="ml-3 text-white font-medium">Ekagra Gupta</p>
            </div></Link>
          </div>
          
          <div>
            <p className="text-secondary">Send me an email</p>
            <div className="flex justify-start items-center mt-1 py-1">
              <Link to="mailto:egupta3@asu.edu">
                <div className="flex hover:bg-black-200 rounded-lg px-2 transition-colors duration-200">
                  <MdOutlineMail className="text-2xl text-white" />
                  <p className="ml-3 text-white font-medium">egupta3@asu.edu</p>
                </div>
              </Link>
            </div> 
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px] lg:mx-auto"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
