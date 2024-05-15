import * as React from "react";
import * as Types from "./types";

declare function AshbyApiKey(props: {
  as?: React.ElementType;
  slotInput?: Types.Devlink.Slot;
  onClickContinue?: Types.Devlink.RuntimeProps;
  isApiWrong?: Types.Visibility.VisibilityConditions;
  slotPrimaryButton?: Types.Devlink.Slot;
}): React.JSX.Element;
