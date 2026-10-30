
import { useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Mail, Phone } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { toast } from "sonner";
import { contactService } from '../lib/services/contactService';

interface ContactPageProps {
  onBackToHome: () => void;
}

export function ContactPage({ onBackToHome }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const submissionInProgress = useRef(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submissionInProgress.current) return;

    submissionInProgress.current = true;
    setIsSubmitting(true);

    try {
      // The Service layer now handles the trimming and sanitization
      const response = await contactService.sendContactMessage(formData);
      if (!response.success) {
        throw new Error(response.message || "Message could not be sent.");
      }

      toast.success("Message sent successfully!", {
        description: "We'll get back to you soon.",
        duration: 5000,
        icon: <CheckCircle2 size={18} className="text-[#22c55e]" />,
      });

      // Reset form on success
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      });

    } catch {
      toast.error("Unable to send your message. Please try again.", {
        duration: 6000,
        icon: <AlertCircle size={18} className="text-[#ef4444]" />,
      });
    } finally {
      submissionInProgress.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-[linear-gradient(to_bottom,#121212,#1c1c1c,#2a2a2a)] text-[#f5f5f5]">
      {/* Header */}
      <header className="bg-[rgba(18,18,18,0.8)] border-b border-[#404040] sticky top-0 z-50 backdrop-blur-2xl">
        <div className="w-full pl-6 pr-6 py-[11.66px] flex items-center justify-between">
          <button onClick={onBackToHome} className="bg-transparent border-none p-0 cursor-pointer">
            <span className="block font-montserrat font-bold text-[26.38px] md:text-[32.97px] leading-[0.95]">
              <span className="manu-brand block">MANU</span>
              <span className="robotics-brand block mt-0.5">Robotics</span>
            </span>
          </button>
          <Button 
            variant="outline" 
            onClick={onBackToHome}
            className="font-['Inter:Regular',_sans-serif] bg-transparent border-[#404040] text-[#f5f5f5] hover:bg-transparent hover:text-[#ff0000] transition-colors"
          >
            ← Back to Home
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full px-4 md:px-6 py-10 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
            
            {/* Contact Information Section */}
            <div className="lg:pt-7">
              {/* <h1 className="font-['Inter:Regular',_sans-serif] font-normal text-[32px] md:text-[48px] text-white mb-6 md:mb-8">
                Get In Touch
              </h1> */}
              {/* <p className="font-['Inter:Regular',_sans-serif] font-normal text-[16px] md:text-[20px] text-[#e6ecf5] mb-8 md:mb-12 leading-[24px] md:leading-[28px]">
                Ready to collaborate or have questions about our operations? 
                We'd love to hear from you.
              </p> */}

              <div className="space-y-8">
                <div>
                  <h3 className="font-inter font-semibold text-[22px] md:text-[26px] text-white mb-3 md:mb-4">
                    Contact Information
                  </h3>
                  <div className="flex flex-col items-start gap-3 font-inter text-[18px]">
                    <a
                      href="mailto:main@manurobotics.com"
                      className="flex items-center gap-2 !text-white transition-colors hover:!text-white"
                    >
                      <Mail size={19} className="shrink-0 text-[#cc0000]" aria-hidden="true" />
                      <span className="!text-white">
                        main@manurobotics.com
                      </span>
                    </a>
                    <a
                      href="tel:+917841064877"
                      className="flex items-center gap-2 !text-white transition-colors hover:!text-white"
                    >
                      <Phone size={19} className="shrink-0 text-[#cc0000]" aria-hidden="true" />
                      <span className="!text-white">
                        +917841064877
                      </span>
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="font-inter font-semibold text-[22px] md:text-[26px] text-white mb-3 md:mb-4">
                    Our Operations
                  </h3>
                  <ul className="space-y-2 font-inter font-normal text-[18px] text-[#f5f5f5]">
                    <li className="flex items-center gap-2">
                      <span className="h-[9px] w-[9px] flex-shrink-0 rounded-full bg-[#cc0000]" aria-hidden="true" />
                      <span>
                        Crosscheck
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-[9px] w-[9px] flex-shrink-0 rounded-full bg-[#cc0000]" aria-hidden="true" />
                      <span>
                        Synapse
                      </span>
                    </li>
                    {/* MedTech operation
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#ff0000] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="font-['Inter:Regular',_sans-serif] font-normal text-[16px] text-[#e6ecf5]">
                        MANU MEDTECH - Medical Robotics & Healthcare Systems
                      </span>
                    </li>
                    */}
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="shadow-lg bg-[#232323] border-[#404040]">
                <CardHeader>
                  <CardTitle className="font-['Inter:Regular',_sans-serif] font-normal text-[28px] text-white">
                    Send us a message
                  </CardTitle>
                  <CardDescription className="font-['Inter:Regular',_sans-serif] font-normal text-[16px] text-[#e6ecf5]">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-[#e6ecf5] mb-2">
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="Your full name"
                          className="font-['Inter:Regular',_sans-serif] border border-[#404040] bg-[#2a2a2a] text-white placeholder:text-[#999999]"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-[#e6ecf5] mb-2">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="your.email@example.com"
                          className="font-['Inter:Regular',_sans-serif] border border-[#404040] bg-[#2a2a2a] text-white placeholder:text-[#999999]"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="company" className="block font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-[#e6ecf5] mb-2">
                        Company/Organization
                      </label>
                      <Input
                        id="company"
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Your company or organization"
                        className="font-['Inter:Regular',_sans-serif] border border-[#404040] bg-[#2a2a2a] text-white placeholder:text-[#999999]"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-[#e6ecf5] mb-2">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        placeholder="What's this about?"
                        className="font-['Inter:Regular',_sans-serif] border border-[#404040] bg-[#2a2a2a] text-white placeholder:text-[#999999]"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-[#e6ecf5] mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us more about your inquiry..."
                        rows={6}
                        className="font-['Inter:Regular',_sans-serif] border border-[#404040] bg-[#2a2a2a] text-white placeholder:text-[#999999]"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-[#ff0000] hover:bg-[#e60000] text-white font-['Inter:Regular',_sans-serif] font-normal text-[16px] py-3 transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span className="inline-flex items-center justify-center gap-2">
                          <Loader2 size={18} className="animate-spin" />
                          Sending...
                        </span>
                      ) : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}