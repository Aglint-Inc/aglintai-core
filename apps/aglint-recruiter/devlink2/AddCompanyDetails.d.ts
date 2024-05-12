import * as React from "react";
import * as Types from "./types";

declare function AddCompanyDetails(props: {
  as?: React.ElementType;
  isCompanyLogo?: Types.Visibility.VisibilityConditions;
  slotLogo?: Types.Devlink.Slot;
  slotCompanyDetails?: Types.Devlink.Slot;
  isFetchSuccessful?: Types.Visibility.VisibilityConditions;
  isFetchFailed?: Types.Visibility.VisibilityConditions;
  onclickChangeLogo?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
