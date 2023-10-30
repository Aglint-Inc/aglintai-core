import * as React from "react";
import * as Types from "./types";

declare function AssesmentSetting(props: {
  as?: React.ElementType;
  slotAvatarVideo?: Types.Devlink.Slot;
  textAvatarName?: React.ReactNode;
  onClickChangeAvatar?: Types.Devlink.RuntimeProps;
  slotToggleButton?: Types.Devlink.Slot;
  onClickToggle?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
