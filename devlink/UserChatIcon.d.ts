import * as React from "react";
import * as Types from "./types";

declare function UserChatIcon(props: {
  as?: React.ElementType;
  textChat?: React.ReactNode;
  isViewResumeVisible?: Types.Visibility.VisibilityConditions;
  onClickViewResume?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
