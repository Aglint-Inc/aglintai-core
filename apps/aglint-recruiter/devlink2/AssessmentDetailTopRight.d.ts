import * as React from "react";
import * as Types from "./types";

declare function AssessmentDetailTopRight(props: {
  as?: React.ElementType;
  slotAssessmentDetail?: Types.Devlink.Slot;
  slotAssessmentLevel?: Types.Devlink.Slot;
  slotAssessmentStatus?: Types.Devlink.Slot;
  onClickEdit?: Types.Devlink.RuntimeProps;
  onClickDuplicate?: Types.Devlink.RuntimeProps;
  onClickDelete?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
