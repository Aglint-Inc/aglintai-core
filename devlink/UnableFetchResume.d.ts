import * as React from "react";
import * as Types from "./types";

declare function UnableFetchResume(props: {
  as?: React.ElementType;
  onClickViewResume?: Types.Devlink.RuntimeProps;
  onClickDownloadResume?: Types.Devlink.RuntimeProps;
  propsLink?: Types.Basic.Link;
  slotDownload?: Types.Devlink.Slot;
}): React.JSX.Element;
