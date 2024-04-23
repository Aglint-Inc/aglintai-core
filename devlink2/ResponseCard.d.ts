import * as React from "react";
import * as Types from "./types";

declare function ResponseCard(props: {
  as?: React.ElementType;
  slotIcon?: Types.Devlink.Slot;
  textQuestion?: React.ReactNode;
  textAnswer?: React.ReactNode;
}): React.JSX.Element;
