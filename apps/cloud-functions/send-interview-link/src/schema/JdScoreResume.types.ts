export type ResumeApiSampleType = {
  basics: Basics;
  work: Work[];
  education: Education[];
  certificates: Certificate[];
  skills: Skill[];
  languages: Language[];
  projects: Project[];
};

export type Basics = {
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

export type Location = {
  address: string;
  postalCode: string;
  city: string;
  country: string;
  region: string;
};

export type Profile = {
  network: string;
  username: string;
  url: string;
};

export type Certificate = {
  name: string;
  date: string;
  issuer: string;
  url: string;
};

export type Education = {
  institution: string;
  url: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string;
  score: string;
  courses: string[];
};

export type Language = {
  language: string;
  fluency: string;
};

export type Project = {
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  highlights: string[];
  url: string;
};

export type Skill = {
  name: string;
  level: string;
  keywords: string[];
};

export type Work = {
  name: string;
  position: string;
  url: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
  skills: string[];
};
