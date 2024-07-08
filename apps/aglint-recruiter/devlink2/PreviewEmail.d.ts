import * as React from "react";
import * as Types from "./types";

declare function PreviewEmail(props: {
  as?: React.ElementType;
  textTitle?: React.ReactNode;
  slotContent?: Types.Devlink.Slot;
  slotClose?: Types.Devlink.Slot;
}): React.JSX.Element;
