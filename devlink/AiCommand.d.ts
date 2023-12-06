import * as React from "react";
import * as Types from "./types";

declare function AiCommand(props: {
  as?: React.ElementType;
  onClickAiCommand?: Types.Devlink.RuntimeProps;
  onClickCandidateName?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
