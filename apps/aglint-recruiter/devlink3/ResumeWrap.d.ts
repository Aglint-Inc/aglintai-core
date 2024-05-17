import * as React from "react";
import * as Types from "./types";

declare function ResumeWrap(props: {
  as?: React.ElementType;
  textName?: React.ReactNode;
  slotBookmark?: Types.Devlink.Slot;
  onClickUp?: Types.Devlink.RuntimeProps;
  onClickDown?: Types.Devlink.RuntimeProps;
  onClickClose?: Types.Devlink.RuntimeProps;
  slotResume?: Types.Devlink.Slot;
}): React.JSX.Element;
