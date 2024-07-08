import { CustomJobParamters } from "../common.types";
import { Database } from "../schema.types";
import { Type } from "../utils.types";
import type { ViewType } from "./index.types";

export type CustomJobView = ViewType<"job_view", CustomJobViewAllParamters>;

type CustomJobViewAllParamters = CustomJobParamters & CustomJobViewParameters;

type CustomJobViewParameters = Type<
  Pick<
    Database["public"]["Views"]["job_view"]["Row"],
    "section_count" | "processing_count" | "flags"
  >,
  {
    section_count: CustomSectionCount;
    processing_count: CustomProcessingCount;
    flags: CustomFlag;
  }
>;

type ApplicationStatus = Database["public"]["Enums"]["application_status"];

type CustomSectionCount = { [id in ApplicationStatus]: number };

type ProcessingState = Database["public"]["Enums"]["resume_processing_state"];

type CustomProcessingCount = { [id in ProcessingState]: number };

type CustomFlag = { [id in ApplicationStatus]: boolean };
