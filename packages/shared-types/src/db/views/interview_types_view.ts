import type { ViewType } from "./index.types";

export type CustomInterviewTypesView = ViewType<
  "interview_types_view",
  {
    users: {
      user_id: string;
      first_name: string;
      last_name: string;
      email: string;
      profile_image: string;
      position: string;
    }[];
  }
>;
