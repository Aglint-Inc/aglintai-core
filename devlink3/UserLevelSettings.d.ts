import * as React from "react";
import * as Types from "./types";

declare function UserLevelSettings(props: {
  as?: React.ElementType;
  slotTabContent?: Types.Devlink.Slot;
  slotDarkPill?: Types.Devlink.Slot;
  onClickClose?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
