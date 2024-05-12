import * as React from "react";
import * as Types from "./types";

declare function CompanyLocation(props: {
  as?: React.ElementType;
  textLocation?: React.ReactNode;
  onClickEdit?: Types.Devlink.RuntimeProps;
  onClickDelete?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
