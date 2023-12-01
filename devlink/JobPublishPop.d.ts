import * as React from "react";
import * as Types from "./types";

declare function JobPublishPop(props: {
  as?: React.ElementType;
  textLink?: React.ReactNode;
  onClickCopy?: Types.Devlink.RuntimeProps;
  onClickRevertChanges?: Types.Devlink.RuntimeProps;
  onClickPublish?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
