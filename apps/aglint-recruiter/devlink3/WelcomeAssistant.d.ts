import * as React from "react";
import * as Types from "./types";

declare function WelcomeAssistant(props: {
  as?: React.ElementType;
  onClickScheduler?: Types.Devlink.RuntimeProps;
  onClickSourcing?: Types.Devlink.RuntimeProps;
  onClickScreening?: Types.Devlink.RuntimeProps;
  onClickJobAssistant?: Types.Devlink.RuntimeProps;
  isSourcingVisible?: Types.Visibility.VisibilityConditions;
  isScreeningVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
