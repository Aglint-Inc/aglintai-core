import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./TemplateButton.module.css";

export function TemplateButton({
  as: _Component = _Builtin.Block,
  textTemplateName = "Template 1",
  onClickButton = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "template-button-wrap")}
      tag="div"
      {...onClickButton}
    >
      <_Builtin.Block tag="div">{textTemplateName}</_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "icons")}
        value="%3Csvg%20width%3D%2211%22%20height%3D%227%22%20viewBox%3D%220%200%2011%207%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.64297%205.84062C5.48255%205.98646%205.32214%205.98646%205.16172%205.84062L0.961718%201.64062C0.815885%201.48021%200.815885%201.31979%200.961718%201.15937C1.12214%201.01354%201.28255%201.01354%201.44297%201.15937L5.40234%205.09687L9.36172%201.15937C9.52214%201.01354%209.68255%201.01354%209.84297%201.15937C9.9888%201.31979%209.9888%201.48021%209.84297%201.64062L5.64297%205.84062Z%22%20fill%3D%22%232F3941%22%20style%3D%22fill%3A%232F3941%3Bfill%3Acolor(display-p3%200.1843%200.2235%200.2549)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
      />
    </_Component>
  );
}
