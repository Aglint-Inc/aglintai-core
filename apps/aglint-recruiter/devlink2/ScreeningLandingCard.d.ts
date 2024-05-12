import * as React from "react";
import * as Types from "./types";

declare function ScreeningLandingCard(props: {
  as?: React.ElementType;
  textTitle?: React.ReactNode;
  textQuestionCount?: React.ReactNode;
  onClickCard?: Types.Devlink.RuntimeProps;
  isActive?: Types.Visibility.VisibilityConditions;
  isChange?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
