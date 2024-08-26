import * as React from "react";
import * as Types from "./types";

declare function InterviewWorkloadList(props: {
  as?: React.ElementType;
  slotWorkloadGraph?: Types.Devlink.Slot;
  slotImage?: Types.Devlink.Slot;
  textName?: React.ReactNode;
  textRole?: React.ReactNode;
}): React.JSX.Element;
