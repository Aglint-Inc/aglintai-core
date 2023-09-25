import * as React from "react";
import * as Types from "./types";

declare function SublinksResume(props: {
  as?: React.ElementType;
  isMyResume?: Types.Visibility.VisibilityConditions;
  isMyCoverLetter?: Types.Visibility.VisibilityConditions;
  isFavourites?: Types.Visibility.VisibilityConditions;
  isJdmatch?: Types.Visibility.VisibilityConditions;
  isResumeAnalysis?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
