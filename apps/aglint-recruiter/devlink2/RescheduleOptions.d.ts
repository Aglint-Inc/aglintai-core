import * as React from "react";
import * as Types from "./types";

declare function RescheduleOptions(props: {
  as?: React.ElementType;
  onClickSelfScheduling?: Types.Devlink.RuntimeProps;
  onClickRequestAvailability?: Types.Devlink.RuntimeProps;
  onClickEmailAgent?: Types.Devlink.RuntimeProps;
  onClickPhoneAgent?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
