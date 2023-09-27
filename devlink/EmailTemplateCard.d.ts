import * as React from "react";
import * as Types from "./types";

declare function EmailTemplateCard(props: {
  as?: React.ElementType;
  slotTemplateImage?: Types.Devlink.Slot;
  textEmailTemplateCategory?: React.ReactNode;
  textUsedByCount?: React.ReactNode;
  onClickViewEdit?: Types.Devlink.RuntimeProps;
  onClickDuplicate?: Types.Devlink.RuntimeProps;
  onClickDelete?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
