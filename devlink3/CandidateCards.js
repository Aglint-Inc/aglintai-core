import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CandidateCards.module.css";

export function CandidateCards({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "candidatecard")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "slot_candidate_image")}
        tag="div"
      >
        <_Builtin.Image
          className={_utils.cx(_styles, "image_cover")}
          loading="lazy"
          width="auto"
          height="auto"
          alt=""
          src="https://uploads-ssl.webflow.com/651125c25c47e8494b8e9eb8/65d8b0e9a0e9f0451bc3536c_user2.png"
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "schedule_details-copy")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Tom Odel"}
        </_Builtin.Block>
        <_Builtin.Block tag="div">{"Senior software Engineer"}</_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-gray-600")}
          tag="div"
        >
          {"tomode3243@gmaIl.com"}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
