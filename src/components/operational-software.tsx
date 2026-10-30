import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Target,
  Users,
  Eye,
  Workflow,
  ClipboardCheck,
  Layers,
} from "lucide-react";
import { QuoteModal } from "./QuoteModal";
import {
  getGetInTouchPath,
  isGetInTouchPath,
} from "../lib/utils";

export const CROSSCHECK_PAGE_ROUTE = "/operational-software";

interface CrossCheckPageProps {
  onBackToHome: () => void;
}

const keyCapabilities = [
  {
    title: "SOP & Sequence Verification",
    icon: ClipboardCheck,
    description:
      "Verifies critical process steps are completed in the correct order, at the correct location, by the correct person — before failures occur.",
  },
  {
    title: "Visual + Sensor Proof",
    icon: Eye,
    description:
      "Uses computer vision and multi-source sensors to confirm that submitted evidence actually proves the task was done correctly.",
  },
  {
    title: "Multi-Source Cross-Verification",
    icon: Layers,
    description:
      "Combines images, sensors, location, machine state, and operator identity to deliver conclusive proof that a manual task was completed correctly.",
  },
  {
    title: "Quality Control",
    icon: Users,
    description:
      "Computer vision and geolocation to verify housekeeping, patrols, and third-party work.",
  },
  {
    title: "Digital Twin Operations",
    icon: Eye,
    description:
      "Unified real-time view of infrastructure, operational, and risk health.",
  },
  {
    title: "Closed-Loop Maintenance",
    icon: Workflow,
    description:
      "From anomaly detection to verified resolution with full audit trail.",
  },
];

const industries = [
  "Manufacturing",
  "Healthcare",
  "Energy",
  "Hospitality",
  "Construction",
  "NGOs",
  "Pharma",
  "Life Sciences",
  "Utilities",
  "Food Processing",
  "Warehouses",
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
        <div className="mb-4 font-inter text-[14px] md:text-[16px] tracking-[0.22em] uppercase text-[#14B8A6]">
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
      whileHover={{ y: -4 }}
      transition={{ duration: 0.22 }}
      className="rounded-2xl border border-[#334155] bg-white/[0.03] p-6 md:p-8 shadow-[0_12px_24px_rgba(0,0,0,0.25)] backdrop-blur-sm"
    >
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#14B8A6]/10 text-[#14B8A6]">
        <Icon size={28} />
      </div>
      <h3 className="font-inter font-semibold text-[20px] md:text-[24px] text-white mb-3">
        {title}
      </h3>
      <p className="font-inter text-[15px] md:text-[17px] leading-relaxed text-[#e6ecf5]">
        {description}
      </p>
    </motion.div>
  );
}

export function CrossCheckPage({ onBackToHome }: CrossCheckPageProps) {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isQuoteOpen = isGetInTouchPath(location.pathname);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      setIsAtBottom(scrollPosition >= pageHeight - 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#0a0a0a] text-[#f5f5f5]">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-[#1f2937] bg-[rgba(10,10,10,0.95)] backdrop-blur-2xl">
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
            className="rounded-lg border border-[#334155] bg-[#1a1a1a] px-4 py-2 font-inter text-[14px] text-[#f5f5f5] transition-colors hover:border-[#ff0000] hover:bg-[#232323] hover:text-[#ff0000]"
          >
            ← Back to Home
          </button>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="relative overflow-hidden px-4 pt-14 pb-16 md:px-6 md:pt-20 md:pb-24 min-h-[88vh] flex items-center">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-top bg-no-repeat brightness-90 blur-sm"
            style={{ backgroundImage: `url('/crosscheck2.png')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/10 via-slate-950/10 to-slate-950/20" />

           <div className="relative mx-auto max-w-[1440px] z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left Content - Introduction with Logo */}
               <div className="space-y-6 pl-4 md:pl-8">
               <div className="inline-flex items-center gap-2 rounded-full border border-[#14B8A6]/50 bg-[#14B8A6]/10 px-5 py-2 text-sm text-[#14B8A6]">
                 <Target size={18} />
                 Crosscheck Platform
               </div>
               <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                 <img
                   src="/crosschecklogo.png"
                   alt="CrossCheck Logo"
                   className="w-28 h-28 md:w-36 md:h-36"
                 />
                 <h1 className="font-inter font-semibold text-[52px] md:text-[72px] leading-[1.05] text-white">
                   CrossCheck
                 </h1>
               </div>

               <p className="text-2xl md:text-3xl text-[#e6ecf5] font-light">
                 Continuous Operations. Continuous Verification.
               </p>
               <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-8 max-w-lg">
                 <p className="text-base md:text-lg text-[#e6ecf5]/90">
                   CrossCheck is the flagship platform that transforms manual
                   work into verified, auditable, and controllable processes —
                   across every critical workflow.
                 </p>
               </div>
             </div>

             {/* Right Side - Empty / Visual Space */}
             <div />
           </div>
        </section>

        {/* OVERVIEW SECTION */}
        <section className="px-4 py-16 md:px-6 md:py-24 bg-[#111827]">
          <div className="max-w-[1100px] mx-auto">
            <SectionTitle
              eyebrow="THE PROOF LAYER"
              title="From logging to verified execution"
              subtitle="CrossCheck continuously verifies manual tasks, detects deviations, and closes the loop — turning unverified work into trusted, auditable proof."
            />

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Verify", desc: "Physical reality, not just reports" },
                {
                  label: "Reason",
                  desc: "Detects missing steps, wrong sequences & deviations",
                },
                {
                  label: "Act",
                  desc: "Blocks workflows, assigns rework & closes exceptions",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-[#1f2937] border border-[#334155] rounded-3xl p-8 text-center"
                >
                  <div className="text-4xl font-semibold text-[#14B8A6] mb-3">
                    {item.label}
                  </div>
                  <p className="text-[#e6ecf5]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CORE CAPABILITIES */}
        <section className="relative px-4 py-16 md:py-24 bg-[#0a0a0a]">
          <div className="mx-auto max-w-[1440px]">
            <SectionTitle
              eyebrow="POWERFUL CAPABILITIES"
              title="What CrossCheck delivers"
              subtitle="Autonomous operations with continuous verification and intelligence."
            />

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {keyCapabilities.map((card) => (
                <CapabilityCard key={card.title} {...card} />
              ))}
            </div>
          </div>
        </section>

        {/* INDUSTRIES */}
        <section className="px-4 py-16 md:py-24 bg-[#111827]">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-inter font-semibold text-3xl md:text-4xl text-white mb-4">
                Anywhere critical manual work must be verified
              </h2>
              <p className="text-xl text-[#e6ecf5]">
                Scalable across every sector that demands verified execution and
                operational proof.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {industries.map((industry, idx) => (
                <div
                  key={idx}
                  className="px-6 py-3 rounded-full border border-[#14B8A6]/30 bg-[#1f2937] text-[#f5f5f5] hover:bg-[#14B8A6]/10 hover:border-[#14B8A6] transition-all"
                >
                  {industry}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="relative px-4 py-20 md:py-28 text-center bg-[#0a0a0a]">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-inter font-semibold text-3xl md:text-4xl text-white mb-6 tracking-wide max-w-5xl">
              CrossCheck is the system of proof for manual work.
            </h2>
          </div>
        </section>
      </main>
      <button
        type="button"
        onClick={() => {
          if (!isQuoteOpen) navigate(getGetInTouchPath(location.pathname));
        }}
        style={{ backgroundColor: "#14B8A6" }}
        className={`fixed bottom-6 z-50 rounded-full border border-[#14B8A6] bg-[#14B8A6] px-10 py-6 md:px-12 md:py-6 min-w-[260px] text-center font-inter text-[20px] md:text-[22px] font-semibold text-white shadow-[0_30px_80px_rgba(20,184,166,0.35)] transition-all duration-600 ease-in-out transform ${
          isAtBottom
            ? "left-1/2 right-auto -translate-x-1/2"
            : "right-6 left-auto"
        } hover:brightness-95`}
      >
        Get in Touch
      </button>

      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => navigate(-1)}
        preselectedProduct="CrossCheck"
      />
    </div>
  );
}

export default CrossCheckPage;
