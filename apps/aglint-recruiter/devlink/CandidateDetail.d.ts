import * as React from "react";
import * as Types from "./types";

declare function CandidateDetail(props: {
  as?: React.ElementType;
  slotIcon?: Types.Devlink.Slot;
  textTitle?: React.ReactNode;
  slotBody?: Types.Devlink.Slot;
  slotBadge?: Types.Devlink.Slot;
}): React.JSX.Element;
