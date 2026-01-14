import React from "react";
import { motion } from "framer-motion";
import Images from "../Images";

const Footer = () => {
  const footerLinks = {
    Company: [
      { label: "About", href: "#about" },
      { label: "Solutions", href: "#solutions" },
      { label: "Services", href: "#services" },
      { label: "Contact", href: "#contact" },
    ],
    Capabilities: [
      { label: "Contact Center", href: "#solutions" },
      { label: "USSD Services", href: "#solutions" },
      { label: "Cloud & VPS", href: "#services" },
      { label: "Cybersecurity", href: "#solutions" },
    ],
    Legal: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Cookies", href: "#" },
    ],
  };

  return (
    <footer className="overflow-hidden relative px-6 py-14 bg-gray-900 border-t border-gray-800/60">
      <div className="overflow-hidden absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(244,125,17,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(244,125,17,.03)_1px,transparent_1px)] bg-[size:80px_80px]" />
        <div
          className="absolute -top-24 -right-24 w-[520px] h-[520px] rounded-full blur-3xl opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(244,125,17,0.18), transparent 60%)",
          }}
        />
        <div
          className="absolute -bottom-28 -left-28 w-[560px] h-[560px] rounded-full blur-3xl opacity-35"
          style={{
            background:
              "radial-gradient(circle, rgba(244,115,58,0.16), transparent 60%)",
          }}
        />
      </div>
      <div className="container mx-auto" data-reveal="up">
        <div className="grid gap-8 mb-8 md:grid-cols-4">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex gap-2 items-center mb-4"
            >
              <img src={Images.logo} alt="" className="w-32" />
            </motion.div>
            <p className="text-gray-400">
              Secure, tailored, and cost‑effective IT solutions — built to
              deliver real impact and keep you ahead of the curve.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="mb-4 font-semibold text-white">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 transition-colors cursor-pointer hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="pt-8 text-center text-gray-400 border-t border-white/10">
          <p>
            &copy; {new Date().getFullYear()} SysUp360. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
