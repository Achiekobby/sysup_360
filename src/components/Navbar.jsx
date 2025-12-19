import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Images from "../Images";

const Navbar = () => {
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(17, 24, 39, 0)", "rgba(17, 24, 39, 0.95)"]
  );
  const backdropBlur = useTransform(scrollY, [0, 100], [0, 10]);

  const navItems = ["Home", "Solutions", "Services", "About", "Contact"];

  return (
    <motion.nav
      style={{ backgroundColor, backdropFilter: `blur(${backdropBlur}px)` }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <div className="max-w-8xl mx-auto px-6 py-1">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <img
              src={Images.logo}
              alt="Logo"
              className="w-24"
            />
          </motion.div>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, color: "#F47D11" }}
                className="text-gray-300 hover:text-[#F47D11] transition-colors cursor-pointer"
              >
                {item}
              </motion.a>
            ))}
          </div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(244, 125, 17, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-1.5 bg-gradient-to-r from-[#F47D11] to-[#F4733A] rounded-full text-white font-semibold hover:shadow-lg hover:shadow-[#F47D11]/50 transition-all text-sm"
          >
            Get Started
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
