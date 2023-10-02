import * as React from "react";
import * as Types from "./types";

declare function EmailTemplates(props: {
  as?: React.ElementType;
  slotRejectedEmailForm?: Types.Devlink.Slot;
  slotThankyouApplyForm?: Types.Devlink.Slot;
  slotSelectedEmailForm?: Types.Devlink.Slot;
  slotInProcessEmailForm?: Types.Devlink.Slot;
}): React.JSX.Element;
