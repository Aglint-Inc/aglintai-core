import * as React from "react";
import * as Types from "./types";

declare function CdEditQuerry(props: {
  as?: React.ElementType;
  onClickResetQuery?: Types.Devlink.RuntimeProps;
  slotApplyFilterButton?: Types.Devlink.Slot;
  slotLocationInput?: Types.Devlink.Slot;
  slotLocationSuggestion?: Types.Devlink.Slot;
  slotProfileInput?: Types.Devlink.Slot;
  slotJobInput?: Types.Devlink.Slot;
  slotJobSuggestion?: Types.Devlink.Slot;
  slotLevelInput?: Types.Devlink.Slot;
  slotCompanySizeInput?: Types.Devlink.Slot;
  slotPreferredCompaniesInput?: Types.Devlink.Slot;
  slotPreferredCompanySuggestion?: Types.Devlink.Slot;
}): React.JSX.Element;
