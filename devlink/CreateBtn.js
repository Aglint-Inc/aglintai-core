import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CreateBtn.module.css";

export function CreateBtn({
  as: _Component = _Builtin.Link,
  skillText = "Add Skill",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "cj-add-skill-btn")}
      button={false}
      options={{
        href: "#",
      }}
    >
      <_Builtin.Image
        className={_utils.cx(_styles, "vectors-wrapper-38")}
        loading="lazy"
        width={16}
        height={16}
        src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/650416b215335b0c3417d69a_Vectors-Wrapper.svg"
      />
      <_Builtin.Block className={_utils.cx(_styles, "label-6")} tag="div">
        {skillText}
      </_Builtin.Block>
    </_Component>
  );
}
