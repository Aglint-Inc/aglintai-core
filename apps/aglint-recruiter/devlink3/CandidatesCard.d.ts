import * as React from "react";
import * as Types from "./types";

declare function CandidatesCard(props: {
  as?: React.ElementType;
  isLinks?: Types.Visibility.VisibilityConditions;
  onClickResendInvite?: Types.Devlink.RuntimeProps;
  onClickCopyInvite?: Types.Devlink.RuntimeProps;
  textName?: React.ReactNode;
  textRole?: React.ReactNode;
  textMail?: React.ReactNode;
  slotImage?: Types.Devlink.Slot;
}): React.JSX.Element;
