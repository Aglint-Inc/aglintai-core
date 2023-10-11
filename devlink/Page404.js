import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Page404.module.css";

export function Page404({ as: _Component = _Builtin.Block }) {
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
              src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec43089004e_Illustration%2015.svg"
            />
          </_Builtin.Block>
          <_Builtin.Block
            id={_utils.cx(
              _styles,
              "w-node-_8f2cfa19-00d6-d9eb-a7b1-f3f7cdbabd29-cdbabd24"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "page-404-title-wrapper")}
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
                {"Looks like you're lost"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-lg")}
                tag="div"
              >
                {"Don't worry, we'll help you find your way"}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "page-404-description-wrapper")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-grey-600-3")}
                tag="div"
              >
                {
                  "We couldn't find the page you're looking for, but we're here to help you navigate your career development journey. Take a moment to explore our resources and discover new opportunities to enhance your skills and advance your career. If you still can't find what you're looking for, please contact our support team for assistance."
                }
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "support-wrapper")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-md")}
                tag="div"
              >
                {"Go to "}
              </_Builtin.Block>
              <_Builtin.Link
                className={_utils.cx(_styles, "tools-link")}
                button={false}
                options={{
                  href: "/dashboard",
                }}
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-md")}
                  tag="div"
                >
                  {"Dashboard"}
                </_Builtin.Block>
              </_Builtin.Link>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-md")}
                tag="div"
              >
                {"or contact "}
              </_Builtin.Block>
              <_Builtin.Link
                className={_utils.cx(_styles, "tools-link")}
                button={false}
                options={{
                  href: "mailto:support@alignthq.com?subject=Contact%20Aglint",
                }}
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-md")}
                  tag="div"
                >
                  {"support."}
                </_Builtin.Block>
              </_Builtin.Link>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
