import * as React from "react";
import * as Types from "./types";

declare function JdAnalysis(props: {
  as?: React.ElementType;
  bgColorProps?: Types.Devlink.RuntimeProps;
  slotExperienceScore?: Types.Devlink.Slot;
  slotSkillScore?: Types.Devlink.Slot;
  slotEducationScore?: Types.Devlink.Slot;
  textSkillDesc?: React.ReactNode;
  textExperienceDesc?: React.ReactNode;
  textEducationDesc?: React.ReactNode;
  propsCollapse?: Types.Devlink.RuntimeProps;
  onClickIcons?: Types.Devlink.RuntimeProps;
  onClickCard?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
