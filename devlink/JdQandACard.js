import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./JdQandACard.module.css";

export function JdQandACard({
  as: _Component = _Builtin.Block,
  slotIcons,
  textQuestions = "This is some text inside of a div block.",
  textAns = "This is some text inside of a div block.",
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-784")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "div-block-785")} tag="div">
        {slotIcons}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-783")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600")}
          tag="div"
        >
          {textQuestions}
        </_Builtin.Block>
        <_Builtin.Block tag="div">{textAns}</_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
