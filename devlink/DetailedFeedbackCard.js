import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./DetailedFeedbackCard.module.css";

export function DetailedFeedbackCard({
  as: _Component = _Builtin.Block,
  textHeader = "Language quality",
  textDescription = "Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.",
}) {
  return (
    <_Component className={_utils.cx(_styles, "lan-analysis-block")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "lan-analysis-header-block")}
        tag="div"
      >
        <_Builtin.Block tag="div">{textHeader}</_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "lan-analysis-score-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-304", "yellow-200")}
            tag="div"
          >
            <_Builtin.Image
              className={_utils.cx(_styles, "group-778")}
              loading="lazy"
              width={10}
              height={10}
              src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/6505a3b9dd11d76c95408993_Group-778.svg"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "text-sm",
              "fw-semibold",
              "text-yellow-500"
            )}
            tag="div"
          >
            {"50%"}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "text-sm", "color-grey-600")}
        tag="div"
      >
        {textDescription}
      </_Builtin.Block>
    </_Component>
  );
}
