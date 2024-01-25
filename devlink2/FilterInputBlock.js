import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./FilterInputBlock.module.css";

export function FilterInputBlock({
  as: _Component = _Builtin.Block,
  isChecked = false,
  onclickCheckbox = {},
  labelText = "Interview Score",
  slotInput,
}) {
  return (
    <_Component className={_utils.cx(_styles, "filter-input-block")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "filter-label-block")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "filter-checkbox")}
          tag="div"
          {...onclickCheckbox}
        >
          {isChecked ? (
            <_Builtin.Image
              loading="lazy"
              width="auto"
              height="auto"
              alt=""
              src="https://uploads-ssl.webflow.com/651419e73ebbb12148f96ccc/6530fd234c567296fc1dc71f_Frame%201%20(2).png"
            />
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {labelText}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block tag="div">{slotInput}</_Builtin.Block>
    </_Component>
  );
}
