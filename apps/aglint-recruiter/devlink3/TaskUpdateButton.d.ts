import * as React from "react";
import * as Types from "./types";

declare function TaskUpdateButton(props: {
  as?: React.ElementType;
  onClickClose?: Types.Devlink.RuntimeProps;
  textTaskSelected?: React.ReactNode;
  onClickCloseTask?: Types.Devlink.RuntimeProps;
  onClickChangeStatus?: Types.Devlink.RuntimeProps;
  onClickChangeAssignee?: Types.Devlink.RuntimeProps;
  onClickUpdatePriority?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
