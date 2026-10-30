import { useState } from 'react';
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { jobRoles, getOpenJobs, type JobRole } from "../data/jobs";
import { JobApplicationForm } from "./JobApplicationForm";

interface HiringPageProps {
  onBackToHome: () => void;
}

export function HiringPage({ onBackToHome }: HiringPageProps) {
  const [currentView, setCurrentView] = useState<'listings' | 'application'>('listings');
  const [selectedJob, setSelectedJob] = useState<JobRole | null>(null);
  const openJobs = getOpenJobs();
  const allJobs = jobRoles;

  const handleBackToListings = () => {
    setCurrentView('listings');
    setSelectedJob(null);
  };

  const handleCloseApplication = () => {
    setCurrentView('listings');
    setSelectedJob(null);
  };

  // If application form is open, show it
  if (currentView === 'application' && selectedJob) {
    return (
      <JobApplicationForm 
        job={selectedJob}
        onClose={handleCloseApplication}
        onBack={handleBackToListings}
      />
    );
  }

  const JobCard = ({ job }: { job: JobRole }) => (
    <Card className="hover:shadow-lg transition-shadow duration-300 w-full bg-[#232323] border-[#404040]">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="font-['Inter:Regular',_sans-serif] font-normal text-[24px] text-white mb-2">
              {job.title}
            </CardTitle>
            <CardDescription className="font-['Inter:Regular',_sans-serif] font-normal text-[16px] text-[#e6ecf5] mb-4">
              {job.department} • {job.location}
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-4 items-center">
            <Badge 
              variant={job.status === 'Open' ? 'default' : 'secondary'}
              className={`font-['Inter:Regular',_sans-serif] font-normal text-[12px] ${
                job.status === 'Open' 
                  ? 'bg-[#00aa00] text-white hover:bg-[#008800]' 
                  : 'bg-[#404040] text-[#e6ecf5]'
              }`}
            >
              {job.status}
            </Badge>
            {job.type && (
              <Badge 
                variant="outline" 
                className="font-['Inter:Regular',_sans-serif] font-normal text-[12px] md:text-[16px] border-[#404040] text-[#e6ecf5]"
              >
                {job.type}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="font-['Inter:Regular',_sans-serif] font-normal text-[16px] text-[#e6ecf5] leading-[24px] mb-6">
          <a
            href={job.description}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#dc2626' }} // Inline style to enforce red
            className="font-['Inter:Regular',_sans-serif] font-normal text-[16px]  hover:bg-gray-100 text-red-600 !important no-underline px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 inline-block"
            onClick={(e) => {
              e.preventDefault();
              window.open(job.description, '_blank');
            }}
          >
            Apply Here
          </a>
        </p>

        {job.requirements && job.requirements.length > 0 && (
          <div className="mb-6">
            <h4 className="font-['Inter:Regular',_sans-serif] font-normal text-[18px] text-neutral-900 mb-3">
              Key Requirements:
            </h4>
            <ul className="space-y-2">
              {job.requirements.slice(0, 3).map((requirement, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#ff0000] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-[#e6ecf5]">
                    {requirement}
                  </span>
                </li>
              ))}
              {job.requirements.length > 3 && (
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-neutral-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-[#999999]">
                    + {job.requirements.length - 3} more requirements
                  </span>
                </li>
              )}
            </ul>
          </div>
        )}

        <div className="flex items-center justify-between">
          {job.postedDate && (
            <span className="font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-[#999999]">
              Posted: {new Date(job.postedDate).toLocaleDateString()}
            </span>
          )}

        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen w-screen bg-[linear-gradient(to_bottom,#121212,#1c1c1c,#2a2a2a)] text-[#f5f5f5]">
      {/* Header with back button */}
      <header className="fixed top-0 right-0 z-50 backdrop-blur-2xl">
        <div className="px-4 md:px-6 py-4 flex items-center justify-end">
          <Button 
            variant="outline" 
            onClick={onBackToHome}
            className="font-['Inter:Regular',_sans-serif] bg-[#1a1a1a] border-[#404040] text-[#f5f5f5] hover:bg-[#232323] hover:border-red-600 hover:text-red-600 transition-all duration-300 text-[14px] md:text-[16px]"
          >
            ← Back to Home
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="w-full px-4 md:px-6 lg:px-12 py-16 md:py-20">
        <div className="w-full">
        {/* Page header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="font-['Inter:Regular',_sans-serif] font-normal text-[32px] md:text-[48px] text-white mb-4 md:mb-6">
            We Are Hiring
          </h1>
          <p className="font-['Inter:Regular',_sans-serif] font-normal text-[16px] md:text-[20px] text-[#e6ecf5] max-w-[800px] mx-auto leading-[24px] md:leading-[28px] mb-8">
            Join our team of brilliant researchers, engineers, and innovators who are shaping the future of technology. 
            We're looking for passionate individuals to help us push the boundaries of what's possible.
          </p>
        </div>

        {/* Job listings */}
        <div className="space-y-8">
          {/* Open positions */}
          {openJobs.length > 0 && (
            <div>
              <h2 className="font-['Inter:Regular',_sans-serif] font-normal text-[28px] md:text-[32px] text-white mb-6 md:mb-8">
                Open Positions
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {openJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </div>
          )}

          {/* Closed positions */}
          {allJobs.some(job => job.status === 'Closed') && (
            <div className="mt-16">
              <h2 className="font-['Inter:Regular',_sans-serif] font-normal text-[28px] md:text-[32px] text-[#e6ecf5] mb-6 md:mb-8">
                Recently Closed Positions
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 opacity-60">
                {allJobs
                  .filter(job => job.status === 'Closed')
                  .map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
              </div>
            </div>
          )}
        </div>
        </div>
      </main>
    </div>
  );
}