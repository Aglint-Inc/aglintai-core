import * as React from "react";
import * as Types from "./types";

declare function CompanyListingLinks(props: {
  as?: React.ElementType;
  textLinkName?: React.ReactNode;
  slotIcon?: Types.Devlink.Slot;
  onClickLink?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
