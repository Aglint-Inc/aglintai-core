import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CategoriesEmptyState.module.css";

export function CategoriesEmptyState({ as: _Component = _Builtin.Block }) {
  return (
    <_Component
      className={_utils.cx(_styles, "skill-question-empty")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "color-grey-600")}
        tag="div"
      >
        {
          "No questions added. Click ‘+’ below to add or generate questions with AI"
        }
      </_Builtin.Block>
    </_Component>
  );
}
