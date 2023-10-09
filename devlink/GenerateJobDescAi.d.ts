import * as React from "react";
import * as Types from "./types";

declare function GenerateJobDescAi(props: {
  as?: React.ElementType;
  isCompanyDetailsChecked?: Types.Visibility.VisibilityConditions;
  onClickCompanyDdetailsCheck?: Types.Devlink.RuntimeProps;
  onClickGenerate?: Types.Devlink.RuntimeProps;
  isGenerateDisable?: Types.Visibility.VisibilityConditions;
  textGenerateHeader?: React.ReactNode;
  isLoading?: Types.Visibility.VisibilityConditions;
  slotLottie?: Types.Devlink.Slot;
  textLabel1?: React.ReactNode;
  slotCheckBoxes?: Types.Devlink.Slot;
}): React.JSX.Element;
