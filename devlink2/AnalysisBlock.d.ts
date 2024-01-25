import * as React from "react";
import * as Types from "./types";

declare function AnalysisBlock(props: {
  as?: React.ElementType;
  title?: React.ReactNode;
  description?: React.ReactNode;
  slotAnalysisPill?: Types.Devlink.Slot;
}): React.JSX.Element;
