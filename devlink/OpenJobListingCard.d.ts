import * as React from "react";
import * as Types from "./types";

declare function OpenJobListingCard(props: {
  as?: React.ElementType;
  textJobRole?: React.ReactNode;
  textLocation?: React.ReactNode;
  textWorkingType?: React.ReactNode;
  textCompanyType?: React.ReactNode;
  onClickApplyNow?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
