import * as React from "react";
import * as Types from "./types";

declare function AssesmentModal(props: {
  as?: React.ElementType;
  onClickClose?: Types.Devlink.RuntimeProps;
  slotAvatarCard?: Types.Devlink.Slot;
  onClickChoose?: Types.Devlink.RuntimeProps;
  isWarningVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
