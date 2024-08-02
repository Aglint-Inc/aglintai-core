import * as React from "react";
import * as Types from "./types";

declare function PlanProgress(props: {
  as?: React.ElementType;
  status1?: Types.Builtin.Text;
  status2?: Types.Builtin.Text;
  status3?: Types.Builtin.Text;
}): React.JSX.Element;
