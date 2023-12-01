// Define a type for date information
export type DateInfoType = {
  year: number;
  month: number;
};

// Define a type for school information
type School = {
  start: DateInfoType;
  end: DateInfoType;
  field: string;
  degree: string;
  institution: string;
  gpa: number | null;
};

// Define a type for positions
type Position = {
  start: DateInfoType;
  end: DateInfoType | null;
  org: string;
  title: string;
  summary: string;
  location: string;
};

// Define the main type for the entire structure
export type JsonResume = {
  basics: {
    email: string;
    phone: string;
    lastName: string;
    linkedIn: string;
    location: string;
    firstName: string;
    currentCompany: string;
    currentJobTitle: string;
  };
  skills: string[];
  schools: School[];
  overview: string;
  projects: any[]; // Adjust the type as needed
  languages: any[]; // Adjust the type as needed
  positions: Position[];
  certificates: any[]; // Adjust the type as needed
};
