import * as React from "react";
import * as Types from "./types";

declare function ImportJobCard(props: {
  as?: React.ElementType;
  slotCompanyLogo?: Types.Devlink.Slot;
  textHeader?: React.ReactNode;
  textDescription?: React.ReactNode;
  bgColorProps?: Types.Devlink.RuntimeProps;
  onClickCard?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
