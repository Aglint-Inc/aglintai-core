import * as React from "react";
import * as Types from "./types";

declare function SignInPage(props: {
  as?: React.ElementType;
  slotSignInForm?: Types.Devlink.Slot;
  onClickLinkedInButton?: Types.Devlink.RuntimeProps;
  onClickGoogleButton?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
