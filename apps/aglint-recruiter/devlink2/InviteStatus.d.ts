import * as React from "react";
import * as Types from "./types";

declare function InviteStatus(props: {
  as?: React.ElementType;
  isInvited?: Types.Visibility.VisibilityConditions;
  isSubmitted?: Types.Visibility.VisibilityConditions;
  isNotInvited?: Types.Visibility.VisibilityConditions;
  textStatus?: React.ReactNode;
  textStatusTime?: React.ReactNode;
  isStatusTimeVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
