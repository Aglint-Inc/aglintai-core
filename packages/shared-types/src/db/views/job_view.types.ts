import { CustomJobParamters } from "../common.types";
import { Database } from "../schema.types";
import { Type } from "../utils.types";
import type { ViewType } from "./index.types";

export type CustomJobView = ViewType<"job_view", CustomJobViewAllParamters>;

type CustomJobViewAllParamters = CustomJobParamters & CustomJobViewParameters;

type CustomJobViewParameters = Type<
  Database["public"]["Views"]["job_view"]["Row"],
  {
    section_count: CustomSectionCount;
    processing_count: CustomProcessingCount;
    flags: CustomFlag;
  }
>;

type ApplicationStatus = Database["public"]["Enums"]["application_status"];

type CustomSectionCount = { [id in keyof ApplicationStatus]: number };

type ProcessingState = Database["public"]["Enums"]["resume_processing_state"];

type CustomProcessingCount = { [id in keyof ProcessingState]: number };

type CustomFlag = { [id in keyof ApplicationStatus]: boolean };
