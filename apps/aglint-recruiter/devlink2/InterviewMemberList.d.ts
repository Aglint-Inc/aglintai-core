import * as React from "react";
import * as Types from "./types";

declare function InterviewMemberList(props: {
  as?: React.ElementType;
  textObjective?: React.ReactNode;
  textDepartment?: React.ReactNode;
  slotNewTabPill?: Types.Devlink.Slot;
  slotModuleContent?: Types.Devlink.Slot;
  onClickEdit?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
