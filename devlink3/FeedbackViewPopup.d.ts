import * as React from "react";
import * as Types from "./types";

declare function FeedbackViewPopup(props: {
  as?: React.ElementType;
  slotAvatarWithName?: Types.Devlink.Slot;
  onClickClose?: Types.Devlink.RuntimeProps;
  textRecomendation?: React.ReactNode;
  textObjective?: React.ReactNode;
  onClickNext?: Types.Devlink.RuntimeProps;
  onClickPrev?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
