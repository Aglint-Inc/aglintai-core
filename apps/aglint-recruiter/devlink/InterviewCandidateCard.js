import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./InterviewCandidateCard.module.css";

export function InterviewCandidateCard({
  as: _Component = _Builtin.Block,
  slotCandidateImage,
  textCandidateScript = "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "int-ts-transcript-block")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "int-ts-transcript-header-block")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "int-ts-image-block")}
          tag="div"
        >
          {slotCandidateImage}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-700-2")}
          tag="div"
        >
          {"You"}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block tag="div">
        <_Builtin.Block tag="div">{textCandidateScript}</_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
