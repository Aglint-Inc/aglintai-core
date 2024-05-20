import * as React from "react";
import * as Types from "./types";

declare function BookmarkDark(props: {
  as?: React.ElementType;
  isBookmarked?: Types.Visibility.VisibilityConditions;
  onClickBookmark?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
