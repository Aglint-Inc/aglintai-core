import * as React from "react";
import * as Types from "./types";

declare function UploadedResume(props: {
  as?: React.ElementType;
  textCountDocument?: React.ReactNode;
  slotPrimaryButton?: Types.Devlink.Slot;
  slotUploadResumeList?: Types.Devlink.Slot;
}): React.JSX.Element;
