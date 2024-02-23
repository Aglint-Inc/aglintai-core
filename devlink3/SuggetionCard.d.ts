import * as React from "react";
import * as Types from "./types";

declare function SuggetionCard(props: {
  as?: React.ElementType;
  onClickCard?: Types.Devlink.RuntimeProps;
  textSuggestion?: React.ReactNode;
}): React.JSX.Element;
