import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./AuiNavigation.module.css";

export function AuiNavigation({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "aui-navigation")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "navogation-container")}
        tag="div"
      >
        <_Builtin.Link
          className={_utils.cx(_styles, "nav-logo")}
          button={false}
          block="inline"
          options={{
            href: "#",
          }}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed-flex")}
            value="%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20viewbox%3D%220%200%2032%2032%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M24.4333%2014.94C21.5599%2014.22%2020.1199%2013.8666%2019.1266%2012.8733C18.1333%2011.8733%2017.7799%2010.44%2017.0599%207.56665L15.9999%203.33331L14.9399%207.56665C14.2199%2010.44%2013.8666%2011.88%2012.8733%2012.8733C11.8733%2013.8666%2010.4399%2014.22%207.56659%2014.94L3.33325%2016L7.56659%2017.06C10.4399%2017.78%2011.8799%2018.1333%2012.8733%2019.1266C13.8666%2020.1266%2014.2199%2021.56%2014.9399%2024.4333L15.9999%2028.6666L17.0599%2024.4333C17.7799%2021.56%2018.1333%2020.12%2019.1266%2019.1266C20.1266%2018.1333%2021.5599%2017.78%2024.4333%2017.06L28.6666%2016L24.4333%2014.94Z%22%20fill%3D%22%23FF6224%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "text-xl", "fw-semibold")}
            tag="div"
          >
            {"Aglint Design System"}
          </_Builtin.Block>
        </_Builtin.Link>
        <_Builtin.Block className={_utils.cx(_styles, "aui-links")} tag="div">
          <_Builtin.Link
            className={_utils.cx(_styles, "aui-link")}
            button={false}
            block=""
            options={{
              href: "#",
            }}
          >
            {"Style Guide"}
          </_Builtin.Link>
          <_Builtin.Link
            className={_utils.cx(_styles, "aui-link")}
            button={false}
            block=""
            options={{
              href: "#",
            }}
          >
            {"Components"}
          </_Builtin.Link>
          <_Builtin.Link
            className={_utils.cx(_styles, "aui-link")}
            button={false}
            block=""
            options={{
              href: "#",
            }}
          >
            {"Brand"}
          </_Builtin.Link>
          <_Builtin.Link
            className={_utils.cx(_styles, "aui-link")}
            button={false}
            block=""
            options={{
              href: "#",
            }}
          >
            {"Icons"}
          </_Builtin.Link>
          <_Builtin.Link
            className={_utils.cx(_styles, "aui-link")}
            button={false}
            block=""
            options={{
              href: "#",
            }}
          >
            {"Guidelines"}
          </_Builtin.Link>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
