import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./NavMenu.module.css";

export function NavMenu({ as: _Component = _Builtin.Block }) {
  return (
    <_Component
      className={_utils.cx(_styles, "rd-menu-items-wrapper")}
      tag="div"
    >
      <_Builtin.Link
        className={_utils.cx(_styles, "subnav-link")}
        button={false}
        block="inline"
        options={{
          href: "#",
        }}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "menu-item-icon-block")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icon")}
            value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewbox%3D%220%200%2014%2014%22%20fill%3D%22currentColor%22%3E%0A%20%20%3Cpath%20d%3D%22M4.08317%202.91732V1.16732C4.08317%200.845154%204.34434%200.583984%204.6665%200.583984H9.33317C9.65534%200.583984%209.9165%200.845154%209.9165%201.16732V2.91732H12.2498C12.572%202.91732%2012.8332%203.17849%2012.8332%203.50065V11.6673C12.8332%2011.9895%2012.572%2012.2507%2012.2498%2012.2507H1.74984C1.42767%2012.2507%201.1665%2011.9895%201.1665%2011.6673V3.50065C1.1665%203.17849%201.42767%202.91732%201.74984%202.91732H4.08317ZM2.33317%209.33398V11.084H11.6665V9.33398H2.33317ZM2.33317%208.16732H11.6665V4.08398H2.33317V8.16732ZM5.24984%201.75065V2.91732H8.74984V1.75065H5.24984ZM6.4165%206.41732H7.58317V7.58398H6.4165V6.41732Z%22%20fill%3D%22currentColor%2F%22%3E%0A%3C%2Fpath%3E%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-800")}
          tag="div"
        >
          {"Jobs"}
        </_Builtin.Block>
      </_Builtin.Link>
      <_Builtin.Link
        className={_utils.cx(_styles, "subnav-link")}
        button={false}
        block="inline"
        options={{
          href: "#",
        }}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "menu-item-icon-block")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icon")}
            value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22currentColor%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10%200C10.5761%200%2011%200.423858%2011%201V11C11%2011.5761%2010.5761%2012%2010%2012H8C7.42386%2012%207%2011.5761%207%2011V9H5V11C5%2011.5761%204.57614%2012%204%2012H2C1.42386%2012%201%2011.5761%201%2011V1C1%200.423858%201.42386%200%202%200H10ZM2%201V11H4V9C4%208.42386%204.42386%208%205%208H7C7.57614%208%208%208.42386%208%209V11H10V1H2ZM3%205H5V7H3V5ZM7%205H9V7H7V5ZM3%202H5V4H3V2ZM7%202H9V4H7V2Z%22%20fill%3D%22currentColor%2F%22%3E%0A%3C%2Fpath%3E%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "", "text-grey-800")}
          tag="div"
        >
          {"Company"}
        </_Builtin.Block>
      </_Builtin.Link>
      <_Builtin.Link
        className={_utils.cx(_styles, "subnav-link", "current")}
        button={false}
        block="inline"
        options={{
          href: "#",
        }}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "", "menu-item-icon-block")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icon")}
            value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22currentColor%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10%203.26385C9.08755%203.738%207.63506%204%206%204C4.36494%204%202.91245%203.738%202%203.26385V4.7C2%205.08849%203.80673%205.7%206%205.7C8.19327%205.7%2010%205.08849%2010%204.7V3.26385ZM11%202V10C11%2011.2346%208.73855%2012%206%2012C3.26145%2012%201%2011.2346%201%2010V2C1%200.746622%203.23987%200%206%200C8.76013%200%2011%200.746622%2011%202ZM10%205.95247C9.08388%206.43015%207.62604%206.7%206%206.7C4.37396%206.7%202.91612%206.43015%202%205.95247V7.3C2%207.74812%203.70819%208.3%206%208.3C8.19327%208.3%2010%207.68849%2010%207.3V5.95247ZM2%208.60025V10C2%2010.3885%203.80673%2011%206%2011C8.19327%2011%2010%2010.3885%2010%2010V8.55247C9.08388%209.03015%207.62604%209.3%206%209.3C4.32786%209.3%202.89722%209.06118%202%208.60025ZM6%203C8.21043%203%2010%202.40348%2010%202C10%201.59652%208.21043%201%206%201C3.78957%201%202%201.59652%202%202C2%202.40348%203.78957%203%206%203Z%22%20fill%3D%22currentColor%2F%22%3E%0A%3C%2Fpath%3E%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "", "text-grey-800")}
          tag="div"
        >
          {"Candidate Database"}
        </_Builtin.Block>
      </_Builtin.Link>
    </_Component>
  );
}
