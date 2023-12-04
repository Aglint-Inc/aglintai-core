import * as React from "react";
import * as Types from "./types";

declare function ConnectMailModal(props: {
  as?: React.ElementType;
  onClickGmail?: Types.Devlink.RuntimeProps;
  onClickOutlook?: Types.Devlink.RuntimeProps;
  onClickClose?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
