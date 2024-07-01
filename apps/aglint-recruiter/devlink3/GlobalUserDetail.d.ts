import * as React from "react";
import * as Types from "./types";

declare function GlobalUserDetail(props: {
  as?: React.ElementType;
  textName?: React.ReactNode;
  slotRole?: Types.Devlink.Slot;
  textTimeZone?: React.ReactNode;
  textRole?: React.ReactNode;
  isRoleVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
