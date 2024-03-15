import * as React from "react";
import * as Types from "./types";

declare function DayOff(props: {
  as?: React.ElementType;
  textDate?: React.ReactNode;
  onClickRemove?: Types.Devlink.RuntimeProps;
  textDaysOffName?: React.ReactNode;
  onClickEdit?: Types.Devlink.RuntimeProps;
  isEditVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
