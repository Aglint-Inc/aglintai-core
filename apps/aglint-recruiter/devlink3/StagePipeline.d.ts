import * as React from "react";
import * as Types from "./types";

declare function StagePipeline(props: {
  as?: React.ElementType;
  color?: Types.Builtin.Text;
  textStageName?: React.ReactNode;
  textInterviewProgress?: React.ReactNode;
  slotIcon?: Types.Devlink.Slot;
  isLeft?: Types.Visibility.VisibilityConditions;
  isRight?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
