import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./EmailSent.module.css";

export function EmailSent({
  as: _Component = _Builtin.Block,
  onClickOpenInbox = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "sent-succesfully")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "div-block-636")} tag="div">
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons")}
          value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6%200C2.69%200%200%202.69%200%206C0%209.31%202.69%2012%206%2012C9.31%2012%2012%209.31%2012%206C12%202.69%209.31%200%206%200ZM9.44%204.94L5.94%208.44C5.82%208.56%205.66%208.62%205.5%208.62C5.34%208.62%205.18%208.56%205.06%208.44L3.06%206.44C2.82%206.2%202.82%205.8%203.06%205.56C3.3%205.32%203.7%205.32%203.94%205.56L5.5%207.12L8.56%204.06C8.8%203.82%209.2%203.82%209.44%204.06C9.69%204.3%209.69%204.7%209.44%204.94Z%22%20fill%3D%22%23228F67%22%20style%3D%22fill%3A%23228F67%3Bfill%3Acolor(display-p3%200.1333%200.5608%200.4039)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <_Builtin.Block
          className={_utils.cx(_styles, "text-green-700")}
          tag="div"
        >
          {"Sent email successfully"}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "inbox-wrap")}
        tag="div"
        {...onClickOpenInbox}
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons")}
          value="%3Csvg%20width%3D%2220%22%20height%3D%2216%22%20viewBox%3D%220%200%2020%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_6373_16598)%22%3E%0A%3Cpath%20d%3D%22M4.54545%2015.5014V7.77427L2.14896%205.58185L0%204.36523V14.1378C0%2014.8923%200.611364%2015.5014%201.36364%2015.5014H4.54545Z%22%20fill%3D%22%234285F4%22%20style%3D%22fill%3A%234285F4%3Bfill%3Acolor(display-p3%200.2588%200.5216%200.9569)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3Cpath%20d%3D%22M15.4531%2015.5014H18.6349C19.3895%2015.5014%2019.9986%2014.8901%2019.9986%2014.1378V4.36523L17.5646%205.75882L15.4531%207.77427V15.5014Z%22%20fill%3D%22%2334A853%22%20style%3D%22fill%3A%2334A853%3Bfill%3Acolor(display-p3%200.2039%200.6588%200.3255)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3Cpath%20d%3D%22M4.54485%207.77423L4.21875%204.75497L4.54485%201.86523L9.99939%205.95608L15.4539%201.86523L15.8187%204.59894L15.4539%207.77423L9.99939%2011.8651L4.54485%207.77423Z%22%20fill%3D%22%23EA4335%22%20style%3D%22fill%3A%23EA4335%3Bfill%3Acolor(display-p3%200.9176%200.2627%200.2078)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3Cpath%20d%3D%22M15.4531%201.86553V7.77452L19.9986%204.36549V2.54734C19.9986%200.861%2018.0736%20-0.100348%2016.7259%200.910999L15.4531%201.86553Z%22%20fill%3D%22%23FBBC04%22%20style%3D%22fill%3A%23FBBC04%3Bfill%3Acolor(display-p3%200.9843%200.7373%200.0157)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3Cpath%20d%3D%22M0%204.36549L2.09053%205.93336L4.54545%207.77452V1.86553L3.27273%200.910999C1.92273%20-0.100348%200%200.861%200%202.54734V4.36549Z%22%20fill%3D%22%23C5221F%22%20style%3D%22fill%3A%23C5221F%3Bfill%3Acolor(display-p3%200.7725%200.1333%200.1216)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3CclipPath%20id%3D%22clip0_6373_16598%22%3E%0A%3Crect%20width%3D%2220%22%20height%3D%2215.0037%22%20fill%3D%22white%22%20style%3D%22fill%3Awhite%3Bfill%3Awhite%3Bfill-opacity%3A1%3B%22%20transform%3D%22translate(0%200.498047)%22%2F%3E%0A%3C%2FclipPath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
        />
        <_Builtin.Block
          className={_utils.cx(_styles, "text-green-500", "fw-semibold")}
          tag="div"
        >
          {"Open Inbox"}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
