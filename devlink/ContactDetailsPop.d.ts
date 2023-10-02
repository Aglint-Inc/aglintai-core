import * as React from "react";
import * as Types from "./types";

declare function ContactDetailsPop(props: {
  as?: React.ElementType;
  onClickClose?: Types.Devlink.RuntimeProps;
  slotContactDetails?: Types.Devlink.Slot;
  onClickDiscard?: Types.Devlink.RuntimeProps;
  onClickApplyChanges?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
