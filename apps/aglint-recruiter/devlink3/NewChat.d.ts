import * as React from "react";
import * as Types from "./types";

declare function NewChat(props: {
  as?: React.ElementType;
  onClickSchedulerAgent?: Types.Devlink.RuntimeProps;
  slotSuggetionCard?: Types.Devlink.Slot;
  slotIcon?: Types.Devlink.Slot;
  textTitle?: React.ReactNode;
}): React.JSX.Element;
