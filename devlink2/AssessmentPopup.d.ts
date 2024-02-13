import * as React from "react";
import * as Types from "./types";

declare function AssessmentPopup(props: {
  as?: React.ElementType;
  textPopupTitle?: React.ReactNode;
  slotDescriptionTextarea?: React.ReactNode;
  slotSelectionDropdown?: React.ReactNode;
  slotInputName?: React.ReactNode;
  slotButton?: Types.Devlink.Slot;
  slotAssesmentLevel?: Types.Devlink.Slot;
  onClickClose?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
