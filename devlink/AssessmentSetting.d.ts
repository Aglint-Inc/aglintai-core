import * as React from "react";
import * as Types from "./types";

declare function AssessmentSetting(props: {
  as?: React.ElementType;
  slotExpirationInput?: Types.Devlink.Slot;
  slotRetrysCount?: Types.Devlink.Slot;
  slotSwitchAudioVideo?: Types.Devlink.Slot;
  slotToggleAssessment?: Types.Devlink.Slot;
}): React.JSX.Element;
