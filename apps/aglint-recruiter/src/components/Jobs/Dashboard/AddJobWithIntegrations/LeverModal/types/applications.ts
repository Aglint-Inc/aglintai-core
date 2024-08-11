export type LeverApplication = {
  id: string;
  name: string;
  headline: string;
  contact: string;
  emails: string[];
  phones: Phone[];
  confidentiality: string;
  location: string;
  links: string[];
  createdAt: number;
  updatedAt: number;
  lastInteractionAt: number;
  lastAdvancedAt: number;
  snoozedUntil: number;
  archivedAt: null;
  archiveReason: null;
  stage: string;
  stageChanges: StageChange[];
  owner: string;
  tags: string[];
  sources: string[];
  origin: string;
  sourcedBy: string;
  applications: string[];
  resume: null;
  followers: string[];
  urls: Urls;
  dataProtection: DataProtection;
  isAnonymized: boolean;
};

type DataProtection = {
  store: Contact;
  contact: Contact;
};

type Contact = {
  allowed: boolean;
  expiresAt: number | null;
};

type Phone = {
  value: string;
};

type StageChange = {
  toStageId: string;
  toStageIndex: number;
  userId: string;
  updatedAt: number;
};

type Urls = {
  list: string;
  show: string;
};
