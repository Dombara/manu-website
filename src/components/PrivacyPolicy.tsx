import React from "react";
import { motion } from "framer-motion";

interface PrivacyPolicyProps {
  onBackToHome: () => void;
}

export function PrivacyPolicy({ onBackToHome }: PrivacyPolicyProps) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen w-screen bg-[linear-gradient(to_bottom,#121212,#1c1c1c,#2a2a2a)] text-[#f5f5f5]">
      <div className="mx-auto px-12 py-16">
        <button
          onClick={onBackToHome}
          className="mb-10 rounded-lg border border-[#404040] bg-[#1a1a1a] px-4 py-2 font-inter text-[14px] text-[#f5f5f5] transition-all hover:bg-[#232323] hover:text-red-600 hover:border-red-600 outline-none"
        >
          Back
        </button>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-[#404040] bg-white/[0.03] p-10 shadow-[0_10px_20px_rgba(0,0,0,0.3)] backdrop-blur-sm"
        >
          <div className="font-inter font-semibold text-[42px] text-white mb-8">
            Privacy Policy
          </div>
          <div className="font-inter font-normal text-[18px] text-[#f5f5f5] leading-[28px] space-y-6">
            <section>
              <h2 className="font-semibold text-[24px] text-white mb-4">1. Introduction</h2>
              <p>
                Manu Robotics ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, services, and products offered under Manu Robotics, including our Manu Medtech and Manu Robotics operations.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-[24px] text-white mb-4">2. Information We Collect</h2>
              <h3 className="font-medium text-[20px] text-[#e6ecf5] mb-2">2.1 Personal Information</h3>
              <p className="mb-4">
                We may collect personal information that you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-1">
                <li>Name and contact information (email address, phone number)</li>
                <li>Company name and job title</li>
                <li>Account credentials and profile information</li>
                <li>Communication preferences</li>
                <li>Billing and shipping details (if applicable)</li>
              </ul>

              <h3 className="font-medium text-[20px] text-[#e6ecf5] mb-2">2.2 Usage Information</h3>
              <p className="mb-4">
                We automatically collect certain information about your use of our services and website, including:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-1">
                <li>Log data (IP address, browser type, access times)</li>
                <li>Device information (device type, operating system)</li>
                <li>Usage patterns and feature interactions</li>
                <li>Performance data and error reports</li>
              </ul>

              <h3 className="font-medium text-[20px] text-[#e6ecf5] mb-2">2.3 Product and Interaction Data</h3>
              <p>
                As a robotics and medtech company, we may collect data related to your interactions with our products and services, including:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Robotics system usage logs and telemetry</li>
                <li>Device connectivity and status information</li>
                <li>Performance metrics and diagnostic data</li>
                <li>Configuration settings and operational feedback</li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-[24px] text-white mb-4">3. How We Use Your Information</h2>
              <p>
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Provide, maintain, and improve our robotics and medtech services and products</li>
                <li>Operate, monitor, and optimize our robotic systems</li>
                <li>Process inquiries, orders, deliveries, and support requests</li>
                <li>Communicate with you about our services, updates, and important notices</li>
                <li>Ensure security, prevent fraud, and protect our rights</li>
                <li>Comply with legal obligations</li>
                <li>Develop new features and functionality</li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-[24px] text-white mb-4">4. Data Sharing and Disclosure</h2>
              <p className="mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>With your explicit consent</li>
                <li>To trusted service providers who assist in operating our platform, website, or products (under strict confidentiality agreements)</li>
                <li>To comply with legal requirements, court orders, or government requests</li>
                <li>To protect our rights, property, or safety, or that of our users</li>
                <li>In connection with a business transfer, merger, acquisition, or sale of assets</li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-[24px] text-white mb-4">5. Data Security</h2>
              <p>
                We implement reasonable security measures to protect your data:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Encryption for data in transit and at rest where appropriate</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Regular security reviews and updates</li>
                <li>Secure data centers and infrastructure</li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-[24px] text-white mb-4">6. Data Retention</h2>
              <p>
                We retain your information for as long as necessary to provide our services, fulfill legal obligations, or resolve disputes. You may request deletion of your data, subject to certain legal and business requirements. Product-related data retention may vary based on industry regulations and contractual needs.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-[24px] text-white mb-4">7. Your Rights and Choices</h2>
              <p className="mb-4">
                You have the following rights regarding your personal information (subject to applicable law):
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Access and review your personal information</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to or restrict certain processing activities</li>
                <li>Data portability (receive your data in a structured, machine-readable format)</li>
                <li>Withdraw consent where processing is based on consent</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the details below.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-[24px] text-white mb-4">8. Cookies and Tracking Technologies</h2>
              <p className="mb-4">
                We use cookies and similar technologies to enhance your experience:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Essential cookies for website and platform functionality</li>
                <li>Analytics cookies to understand usage patterns and improve services</li>
                <li>Preference cookies to remember your settings</li>
                <li>Security cookies to protect against fraud</li>
              </ul>
              <p>
                You can control cookie preferences through your browser settings. Note that disabling certain cookies may affect website functionality.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-[24px] text-white mb-4">9. International Data Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries other than your own (including India). We ensure appropriate safeguards are in place to protect your data in accordance with applicable data protection laws.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-[24px] text-white mb-4">10. Children's Privacy</h2>
              <p>
                Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-[24px] text-white mb-4">11. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date. Your continued use of our services or website after such changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-[24px] text-white mb-4">12. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="font-medium">
                <p>*Manu Robotics*</p>
                <p>Email: main@manurobotics.com</p>
              </div>
            </section>

            <section>
              <h2 className="font-semibold text-[24px] text-white mb-4">13. Regulatory Compliance</h2>
              <p>
                This Privacy Policy is designed to comply with applicable data protection laws, including but not limited to the General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), Digital Personal Data Protection Act, 2023 (India), and other relevant privacy regulations. We are committed to maintaining compliance with evolving privacy requirements.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}