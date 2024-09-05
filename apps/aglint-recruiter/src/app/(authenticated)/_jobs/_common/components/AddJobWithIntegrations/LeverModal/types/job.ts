export type LeverJob = {
  id: string;
  text: string;
  state: string;
  distributionChannels: null;
  user: string;
  owner: string;
  hiringManager: string;
  categories: Categories;
  tags: any[];
  content: Content;
  country: string;
  followers: string[];
  reqCode: string;
  requisitionCodes: any[];
  urls: Urls;
  confidentiality: string;
  createdAt: number;
  updatedAt: number;
  workplaceType: string;
};

type Categories = {
  commitment: null;
  department: null;
  level: null;
  location: string;
  team: string;
  allLocations: string[];
};

type Content = {
  description: string;
  descriptionHtml: string;
  lists: any[];
  closing: string;
  closingHtml: string;
};

type Urls = {
  list: string;
  show: string;
  apply: string;
};
