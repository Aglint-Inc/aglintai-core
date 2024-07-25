import * as React from "react";
import * as Types from "./types";

declare function CompanyLocation(props: {
  as?: React.ElementType;
  textLocationHeader?: React.ReactNode;
  onClickEdit?: Types.Devlink.RuntimeProps;
  onClickDelete?: Types.Devlink.RuntimeProps;
  textFullAddress?: React.ReactNode;
  textTimeZone?: React.ReactNode;
  isHeadQuaterVisible?: Types.Visibility.VisibilityConditions;
  isEditDeleteVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
