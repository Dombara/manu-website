import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Linkedin, Mail, Phone } from "lucide-react";
import { ContactPage } from "./components/ContactPage";
import { InfraAutomationPage } from "./components/InfraAutomationPage";
// import { MedTechPage } from "./components/MedTechPage";
import { HiringPage } from "./components/HiringPage";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { CROSSCHECK_PAGE_ROUTE, CrossCheckPage } from "./components/operational-software";
import { Toaster } from "./components/ui/sonner";
import { getGetInTouchPath } from "./lib/utils";
import AquaGridApp from "./Aquagrid/AquaGridApp";
import "./styles/global.css";

// Navigation Component
function Navigation({
  onInfraAutomationClick,
  onRequestDemoClick,
  // onMedTechClick,
  onOperationalClick,
  scrollToSection,
  activeNav,
}: {
  onHiringClick: () => void;
  onInfraAutomationClick: () => void;
  onRequestDemoClick: () => void;
  // onMedTechClick: () => void;
  onOperationalClick: () => void;
  scrollToSection: (sectionId: string, label: string) => void;
  activeNav: string;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", sectionId: "about" },
    { label: "Operational Software", action: onOperationalClick },
    { label: "Infra Automation", action: onInfraAutomationClick },
    // { label: "MedTech", action: onMedTechClick },
    // { label: "Hiring", action: onHiringClick },
  ];

  const handleNavClick = (item: (typeof navItems)[0]) => {
    if (item.sectionId) {
      scrollToSection(item.sectionId, item.label.toLowerCase());
    } else if (item.action) {
      item.action();
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 py-1.5 px-4 md:px-6">
        <div className="mx-auto max-w-[1480px] rounded-full border border-transparent bg-[#121212]/55 backdrop-blur-2xl">
          <div className="flex items-center h-12 md:h-16 px-4 md:px-8 gap-3 md:gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => scrollToSection("about", "home")}
              className="mr-4 md:mr-8 shrink-0 bg-transparent border-none p-0 outline-none focus:outline-none focus:ring-0 hover:border-transparent"
            >
<span className="block font-montserrat font-bold text-[26.4px] md:text-[33px] leading-none tracking-[-0.02em]">
                <span className="manu-brand block">
                  MANU
                </span>
                <span className="robotics-brand block mt-1">
                  Robotics
                </span>
              </span>
            </motion.button>

            <div className="hidden md:flex flex-1 min-w-0 items-center justify-center gap-5 lg:gap-7 text-[15px] lg:text-[16px]">
              {navItems.map((item) => (
                <motion.button
                  key={item.label}
                  whileHover={{ scale: 1.08 }}
                  onClick={() => handleNavClick(item)}
                  className={`min-w-max whitespace-nowrap p-0 font-inter font-normal transition-colors bg-transparent border-none outline-none focus:outline-none focus:ring-0 hover:border-transparent hover:text-[#ff0000] ${
                    item.label === "Infra Automation"
                      ? "text-[#e6ecf5] hover:text-[#ff0000]"
                      : activeNav === item.label.toLowerCase()
                        ? "text-[#ff0000]"
                        : "text-[#e6ecf5]"
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            <div className="flex shrink-0 items-center gap-3 md:gap-4 ml-auto">
              {/* Desktop Demo Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onRequestDemoClick}
                className="hidden md:flex rounded-lg bg-[#cc0000] px-4 lg:px-5 py-2.5 font-inter font-normal text-[15px] lg:text-[16px] text-white transition-colors hover:bg-[#ff2222] outline-none items-center whitespace-nowrap"
              >
                Request Demo
              </motion.button>

              {/* Mobile Hamburger Menu */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden flex flex-col justify-center items-center w-8 h-8 bg-transparent border-none outline-none focus:outline-none"
              >
                <span
                  className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-1"}`}
                ></span>
                <span
                  className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`}
                ></span>
                <span
                  className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-1"}`}
                ></span>
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />

            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-[#121212]/95 backdrop-blur-2xl border-l border-[#404040] z-50 md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-[#404040]">
                <span className="block font-montserrat font-bold text-[22px] tracking-[-0.02em] leading-[0.95]">
                  <span className="manu-brand block">
                    MANU
                  </span>
                  <span className="robotics-brand block mt-0.5">
                    Robotics
                  </span>
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-8 h-8 flex items-center justify-center bg-transparent border-none outline-none focus:outline-none"
                >
                  <span className="block w-5 h-0.5 bg-white rotate-45 translate-y-0.5"></span>
                  <span className="block w-5 h-0.5 bg-white -rotate-45 -translate-y-0.5"></span>
                </button>
              </div>

              <div className="flex-1 flex flex-col p-6">
                <div className="space-y-6">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleNavClick(item)}
                      className={`block w-full text-left font-inter font-normal text-[20px] leading-[1.25] transition-colors bg-transparent border-none outline-none focus:outline-none hover:text-[#ff0000] ${
                        item.label === "Infra Automation"
                          ? "text-[#e6ecf5] hover:text-[#ff0000]"
                          : activeNav === item.label.toLowerCase()
                            ? "text-[#ff0000]"
                            : "text-[#e6ecf5]"
                      }`}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-[#404040]">
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    onClick={() => {
                      onRequestDemoClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full rounded-lg bg-[#cc0000] px-6 py-4 font-inter font-normal text-[18px] text-white transition-colors hover:bg-[#cc0000] outline-none"
                  >
                    Request Demo
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// Hero Section - WE and ARE use gray gradient, MANU uses red gradient
// EDITED VERSION: Text + button moved higher on mobile (starts near top-left instead of bottom)
function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  return (
    <motion.section
      id="hero"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="relative h-[700px] md:h-[700px] bg-gradient-to-b from-[#121212] via-[#1c1c1c] to-[#2a2a2a] overflow-hidden"
    >
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      >
        <source
          src="/mergevid4.mp4"
          type="video/mp4"
          media="(min-width: 768px)"
        />
        <source src="/mergevidmobile.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/35" />
      <div className="relative max-w-[1440px] mx-auto px-4 md:px-6 h-full">
        {/* ONLY THIS DIV WAS CHANGED to push content higher on mobile */}
        <div className="relative h-full flex flex-col justify-start pt-16 xs:pt-20 sm:pt-28 md:pt-20 pl-4 md:pl-6">
          <div className="flex flex-col items-start gap-4 md:gap-6 text-left w-full md:w-auto">
            <motion.div
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={fadeInVariants}
            >
              <span
                className="font-['Inter:Medium',_sans-serif] font-medium text-[60px] sm:text-[56px] md:text-[80px] lg:text-[96px] leading-[0.95]"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg,rgb(255, 255, 255) 0%, rgb(169, 169, 172) 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                WE
              </span>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={{
                ...fadeInVariants,
                visible: { opacity: 1, transition: { duration: 1, delay: 1 } },
              }}
            >
              <span
                className="font-['Inter:Medium',_sans-serif] font-medium text-[60px] sm:text-[56px] md:text-[80px] lg:text-[96px] leading-[0.95]"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg,rgb(255, 255, 255) 0%, rgb(169, 169, 172) 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                ARE
              </span>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={{
                ...fadeInVariants,
                visible: { opacity: 1, transition: { duration: 1, delay: 2 } },
              }}
            >
              <span
                className="font-montserrat font-bold text-[70px] sm:text-[56px] md:text-[80px] lg:text-[96px] leading-[0.95] gradient-text tracking-[-0.02em]"
                style={{ display: "inline-block" }}
              >
                MANU
              </span>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                document
                  .getElementById("products")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              initial={{ opacity: 0, y: 12 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.6, delay: 3.8 }}
              className="mt-0.5 md:mt-8 rounded-lg border border-[#ffffff]/35 bg-white/[0.08] px-4 md:px-6 py-2 md:py-3 font-inter font-normal text-[18px] md:text-[20px] text-white backdrop-blur-md transition-colors hover:bg-white/[0.16] outline-none"
            >
              Explore our products
            </motion.button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

// About Us Section - commented out
function AboutUsSection() {
  return <></>;
}

// Products Section
function ProductsSection({
  onInfraAutomationClick,
  onOperationalClick,
  // onMedTechClick,
}: {
  onInfraAutomationClick: () => void;
  onOperationalClick: () => void;
  // onMedTechClick: () => void;
}) {
  return (
    <motion.section
      id="products"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-transparent py-20"
    >
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <div className="font-inter font-semibold text-[24px] md:text-[43px] text-white mb-4">
            Our{" "}
            <span className="font-montserrat font-bold text-[24px] md:text-[43px] gradient-text">
              Products
            </span>
          </div>
          <div className="font-inter font-normal text-[15px] md:text-[18px] text-[#f5f5f5] max-w-[800px] mx-auto leading-[24px] md:leading-[28px]">
            Showcase of our recent work.
          </div>
        </div>

        <div className="mx-auto grid max-w-[1056px] grid-cols-1 gap-8 items-stretch md:grid-cols-2">
          {/* Crosscheck Tile */}
          <motion.div
            id="product-crosscheck"
            layout
            whileHover={{ scale: 1.05 }}
            className="flex aspect-[4/3] w-full flex-col overflow-hidden rounded-2xl border border-[#404040] bg-white/[0.03] shadow-[0_10px_20px_rgba(0,0,0,0.3)] backdrop-blur-sm transition-transform duration-200 cursor-pointer"
            onClick={onOperationalClick}
          >
            <motion.img
              src="/crosscheckthumbail1.jpeg"
              alt="Crosscheck project"
              className="h-2/3 w-full flex-shrink-0 object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
            <div className="flex flex-1 min-h-0 items-center justify-center p-3 md:p-10 text-center">
              <div className="w-full font-inter font-semibold text-[21.63px] md:text-[23.69px] text-[#cc0000] text-center">
                Crosscheck
              </div>
            </div>
          </motion.div>

          {/* Synapse Tile - Now identical structure to Crosscheck */}
          <motion.div
            id="product-synapse"
            layout
            whileHover={{ scale: 1.05 }}
            className="flex aspect-[4/3] w-full flex-col overflow-hidden rounded-2xl border border-[#404040] bg-white/[0.03] shadow-[0_10px_20px_rgba(0,0,0,0.3)] backdrop-blur-sm transition-transform duration-200 cursor-pointer"
            onClick={onInfraAutomationClick}
          >
            <motion.img
              src="/Synapse.jpeg"
              alt="Synapse project"
              className="h-2/3 w-full flex-shrink-0 object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
            <div className="flex flex-1 min-h-0 items-center justify-center p-3 md:p-4 text-center">
              <div className="w-full font-inter font-semibold text-[21.63px] md:text-[23.69px] text-[#cc0000] text-center">
                Synapse
              </div>
            </div>
          </motion.div>

          {/* MedTech Tile */}
          {/* <motion.div
            id="product-medtech"
            layout
            whileHover={{ scale: 1.05 }}
            className="flex aspect-square w-full flex-col overflow-hidden rounded-2xl border border-[#404040] bg-white/[0.03] shadow-[0_10px_20px_rgba(0,0,0,0.3)] backdrop-blur-sm transition-transform duration-200 cursor-pointer"
            onClick={onMedTechClick}
          >
            <motion.img
              src="/Medtechimg2.jpeg"
              alt="MedTech project"
              className="h-2/3 w-full flex-shrink-0 object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
            <div className="flex flex-1 min-h-0 items-center justify-center p-3 md:p-4 text-center">
              <div className="w-full font-inter font-semibold text-[21px] md:text-[23px] text-[#cc0000] text-center">
                MedTech
              </div>
            </div>
          </motion.div> */}
        </div>
      </div>
    </motion.section>
  );
}
// Footer Section
function Footer({
  onAboutClick,
  onPrivacyClick,
  scrollToSection,
}: {
  onAboutClick: () => void;
  onPrivacyClick: () => void;
  scrollToSection: (sectionId: string, label: string) => void;
}) {
  const footerLinkClasses =
    "block bg-transparent border-none p-0 text-left font-inter font-normal text-[16.58px] md:text-[17.77px] text-[#f5f5f5] hover:text-white transition-colors outline-none focus:outline-none focus:ring-0 focus-visible:outline-none";
  const productFooterLinkClasses =
    "block bg-transparent border-none p-0 text-left font-inter font-normal text-[16.58px] md:text-[17.77px] text-[#f5f5f5] hover:text-white transition-colors outline-none focus:outline-none focus:ring-0 focus-visible:outline-none";

  return (
    <motion.footer
      id="contact"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-[linear-gradient(to_bottom,#121212,#1c1c1c,#2a2a2a)] border-t border-[#404040] py-16"
    >
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => scrollToSection("about", "home")}
              className="bg-transparent border-none p-0 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none"
            >
<span className="block font-montserrat font-bold text-[33px] md:text-[45px] tracking-[-0.02em] leading-[0.95] shrink-0">
                  <span className="manu-brand block">
                    MANU
                  </span>
                  <span className="robotics-brand block mt-0.5">
                    Robotics
                  </span>
                </span>
            </motion.button>
            <div
              id="request-demo-final-anchor"
              className="h-0 w-0 mt-5"
              aria-hidden="true"
            />
            <div
              id="request-demo-final-anchor"
              className="h-0 w-0 mt-5"
              aria-hidden="true"
            />
          </div>

          <div>
            <div className="font-inter font-semibold text-[20px] md:text-[25px] text-white mb-3 md:mb-4">
              Products
            </div>
            <div className="-translate-x-[7%] -translate-y-[10%] space-y-2 font-inter font-normal text-[16.58px] md:text-[17.77px] text-[#f5f5f5]">
              <motion.button
                whileHover={{ x: 4 }}
                onClick={() =>
                  scrollToSection("product-crosscheck", "products")
                }
                className={productFooterLinkClasses}
              >
                • Crosscheck
              </motion.button>
              <motion.button
                whileHover={{ x: 4 }}
                onClick={() => scrollToSection("product-synapse", "products")}
                className={productFooterLinkClasses + " -translate-y-[40%]"}
              >
                • Synapse
              </motion.button>
              {/* MedTech footer link */}
              {/* <motion.button
                whileHover={{ x: 4 }}
                onClick={() =>
                  scrollToSection("product-medtech", "products")
                }
                className="block bg-transparent border-none p-0 text-left font-inter font-normal text-[14px] md:text-[15px] text-[#f5f5f5] hover:text-white transition-colors outline-none"
              >
                • MedTech
              </motion.button> */}
            </div>
          </div>

          <div>
            <div className="font-inter font-semibold text-[20px] md:text-[25px] text-white mb-3 md:mb-4">
              Company
            </div>
            <div className="-translate-x-[7%] -translate-y-[10%] space-y-2 font-inter font-normal text-[16.58px] md:text-[17.77px] text-[#f5f5f5]">
              <motion.button
                whileHover={{ x: 4 }}
                onClick={onAboutClick}
                className={footerLinkClasses}
              >
                • About
              </motion.button>
              <motion.button
                whileHover={{ x: 4 }}
                onClick={onPrivacyClick}
                className={footerLinkClasses + " -translate-y-[40%]"}
              >
                • Privacy Policy
              </motion.button>
            </div>
          </div>

          <div>
            <div className="font-inter font-semibold text-[20px] md:text-[25px] text-white mb-3 md:mb-4">
              Contact Us
            </div>
            <div className="flex flex-col items-start gap-3 font-inter text-[14.09px] md:text-[15.10px]">
              <a
                href="mailto:main@manurobotics.com"
                aria-label="Email Manu Robotics"
                title="Email Manu Robotics"
                className="flex items-center gap-2 !text-white hover:!text-white transition-colors outline-none focus:outline-none focus:ring-0 focus-visible:outline-none"
              >
                <Mail size={17} className="text-[#cc0000]" aria-hidden="true" />
                <span className="!text-white">main@manurobotics.com</span>
              </a>
              <a
                href="tel:+917841064877"
                aria-label="Call Manu Robotics"
                title="Call Manu Robotics"
                className="flex items-center gap-2 !text-white hover:!text-white transition-colors outline-none focus:outline-none focus:ring-0 focus-visible:outline-none"
              >
                <Phone size={17} className="text-[#cc0000]" aria-hidden="true" />
                <span className="!text-white">+917841064877</span>
              </a>
              <a
                href="https://www.linkedin.com/company/manurobotics/"
                target="_blank"
                rel="noreferrer"
                aria-label="Visit Manu Robotics on LinkedIn"
                title="Visit Manu Robotics on LinkedIn"
                className="flex items-center gap-2 !text-white hover:!text-white transition-colors outline-none focus:outline-none focus:ring-0 focus-visible:outline-none"
              >
                <Linkedin size={17} className="text-[#cc0000]" aria-hidden="true" />
                <span className="!text-white">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeNav, setActiveNav] = useState("home");

  useEffect(() => {
    if (location.pathname !== "/") {
      return;
    }

    const trackedSections = [
      { id: "about", nav: "home" },
      // { id: "medtech", nav: "medtech" },
      { id: "aboutus", nav: "about us" },
    ];

    const updateActiveSection = () => {
      const activationOffset = 180;
      let nextActiveNav = "home";

      for (const section of trackedSections) {
        const sectionElement = document.getElementById(section.id);
        if (!sectionElement) {
          continue;
        }

        const top = sectionElement.getBoundingClientRect().top;
        if (top <= activationOffset) {
          nextActiveNav = section.nav;
        }
      }

      setActiveNav((previousNav) =>
        previousNav === nextActiveNav ? previousNav : nextActiveNav,
      );
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [location.pathname]);

  const handleContactClick = () => navigate(getGetInTouchPath(location.pathname));
  const handleHiringClick = () => {
    navigate("/hiring");
    setActiveNav("hiring");
  };
  const handleInfraAutomationClick = () => {
    navigate("/infra-automation");
    setActiveNav("infra automation");
  };
  const handleOperationalClick = () => {
    navigate(CROSSCHECK_PAGE_ROUTE);
    setActiveNav("operational software");
  };
  const handleAboutClick = () => navigate("/about");
  const handlePrivacyClick = () => navigate("/privacy-policy");
  const handleBackToHome = () => {
    try {
      document.body.classList.add("page-fade-out");
    } catch (e) {
      /* noop */
    }

    setTimeout(() => {
      navigate("/");
      setActiveNav("home");
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

      setTimeout(() => {
        try {
          document.body.classList.remove("page-fade-out");
        } catch (e) {
          /* noop */
        }
      }, 50);
    }, 240);
  };

  const scrollToSection = (sectionId: string, label: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setActiveNav(label);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="relative min-h-screen w-screen bg-[linear-gradient(to_bottom,#121212,#1c1c1c,#2a2a2a)] text-[#f5f5f5]">
            <Navigation
              onHiringClick={handleHiringClick}
              onInfraAutomationClick={handleInfraAutomationClick}
              onOperationalClick={handleOperationalClick}
              onRequestDemoClick={handleContactClick}
              scrollToSection={scrollToSection}
              activeNav={activeNav}
            />
            <main className="pt-24 md:pt-32">
              <HeroSection />
              <AboutUsSection />
              <ProductsSection
                onInfraAutomationClick={handleInfraAutomationClick}
                onOperationalClick={handleOperationalClick}
              />
            </main>
            <Footer
              onAboutClick={handleAboutClick}
              onPrivacyClick={handlePrivacyClick}
              scrollToSection={scrollToSection}
            />
            <Toaster />
          </div>
        }
      />
      <Route
        path="/get-in-touch"
        element={
          <div className="App">
            <ContactPage onBackToHome={handleBackToHome} />
            <Toaster />
          </div>
        }
      />
      <Route
        path="/contact"
        element={
          <div className="App">
            <ContactPage onBackToHome={handleBackToHome} />
            <Toaster />
          </div>
        }
      />
      <Route
        path="/hiring"
        element={
          <div className="App">
            <HiringPage onBackToHome={handleBackToHome} />
            <Toaster />
          </div>
        }
      />
      <Route
        path="/about"
        element={
          <div className="App min-h-screen w-screen bg-[linear-gradient(to_bottom,#121212,#1c1c1c,#2a2a2a)] text-[#f5f5f5]">
            <div className="mx-auto max-w-[1000px] px-6 py-16">
              <button
                onClick={handleBackToHome}
                className="mb-10 rounded-lg border border-[#404040] bg-transparent px-4 py-2 font-inter text-[14px] text-[#f5f5f5] transition-colors hover:bg-white/10 outline-none"
              >
                Back
              </button>
              <div className="rounded-2xl border border-[#404040] bg-white/[0.03] p-10 shadow-[0_10px_20px_rgba(0,0,0,0.3)] min-h-[400px] flex flex-col items-center justify-center">
                <div className="font-inter font-semibold text-[42px] text-white mb-4">
                  About Us
                </div>
                <div className="font-inter font-normal text-[18px] text-[#999999]">
                  Coming soon. We're working on something special.
                </div>
              </div>
            </div>
          </div>
        }
      />
      <Route
        path="/privacy-policy"
        element={
          <div className="App">
            <PrivacyPolicy onBackToHome={handleBackToHome} />
            <Toaster />
          </div>
        }
      />
      <Route
        path={CROSSCHECK_PAGE_ROUTE}
        element={
          <div className="App">
            <CrossCheckPage onBackToHome={handleBackToHome} />
            <Toaster />
          </div>
        }
      />
      <Route
        path={`${CROSSCHECK_PAGE_ROUTE}/get-in-touch`}
        element={
          <div className="App">
            <CrossCheckPage onBackToHome={handleBackToHome} />
            <Toaster />
          </div>
        }
      />
      <Route
        path="/infra-automation"
        element={
          <div className="App">
            <InfraAutomationPage onBackToHome={handleBackToHome} />
            <Toaster />
          </div>
        }
      />
      <Route
        path="/infra-automation/get-in-touch"
        element={
          <div className="App">
            <InfraAutomationPage onBackToHome={handleBackToHome} />
            <Toaster />
          </div>
        }
      />
      {/* AquaGrid demo - reachable by direct URL only, intentionally unlinked from Manu nav. */}
      <Route path="/infra-automation/aquagrid" element={<AquaGridApp />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}