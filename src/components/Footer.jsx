import React from "react";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import Images from "../Images";

const Footer = () => {
  const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "About Us", href: "#about" },
    { label: "Services & Solutions", href: "#solutions" },
    { label: "Contact Us", href: "#contact" },
  ];

  return (
    <footer className="overflow-hidden relative bg-gray-950 border-t border-gray-800/60">
      {/* Background Effects */}
      <div className="overflow-hidden absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(244,125,17,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(244,125,17,.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
        <motion.div
          className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full blur-3xl opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(244,125,17,0.15), transparent 70%)",
          }}
          animate={{
            y: [0, 30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container relative z-10 px-6 py-16 mx-auto max-w-7xl">
        {/* Main Footer Content */}
        <div className="grid gap-12 mb-12 lg:grid-cols-12">
          {/* Brand Section */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <img src={Images.logo_white} alt="SysUp360" className="mb-6 w-40" />
            <p className="mb-6 text-base leading-relaxed text-gray-400">
              Delivering secure, tailored IT solutions that drive real impact. From call centers to cloud infrastructure, we keep your business ahead of the curve.
            </p>
            
            {/* Contact Info Cards */}
            <div className="space-y-3">
              <a 
                href="tel:+233303965398"
                className="flex items-center gap-3 p-3 rounded-xl border border-gray-800/60 bg-gray-900/30 hover:border-[#F47D11]/40 hover:bg-gray-900/50 transition-all group"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#F47D11]/10 border border-[#F47D11]/20 group-hover:bg-[#F47D11]/20 transition-colors">
                  <Phone className="w-5 h-5 text-[#F47D11]" strokeWidth={2} />
                </div>
                <div>
                  <div className="text-xs text-gray-500">Call us</div>
                  <div className="text-sm font-semibold text-white">+233 303 965 398</div>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="mb-6 text-sm font-bold tracking-wider text-white uppercase">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 transition-colors hover:text-[#F47D11] flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-[#F47D11] transition-colors" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Working Hours */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="mb-6 text-sm font-bold tracking-wider text-white uppercase">
              Business Hours
            </h3>
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-gray-800/60 bg-gray-900/30">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-semibold text-white">Monday - Friday</span>
                </div>
                <p className="text-sm text-gray-400">8:00 AM - 5:00 PM GMT</p>
              </div>
              <div className="p-4 rounded-xl border border-gray-800/60 bg-gray-900/30">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-gray-500" />
                  <span className="text-sm font-semibold text-white">Saturday - Sunday</span>
                </div>
                <p className="text-sm text-gray-400">Closed</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-gray-800/60">
          <div className="flex flex-col gap-4 items-center justify-between md:flex-row">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} SysUp360 Solutions. All rights reserved.
            </p>
            <div className="flex gap-6">
              <span className="text-sm text-gray-500">
                Built with precision & care
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
