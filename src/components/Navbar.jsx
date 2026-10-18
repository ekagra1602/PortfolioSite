import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { menu, close } from "../assets";

const ACCENT = "#5CF2A6";
const tabs = [{ id: "home", title: "Home" }, ...navLinks];

const Navbar = () => {
  const [active, setActive] = useState("home");
  const [toggle, setToggle] = useState(false);

  // Highlight the tab for whichever section is under the top third of the viewport.
  useEffect(() => {
    const handleScroll = () => {
      const line = window.innerHeight / 3;
      let current = "home";
      navLinks.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      });
      setActive(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goTo = (e, id) => {
    if (id !== "home") return;
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav
      className={`${styles.paddingX} hero-term w-full fixed top-0 z-20 bg-primary border-b border-white/[0.12]`}
    >
      <div className='w-full flex justify-between items-end max-w-7xl mx-auto pt-3.5 pb-3.5 sm:pb-0'>
        <Link
          to='/'
          className='flex items-center gap-3 min-h-[48px] whitespace-nowrap'
          onClick={() => window.scrollTo(0, 0)}
        >
          <span className='text-white text-[15px] font-medium'>ekagra</span>
          <span className='hidden md:inline text-white/40 text-[14px]'>— zsh — 80×24</span>
        </Link>

        <ul className='list-none hidden sm:flex flex-row gap-0.5 -mb-px'>
          {tabs.map((tab, i) => {
            const on = active === tab.id;
            return (
              <li key={tab.id}>
                <a
                  href={tab.id === "home" ? "#" : `#${tab.id}`}
                  onClick={(e) => goTo(e, tab.id)}
                  aria-current={on ? "true" : undefined}
                  className={`flex items-center gap-2.5 px-4 lg:px-5 min-h-[48px] text-[14px] rounded-t-[10px] border border-b-0 transition-colors ${
                    on
                      ? "text-white bg-[#0d0d0d] border-white/[0.12]"
                      : "text-white/60 border-transparent hover:text-white"
                  }`}
                >
                  <span className='text-white/40'>{i + 1}</span>
                  <span>{tab.id}</span>
                  <span
                    className='w-1.5 h-1.5 rounded-full transition-colors'
                    style={{ background: on ? ACCENT : "transparent" }}
                    aria-hidden='true'
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className='sm:hidden flex flex-1 justify-end items-center self-center'>
          <button
            type='button'
            aria-label={toggle ? "Close menu" : "Open menu"}
            className='w-11 h-11 flex items-center justify-center'
            onClick={() => setToggle(!toggle)}
          >
            <img src={toggle ? close : menu} alt='' className='w-[28px] h-[28px] object-contain' />
          </button>
          {/* Menu */}
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-2 bg-black border border-white/[0.12] absolute top-20 right-0 mx-4 my-2 min-w-[180px] z-10 rounded-[10px]`}
          >
            <ul className='list-none flex flex-1 flex-col'>
              {tabs.map((tab, i) => {
                const on = active === tab.id;
                return (
                  <li key={tab.id}>
                    <a
                      href={tab.id === "home" ? "#" : `#${tab.id}`}
                      onClick={(e) => {
                        setToggle(false);
                        goTo(e, tab.id);
                      }}
                      className={`flex items-center gap-3 px-3 min-h-[44px] rounded-md text-[15px] ${
                        on ? "text-white bg-white/[0.06]" : "text-white/70"
                      }`}
                    >
                      <span className='text-white/40'>{i + 1}</span>
                      <span>{tab.id}</span>
                      <span
                        className='ml-auto w-1.5 h-1.5 rounded-full'
                        style={{ background: on ? ACCENT : "transparent" }}
                        aria-hidden='true'
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
