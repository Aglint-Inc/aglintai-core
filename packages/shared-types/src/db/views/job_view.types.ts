import type {
  CustomApplicationStatus,
  CustomJobParamters,
  CustomLocation,
} from "../common.types";
import type { Database } from "../schema.types";
import type { Custom } from "../utils.types";
import type { ViewType } from "./index.types";

export type CustomJobView = ViewType<"job_view", CustomJobViewAllParamters>;

type CustomJobViewAllParamters = CustomJobParamters & CustomJobViewParameters;

type CustomJobViewParameters = Custom<
  Pick<
    Database["public"]["Views"]["job_view"]["Row"],
    "section_count" | "processing_count" | "location"
  >,
  {
    section_count: CustomSectionCount;
    processing_count: CustomProcessingCount;
    application_match: CustomApplicationMatch;
    location?: CustomLocation;
  }
>;

type CustomSectionCount = { [id in CustomApplicationStatus]: number };

type ProcessingState = Database["public"]["Enums"]["resume_processing_state"];

type CustomProcessingCount = { [id in ProcessingState]: number };

type ApplicationMatch = Database["public"]["Enums"]["application_match"];

type CustomApplicationMatch = { [id in ApplicationMatch]: number };
