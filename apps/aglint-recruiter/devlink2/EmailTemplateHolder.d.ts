import * as React from "react";
import * as Types from "./types";

declare function EmailTemplateHolder(props: {
  as?: React.ElementType;
  onClickReload?: Types.Devlink.RuntimeProps;
  onClickEditTemplate?: Types.Devlink.RuntimeProps;
  slotEmail?: Types.Devlink.Slot;
  textHeader?: React.ReactNode;
}): React.JSX.Element;
