import * as React from "react";
import * as Types from "./types";

declare function EmailTemplateCards(props: {
  as?: React.ElementType;
  onClickApplicationRecieved?: Types.Devlink.RuntimeProps;
  onClickEdit?: Types.Devlink.RuntimeProps;
  textDescription?: React.ReactNode;
  textTitle?: React.ReactNode;
  isActive?: Types.Visibility.VisibilityConditions;
  slotBadge?: Types.Devlink.Slot;
}): React.JSX.Element;
