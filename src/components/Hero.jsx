import myimg from "../assets/myimg.jpeg";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative md:h-dvh min-h-[600px] flex flex-col md:flex-row items-center justify-between pt-[60px] z-10 mx-[10%]">
      <div className="content flex flex-col items-center md:items-start z-10 text-white md:w-[65%]">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="title text-5xl md:text-7xl font-extrabold mb-[33px] font-roboto bg-text-gradient bg-clip-text"
        >
          {"Hi, I'm Ekagra Gupta"}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-2xl md:text-2xl font-roboto mb-[36px]"
        >
        I'm a rising senior at ASU and a Software Engineering intern at Airbnb.<br />
        I love working on backend systems and machine learning projects.
        </motion.p>
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          href="mailto:egupta3@asu.edu"
          className="bg-[#576cbc] text-white no-underline rounded-[100px] font-semibold px-4 py-6"
        >
          Contact Me
        </motion.a>   
      </div>      
      <motion.img
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        src={myimg}
        alt="Ekagra's image"
        className="md:min-w-1/2 h-[150px] md:min-h-[350px] rounded-full z-10 mb-4 ml-2"
      />
    </section>
  );
};

export default Hero;
