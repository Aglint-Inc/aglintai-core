import { CustomEmailTypes } from "../common.types";
import { TableType } from "./index.types";

export type CustomCompanyEmailTemplate = TableType<
  "company_email_template",
  {
    type: CustomEmailTypes;
  }
>;
