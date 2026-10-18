/* eslint-disable react/prop-types */
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects, publications } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  website_link,
}) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-[#0b0b0b] border border-white/[0.08] p-5 rounded-2xl sm:w-[340px] w-full'
      >
        <div className='relative w-full h-[230px]'>
          <img
            src={image}
            alt='project_image'
            className='w-full h-full object-cover rounded-2xl'
          />

          <div className='absolute inset-0 flex justify-between m-3 card-img_hover'>
            {/* Website link icon (left) */}
            <div className='flex items-start'>
              {website_link && (
                <div
                  onClick={() => window.open(website_link, "_blank")}
                  className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </div>
              )}
            </div>

            {/* GitHub icon (right) */}
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
            >
              <img
                src={github}
                alt='source code'
                className='w-1/2 h-1/2 object-contain'
              />
            </div>
          </div>
        </div>

        <div className='mt-5'>
          <h3 className='font-serif text-white text-[28px] leading-tight tracking-[-0.01em]'>{name}</h3>
          <p className='mt-2 text-white/55 text-[14px] leading-relaxed'>{description}</p>
        </div>

        <div className='mt-5 pt-4 border-t border-white/[0.08] flex flex-wrap gap-x-3 gap-y-1'>
          {tags.map((tag) => (
            <span
              key={`${name}-${tag.name}`}
              className='font-mono text-[12px] uppercase tracking-[0.06em] text-white/45'
            >
              {tag.name}
            </span>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          Following projects showcases my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>

      <div className='pub-block mt-14 flex flex-col gap-4'>
        <span className='exp-mono text-[13px] text-white/50 tracking-[0.08em] uppercase'>
          Publications
        </span>
        {publications.map((pub) => (
          <motion.a
            key={pub.title}
            href={pub.link}
            target='_blank'
            rel='noopener noreferrer'
            variants={fadeIn("up", "spring", 0.1, 0.75)}
            className='group block rounded-2xl border border-white/[0.1] bg-[#0b0b0b] p-6 md:p-8 hover:border-white/25 transition-colors'
          >
            <div className='flex flex-wrap items-center gap-x-3 gap-y-1 exp-mono text-[13px]'>
              <span style={{ color: "#5CF2A6" }}>{pub.venue}</span>
              <span className='text-white/30'>·</span>
              <span className='text-white/50'>{pub.authorship}</span>
            </div>
            <h3 className='mt-3 text-white text-2xl md:text-[34px] font-bold tracking-[-0.03em] leading-tight'>
              {pub.title}
            </h3>
            <p className='mt-3 text-white/60 text-[16px] md:text-[17px] leading-relaxed max-w-3xl'>
              {pub.description}
            </p>
            <span className='mt-5 inline-flex items-center gap-2 exp-mono text-[14px] text-white/80 group-hover:text-white'>
              Read on {pub.linkLabel}
              <span className='group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform' aria-hidden='true'>↗</span>
            </span>
          </motion.a>
        ))}
      </div>

      <div className='mt-16 flex flex-wrap gap-7'>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");