import * as React from "react";
import * as Types from "./types";

declare function SublinksJobs(props: {
  as?: React.ElementType;
  isSearchJobs?: Types.Visibility.VisibilityConditions;
  isJobTracker?: Types.Visibility.VisibilityConditions;
  isEmailFollowups?: Types.Visibility.VisibilityConditions;
  isReminder?: Types.Visibility.VisibilityConditions;
  isContacts?: Types.Visibility.VisibilityConditions;
  isOrganisation?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
