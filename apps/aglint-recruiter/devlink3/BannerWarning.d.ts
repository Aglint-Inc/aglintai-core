import * as React from "react";
import * as Types from "./types";

declare function BannerWarning(props: {
  as?: React.ElementType;
  textBanner?: React.ReactNode;
  onClickDismiss?: Types.Devlink.RuntimeProps;
  textButton?: React.ReactNode;
  onClickButton?: Types.Devlink.RuntimeProps;
  isDismiss?: Types.Visibility.VisibilityConditions;
  isButton?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
