import * as React from "react";
import * as Types from "./types";

declare function SkillsGenerate(props: {
  as?: React.ElementType;
  slotGenerateSkill?: Types.Devlink.Slot;
  textDescription?: React.ReactNode;
}): React.JSX.Element;
