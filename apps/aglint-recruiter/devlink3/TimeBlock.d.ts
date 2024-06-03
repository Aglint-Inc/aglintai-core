import * as React from "react";
import * as Types from "./types";

declare function TimeBlock(props: {
  as?: React.ElementType;
  textDateRange?: React.ReactNode;
  onClickEditDateRange?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
