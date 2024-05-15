import * as React from "react";
import * as Types from "./types";

declare function TemplateStatus(props: {
  as?: React.ElementType;
  isActive?: Types.Visibility.VisibilityConditions;
  textActiveCandidatesNumber?: React.ReactNode;
}): React.JSX.Element;
