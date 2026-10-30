export interface JobRole {
  id: string;
  title: string;
  description: string;
  location: string;
  status: "Open" | "Closed";
  department?: string;
  type?: "Full-time" | "Part-time" | "Contract" | "Internship";
  requirements?: string[];
  postedDate?: string;
  information?: string;
}

export const jobRoles: JobRole[] = [
  {
    id: "Mechanical/Biomedical Engineer",
    title: "Mechanical/Biomedical Engineer",
    description: "https://tally.so/r/3jR0Aa",
    location: "Pune, India",
    status: "Open",
    /*department: "MANU CODE",*/
    type: "Full-time",
    /*requirements: [
      "Bachelor's degree in Computer Science, Engineering, or related field",
      "3+ years of experience in DevOps, Site Reliability, or Infrastructure Engineering",
      "Proficiency with AWS, Docker, Kubernetes, and CI/CD pipelines",
      "Experience with Infrastructure as Code (Terraform, CloudFormation)",
      "Strong scripting skills in Python, Bash, or similar languages",
    ],*/
    /*postedDate: "2024-01-15",*/
    information: "Join our team to design and develop innovative biomedical devices, focusing on mechanical engineering solutions for healthcare applications.",
  },
  {
    id: "Full Stack SDE",
    title: "Full Stack SDE",
    description: "https://tally.so/r/mZ7GgV",
    location: "Pune, India",
    status: "Open",
    /*department: "MANU MEDTECH",*/
    type: "Full-time",
    /*requirements: [
      "MS/PhD in Robotics, Mechanical Engineering, or related field",
      "5+ years of experience in robotics development",
      "Proficiency in ROS, C++, and Python",
      "Experience with medical device regulations (FDA approval process)",
      "Background in control systems and sensor fusion",
    ],*/
    /*postedDate: "2024-01-10",*/
    information: "Work on end-to-end development of web applications, collaborating with cross-functional teams to deliver robust software solutions.",
  },
  {
    id: "Mechanical/Biomedical Intern",
    title: "Mechanical/Biomedical Intern",
    description: "https://tally.so/r/3qrYpO",
    location: "Pune, India",
    status: "Open",
    /*department: "MANU CODE",*/
    type: "Internship",
    /*requirements: [
      "5+ years of frontend development experience",
      "Expert-level knowledge of React, TypeScript, and modern CSS",
      "Experience with Next.js, Tailwind CSS, and modern build tools",
      "Strong understanding of web accessibility and performance optimization",
      "Portfolio demonstrating excellent design and UX skills",
    ],*/
    /*postedDate: "2024-01-08",*/
    information: "Gain hands-on experience in mechanical and biomedical engineering projects, supporting our team in cutting-edge device development.",
  },
  {
    id: "Frontend and UI/UX Intern",
    title: "Frontend and UI/UX Intern",
    description: "https://tally.so/r/mY6aPd",
    location: "Pune, India",
    status: "Open",
    /*department: "MANU MEDTECH",*/
    type: "Internship",
    /*requirements: [
      "MS/PhD in Data Science, Statistics, or related field",
      "3+ years of experience in data analysis and machine learning",
      "Proficiency in Python, R, SQL, and data visualization tools",
      "Experience with biomedical or healthcare data preferred",
      "Strong communication skills for presenting findings",
    ],*/
    /*postedDate: "2024-01-05",*/
    information: "Assist in designing and implementing user interfaces, focusing on enhancing user experience for our technology platforms.",
  },
  {
    id: "Backend SDE Intern",
    title: "Backend SDE Intern",
    description: "https://tally.so/r/3qR0Aa",
    location: "Pune, India",
    status: "Open",
    /*department: "MANU MEDIA LABS",*/
    type: "Internship",
    /*requirements: [
      "Bachelor's degree in Design, HCI, or related field",
      "4+ years of UX/UI design experience",
      "Proficiency in Figma, Adobe Creative Suite, and prototyping tools",
      "Experience designing for complex technical products",
      "Portfolio showcasing user-centered design process",
    ],*/
    /*postedDate: "2024-01-02",*/
    information: "Support the development of server-side logic, ensuring high performance and scalability of our backend systems.",
  },
  {
    id: "Embedded Software Intern",
    title: "Embedded Software Intern",
    description: "https://tally.so/r/m6l15Y",
    location: "Pune, India",
    status: "Open",
    /*department: "All Departments",*/
    type: "Internship",
    /*requirements: [
      "Currently enrolled in undergraduate or graduate program",
      "Strong academic record in Computer Science, Engineering, or related field",
      "Programming experience in Python, C++, or similar languages",
      "Passion for research and innovation",
      "Available for 12-week summer program",
    ],*/
    /*postedDate: "2024-01-01",*/
    information: "Work on embedded systems development, contributing to hardware-software integration for innovative tech solutions.",
  },
  {
    id: "Office Assistant Intern (Generalist)",
    title: "Office Assistant Intern (Generalist)",
    description: "https://tally.so/r/wbp2G1",
    location: "Pune, India",
    status: "Open",
    /*department: "MANU MEDIA LABS",*/
    type: "Internship",
    /*requirements: [
      "MBA or equivalent business experience",
      "5+ years in business development or partnership roles",
      "Experience in deep tech or research commercialization",
      "Strong network in venture capital and industry partnerships",
      "Excellent presentation and negotiation skills",
    ],*/
    /*postedDate: "2023-12-15",*/
    information: "Assist with general office tasks, providing support across various departments to ensure smooth operations.",
  },
];

// Helper functions for filtering jobs
export const getOpenJobs = (): JobRole[] => {
  return jobRoles.filter((job) => job.status === "Open");
};

export const getJobsByDepartment = (
  department: string,
): JobRole[] => {
  return jobRoles.filter(
    (job) => job.department === department,
  );
};

export const getJobById = (id: string): JobRole | undefined => {
  return jobRoles.find((job) => job.id === id);
};