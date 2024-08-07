export type Message = {
  content: string;
  type: "user" | "assistant";
};

export type ApiBodyAgentSupervisor = {
  recruiter_id: string;
  history: Message[];
  user_id: string;
  jobs?: {
    id: string;
    name: string;
  }[];
  sessions?: {
    id: string;
    name: string;
  }[];
  applications?: {
    id: string;
    name: string;
  }[];
};
