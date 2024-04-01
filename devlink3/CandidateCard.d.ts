import * as React from "react";
import * as Types from "./types";

declare function CandidateCard(props: {
  as?: React.ElementType;
  slotProfileImage?: Types.Devlink.Slot;
  textName?: React.ReactNode;
  textRole?: React.ReactNode;
  textMail?: React.ReactNode;
  onClickViewProfile?: Types.Devlink.RuntimeProps;
  isViewProfileVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
