import * as React from "react";
import * as Types from "./types";

declare function DisconnectInterviewModal(props: {
  as?: React.ElementType;
  isDisconnectVisible?: Types.Visibility.VisibilityConditions;
  isLoadingVisible?: Types.Visibility.VisibilityConditions;
  slotLoaderLottie?: Types.Devlink.Slot;
  onClickDisconnect?: Types.Devlink.RuntimeProps;
  onClickClose?: Types.Devlink.RuntimeProps;
  onClickCancel?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
