import * as React from "react";
import * as Types from "./types";

declare function JobRole(props: {
  as?: React.ElementType;
  onClickEdit?: Types.Devlink.RuntimeProps;
  slotRoleList?: Types.Devlink.Slot;
}): React.JSX.Element;
