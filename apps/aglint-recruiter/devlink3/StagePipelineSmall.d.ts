import * as React from "react";
import * as Types from "./types";

declare function StagePipelineSmall(props: {
  as?: React.ElementType;
  showText?: Types.Visibility.VisibilityConditions;
  slotIcon?: Types.Devlink.Slot;
  color?: Types.Builtin.Text;
  isLeft?: Types.Visibility.VisibilityConditions;
  isRight?: Types.Visibility.VisibilityConditions;
  textStageName?: React.ReactNode;
  iconName?: React.ReactNode;
}): React.JSX.Element;
