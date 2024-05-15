import * as React from "react";
import * as Types from "./types";

declare function LoginAtsInfo(props: {
  as?: React.ElementType;
  slotRadioButtons?: Types.Devlink.Slot;
  slotAdditionalInfo?: Types.Devlink.Slot;
  slotOthers?: Types.Devlink.Slot;
}): React.JSX.Element;
