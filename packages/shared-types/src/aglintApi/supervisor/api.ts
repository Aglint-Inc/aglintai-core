import { FunctionNames, MetadataForFunction } from "./functions";

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
  is_test?: boolean;
};

export type CallBackAll = {
  [T in FunctionNames]: {
    function_name: T;
    payload: MetadataForFunction<T>;
    called_at: string;
    links?: Link[];
  };
}[FunctionNames];

export type CallBack<T extends FunctionNames> = {
  function_name: T;
  payload: MetadataForFunction<T>;
  called_at: string;
  links?: Link[];
};

type Link = {
  replace: string;
  with: string;
};
