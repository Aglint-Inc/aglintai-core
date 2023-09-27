import * as React from "react";
import * as Types from "./types";

declare function SkillsQuestionCard(props: {
  as?: React.ElementType;
  textQuestion?: React.ReactNode;
  onClickDislike?: Types.Devlink.RuntimeProps;
  onClickLike?: Types.Devlink.RuntimeProps;
  onClickEdit?: Types.Devlink.RuntimeProps;
  onClickDelete?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
