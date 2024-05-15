import * as React from "react";
import * as Types from "./types";

declare function NewSocialLinkPop(props: {
  as?: React.ElementType;
  slotSocialIcons?: Types.Devlink.Slot;
  slotSocialForms?: Types.Devlink.Slot;
  onClickCancel?: Types.Devlink.RuntimeProps;
  onClickAdd?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
