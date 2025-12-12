import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const CTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [status, setStatus] = useState('idle'); // idle | sent

  return (
    <section id="contact" className="relative py-24 px-6 overflow-hidden bg-gray-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(244,125,17,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(244,125,17,.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <motion.div
          className="absolute -top-24 right-0 w-[520px] h-[520px] rounded-full blur-3xl opacity-60"
          style={{ background: 'radial-gradient(circle, rgba(244,125,17,0.22) 0%, transparent 60%)' }}
          animate={{ y: [0, 30, 0], x: [0, 18, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-24 left-0 w-[560px] h-[560px] rounded-full blur-3xl opacity-55"
          style={{ background: 'radial-gradient(circle, rgba(244,115,58,0.20) 0%, transparent 60%)' }}
          animate={{ y: [0, -35, 0], x: [0, -22, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="container mx-auto relative z-10"
        data-reveal="clip"
      >
        <div className="max-w-5xl mx-auto rounded-3xl border border-gray-800/60 bg-gray-900/25 backdrop-blur-md overflow-hidden">
          <div className="p-8 sm:p-12 grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#F47D11]/10 to-[#F4733A]/10 backdrop-blur-sm px-6 py-3 rounded-full border border-[#F47D11]/20">
                <div className="w-2 h-2 bg-[#F47D11] rounded-full animate-pulse" />
                <span className="text-[#F47D11] font-semibold text-sm tracking-wider">Contact</span>
              </div>
              <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
                Let’s plan your next deployment.
              </h2>
              <p className="mt-4 text-gray-300 text-base sm:text-lg leading-relaxed">
                Tell us what you’re building — call center, USSD, cloud/VPS, network rollout, disaster recovery, or app development — and we’ll respond with a clear plan.
              </p>

              <div className="mt-8 grid gap-3">
                {[
                  { label: 'Fast response', value: 'We typically reply within 1 business day.' },
                  { label: 'Security-first', value: 'Built with best practices from day one.' },
                  { label: 'Built to scale', value: 'From startups to enterprise rollouts.' },
                ].map((row) => (
                  <div key={row.label} className="rounded-2xl border border-gray-800/60 bg-gray-900/20 p-4">
                    <div className="text-white font-semibold">{row.label}</div>
                    <div className="text-sm text-gray-300 mt-1">{row.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <form
              className="rounded-2xl border border-gray-800/60 bg-gray-950/20 p-6"
              onSubmit={(e) => {
                e.preventDefault();
                setStatus('sent');
                window.setTimeout(() => setStatus('idle'), 2500);
              }}
            >
              <div className="grid gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="grid gap-2 text-sm text-gray-300">
                    Name
                    <input
                      required
                      className="w-full rounded-xl bg-gray-900/40 border border-gray-800/60 px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-[#F47D11]/60"
                      placeholder="Your name"
                    />
                  </label>
                  <label className="grid gap-2 text-sm text-gray-300">
                    Email
                    <input
                      required
                      type="email"
                      className="w-full rounded-xl bg-gray-900/40 border border-gray-800/60 px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-[#F47D11]/60"
                      placeholder="you@company.com"
                    />
                  </label>
                </div>

                <label className="grid gap-2 text-sm text-gray-300">
                  What do you need?
                  <select
                    className="w-full rounded-xl bg-gray-900/40 border border-gray-800/60 px-4 py-3 text-white outline-none focus:border-[#F47D11]/60"
                    defaultValue="Call Center"
                  >
                    <option>Call Center</option>
                    <option>USSD Services</option>
                    <option>Network Design & Deployment</option>
                    <option>IP PBX</option>
                    <option>WAN / Disaster Recovery</option>
                    <option>Mobile App / Software Development</option>
                    <option>VPS / Cloud</option>
                    <option>Web Design / Email Hosting</option>
                    <option>Other</option>
                  </select>
                </label>

                <label className="grid gap-2 text-sm text-gray-300">
                  Message
                  <textarea
                    rows={5}
                    className="w-full rounded-xl bg-gray-900/40 border border-gray-800/60 px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-[#F47D11]/60 resize-none"
                    placeholder="Briefly describe your goal, timeline, and any constraints…"
                  />
                </label>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01, boxShadow: '0 20px 50px rgba(244,125,17,0.25)' }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-2 w-full rounded-xl bg-gradient-to-r from-[#F47D11] to-[#F4733A] text-white font-semibold py-3"
                >
                  {status === 'sent' ? 'Message queued (demo)' : 'Send message'}
                </motion.button>

                <div className="text-xs text-gray-500">
                  This form is UI-only for now. If you want, I can wire it to EmailJS/Formspree or your backend.
                </div>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;

