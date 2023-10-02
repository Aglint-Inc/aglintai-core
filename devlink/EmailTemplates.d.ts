import * as React from "react";
import * as Types from "./types";

declare function EmailTemplates(props: {
  as?: React.ElementType;
  slotEmailTemplates?: Types.Devlink.Slot;
}): React.JSX.Element;
