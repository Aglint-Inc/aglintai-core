import * as React from "react";
import * as Types from "./types";

declare function SkillsQuestion(props: {
  as?: React.ElementType;
  textSkillQuestion?: React.ReactNode;
  onClickEdit?: Types.Devlink.RuntimeProps;
  onClickDelete?: Types.Devlink.RuntimeProps;
  onClickDislike?: Types.Devlink.RuntimeProps;
  onClickLike?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
