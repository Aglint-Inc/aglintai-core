import * as React from "react";
import * as Types from "./types";

declare function CandidateHistoryCard(props: {
  as?: React.ElementType;
  textHeader?: React.ReactNode;
  textPosted?: React.ReactNode;
  isSearchByJobVisible?: Types.Visibility.VisibilityConditions;
  isSearchByTypeVisible?: Types.Visibility.VisibilityConditions;
  onClickDelete?: Types.Devlink.RuntimeProps;
  onClickCard?: Types.Devlink.RuntimeProps;
  textCategory?: React.ReactNode;
  colorPropsCategory?: Types.Devlink.RuntimeProps;
  onClickKebab?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
