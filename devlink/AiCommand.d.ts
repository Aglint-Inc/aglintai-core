import * as React from "react";
import * as Types from "./types";

declare function AiCommand(props: {
  as?: React.ElementType;
  onClickAiCommand?: Types.Devlink.RuntimeProps;
  onClickCandidateName?: Types.Devlink.RuntimeProps;
  isAiCommandActive?: Types.Visibility.VisibilityConditions;
  isCandidateNameActive?: Types.Visibility.VisibilityConditions;
  onClickRecruiterName?: Types.Devlink.RuntimeProps;
  isRecruiterActive?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
