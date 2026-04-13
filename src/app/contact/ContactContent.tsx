"use client";

import { useState, useEffect, FormEvent } from "react";
import { motion } from "framer-motion";
import {
  RevealOnScroll,
  StaggerContainer,
  StaggerItem,
} from "@/components/Animations";

const SOCIAL_LINKS = [
  {
    label: "GITHUB",
    url: "https://github.com/pravaatchhetri",
    icon: "code",
  },
  {
    label: "LINKEDIN",
    url: "https://linkedin.com/in/pravaat-chhetri",
    icon: "share",
  },
  {
    label: "EMAIL",
    url: "mailto:pravaatchhetri66@gmail.com",
    icon: "alternate_email",
  },
];

export function ContactContent() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [currentTime, setCurrentTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () =>
      setCurrentTime(new Date().toISOString().split("T")[1].split(".")[0]);
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch(
        "https://formsubmit.co/ajax/2768805d950a902b30b9cc19a59d2bd7",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formState.name,
            email: formState.email,
            message: formState.message,
            _subject: `Portfolio contact from ${formState.name}`,
            _captcha: "false",
          }),
        },
      );
      if (res.ok) {
        setStatus("sent");
        setFormState({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-surface pt-24">
      <div className="max-w-[1440px] mx-auto px-8 md:px-24 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* ─── LEFT COLUMN ─── */}
          <div className="lg:col-span-7">
            {/* Header */}
            <RevealOnScroll>
              <div className="mb-12">
                <h1 className="font-headline text-5xl md:text-7xl lg:text-[6rem] font-black leading-[0.9] tracking-tighter uppercase text-white mb-6">
                  CONTACT
                  <br />
                  <span className="text-zinc-600">NODE_01</span>
                </h1>
                <p className="font-body text-lg text-zinc-400 max-w-md leading-relaxed">
                  Initiate a direct link. Currently synchronized with the UTC+6
                  zone. Expect a response within one orbital cycle.
                </p>
              </div>
            </RevealOnScroll>

            {/* Terminal Form */}
            <RevealOnScroll delay={0.2}>
              <div className="bg-surface-container-low">
                {/* Terminal titlebar */}
                <div className="flex items-center justify-between px-6 py-3 bg-surface-container-high">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-zinc-700" />
                    <div className="w-3 h-3 bg-zinc-700" />
                    <div className="w-3 h-3 bg-zinc-700" />
                  </div>
                  <span className="font-mono text-[10px] tracking-widest text-zinc-600 uppercase">
                    COMMS_TERMINAL.EXE
                  </span>
                </div>

                {/* Terminal content */}
                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                  {/* Terminal prompt lines */}
                  <div className="font-mono text-sm text-zinc-500 space-y-2">
                    <p>
                      <span className="text-zinc-400">$</span> login --identity
                      &quot;guest_user&quot;
                    </p>
                    <p>
                      <span className="text-zinc-400">$</span>{" "}
                      initialize_transmission
                    </p>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="font-label text-[10px] tracking-widest text-zinc-600 uppercase block mb-3">
                      SUBJECT_IDENTITY
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      placeholder="NAME_REQUIRED"
                      className="w-full bg-transparent border-b border-outline-variant/20 focus:border-white pb-3 text-white font-headline text-lg tracking-tight outline-none placeholder:text-zinc-700 transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="font-label text-[10px] tracking-widest text-zinc-600 uppercase block mb-3">
                      RETURN_ADDRESS
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      placeholder="EMAIL_REQUIRED"
                      className="w-full bg-transparent border-b border-outline-variant/20 focus:border-white pb-3 text-white font-headline text-lg tracking-tight outline-none placeholder:text-zinc-700 transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="font-label text-[10px] tracking-widest text-zinc-600 uppercase block mb-3">
                      MESSAGE_PAYLOAD
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      placeholder="INPUT_DATA_STRING..."
                      className="w-full bg-transparent border-b border-outline-variant/20 focus:border-white pb-3 text-white font-body text-base outline-none placeholder:text-zinc-700 resize-none transition-colors"
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    whileTap={{ scale: 0.98 }}
                    className={`bg-white text-black font-headline font-bold px-10 py-4 tracking-widest uppercase text-sm flex items-center gap-3 transition-all ${
                      status === "sending" ? "opacity-50" : "hover:bg-zinc-200"
                    }`}
                  >
                    {status === "sending" ? (
                      <>
                        TRANSMITTING
                        <span className="animate-pulse">...</span>
                      </>
                    ) : status === "sent" ? (
                      <>
                        TRANSMISSION_COMPLETE
                        <span className="material-symbols-outlined text-base">
                          check
                        </span>
                      </>
                    ) : (
                      <>
                        EXECUTE_SEND
                        <span className="material-symbols-outlined text-base">
                          arrow_forward
                        </span>
                      </>
                    )}
                  </motion.button>

                  {status === "error" && (
                    <p className="font-mono text-xs text-red-400">
                      ERROR: Transmission failed. Retry or use direct email
                      channel.
                    </p>
                  )}
                </form>
              </div>
            </RevealOnScroll>
          </div>

          {/* ─── RIGHT COLUMN ─── */}
          <div className="lg:col-span-5 space-y-8">
            {/* Status Card */}
            <RevealOnScroll delay={0.1}>
              <div className="bg-surface-container-high p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 bg-green-500 animate-pulse" />
                  <span className="font-label text-xs tracking-widest text-zinc-400 uppercase">
                    STATUS: AVAILABLE
                  </span>
                </div>
                <div className="space-y-2 font-mono text-xs text-zinc-500">
                  <p>LAT: 27.4728° N</p>
                  <p>LONG: 89.6393° E</p>
                  <p>TIME: {currentTime ?? "──:──:──"}_UTC</p>
                </div>
              </div>
            </RevealOnScroll>

            {/* Social Network Nodes */}
            <RevealOnScroll delay={0.2}>
              <div className="bg-surface-container-high p-6">
                <h3 className="font-label text-[10px] tracking-[0.3em] text-zinc-500 uppercase mb-6">
                  SOCIAL_NETWORK_NODES
                </h3>
                <StaggerContainer className="space-y-0" staggerDelay={0.1}>
                  {SOCIAL_LINKS.map((link) => (
                    <StaggerItem key={link.label}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between py-4 border-b border-zinc-800/30 hover:bg-surface-bright/20 transition-colors group px-2 -mx-2"
                      >
                        <div className="flex items-center gap-4">
                          <span className="material-symbols-outlined text-zinc-500 text-xl">
                            {link.icon}
                          </span>
                          <span className="font-headline text-sm font-bold tracking-wider text-white uppercase">
                            {link.label}
                          </span>
                        </div>
                        <span className="material-symbols-outlined text-zinc-700 group-hover:text-white text-sm transition-colors">
                          arrow_outward
                        </span>
                      </a>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </RevealOnScroll>

            {/* Encrypted Comms (decorative) */}
            <RevealOnScroll delay={0.3}>
              <div className="bg-surface-container-high p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-label text-[10px] tracking-[0.3em] text-zinc-500 uppercase">
                    ENCRYPTED_COMMS
                  </h3>
                  <span className="material-symbols-outlined text-zinc-700 text-lg">
                    lock
                  </span>
                </div>
                <div className="bg-surface-container-lowest p-4 font-mono text-[9px] text-zinc-700 leading-relaxed overflow-hidden">
                  <p>-----BEGIN PGP PUBLIC KEY BLOCK-----</p>
                  <p>mQENBF2/R44BCAC0n+136Y8hlFZ6pXW/9U1jC...</p>
                  <p>1bX3LQRjGlV72WdGIH+M5LdRNJGSV72mB81+n5...</p>
                  <p>LBNpDvT2ault+RB1LRGDvT2auSh+RB1LRG...</p>
                  <p>-----END PGP PUBLIC KEY BLOCK-----</p>
                </div>
                <button className="w-full mt-4 py-3 bg-surface-container-lowest font-label text-[10px] tracking-widest text-zinc-600 uppercase hover:text-white hover:bg-surface-container-high transition-colors ghost-border">
                  COPY_PUBLIC_KEY
                </button>
              </div>
            </RevealOnScroll>
          </div>
        </div>

        {/* ─── BOTTOM SECTION ─── */}
        <RevealOnScroll delay={0.4}>
          <div className="mt-32 py-24 relative overflow-hidden">
            {/* Circuit board texture */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
                `,
                backgroundSize: "20px 20px",
              }}
            />
            <div className="relative text-center">
              <h2 className="font-headline text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase text-white text-glow-strong">
                ESTABLISHING_LINK...
              </h2>
              <p className="font-label text-zinc-600 tracking-void uppercase mt-6 text-sm">
                PACKET DATA RECEIVED / HANDSHAKE VERIFIED
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
