import * as React from "react";
import * as Types from "./types";

declare function GeneralBanner(props: {
  as?: React.ElementType;
  textHeading?: React.ReactNode;
  slotHeadingIcon?: Types.Devlink.Slot;
  textDesc?: React.ReactNode;
  titleColorProps?: Types.Devlink.RuntimeProps;
  slotButton?: Types.Devlink.Slot;
  color?: Types.Builtin.Text;
}): React.JSX.Element;
