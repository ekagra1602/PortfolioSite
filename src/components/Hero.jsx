import myimg from "../assets/myimg.jpeg";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative md:h-dvh min-h-[600px] flex-col-reverse flex md:flex-row items-center justify-between pt-[60px] z-10 mx-[10%]">
      <div className="content flex-col items-center md:items-start z-10 text-white">
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
          className="text-2xl md:text-3xl font-roboto mb-[48px]"
        >
          I'm a junior at ASU and a software developer specializing in backend infrastructure, distributed systems, and ML infrastructure. 
          I'm interning at Airbnb this summer, working on the Observability team in the Infrastructure unit.
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
