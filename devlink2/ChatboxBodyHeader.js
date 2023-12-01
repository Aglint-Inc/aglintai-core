import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ChatboxBodyHeader.module.css";

export function ChatboxBodyHeader({
  as: _Component = _Builtin.Block,
  name = "Candidate Name",
  isApplied = false,
  email = "Email address",
  phoneNumber = "Phone Number",
  date = "Applied date",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "cb-body-header-block")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "cb-body-header-top")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "fw-semibold", "text-color-black")}
          tag="div"
        >
          {name}
        </_Builtin.Block>
        {isApplied ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "cb-bh-top-right")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Candidate status"}</_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "cb-candidate-status")}
              tag="div"
            >
              {"Applied"}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cb-body-header-bottom")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cb-bh-bottom-left")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cb-bh-contact-block")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "icon-block")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icon-embed")}
                value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M0.75%201.5H11.25C11.6642%201.5%2012%201.83579%2012%202.25V9.75C12%2010.1642%2011.6642%2010.5%2011.25%2010.5H0.75C0.335786%2010.5%200%2010.1642%200%209.75V2.25C0%201.83579%200.335786%201.5%200.75%201.5ZM0.75%202.78033V9.21967L3.10984%206.85984C3.25628%206.71339%203.49372%206.71339%203.64016%206.85984C3.78661%207.00628%203.78661%207.24372%203.64016%207.39016L1.28033%209.75H10.7197L8.35983%207.39016C8.21339%207.24372%208.21339%207.00628%208.35983%206.85984C8.50628%206.71339%208.74372%206.71339%208.89017%206.85984L11.25%209.21967V2.78073L6.53625%207.50158C6.39543%207.64356%206.20373%207.72342%206.00375%207.72342C5.80377%207.72342%205.61208%207.64356%205.47233%207.50267L0.75%202.78033ZM1.28033%202.25L6.00375%206.97342L10.7201%202.25H1.28033Z%22%20fill%3D%22%2368737D%22%20style%3D%22fill%3A%2368737D%3Bfill%3Acolor(display-p3%200.4078%200.4510%200.4902)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            <_Builtin.Block tag="div">{email}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "cb-bh-contact-block")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "icon-block")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icon-embed")}
                value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3%200H9C9.55228%200%2010%200.447715%2010%201V11C10%2011.5523%209.55228%2012%209%2012H3C2.44772%2012%202%2011.5523%202%2011V1C2%200.447715%202.44772%200%203%200ZM3%209V2H9V9H3ZM7%2011H5C4.7%2011%204.5%2010.8%204.5%2010.5C4.5%2010.2%204.7%2010%205%2010H7C7.3%2010%207.5%2010.2%207.5%2010.5C7.5%2010.8%207.3%2011%207%2011Z%22%20fill%3D%22%2368737D%22%20style%3D%22fill%3A%2368737D%3Bfill%3Acolor(display-p3%200.4078%200.4510%200.4902)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            <_Builtin.Block tag="div">{phoneNumber}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        {isApplied ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600")}
            tag="div"
          >
            {date}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
