import * as React from "react";
import * as Types from "./types";

declare function UserTranscript(props: {
  as?: React.ElementType;
  slotUserImage?: Types.Devlink.Slot;
  userTextName?: React.ReactNode;
  slotUserPlayButton?: Types.Devlink.Slot;
  textAnswer?: React.ReactNode;
}): React.JSX.Element;
