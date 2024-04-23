import * as React from "react";
import * as Types from "./types";

declare function GraphBlock(props: {
  as?: React.ElementType;
  slotDarkPillLocation?: Types.Devlink.Slot;
  slotLocationGraph?: Types.Devlink.Slot;
  dummyImage?: Types.Asset.Image;
  textGraphTitle?: React.ReactNode;
}): React.JSX.Element;
