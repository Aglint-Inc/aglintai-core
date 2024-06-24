import * as React from "react";
import * as Types from "./types";

declare function PhoneScreeningTopRight(props: {
  as?: React.ElementType;
  slotSearchInput?: Types.Devlink.Slot;
  onClickAllCandidates?: Types.Devlink.RuntimeProps;
  onClickNewScreening?: Types.Devlink.RuntimeProps;
  slotButton?: Types.Devlink.Slot;
}): React.JSX.Element;
