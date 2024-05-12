import * as React from "react";
import * as Types from "./types";

declare function SwitchComp(props: {
  as?: React.ElementType;
  slotCompanyList?: Types.Devlink.Slot;
  onclickAddButton?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
