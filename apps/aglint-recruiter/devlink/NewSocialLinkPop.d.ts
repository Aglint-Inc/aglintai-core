import * as React from "react";
import * as Types from "./types";

declare function NewSocialLinkPop(props: {
  as?: React.ElementType;
  slotSocialForms?: Types.Devlink.Slot;
  onClickCancel?: Types.Devlink.RuntimeProps;
  onClickAdd?: Types.Devlink.RuntimeProps;
  slotButton?: Types.Devlink.Slot;
  slotClosePop?: Types.Devlink.Slot;
}): React.JSX.Element;
