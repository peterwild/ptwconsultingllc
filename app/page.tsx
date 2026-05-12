"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import ContactForm from "@/components/ContactForm";
import ThemeToggle from "@/components/ThemeToggle";

function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Animated mesh gradient ─────────────────────────────────────────── */
function MeshGradient() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%] rounded-full opacity-20 blur-[120px] bg-indigo-600 animate-pulse light:opacity-50 light:bg-indigo-500" style={{ animationDuration: "8s" }} />
      <div className="absolute -top-[20%] -right-[20%] w-[60%] h-[60%] rounded-full opacity-15 blur-[120px] bg-cyan-500 animate-pulse light:opacity-45 light:bg-cyan-400" style={{ animationDuration: "12s" }} />
      <div className="absolute top-[20%] left-[30%] w-[40%] h-[40%] rounded-full opacity-10 blur-[100px] bg-violet-500 animate-pulse light:opacity-40 light:bg-violet-400" style={{ animationDuration: "10s" }} />
    </div>
  );
}

/* ─── Subtle dot grid ────────────────────────────────────────────────── */
function DotGrid() {
  return (
    <div
      className="absolute inset-0 -z-10 opacity-[0.08] dot-grid"
      aria-hidden
    />
  );
}

/* ─── Nav ─────────────────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/70 backdrop-blur-xl border-b border-border" : ""
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="text-sm font-medium tracking-tight text-foreground/90">
          PTW Consulting
        </span>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="text-xs font-medium px-4 py-1.5 rounded-full bg-foreground/[0.08] text-foreground/80 hover:bg-foreground/[0.14] border border-border transition-all duration-200 hover:text-foreground"
          >
            Get in touch
          </button>
        </div>
      </div>
    </header>
  );
}

/* ─── Hero ─────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6">
      <MeshGradient />
      <DotGrid />
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/[0.06] border border-border text-xs text-foreground/50 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            AI Transformation
          </div>
          <h1 className="text-5xl sm:text-7xl font-semibold tracking-tight leading-[1.08] text-foreground">
            You built something great.
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-teal-400 light:from-indigo-600 light:via-cyan-600 light:to-teal-500 bg-clip-text text-transparent">
              Now let AI take it further.
            </span>
          </h1>
          <p className="text-lg text-foreground/40 max-w-lg leading-relaxed">
            We help established businesses become AI native — faster
            operations, less busywork, real results.
          </p>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="mt-2 px-6 py-2.5 rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors"
          >
            Start the conversation
          </button>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── HALO ─────────────────────────────────────────────────────────────── */
function Halo() {
  return (
    <section className="py-14 px-6 relative">
      <DotGrid />
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <p className="text-xs uppercase tracking-[0.2em] text-foreground/30 mb-8 font-mono">
            Who we work with
          </p>
        </FadeIn>
        <FadeIn delay={0.06}>
          <div className="rounded-2xl p-10 sm:p-14 card-surface border border-border relative overflow-hidden">
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-emerald-500/10 rounded-full blur-[80px]" />
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground mb-4 relative">
              HALO Businesses
            </h2>
            <p className="text-base text-foreground/40 max-w-2xl mb-6 leading-relaxed relative">
              <span className="text-foreground/70 font-medium">High Asset, Low Obsolescence.</span>{" "}
              Established companies with real revenue, real customers, and decades of domain
              expertise — the kind of businesses that are already winning.
            </p>
            <p className="text-base text-foreground/40 max-w-2xl leading-relaxed relative">
              AI is the next edge. We help these companies through their AI Transformation,
              so the lead they&apos;ve built only gets bigger.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Services ─────────────────────────────────────────────────────────── */
function Services() {
  const items = [
    {
      icon: "01",
      title: "AI Readiness",
      body: "Find where AI creates the most leverage in your business.",
    },
    {
      icon: "02",
      title: "Workflow Automation",
      body: "Automate the repetitive work that slows your team down.",
    },
    {
      icon: "03",
      title: "Custom Tooling",
      body: "Purpose-built AI tools designed for how you actually operate.",
    },
    {
      icon: "04",
      title: "Team Enablement",
      body: "Train your people until AI is just part of how things run.",
    },
  ];

  return (
    <section className="py-14 px-6 relative">
      <DotGrid />
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <p className="text-xs uppercase tracking-[0.2em] text-foreground/30 mb-8 font-mono">
            What we do
          </p>
        </FadeIn>
        <div className="grid sm:grid-cols-2 gap-4">
          {items.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.06}>
              <div className="group rounded-2xl p-7 card-surface card-surface-hover border border-border hover:border-foreground/[0.12] transition-all duration-300">
                <span className="text-sm font-mono text-foreground/20 group-hover:text-indigo-400 transition-colors">
                  {s.icon}
                </span>
                <h3 className="text-lg font-medium text-foreground/90 mt-4 mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-foreground/40 leading-relaxed">{s.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Case Studies ─────────────────────────────────────────────────────── */
type Study = {
  name: string;
  kicker?: string;
  blurb: string;
  tags: string[];
  glow: string;
  confidential?: boolean;
};

function CaseStudy() {
  const studies: Study[] = [
    {
      name: "SEC Reg D 506(c) Accreditation Verification",
      kicker: "AI-native compliance SaaS",
      blurb:
        "Production web app that automates the accredited-investor verification process — the manual, attorney-billed workflow that funds pay big-law thousands per investor to run. Self-serve flows for net-worth, income, professional-letter, and appeal, with human-in-the-loop review only on edge cases.",
      tags: [
        "Next.js + Clerk",
        "Postgres + Drizzle",
        "Plaid income/asset pulls",
        "OpenAI doc review",
        "Async S3/SQS pipelines",
        "SendGrid notifications",
        "Backoffice review tooling",
      ],
      glow: "bg-cyan-500/10",
      confidential: true,
    },
    {
      name: "Boston Tree Preservation",
      blurb:
        "Modernized a 45-year-old company from paper to digital — and unlocked it for a successful acquisition.",
      tags: ["Paper → Digital", "Salesforce CRM", "Acquisition-ready"],
      glow: "bg-indigo-500/10",
    },
    {
      name: "Commercial Real Estate Owner",
      blurb:
        "Replaced the spreadsheet-and-PDF stack with AI-native ops — automated billing, lease intelligence, and tenant comms across the portfolio.",
      tags: [
        "Automated billing",
        "Lease intelligence",
        "Tenant comms",
        "NNN reconciliation",
      ],
      glow: "bg-emerald-500/10",
      confidential: true,
    },
  ];

  const [[index, direction], setState] = useState<[number, number]>([0, 0]);
  const count = studies.length;
  const advance = (delta: number) =>
    setState(([i]) => [(i + delta + count) % count, delta]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight")
        setState(([i]) => [(i + 1) % count, 1]);
      else if (e.key === "ArrowLeft")
        setState(([i]) => [(i - 1 + count) % count, -1]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count]);

  const study = studies[index];

  return (
    <section id="work" className="py-14 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div className="flex items-baseline justify-between mb-8">
            <p className="text-xs uppercase tracking-[0.2em] text-foreground/30 font-mono">
              Case Studies
            </p>
            <p className="text-xs text-foreground/30 font-mono tabular-nums">
              {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="relative">
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                  key={index}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -60) advance(1);
                    else if (info.offset.x > 60) advance(-1);
                  }}
                  className="rounded-2xl border border-border bg-foreground/[0.02] p-8 sm:p-12 relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
                >
                  <div
                    className={`absolute -top-20 -right-20 w-72 h-72 rounded-full blur-[90px] ${study.glow}`}
                  />
                  {study.confidential && (
                    <span className="absolute top-5 right-5 text-[10px] uppercase tracking-[0.2em] text-foreground/30 font-mono">
                      Confidential
                    </span>
                  )}
                  {study.kicker && (
                    <p className="text-xs uppercase tracking-[0.2em] text-foreground/40 mb-3 font-mono relative">
                      {study.kicker}
                    </p>
                  )}
                  <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground mb-4 relative pr-24">
                    {study.name}
                  </h2>
                  <p className="text-base text-foreground/40 mb-8 leading-relaxed relative max-w-3xl">
                    {study.blurb}
                  </p>
                  <div className="flex flex-wrap gap-2 relative">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1.5 rounded-full bg-foreground/[0.06] text-foreground/50 border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between mt-6">
              <button
                type="button"
                aria-label="Previous case study"
                onClick={() => advance(-1)}
                className="w-9 h-9 rounded-full border border-border bg-foreground/[0.02] text-foreground/50 hover:text-foreground hover:bg-foreground/[0.06] transition flex items-center justify-center"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <div className="flex items-center gap-2">
                {studies.map((s, i) => (
                  <button
                    key={s.name}
                    type="button"
                    aria-label={`Go to case study ${i + 1}`}
                    onClick={() => setState(([cur]) => [i, i > cur ? 1 : -1])}
                    className={`h-1.5 rounded-full transition-all ${
                      i === index
                        ? "w-8 bg-foreground/60"
                        : "w-1.5 bg-foreground/20 hover:bg-foreground/40"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                aria-label="Next case study"
                onClick={() => advance(1)}
                className="w-9 h-9 rounded-full border border-border bg-foreground/[0.02] text-foreground/50 hover:text-foreground hover:bg-foreground/[0.06] transition flex items-center justify-center"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Team ──────────────────────────────────────────────────────────────── */
function Team() {
  return (
    <section className="py-14 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <p className="text-xs uppercase tracking-[0.2em] text-foreground/30 mb-8 font-mono">
            The team
          </p>
        </FadeIn>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              name: "Pete Wild",
              role: "Managing Partner",
              bio: "Quant fund co-founder. FAANG AI product exec. Built and shipped AI products used by billions of people.",
              linkedin: "https://www.linkedin.com/in/petertwild/",
            },
            {
              name: "Dejan Cabrilo",
              role: "Technical Partner",
              bio: "Former CTO of Theme Analytics. Over two decades building and scaling technology companies. Extensive AI & Crypto experience.",
              linkedin: "https://www.linkedin.com/in/dejan-cabrilo-715a411/",
            },
          ].map((p, i) => (
            <FadeIn key={p.name} delay={i * 0.08}>
              <div className="rounded-2xl p-7 card-surface border border-border">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-foreground">{p.name}</h3>
                  <a
                    href={p.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/30 hover:text-foreground/70 transition-colors"
                    aria-label={`${p.name} on LinkedIn`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
                <p className="text-sm text-indigo-400/70 mb-3">{p.role}</p>
                <p className="text-base text-foreground/40 leading-relaxed">{p.bio}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Contact ──────────────────────────────────────────────────────────── */
function Contact() {
  return (
    <section id="contact" className="py-14 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <FadeIn>
            <h2 className="text-4xl font-semibold tracking-tight text-foreground mb-3">
              Let&apos;s talk.
            </h2>
            <p className="text-base text-foreground/40">
              We take on a small number of clients at a time.
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <ContactForm />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ───────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-border px-6 py-5">
      <div className="max-w-5xl mx-auto flex justify-between items-center text-xs text-foreground/25">
        <span>© {new Date().getFullYear()} PTW Consulting LLC</span>
        <span>Miami, FL</span>
      </div>
    </footer>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Halo />
        <Services />
        <CaseStudy />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
