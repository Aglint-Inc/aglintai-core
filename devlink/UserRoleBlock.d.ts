import * as React from "react";
import * as Types from "./types";

declare function UserRoleBlock(props: {
  as?: React.ElementType;
  roleName?: React.ReactNode;
  permissionsNumber?: React.ReactNode;
  onClickProps?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
