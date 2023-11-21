import * as React from "react";
import * as Types from "./types";

declare function ChatboxBodyHeader(props: {
  as?: React.ElementType;
  name?: React.ReactNode;
  isApplied?: Types.Visibility.VisibilityConditions;
  email?: React.ReactNode;
  phoneNumber?: React.ReactNode;
  date?: React.ReactNode;
}): React.JSX.Element;
