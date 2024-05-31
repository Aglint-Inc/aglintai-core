import * as React from "react";
import * as Types from "./types";

declare function InstructionBlock(props: {
  as?: React.ElementType;
  isEditButton?: Types.Visibility.VisibilityConditions;
  slotInstruction?: Types.Devlink.Slot;
  isInstructionEmpty?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
