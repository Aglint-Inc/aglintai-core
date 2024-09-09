import * as React from "react";
import * as Types from "./types";

declare function MenuOptionList(props: {
  as?: React.ElementType;
  textOption?: React.ReactNode;
  iconName?: React.ReactNode;
  onClickMenu?: Types.Devlink.RuntimeProps;
  textColor?: Types.Builtin.Text;
  iconColor?: Types.Builtin.Text;
}): React.JSX.Element;
