import * as React from "react";
import * as Types from "./types";

declare function GreenhouseApiKey(props: {
  as?: React.ElementType;
  slotInput?: Types.Devlink.Slot;
  onClickContinue?: Types.Devlink.RuntimeProps;
  isApiWrong?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
