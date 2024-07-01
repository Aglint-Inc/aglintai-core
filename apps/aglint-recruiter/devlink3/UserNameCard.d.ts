import * as React from "react";
import * as Types from "./types";

declare function UserNameCard(props: {
  as?: React.ElementType;
  slotAvatar?: Types.Devlink.Slot;
  textName?: React.ReactNode;
  textRole?: React.ReactNode;
}): React.JSX.Element;
