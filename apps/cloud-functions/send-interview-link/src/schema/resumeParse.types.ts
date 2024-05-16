interface Location {
  address: string;
  postalCode: string;
  city: string;
  country: string;
  region: string;
}

interface Profile {
  network: string;
  username: string;
  url: string;
}

interface WorkExperience {
  name: string;
  position: string;
  url: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
  skills: string[];
}

interface Education {
  institution: string;
  url: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string;
  score: string;
  courses: string[];
}

interface Certificate {
  name: string;
  date: string;
  issuer: string;
  url: string;
}

interface Skill {
  name: string;
  level: string;
  keywords: string[];
}

interface Language {
  language: string;
  fluency: string;
}

interface Project {
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  highlights: string[];
  url: string;
}

interface ParsedResumeData {
  basics: {
    firstName: string;
    lastName: string;
    label: string;
    image: string;
    email: string;
    phone: string;
    url: string;
    summary: string;
    location: Location;
    profiles: Profile[];
  };
  work: WorkExperience[];
  education: Education[];
  certificates: Certificate[];
  skills: Skill[];
  languages: Language[];
  projects: Project[];
}
