import * as React from "react";
import * as Types from "./types";

declare function SignUpPage(props: {
  as?: React.ElementType;
  slotSignUpForm?: Types.Devlink.Slot;
  onClickGoogleButton?: Types.Devlink.RuntimeProps;
  onClickLinkedInButton?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
