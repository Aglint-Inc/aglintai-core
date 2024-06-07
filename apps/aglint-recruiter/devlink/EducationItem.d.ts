import * as React from "react";
import * as Types from "./types";

declare function EducationItem(props: {
  as?: React.ElementType;
  textEducation?: React.ReactNode;
  textDate?: React.ReactNode;
  textSchool?: React.ReactNode;
  slotSchoolIcon?: Types.Devlink.Slot;
}): React.JSX.Element;
