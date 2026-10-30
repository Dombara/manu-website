import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { toast } from "sonner";
import { type JobRole } from "../data/jobs";
import { Button } from "./ui/button";
import { useState } from "react";

interface JobApplicationFormProps {
  job: JobRole;
  onClose: () => void;
  onBack: () => void;
}

export function JobApplicationForm({ job, onClose, onBack }: JobApplicationFormProps) {
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    
    // Professional Links
    linkedinUrl: '',
    portfolioUrl: '',
    githubUrl: '',
    websiteUrl: '',
    
    // Application Details
    coverLetter: '',
    experience: '',
    availability: '',
    salaryExpectation: '',
    
    // Additional Information
    hearAboutUs: '',
    additionalInfo: ''
  });

  const [files, setFiles] = useState<{
    resume: File | null;
    coverLetterFile: File | null;
    portfolio: File | null;
  }>({
    resume: null,
    coverLetterFile: null,
    portfolio: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: keyof typeof files) => {
    const file = e.target.files?.[0] || null;
    setFiles(prev => ({
      ...prev,
      [fileType]: file
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success(`Application submitted successfully for ${job.title}! We'll get back to you soon.`);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: '',
        linkedinUrl: '',
        portfolioUrl: '',
        githubUrl: '',
        websiteUrl: '',
        coverLetter: '',
        experience: '',
        availability: '',
        salaryExpectation: '',
        hearAboutUs: '',
        additionalInfo: ''
      });
      
      setFiles({
        resume: null,
        coverLetterFile: null,
        portfolio: null
      });
      
      // Close the form after a brief delay
      setTimeout(() => {
        onClose();
      }, 1500);
      
    } catch {
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom,#121212,#1c1c1c,#2a2a2a)] text-[#f5f5f5]">
      {/* Header with back button */}
      <header className="bg-[rgba(18,18,18,0.8)] border-b border-[#404040] sticky top-0 z-50 backdrop-blur-2xl">
        <div className="w-full pl-6 pr-0 py-4 flex items-center justify-between">
          <button 
            onClick={onClose}
            className="bg-transparent border-none p-0"
          >
            <span className="font-montserrat font-bold text-[25px] gradient-text">
              MANU
            </span>
          </button>
          <Button 
            variant="outline" 
            onClick={onBack}
            className="font-['Inter:Regular',_sans-serif] bg-transparent border-[#404040] text-[#f5f5f5] hover:bg-white/10"
          >
            ← Back to Job Listings
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="w-full pl-6 pr-0 py-12">
        {/* Job Info Header */}
        <div className="mb-12">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="font-['Inter:Regular',_sans-serif] font-normal text-[36px] text-white mb-4">
                Apply for {job.title}
              </h1>
              <p className="font-['Inter:Regular',_sans-serif] font-normal text-[20px] text-[#e6ecf5] mb-4">
                {job.department} • {job.location}
              </p>
            </div>
            <div className="flex gap-2">
              <Badge 
                variant="default"
                className="bg-green-100 text-green-800 font-['Inter:Regular',_sans-serif] font-normal text-[12px]"
              >
                {job.status}
              </Badge>
              {job.type && (
                <Badge 
                  variant="outline" 
                  className="font-['Inter:Regular',_sans-serif] font-normal text-[12px]"
                >
                  {job.type}
                </Badge>
              )}
            </div>
          </div>
          
          <Card className="bg-[#232323] border-[#404040]">
            <CardContent className="pt-6">
              <p className="font-['Inter:Regular',_sans-serif] font-normal text-[16px] text-[#e6ecf5] leading-[24px]">
                {job.description}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Application Form */}
        <Card className="shadow-lg bg-[#232323] border-[#404040]">
          <CardHeader>
            <CardTitle className="font-['Inter:Regular',_sans-serif] font-normal text-[28px] text-white">
              Application Form
            </CardTitle>
            <CardDescription className="font-['Inter:Regular',_sans-serif] font-normal text-[16px] text-[#e6ecf5]">
              Please fill out all required fields. We'll review your application and get back to you within 5 business days.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Personal Information */}
              <div className="space-y-6">
                <h3 className="font-['Inter:Regular',_sans-serif] font-normal text-[20px] text-white border-b border-[#404040] pb-2">
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-neutral-700 mb-2">
                      First Name *
                    </label>
                    <Input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      placeholder="Your first name"
                      className="font-['Inter:Regular',_sans-serif]"
                    />
                  </div>
                  <div>
                    <label className="block font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-neutral-700 mb-2">
                      Last Name *
                    </label>
                    <Input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      placeholder="Your last name"
                      className="font-['Inter:Regular',_sans-serif]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-neutral-700 mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your.email@example.com"
                      className="font-['Inter:Regular',_sans-serif]"
                    />
                  </div>
                  <div>
                    <label className="block font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-neutral-700 mb-2">
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="+1 (555) 123-4567"
                      className="font-['Inter:Regular',_sans-serif]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-neutral-700 mb-2">
                    Current Location *
                  </label>
                  <Input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    placeholder="City, State/Country"
                    className="font-['Inter:Regular',_sans-serif]"
                  />
                </div>
              </div>

              {/* Professional Links */}
              <div className="space-y-6">
                <h3 className="font-['Inter:Regular',_sans-serif] font-normal text-[20px] text-neutral-900 border-b border-neutral-200 pb-2">
                  Professional Links
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-neutral-700 mb-2">
                      LinkedIn Profile
                    </label>
                    <Input
                      type="url"
                      name="linkedinUrl"
                      value={formData.linkedinUrl}
                      onChange={handleInputChange}
                      placeholder="https://linkedin.com/in/yourprofile"
                      className="font-['Inter:Regular',_sans-serif]"
                    />
                  </div>
                  <div>
                    <label className="block font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-neutral-700 mb-2">
                      Portfolio Website
                    </label>
                    <Input
                      type="url"
                      name="portfolioUrl"
                      value={formData.portfolioUrl}
                      onChange={handleInputChange}
                      placeholder="https://yourportfolio.com"
                      className="font-['Inter:Regular',_sans-serif]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-neutral-700 mb-2">
                      GitHub Profile
                    </label>
                    <Input
                      type="url"
                      name="githubUrl"
                      value={formData.githubUrl}
                      onChange={handleInputChange}
                      placeholder="https://github.com/yourusername"
                      className="font-['Inter:Regular',_sans-serif]"
                    />
                  </div>
                  <div>
                    <label className="block font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-neutral-700 mb-2">
                      Personal Website
                    </label>
                    <Input
                      type="url"
                      name="websiteUrl"
                      value={formData.websiteUrl}
                      onChange={handleInputChange}
                      placeholder="https://yourwebsite.com"
                      className="font-['Inter:Regular',_sans-serif]"
                    />
                  </div>
                </div>
              </div>

              {/* File Uploads */}
              <div className="space-y-6">
                <h3 className="font-['Inter:Regular',_sans-serif] font-normal text-[20px] text-neutral-900 border-b border-neutral-200 pb-2">
                  Documents
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-neutral-700 mb-2">
                      Resume/CV *
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileChange(e, 'resume')}
                      required
                      className="block w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[#ff0000] file:text-white hover:file:bg-[#e60000] file:cursor-pointer cursor-pointer"
                    />
                    {files.resume && (
                      <p className="text-sm text-green-600 mt-1">✓ {files.resume.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-neutral-700 mb-2">
                      Cover Letter
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileChange(e, 'coverLetterFile')}
                      className="block w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-neutral-100 file:text-neutral-700 hover:file:bg-neutral-200 file:cursor-pointer cursor-pointer"
                    />
                    {files.coverLetterFile && (
                      <p className="text-sm text-green-600 mt-1">✓ {files.coverLetterFile.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-neutral-700 mb-2">
                      Portfolio/Samples
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.zip,.png,.jpg,.jpeg"
                      onChange={(e) => handleFileChange(e, 'portfolio')}
                      className="block w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-neutral-100 file:text-neutral-700 hover:file:bg-neutral-200 file:cursor-pointer cursor-pointer"
                    />
                    {files.portfolio && (
                      <p className="text-sm text-green-600 mt-1">✓ {files.portfolio.name}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Application Details */}
              <div className="space-y-6">
                <h3 className="font-['Inter:Regular',_sans-serif] font-normal text-[20px] text-neutral-900 border-b border-neutral-200 pb-2">
                  Application Details
                </h3>
                
                <div>
                  <label className="block font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-neutral-700 mb-2">
                    Cover Letter *
                  </label>
                  <Textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    required
                    placeholder="Tell us why you're interested in this position and why you'd be a great fit..."
                    rows={6}
                    className="font-['Inter:Regular',_sans-serif]"
                  />
                </div>

                <div>
                  <label className="block font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-neutral-700 mb-2">
                    Relevant Experience *
                  </label>
                  <Textarea
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    placeholder="Describe your relevant experience, skills, and achievements..."
                    rows={4}
                    className="font-['Inter:Regular',_sans-serif]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-neutral-700 mb-2">
                      Availability
                    </label>
                    <Input
                      type="text"
                      name="availability"
                      value={formData.availability}
                      onChange={handleInputChange}
                      placeholder="e.g., Immediately, 2 weeks notice, etc."
                      className="font-['Inter:Regular',_sans-serif]"
                    />
                  </div>
                  <div>
                    <label className="block font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-neutral-700 mb-2">
                      Salary Expectation
                    </label>
                    <Input
                      type="text"
                      name="salaryExpectation"
                      value={formData.salaryExpectation}
                      onChange={handleInputChange}
                      placeholder="e.g., $80,000 - $100,000 or Negotiable"
                      className="font-['Inter:Regular',_sans-serif]"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-6">
                <h3 className="font-['Inter:Regular',_sans-serif] font-normal text-[20px] text-neutral-900 border-b border-neutral-200 pb-2">
                  Additional Information
                </h3>
                
                <div>
                  <label className="block font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-neutral-700 mb-2">
                    How did you hear about us?
                  </label>
                  <Input
                    type="text"
                    name="hearAboutUs"
                    value={formData.hearAboutUs}
                    onChange={handleInputChange}
                    placeholder="e.g., LinkedIn, Company website, Referral, etc."
                    className="font-['Inter:Regular',_sans-serif]"
                  />
                </div>

                <div>
                  <label className="block font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-neutral-700 mb-2">
                    Additional Information
                  </label>
                  <Textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    placeholder="Any additional information you'd like to share (optional)..."
                    rows={3}
                    className="font-['Inter:Regular',_sans-serif]"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-6">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-[#ff0000] hover:bg-[#e60000] text-white font-['Inter:Regular',_sans-serif] font-normal text-[16px] px-8 py-3"
                >
                  {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}