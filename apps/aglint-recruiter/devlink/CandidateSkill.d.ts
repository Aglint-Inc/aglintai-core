import * as React from "react";
import * as Types from "./types";

declare function CandidateSkill(props: {
  as?: React.ElementType;
  slotCandidateSkill?: Types.Devlink.Slot;
  onClickIcons?: Types.Devlink.RuntimeProps;
  slotSkillsScore?: Types.Devlink.Slot;
  propsStyle?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
