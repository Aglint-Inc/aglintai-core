interface WorkExperience {
  url: string;
  name: string;
  endDate: string;
  summary: string;
  position: string;
  startDate: string;
  highlights: string[];
  skills_used: string[];
}

interface Basics {
  url: string;
  email: string;
  image: string;
  label: string;
  phone: string;
  summary: string;
  lastName: string;
  location: {
    city: string;
    region: string;
    address: string;
    country: string;
    postalCode: string;
  };
  profiles: {
    url: string;
    network: string;
    username: string;
  }[];
  firstName: string;
}

interface Project {
  url: string;
  name: string;
  endDate: string;
  startDate: string;
  highlights: string[];
}

interface Education {
  url: string;
  area: string;
  endDate: string;
  startDate: string;
  studyType: string;
  institution: string;
}

interface Language {
  fluency: string;
  language: string;
}

interface Certificate {
  url: string;
  date: string;
  name: string;
  issuer: string;
}
export interface JsonResume {
  work: WorkExperience[];
  basics: Basics;
  skills: string[];
  overview: string;
  projects: Project[];
  education: Education[];
  languages: Language[];
  certificates: Certificate[];
}
