import * as React from "react";
import * as Types from "./types";

declare function EmailTemplate(props: {
  as?: React.ElementType;
  onClickEdit?: Types.Devlink.RuntimeProps;
  textEmailHeaderCategory?: React.ReactNode;
  slotEmailPreviewImage?: Types.Devlink.Slot;
}): React.JSX.Element;
