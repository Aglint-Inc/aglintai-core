import * as React from "react";
import * as Types from "./types";

declare function AssessmentQuestionDetail(props: {
  as?: React.ElementType;
  slotQuestionFields?: Types.Devlink.Slot;
  slotQuestionType?: Types.Devlink.Slot;
  textQuestionCount?: React.ReactNode;
  onClickDelete?: Types.Devlink.RuntimeProps;
  onClcikAddOption?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
