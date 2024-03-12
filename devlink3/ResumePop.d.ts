import * as React from "react";
import * as Types from "./types";

declare function ResumePop(props: {
  as?: React.ElementType;
  onClickResume?: Types.Devlink.RuntimeProps;
  onClickClose?: Types.Devlink.RuntimeProps;
  textResumeWarning?: React.ReactNode;
  textDescription?: React.ReactNode;
}): React.JSX.Element;
