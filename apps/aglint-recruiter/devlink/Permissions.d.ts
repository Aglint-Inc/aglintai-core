import * as React from "react";
import * as Types from "./types";

declare function Permissions(props: {
  as?: React.ElementType;
  textTitle?: React.ReactNode;
  textDescription?: React.ReactNode;
  slotToggleWithText?: Types.Devlink.Slot;
}): React.JSX.Element;
