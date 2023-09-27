import * as React from "react";
import * as Types from "./types";

declare function JobDetailLeft(props: {
  as?: React.ElementType;
  textCompany?: React.ReactNode;
  slotCompanyImage?: Types.Devlink.Slot;
  textJobDescription?: React.ReactNode;
  slotRequiredSkills?: Types.Devlink.Slot;
  slotJobTitle?: Types.Devlink.Slot;
  slotJobLocation?: Types.Devlink.Slot;
  slotWorkplaceType?: Types.Devlink.Slot;
  slotJobType?: Types.Devlink.Slot;
  slotExperience?: Types.Devlink.Slot;
}): React.JSX.Element;
