import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const footerLinks = {
    Company: [
      { label: 'About', href: '#about' },
      { label: 'Solutions', href: '#solutions' },
      { label: 'Services', href: '#services' },
      { label: 'Contact', href: '#contact' },
    ],
    Capabilities: [
      { label: 'Contact Center', href: '#solutions' },
      { label: 'USSD Services', href: '#solutions' },
      { label: 'Cloud & VPS', href: '#services' },
      { label: 'Cybersecurity', href: '#solutions' },
    ],
    Legal: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Cookies', href: '#' },
    ],
  };

  return (
    <footer className="relative bg-gray-900 border-t border-gray-800/60 py-14 px-6 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(244,125,17,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(244,125,17,.03)_1px,transparent_1px)] bg-[size:80px_80px]" />
        <div className="absolute -top-24 -right-24 w-[520px] h-[520px] rounded-full blur-3xl opacity-40"
             style={{ background: 'radial-gradient(circle, rgba(244,125,17,0.18), transparent 60%)' }} />
        <div className="absolute -bottom-28 -left-28 w-[560px] h-[560px] rounded-full blur-3xl opacity-35"
             style={{ background: 'radial-gradient(circle, rgba(244,115,58,0.16), transparent 60%)' }} />
      </div>
      <div className="container mx-auto" data-reveal="up">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#F47D11] to-[#F4733A] flex items-center justify-center">
                <span className="text-white font-bold text-sm">360</span>
              </div>
              <span className="text-2xl font-bold text-white">
                SysUp<span className="text-[#F47D11]">360</span>
              </span>
            </motion.div>
            <p className="text-gray-400">
              Secure, tailored, and cost‑effective IT solutions — built to deliver real impact and keep you ahead of the curve.
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
              <h4 className="text-white font-semibold mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} SysUp360. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

