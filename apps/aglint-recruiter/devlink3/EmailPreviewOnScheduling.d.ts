import * as React from "react";
import * as Types from "./types";

declare function EmailPreviewOnScheduling(props: {
  as?: React.ElementType;
  textSlotCount?: React.ReactNode;
  textEmailPreview?: React.ReactNode;
  slotEmailPreview?: Types.Devlink.Slot;
  slotSelectedScheduleOptions?: Types.Devlink.Slot;
  slotButton?: Types.Devlink.Slot;
  showSelectedSchedules?: Types.Visibility.VisibilityConditions;
  insertedIn?: Types.Builtin.Text;
}): React.JSX.Element;
