import * as React from "react";
import * as Types from "./types";

declare function AgentPill(props: {
  as?: React.ElementType;
  isEmailAgentVisible?: Types.Visibility.VisibilityConditions;
  isPhoneAgentVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
