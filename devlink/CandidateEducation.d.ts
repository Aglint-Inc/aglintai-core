import * as React from "react";
import * as Types from "./types";

declare function CandidateEducation(props: {
  as?: React.ElementType;
  slotEducationCard?: Types.Devlink.Slot;
  onClickIcons?: Types.Devlink.RuntimeProps;
  onClickCard?: Types.Devlink.RuntimeProps;
  propsCollapse?: Types.Devlink.RuntimeProps;
  slotEducationScore?: Types.Devlink.Slot;
}): React.JSX.Element;
