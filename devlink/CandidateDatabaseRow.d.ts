import * as React from "react";
import * as Types from "./types";

declare function CandidateDatabaseRow(props: {
  as?: React.ElementType;
  onClickCheck?: Types.Devlink.RuntimeProps;
  isChecked?: Types.Visibility.VisibilityConditions;
  slotNameAvatar?: Types.Devlink.Slot;
  textName?: React.ReactNode;
  textAppliedJob?: React.ReactNode;
  textEmail?: React.ReactNode;
  textLocation?: React.ReactNode;
  textPhone?: React.ReactNode;
}): React.JSX.Element;
