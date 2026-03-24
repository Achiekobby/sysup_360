import React, { useState, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Images from "../Images";

const Navbar = () => {
  const NAV_OFFSET = 88;
  const { scrollY } = useScroll();
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(17, 24, 39, 0)", "rgba(17, 24, 39, 0.95)"]
  );
  const backdropBlur = useTransform(scrollY, [0, 100], [0, 10]);

  const navItems = useMemo(
    () => [
      { label: "Home", id: "home" },
      { label: "About Us", id: "about" },
      { label: "Services & Solutions", id: "solutions" },
      { label: "Contact Us", id: "contact" },
    ],
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.id);
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (!section) return;
    const y = section.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.history.replaceState(null, "", `#${id}`);
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <motion.nav
      style={{ backgroundColor, backdropFilter: `blur(${backdropBlur}px)` }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-gray-800/50"
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 py-2">
        <div className="flex items-center justify-between">
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("home");
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={Images.logo}
              alt="Logo"
              className="w-16 sm:w-20 md:w-24"
            />
          </motion.a>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-700/70 bg-gray-900/70 text-gray-200 hover:text-[#F47D11] hover:border-[#F47D11]/50 transition-colors duration-300"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <span className="sr-only">Menu</span>
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuOpen ? (
                <path
                  d="M6 6L18 18M6 18L18 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7H20M4 12H20M4 17H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.id;
              return (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative px-3 py-1 text-sm font-medium transition-all duration-300 cursor-pointer group"
                >
                  {/* Background on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#F47D11]/10 to-[#F4733A]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    layoutId="nav-bg"
                  />

                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#F47D11]/15 to-[#F4733A]/15 border border-[#F47D11]/30"
                      layoutId="active-indicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  {/* Text */}
                  <span
                    className={`relative z-10 transition-colors duration-300 ${
                      isActive
                        ? "text-[#F47D11] font-semibold"
                        : "text-gray-300 group-hover:text-[#F47D11]"
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* Underline on hover */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#F47D11] to-[#F4733A] origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              );
            })}
          </div>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden mt-2 p-2 rounded-xl border border-gray-700/70 bg-gray-900/95 backdrop-blur-lg"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-300 ${
                    isActive
                      ? "text-[#F47D11] bg-[#F47D11]/10 border border-[#F47D11]/30"
                      : "text-gray-300 hover:text-[#F47D11] hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
