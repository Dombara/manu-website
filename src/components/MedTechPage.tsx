import { motion } from "framer-motion";
import { useEffect } from "react";
import {
  Activity,
  Droplets,
  HeartPulse,
  Monitor,
  ShieldAlert,
  Syringe,
  Wind,
} from "lucide-react";

interface MedTechPageProps {
  onBackToHome: () => void;
}

const medtechProducts = [
  {
    title: "Patient Monitor",
    description:
      "Continuous bedside monitoring for vital signs, alarms, and reliable clinical oversight in high-acuity care environments.",
    image: "/Patient_Monitor.jpeg",
    icon: Monitor,
  },
  {
    title: "ECG Machine",
    description:
      "Precise cardiac signal capture for fast diagnostics, streamlined workflows, and dependable cardiovascular assessments.",
    image: "/ECG.jpeg",
    icon: HeartPulse,
  },
  {
    title: "Infusion Pump",
    description:
      "Controlled fluid delivery for medication administration, dose accuracy, and dependable treatment continuity.",
    image: "/infusion_pump.jpeg",
    icon: Droplets,
  },
  {
    title: "Syringe Pump",
    description:
      "Accurate micro-dose infusion for critical medications with tightly managed delivery and dependable safety control.",
    image: "/syringe_pump.jpeg",
    icon: Syringe,
  },
  {
    title: "Defibrillator",
    description:
      "Emergency rhythm response device for rapid analysis and life-saving intervention in critical care moments.",
    image: "/Defibrillator.jpeg",
    icon: ShieldAlert,
  },
  {
    title: "Ventilator",
    description:
      "Advanced respiratory support with dependable control, monitoring, and patient-centric care delivery.",
    image: "/ventilator.jpeg",
    icon: Wind,
  },
  {
    title: "Mechanical CPR (mCPR) Devices",
    description:
      "Automated chest compression devices providing consistent, high-quality CPR during cardiac arrest resuscitation.",
    image: "/MCPR.jpeg",
    icon: Activity,
  },
];

export function MedTechPage({ onBackToHome }: MedTechPageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <div className="min-h-screen w-screen bg-[#121212] text-[#f5f5f5]">
      <header className="sticky top-0 z-50 border-b border-[#404040] bg-[rgba(18,18,18,0.95)] backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-4 md:px-6">
          <button
            onClick={onBackToHome}
            className="bg-transparent border-none p-0 outline-none"
          >
            <span className="font-montserrat font-bold text-[22px] md:text-[28px] text-[#ff0000] tracking-[-0.02em]">
              MANU
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
        {/* Updated Starting Section - Greyish Blurred Background */}
        <section className="relative overflow-hidden px-4 pt-14 pb-20 md:px-6 md:pt-20 md:pb-28 min-h-[85vh] flex items-center bg-white/5 backdrop-blur-xl">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-[0.65] filter blur-sm"
            style={{ backgroundImage: "url('/Medtechpic.jpeg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-slate-900/10 to-transparent" />

          <div className="relative mx-auto max-w-[1440px] z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Side - Introduction Text */}
              <div className="max-w-2xl">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#ff6a6a]/50 bg-[#ff0000]/10 px-5 py-2 text-sm text-[#ff6a6a]">
                  MedTech Division
                </div>

                <h1 className="font-inter font-semibold text-[48px] md:text-[68px] leading-[1.05] text-white mb-8">
                  MedTech
                </h1>

                <div className="prose prose-invert max-w-none text-[#e6ecf5] text-lg leading-relaxed">
                  <p>
                    Designing systems for the body demands the kind of precision
                    that only high fidelity Robotics can provide. We are
                    pioneering healthcare systems and autonomous medical tools
                    that respond to the physiology of the patient in real time.
                  </p>
                  <p className="mt-6">
                    We're currently building systems for surgical rooms,
                    ambulatory care, and field deployment.
                  </p>
                  <p className="mt-6">
                    Medtech focuses on technology for healthcare environments,
                    building patient-centric systems that emphasize precision,
                    safety, and clinical usability.
                  </p>
                </div>
              </div>

              {/* Right Side - Bullet Points */}
              <div className="lg:pt-12">
                <div className="space-y-6">
                  {[
                    "Healthcare-grade engineering for medical workflows and care delivery.",
                    "System design focused on usability, compliance-readiness, and reliability.",
                    "Integrated data and device experiences for clinicians and operations teams.",
                    "Scalable platforms that support innovation across diagnostic and care settings.",
                  ].map((point, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-[#ff4b4b]" />
                      <p className="text-[#e6ecf5] text-[17px] leading-relaxed">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MedTech Products */}
        <section className="px-4 py-16 md:px-6 md:py-20 bg-[#121212]">
          <div className="max-w-[1440px] mx-auto">
            <h2 className="text-center font-inter font-semibold text-4xl md:text-5xl text-white mb-12">
              MedTech Products
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {medtechProducts.map((product) => (
                <motion.div
                  key={product.title}
                  whileHover={{ y: -8 }}
                  className="group rounded-2xl overflow-hidden border border-[#404040] bg-[#1a1a1a] transition-all"
                >
                  <div
                    className="h-64 md:h-72 bg-cover bg-center"
                    style={{ backgroundImage: `url(${product.image})` }}
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <product.icon size={28} className="text-[#ff4b4b]" />
                      <h3 className="font-inter font-semibold text-xl text-white">
                        {product.title}
                      </h3>
                    </div>
                    <p className="text-[#e6ecf5] text-[15px] leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <button
        type="button"
        style={{ backgroundColor: "#ff0000" }}
        className="fixed bottom-6 right-6 z-50 rounded-full border-0 px-6 py-3 md:px-8 md:py-4 min-w-[200px] text-center font-inter text-[16px] md:text-[18px] font-semibold text-white transition-all duration-300 hover:brightness-90"
      >
        Get in Touch
      </button>
    </div>
  );
}
