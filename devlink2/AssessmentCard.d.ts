import * as React from "react";
import * as Types from "./types";

declare function AssessmentCard(props: {
  as?: React.ElementType;
  slotAssessmentType?: Types.Devlink.Slot;
  textAssessmentName?: React.ReactNode;
  slotDurationAndLevel?: Types.Devlink.Slot;
  textDescription?: React.ReactNode;
  slotAssessmentStatus?: Types.Devlink.Slot;
  onClickCard?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
