import * as React from "react";
import * as Types from "./types";

declare function GenerateJobDescAi(props: {
  as?: React.ElementType;
  isCompanyDetailsChecked?: Types.Visibility.VisibilityConditions;
  onClickCompanyDdetailsCheck?: Types.Devlink.RuntimeProps;
  onClickGenerate?: Types.Devlink.RuntimeProps;
  onClickBenefitsCheck?: Types.Devlink.RuntimeProps;
  onClickValuesCheck?: Types.Devlink.RuntimeProps;
  isBenefitsChecked?: Types.Visibility.VisibilityConditions;
  isValuesChecked?: Types.Visibility.VisibilityConditions;
  isGenerateDisable?: Types.Visibility.VisibilityConditions;
  textGenerateHeader?: React.ReactNode;
  isLoading?: Types.Visibility.VisibilityConditions;
  isBenefitsNotSpecified?: Types.Visibility.VisibilityConditions;
  isValuesNotSpecified?: Types.Visibility.VisibilityConditions;
  slotLottie?: Types.Devlink.Slot;
  textLabel1?: React.ReactNode;
  textLabel2?: React.ReactNode;
  textLabel3?: React.ReactNode;
}): React.JSX.Element;
