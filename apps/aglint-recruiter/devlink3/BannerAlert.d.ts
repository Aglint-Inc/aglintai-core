import * as React from "react";
import * as Types from "./types";

declare function BannerAlert(props: {
  as?: React.ElementType;
  textBanner?: React.ReactNode;
  isDismiss?: Types.Visibility.VisibilityConditions;
  textButton?: React.ReactNode;
  onClickButton?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
