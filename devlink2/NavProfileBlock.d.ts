import * as React from "react";
import * as Types from "./types";

declare function NavProfileBlock(props: {
  as?: React.ElementType;
  onclickLogout?: Types.Devlink.RuntimeProps;
  onclickProfile?: Types.Devlink.RuntimeProps;
  slotProfileImage?: Types.Devlink.Slot;
  profileName?: React.ReactNode;
}): React.JSX.Element;
