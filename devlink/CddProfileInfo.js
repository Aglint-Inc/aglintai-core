import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CddProfileInfo.module.css";

export function CddProfileInfo({ as: _Component = _Builtin.Block }) {
  return (
    <_Component
      className={_utils.cx(_styles, "candidate-profile-info")}
      tag="div"
    >
      <_Builtin.Image
        className={_utils.cx(_styles, "rectangle-346")}
        dyn={{
          bind: {},
        }}
        loading="lazy"
        width="84"
        height="84"
        src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.fd6bdcfeb6.svg"
      />
      <_Builtin.Block className={_utils.cx(_styles, "frame-1020")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "fw-semibold")}
          dyn={{
            bind: {},
          }}
          tag="div"
        >
          {"This is some text inside of a div block."}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-sm", "color-grey-600")}
          dyn={{
            bind: {},
          }}
          tag="div"
        >
          {"This is some text inside of a div block."}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "frame-1018")} tag="div">
          <_Builtin.Image
            className={_utils.cx(_styles, "vectors-wrapper-46")}
            loading="lazy"
            width="11.999947547912598"
            height="11.999947547912598"
            src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/6504bb624dfe721c77c1cf3f_Vectors-Wrapper.svg"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "", "text-sm", "color-grey-600")}
            dyn={{
              bind: {},
            }}
            tag="div"
          >
            {"This is some text inside of a div block."}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "frame-1018")} tag="div">
          <_Builtin.Image
            className={_utils.cx(_styles, "vectors-wrapper-43")}
            loading="lazy"
            width="12"
            height="12"
            src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/6504bb634328f76be652b614_Vectors-Wrapper.svg"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "", "text-sm", "color-grey-600")}
            dyn={{
              bind: {},
            }}
            tag="div"
          >
            {"This is some text inside of a div block."}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
