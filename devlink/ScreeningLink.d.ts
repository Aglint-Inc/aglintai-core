import * as React from "react";
import * as Types from "./types";

declare function ScreeningLink(props: {
  as?: React.ElementType;
  textLink?: React.ReactNode;
  onClickCopy?: Types.Devlink.RuntimeProps;
  onClickLinkedin?: Types.Devlink.RuntimeProps;
  onClickMail?: Types.Devlink.RuntimeProps;
  onClickScreeningSetting?: Types.Devlink.RuntimeProps;
  onClickCustomizeInterviewScreen?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
