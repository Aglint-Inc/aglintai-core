import * as React from "react";
import * as Types from "./types";

declare function CsvListItem(props: {
  as?: React.ElementType;
  slotIcon?: Types.Devlink.Slot;
  candidateName?: React.ReactNode;
  linkedIn?: React.ReactNode;
  email?: React.ReactNode;
  phone?: React.ReactNode;
  listItemProps?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
