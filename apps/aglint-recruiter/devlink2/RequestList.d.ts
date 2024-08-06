import * as React from "react";
import * as Types from "./types";

declare function RequestList(props: {
  as?: React.ElementType;
  iconName?: React.ReactNode;
  textTitle?: React.ReactNode;
  slotBadge?: Types.Devlink.Slot;
  textCount?: React.ReactNode;
  onClickCard?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
