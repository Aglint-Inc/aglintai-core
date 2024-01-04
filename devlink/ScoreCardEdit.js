import React from "react";
import * as _Builtin from "./_Builtin";
import { Checkbox } from "./Checkbox";
import * as _utils from "./utils";
import _styles from "./ScoreCardEdit.module.css";

export function ScoreCardEdit({
  as: _Component = _Builtin.Block,
  textEdit = "Dorem ipsum dolor sit amet, consectetur adipiscing elit.Dorem ipsum dolor sit amet, consectetur adipiscing elit.",
  onClickDelete = {},
  slotButtonUpdate,
  slotCheckBox,
  slotTextEdit,
  isDeleteVisible = true,
  onClickCancel = {},
  isCancelVisible = false,
}) {
  return (
    <_Component className={_utils.cx(_styles, "score-edit-card")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "edit-desc-wrap")}
        tag="div"
      >
        {slotTextEdit}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-662")} tag="div">
        {isDeleteVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "delete-button")}
            tag="div"
            {...onClickDelete}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2215%22%20height%3D%2215%22%20viewBox%3D%220%200%2015%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.42188%202.25C6.28125%202.25%206.17188%202.3125%206.09375%202.4375L5.74219%203H9.25781L8.90625%202.4375C8.82812%202.3125%208.71875%202.25%208.57812%202.25H6.42188ZM10.1484%203H11.25H12H12.375C12.6094%203.01563%2012.7344%203.14062%2012.75%203.375C12.7344%203.60938%2012.6094%203.73437%2012.375%203.75H11.9531L11.3438%2012.1172C11.3125%2012.5078%2011.1562%2012.8359%2010.875%2013.1016C10.5938%2013.3516%2010.25%2013.4844%209.84375%2013.5H5.15625C4.75%2013.4844%204.40625%2013.3516%204.125%2013.1016C3.84375%2012.8359%203.6875%2012.5078%203.65625%2012.1172L3.04688%203.75H2.625C2.39062%203.73437%202.26562%203.60938%202.25%203.375C2.26562%203.14062%202.39062%203.01563%202.625%203H3H3.75H4.85156L5.46094%202.03906C5.69531%201.69531%206.01562%201.51563%206.42188%201.5H8.57812C8.98438%201.51563%209.30469%201.69531%209.53906%202.03906L10.1484%203ZM11.2031%203.75H3.79688L4.40625%2012.0469C4.42188%2012.25%204.5%2012.4141%204.64062%2012.5391C4.78125%2012.6797%204.95312%2012.75%205.15625%2012.75H9.84375C10.0469%2012.75%2010.2188%2012.6797%2010.3594%2012.5391C10.5%2012.4141%2010.5781%2012.25%2010.5938%2012.0469L11.2031%203.75Z%22%20fill%3D%22%23D93F4C%22%20style%3D%22fill%3A%23D93F4C%3Bfill%3Acolor(display-p3%200.8510%200.2471%200.2980)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block tag="div">{"Delete"}</_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        <_Builtin.Block
          className={_utils.cx(_styles, "delete-button")}
          tag="div"
        >
          <_Builtin.Block tag="div">
            {slotCheckBox ?? <Checkbox />}
          </_Builtin.Block>
          <_Builtin.Block tag="div">{"Must have"}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-663")}
          tag="div"
        >
          {isCancelVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "cursor-pointer")}
              tag="div"
              {...onClickCancel}
            >
              {"Cancel"}
            </_Builtin.Block>
          ) : null}
          <_Builtin.Block tag="div">{slotButtonUpdate}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
