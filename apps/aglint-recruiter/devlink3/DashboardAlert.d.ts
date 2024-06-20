import * as React from "react";
import * as Types from "./types";

declare function DashboardAlert(props: {
  as?: React.ElementType;
  onClickBanner?: Types.Devlink.RuntimeProps;
  textTitile?: React.ReactNode;
  textShortDescription?: React.ReactNode;
  slotViewButton?: Types.Devlink.Slot;
}): React.JSX.Element;
