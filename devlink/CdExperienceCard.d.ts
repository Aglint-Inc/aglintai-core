import * as React from "react";
import * as Types from "./types";

declare function CdExperienceCard(props: {
  as?: React.ElementType;
  slotLogo?: Types.Devlink.Slot;
  isLogoVisible?: Types.Visibility.VisibilityConditions;
  textRole?: React.ReactNode;
  textDate?: React.ReactNode;
  isActive?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
