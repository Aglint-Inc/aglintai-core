import * as React from "react";
import * as Types from "./types";

declare function JobsListingCard(props: {
  as?: React.ElementType;
  textJobRole?: React.ReactNode;
  textCompanyLocation?: React.ReactNode;
  slotCompanyLogo?: Types.Devlink.Slot;
  textPostedDate?: React.ReactNode;
  applicantCount?: React.ReactNode;
  interviewingCount?: React.ReactNode;
  shortlistedCount?: React.ReactNode;
  slotPostedCompany?: Types.Devlink.Slot;
  postedCompanyName?: React.ReactNode;
  bgColorProps?: Types.Devlink.RuntimeProps;
  textJobsStatus?: React.ReactNode;
  textColorProps?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
