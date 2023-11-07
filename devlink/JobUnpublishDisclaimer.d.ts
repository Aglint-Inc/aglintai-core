import * as React from "react";
import * as Types from "./types";

declare function JobUnpublishDisclaimer(props: {
  as?: React.ElementType;
  onClickPreview?: Types.Devlink.RuntimeProps;
  onClickDiscardChanges?: Types.Devlink.RuntimeProps;
  slotButtonPrimaryRegular?: Types.Devlink.Slot;
  isDiscardVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
