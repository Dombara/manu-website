import { motion } from "framer-motion";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AlarmClock,
  Aperture,
  Building2,
  Cpu,
  Factory,
  Gauge,
  GalleryHorizontal,
  MonitorDot,
  Radar,
  SatelliteDish,
  Settings2,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { QuoteModal } from "./QuoteModal";
import {
  getGetInTouchPath,
  isGetInTouchPath,
} from "../lib/utils";

interface InfraAutomationPageProps {
  onBackToHome: () => void;
}

const facilityShowcase = [
  { title: "Chemical Plants", image: "/inside-chemical-plant.png" },
  { title: "Airports", image: "/airport.png" },
  {
    title: "Smart Buildings",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
  },
  { title: "Synapse", image: "/Synapse.jpeg" },
  { title: "Oil & Gas Facilities", image: "/oil-gas.png" },
];

const capabilityCards = [
  {
    title: "Sensor Integration",
    icon: Radar,
    description:
      "Connect field sensors into a single, reliable monitoring layer for operational visibility.",
  },
  {
    title: "Actuator Control",
    icon: Settings2,
    description:
      "Coordinate actuator responses with rules that keep infrastructure systems stable and responsive.",
  },
  {
    title: "Pump Automation",
    icon: Gauge,
    description:
      "Automate pump operations for flow control, pressure consistency, and energy-aware dispatch.",
  },
  {
    title: "Motor Management",
    icon: Cpu,
    description:
      "Manage motors with orchestration logic that supports uptime, sequencing, and fault handling.",
  },
  {
    title: "Valve Communication",
    icon: Workflow,
    description:
      "Synchronize valve states and commands across distributed assets and process lines.",
  },
  {
    title: "Real-Time Monitoring",
    icon: MonitorDot,
    description:
      "Track live operating conditions and alert teams before issues become outages.",
  },
  {
    title: "Intelligent Orchestration",
    icon: SatelliteDish,
    description:
      "Coordinate devices, workflows, and site logic through one automation layer.",
  },
  {
    title: "Industrial Infrastructure Automation",
    icon: ShieldCheck,
    description:
      "Build resilient automation for critical environments that demand reliability and control.",
  },
];

const automationHighlights = [
  "Orchestration of motors",
  "Pump automation and control",
  "Valve communication systems",
  "Intelligent infrastructure management",
  "Remote monitoring and automation capabilities",
];

function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="text-center max-w-[860px] mx-auto">
      {eyebrow && (
        <div className="mb-4 font-inter text-[14px] md:text-[16px] tracking-[0.22em] uppercase text-[#ff6a6a]">
          {eyebrow}
        </div>
      )}
      <h2 className="font-inter font-semibold text-[28px] md:text-[40px] text-white mb-4">
        {title}
      </h2>
      <p className="font-inter font-normal text-[16px] md:text-[20px] leading-[26px] md:leading-[30px] text-[#e6ecf5]">
        {subtitle}
      </p>
    </div>
  );
}

function CapabilityCard({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: any;
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.22 }}
      className="rounded-2xl border border-[#404040] bg-white/[0.03] p-5 md:p-6 shadow-[0_12px_24px_rgba(0,0,0,0.25)] backdrop-blur-sm"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#ff0000]/10 text-[#ff4b4b]">
        <Icon size={24} />
      </div>
      <h3 className="font-inter font-semibold text-[18px] md:text-[22px] text-white mb-3">
        {title}
      </h3>
      <p className="font-inter font-normal text-[14px] md:text-[16px] leading-[24px] text-[#e6ecf5]">
        {description}
      </p>
    </motion.div>
  );
}

function HighlightPill({ label }: { label: string }) {
  return (
    <div className="flex min-h-[56px] items-center justify-center rounded-full border border-[#ff0000]/30 bg-[#ff0000]/8 px-4 py-2 font-inter text-[15px] text-[#f5f5f5] text-center leading-[1.35]">
      {label}
    </div>
  );
}

export function InfraAutomationPage({
  onBackToHome,
}: InfraAutomationPageProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const isQuoteOpen = isGetInTouchPath(location.pathname);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#121212] text-[#f5f5f5]">
      <header className="sticky top-0 z-50 border-b border-[#404040] bg-[rgba(18,18,18,0.95)] backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-4 md:px-6">
          <button
            onClick={onBackToHome}
            className="bg-transparent border-none p-0 outline-none"
          >
            <span className="block font-montserrat font-bold text-[26.4px] md:text-[33px] leading-[0.95] tracking-[-0.02em]">
              <span className="manu-brand block">MANU</span>
              <span className="robotics-brand block mt-0.5">Robotics</span>
            </span>
          </button>
          <button
            onClick={onBackToHome}
            className="rounded-lg border border-[#404040] bg-[#1a1a1a] px-4 py-2 font-inter text-[14px] text-[#f5f5f5] transition-colors hover:border-[#ff0000] hover:bg-[#232323] hover:text-[#ff0000] outline-none"
          >
            ← Back to Home
          </button>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="relative overflow-hidden px-4 pt-14 pb-16 md:px-6 md:pt-20 md:pb-24 min-h-[90vh] flex items-center">
          <div
            className="absolute inset-0 bg-no-repeat bg-top brightness-[0.95] blur-sm"
            style={{
              backgroundImage: `url(${facilityShowcase[3].image})`,
              backgroundSize: "contain",
              backgroundPosition: "top center",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent" />

          <div className="relative mx-auto max-w-[1440px] z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#ff6a6a]/50 bg-[#ff0000]/10 px-5 py-2 text-sm text-[#ff6a6a]">
                <Aperture size={18} />
                Synapse Platform
              </div>

              <div>
                <h1 className="font-inter font-semibold text-[52px] md:text-[72px] leading-[1.05] text-white mb-4">
                  Synapse
                </h1>
                <p className="text-2xl md:text-3xl text-[#e6ecf5] font-light">
                  Intelligent Infrastructure Automation Solutions Powered by
                  Synapse.
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#2d2d2d] border border-[#404040] rounded-2xl p-6 md:p-8 max-w-lg shadow-[0_12px_28px_rgba(0,0,0,0.45)]">
                <p className="text-[#e6ecf5] leading-relaxed text-[17px]">
                  Synapse is our flagship product that enables intelligent
                  monitoring, communication, orchestration, and automation
                  across critical infrastructure systems.
                </p>
              </div>
            </div>

            {/* Right Side - Visual */}
            {/* <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[680px] aspect-[16/10] rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
                <img
                  src="/Synapse.jpeg"
                  alt="Synapse PCB Unit"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-transparent" />
              </div>
            </div> */}
          </div>
        </section>

        {/* PRODUCT OVERVIEW SECTION */}
        <section className="relative px-4 py-16 md:px-6 md:py-24">
          <div className="relative mx-auto max-w-[1200px]">
            <div className="relative rounded-3xl border border-white/10 bg-black/70 backdrop-blur-2xl p-10 md:p-20 shadow-2xl overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-[0.45]"
                style={{ backgroundImage: `url(${facilityShowcase[2].image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black/90" />

              <div className="relative z-10 text-center mb-12">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#ff6a6a]/40 bg-[#ff0000]/10 px-6 py-2 font-inter text-sm uppercase tracking-[0.12em] text-[#ff6a6a] mb-8">
                  PRODUCT OVERVIEW
                </div>
                <h2 className="font-inter font-semibold text-5xl md:text-6xl text-white mb-8 leading-tight">
                  Synapse for critical systems
                </h2>
                <p className="font-inter text-xl md:text-2xl leading-relaxed text-[#e6ecf5] max-w-4xl mx-auto">
                  Synapse brings monitoring, communication, orchestration, and
                  automation together so infrastructure teams can coordinate
                  devices and workflows without losing visibility or control.
                </p>
              </div>

              <div className="relative z-10 flex flex-wrap justify-center gap-4">
                {automationHighlights.map((item, index) => (
                  <HighlightPill key={index} label={item} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* INTEGRATION + ORCHESTRATION SECTIONS */}
        <section className="px-4 py-8 md:px-6 md:py-12 space-y-8">
          {/* Seamless Integration Section */}
          <div className="relative mx-auto max-w-[1440px] rounded-3xl border border-[#404040] bg-white/[0.03] p-5 md:p-8 shadow-[0_14px_28px_rgba(0,0,0,0.25)] backdrop-blur-sm min-h-[520px] flex flex-col">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${facilityShowcase[0].image})`,
                opacity: 0.35,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />

            <div className="relative z-10 flex-1 flex flex-col">
              <div className="mb-5 flex items-center gap-3 text-[#ff5d5d]">
                <Factory size={20} />
                <span className="font-inter text-[14px] uppercase tracking-[0.18em]">
                  Sensor & Actuator Integration
                </span>
              </div>
              <h2 className="font-inter font-semibold text-[24px] md:text-[32px] text-white mb-4">
                Seamless integration for real-time operational control
              </h2>
              <p className="font-inter font-normal text-[16px] md:text-[18px] leading-[26px] md:leading-[30px] text-[#e6ecf5] mb-8">
                Synapse connects sensors and actuators into a unified control
                fabric so teams can monitor asset health, automate responses,
                and coordinate infrastructure in real time.
              </p>
              <div className="rounded-2xl border border-[#404040] bg-[#232323]/70 p-4 md:p-5 mt-auto">
                <div className="font-inter font-semibold text-[16px] md:text-[18px] text-white mb-3">
                  Common deployment environments
                </div>
                <ul className="space-y-3">
                  {[
                    "Chemical Plants",
                    "Airports",
                    "Smart Buildings with Water Management Systems",
                    "Industrial Infrastructure",
                    "ONGC / Oil & Gas facilities",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 font-inter text-[14px] md:text-[15px] text-[#e6ecf5]"
                    >
                      <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#ff4b4b]" />
                      <span className="leading-[1.45]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Orchestration Section */}
          <div className="relative mx-auto max-w-[1440px] rounded-3xl border border-[#404040] bg-white/[0.03] p-5 md:p-8 shadow-[0_14px_28px_rgba(0,0,0,0.25)] backdrop-blur-sm min-h-[520px] flex flex-col">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${facilityShowcase[4].image})`,
                opacity: 0.35,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />

            <div className="relative z-10 flex-1 flex flex-col">
              <div className="mb-5 flex items-center gap-3 text-[#ff5d5d]">
                <Gauge size={20} />
                <span className="font-inter text-[14px] uppercase tracking-[0.18em]">
                  Motor, Pumps & Valves Automation
                </span>
              </div>
              <h2 className="font-inter font-semibold text-[24px] md:text-[32px] text-white mb-4">
                Built for orchestration and remote control
              </h2>
              <p className="font-inter font-normal text-[16px] md:text-[18px] leading-[26px] md:leading-[30px] text-[#e6ecf5] mb-8">
                Synapse supports orchestration of motors, pump automation and
                control, valve communication systems, and remote monitoring.
              </p>
              <div className="space-y-4 mt-auto">
                {[
                  {
                    icon: AlarmClock,
                    title: "Remote Monitoring",
                    description: "Observe system behavior from anywhere.",
                  },
                  {
                    icon: Building2,
                    title: "Infrastructure Management",
                    description: "Coordinate assets across sites.",
                  },
                  {
                    icon: GalleryHorizontal,
                    title: "Operational Visibility",
                    description:
                      "Keep critical systems aligned with live status.",
                  },
                ].map(({ icon: Icon, title, description }) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-[#404040] bg-[#232323]/70 p-4"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ff0000]/10 text-[#ff4b4b]">
                        <Icon size={22} />
                      </div>
                      <div>
                        <h3 className="font-inter font-semibold text-[18px] md:text-[20px] text-white mb-2">
                          {title}
                        </h3>
                        <p className="font-inter text-[14px] md:text-[16px] leading-[24px] text-[#e6ecf5]">
                          {description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CORE CAPABILITIES SECTION */}
        <section className="relative px-4 py-8 md:px-6 md:py-12 pb-20">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-[0.35]"
            style={{ backgroundImage: `url(${facilityShowcase[1].image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#121212]/70 to-[#121212]" />

          <div className="relative mx-auto max-w-[1440px] rounded-3xl border border-[#404040] bg-white/[0.03] p-5 md:p-8 shadow-[0_14px_28px_rgba(0,0,0,0.25)] backdrop-blur-sm">
            <SectionTitle
              eyebrow="Infrastructure Automation Features"
              title="Core capability layers"
              subtitle="These feature areas reflect how Synapse is designed to support critical infrastructure."
            />
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {capabilityCards.map((card) => (
                <CapabilityCard key={card.title} {...card} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <button
        type="button"
        onClick={() => {
          if (!isQuoteOpen) navigate(getGetInTouchPath(location.pathname));
        }}
        style={{ backgroundColor: "#ff0000" }}
        className="fixed bottom-6 right-6 z-50 rounded-full border-0 px-6 py-3 md:px-8 md:py-4 min-w-[200px] text-center font-inter text-[16px] md:text-[18px] font-semibold text-white transition-all duration-300 hover:brightness-90"
      >
        Get in Touch
      </button>

      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => navigate(-1)}
        preselectedProduct="Synapse"
      />
    </div>
  );
}
