import * as React from "react";
import * as Types from "./types";

declare function CardWithNumber(props: {
  as?: React.ElementType;
  textTitle?: React.ReactNode;
  textNumber?: React.ReactNode;
  textNumberType?: React.ReactNode;
  textDescription?: React.ReactNode;
  slotEmpty?: Types.Devlink.Slot;
  isEmpty?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
