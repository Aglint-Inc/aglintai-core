import * as React from "react";
import * as Types from "./types";

declare function CandidateDatabase(props: {
  as?: React.ElementType;
  textShowingResult?: React.ReactNode;
  slotSearch?: Types.Devlink.Slot;
  slotDataTable?: Types.Devlink.Slot;
}): React.JSX.Element;
