import * as React from "react";
import * as Types from "./types";

declare function TranscriptCard(props: {
  as?: React.ElementType;
  slotAgent?: Types.Devlink.Slot;
  textScript?: React.ReactNode;
  isBackgroundActive?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
