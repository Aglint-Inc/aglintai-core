import * as React from "react";
import * as Types from "./types";

declare function SkillPill(props: {
  as?: React.ElementType;
  onClickRemove?: Types.Devlink.RuntimeProps;
  textSkill?: React.ReactNode;
}): React.JSX.Element;
