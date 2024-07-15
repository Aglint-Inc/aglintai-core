"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./Page404.module.css";

export function Page404({
  as: _Component = _Builtin.Block,
  text404 = "",
  slot404,
}) {
  return (
    <_Component className={_utils.cx(_styles, "page-404")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "page-404-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "page-404-grid")}
          tag="div"
        >
          <_Builtin.Block
            id={_utils.cx(
              _styles,
              "w-node-_8f2cfa19-00d6-d9eb-a7b1-f3f7cdbabd27-cdbabd24"
            )}
            tag="div"
          >
            <_Builtin.Image
              className={_utils.cx(_styles, "_404-image")}
              id={_utils.cx(
                _styles,
                "w-node-_8f2cfa19-00d6-d9eb-a7b1-f3f7cdbabd28-cdbabd24"
              )}
              loading="lazy"
              width="auto"
              height="auto"
              alt=""
              src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/6532453bd32f85fce0b1c183_Group.svg"
            />
          </_Builtin.Block>
          <_Builtin.Block
            id={_utils.cx(
              _styles,
              "w-node-_8f2cfa19-00d6-d9eb-a7b1-f3f7cdbabd29-cdbabd24"
            )}
            tag="div"
          >
            <Text content={text404} size="3" align="center" />
          </_Builtin.Block>
          <_Builtin.Block
            id={_utils.cx(
              _styles,
              "w-node-_31d7f888-89d3-1f36-b5e6-66f6bc558a4e-cdbabd24"
            )}
            tag="div"
          >
            {slot404}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
