import React, { useState, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Images from "../Images";

const Navbar = () => {
  const { scrollY } = useScroll();
  const [activeSection, setActiveSection] = useState("home");
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(17, 24, 39, 0)", "rgba(17, 24, 39, 0.95)"]
  );
  const backdropBlur = useTransform(scrollY, [0, 100], [0, 10]);

  const navItems = useMemo(
    () => [
      { label: "Home", id: "home" },
      { label: "Solutions", id: "solutions" },
      { label: "Services", id: "services" },
      { label: "About", id: "about" },
      { label: "Contact", id: "contact" },
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

  return (
    <motion.nav
      style={{ backgroundColor, backdropFilter: `blur(${backdropBlur}px)` }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-gray-800/50"
    >
      <div className="max-w-8xl mx-auto px-6 py-1.5 sm:py-2">
        <div className="flex items-center justify-between">
          <motion.a
            href="#home"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={Images.logo}
              alt="Logo"
              className="w-20 sm:w-24"
            />
          </motion.a>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.id;
              return (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
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
      </div>
    </motion.nav>
  );
};

export default Navbar;
