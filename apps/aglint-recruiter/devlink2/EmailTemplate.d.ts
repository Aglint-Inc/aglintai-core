import * as React from "react";
import * as Types from "./types";

declare function EmailTemplate(props: {
  as?: React.ElementType;
  textEmailHeaderCategory?: React.ReactNode;
  onClickEdit?: Types.Devlink.RuntimeProps;
  slotEmailPreviewImage?: Types.Devlink.Slot;
}): React.JSX.Element;
