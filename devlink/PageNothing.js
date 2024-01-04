import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./PageNothing.module.css";

export function PageNothing({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "page-nothing")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "page-nothing-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "page-nothing-grid")}
          tag="div"
        >
          <_Builtin.Block
            id={_utils.cx(
              _styles,
              "w-node-f3b4fe7a-f1fa-138f-8e86-c43f479df2e1-479df2de"
            )}
            tag="div"
          >
            <_Builtin.Image
              loading="lazy"
              width="auto"
              height="auto"
              alt=""
              src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec43089000e_Illustration%2015%20(1).svg"
            />
          </_Builtin.Block>
          <_Builtin.Block
            id={_utils.cx(
              _styles,
              "w-node-f3b4fe7a-f1fa-138f-8e86-c43f479df2e3-479df2de"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "page-nothing-title-wrapper")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "text-xxxl",
                  "text-red-800",
                  "margin-bottom-10"
                )}
                tag="div"
              >
                {"Oops! "}
                <br />
                {"Something went wrong."}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-lg")}
                tag="div"
              >
                {"We apologize for the inconvenience."}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "page-nothing-description")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-grey-600-3")}
                tag="div"
              >
                {
                  "Our server is experiencing some technical difficulties at the moment, but rest assured that we're working hard to fix the issue. In the meantime, take a moment to check out our blog, forum, or other resources to continue your learning and development journey."
                }
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "support-wrapper")}
              tag="div"
            >
              <_Builtin.Block tag="div">{"Go to"}</_Builtin.Block>
              <_Builtin.Link
                className={_utils.cx(_styles, "tools-link")}
                button={false}
                block="inline"
                options={{
                  href: "/dashboard",
                }}
              >
                <_Builtin.Block tag="div">{"Dashboard"}</_Builtin.Block>
              </_Builtin.Link>
              <_Builtin.Block tag="div">{"or contact "}</_Builtin.Block>
              <_Builtin.Link
                className={_utils.cx(_styles, "tools-link")}
                button={false}
                block="inline"
                options={{
                  href: "mailto:support@alignthq.com?subject=Contact%20Aglint",
                }}
              >
                <_Builtin.Block tag="div">{"support."}</_Builtin.Block>
              </_Builtin.Link>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
