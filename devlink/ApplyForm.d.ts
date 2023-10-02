import * as React from "react";
import * as Types from "./types";

declare function ApplyForm(props: {
  as?: React.ElementType;
  onClickEditUserInfo?: Types.Devlink.RuntimeProps;
  onClickEditUserExperience?: Types.Devlink.RuntimeProps;
  slotQuestions?: Types.Devlink.Slot;
  onClickText?: Types.Devlink.RuntimeProps;
  onClickYesNo?: Types.Devlink.RuntimeProps;
  onClickMultipleChoice?: Types.Devlink.RuntimeProps;
  onClickFileUpload?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
