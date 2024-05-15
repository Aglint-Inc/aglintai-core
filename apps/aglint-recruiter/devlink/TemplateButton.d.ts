import * as React from "react";
import * as Types from "./types";

declare function TemplateButton(props: {
  as?: React.ElementType;
  textTemplateName?: React.ReactNode;
  onClickButton?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
