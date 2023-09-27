import * as React from "react";
import * as Types from "./types";

declare function JobPublished(props: {
  as?: React.ElementType;
  slotLogo?: Types.Devlink.Slot;
  textRole?: React.ReactNode;
  textCompany?: React.ReactNode;
  onClickPublishJob?: Types.Devlink.RuntimeProps;
  isJobPublished?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
