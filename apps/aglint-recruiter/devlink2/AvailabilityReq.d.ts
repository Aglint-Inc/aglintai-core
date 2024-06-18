import * as React from "react";
import * as Types from "./types";

declare function AvailabilityReq(props: {
  as?: React.ElementType;
  slotPickSlotDay?: Types.Devlink.Slot;
  textDesc?: React.ReactNode;
  slotTtitle?: Types.Devlink.Slot;
  styleTextColor?: Types.Devlink.RuntimeProps;
  slotCompanyIcon?: Types.Devlink.Slot;
  slotFooter?: Types.Devlink.Slot;
}): React.JSX.Element;
