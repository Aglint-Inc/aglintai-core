import { CustomJobParamters, CustomLocation } from "../common.types";
import { Database } from "../schema.types";
import { Custom } from "../utils.types";
import type { ViewType } from "./index.types";

export type CustomJobView = ViewType<"job_view", CustomJobViewAllParamters>;

type CustomJobViewAllParamters = CustomJobParamters & CustomJobViewParameters;

type CustomJobViewParameters = Custom<
  Pick<
    Database["public"]["Views"]["job_view"]["Row"],
    "section_count" | "processing_count" | "flags" | "location"
  >,
  {
    section_count: CustomSectionCount;
    processing_count: CustomProcessingCount;
    flags: CustomFlag;
    application_match: CustomApplicationMatch;
    location?: CustomLocation;
  }
>;

type ApplicationStatus = Database["public"]["Enums"]["application_status"];

type CustomSectionCount = { [id in ApplicationStatus]: number };

type ProcessingState = Database["public"]["Enums"]["resume_processing_state"];

type CustomProcessingCount = { [id in ProcessingState]: number };

type CustomFlag = { [id in ApplicationStatus]: boolean };

type ApplicationMatch = Database["public"]["Enums"]["application_match"];

type CustomApplicationMatch = { [id in ApplicationMatch]: number };
