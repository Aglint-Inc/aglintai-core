import * as React from "react";
import * as Types from "./types";

declare function BannerWarning(props: {
  as?: React.ElementType;
  textBanner?: React.ReactNode;
  slotButton?: Types.Devlink.Slot;
}): React.JSX.Element;
