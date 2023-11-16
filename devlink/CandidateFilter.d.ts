import * as React from "react";
import * as Types from "./types";

declare function CandidateFilter(props: {
  as?: React.ElementType;
  onClickResetFilter?: Types.Devlink.RuntimeProps;
  slotButtonPrimarySmall?: Types.Devlink.Slot;
  slotProfileInput?: Types.Devlink.Slot;
  slotCurrentJobInput?: Types.Devlink.Slot;
  slotJobRole?: Types.Devlink.Slot;
  slotLocationInput?: Types.Devlink.Slot;
  slotLocationSuggestion?: Types.Devlink.Slot;
  slotLanguageInput?: Types.Devlink.Slot;
  slotLanguageSuggestion?: Types.Devlink.Slot;
  slotMinExperienceInput?: Types.Devlink.Slot;
  slotMaxExperienceInput?: Types.Devlink.Slot;
  slotUniversityInput?: Types.Devlink.Slot;
  slotPreferredCompanyInput?: Types.Devlink.Slot;
  slotExcludedCompanyInput?: Types.Devlink.Slot;
  slotUniversitySuggestion?: Types.Devlink.Slot;
  slotPreferredSuggestion?: Types.Devlink.Slot;
  slotExcludedSuggestion?: Types.Devlink.Slot;
}): React.JSX.Element;
