import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./AddCompany.module.css";

export function AddCompany({
  as: _Component = _Builtin.Block,
  onclickClose = {},
  slotWebsiteInput,
  onclickChangeButton = {},
  slotCompanyDetails,
  slotLogo,
}) {
  return (
    <_Component className={_utils.cx(_styles, "cs-sidebar-wrapper")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "cs-sidebar-header")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "fw-semibold", "text-grey-600")}
          tag="div"
        >
          {"Add Company"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "icon-block", "clickable")}
          tag="div"
          {...onclickClose}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icon-embed")}
            value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.64645%2013.3536C2.84171%2013.5488%203.15829%2013.5488%203.35355%2013.3536L8%208.70711L12.6464%2013.3536C12.8417%2013.5488%2013.1583%2013.5488%2013.3536%2013.3536C13.5488%2013.1583%2013.5488%2012.8417%2013.3536%2012.6464L8.70711%208L13.3536%203.35355C13.5488%203.15829%2013.5488%202.84171%2013.3536%202.64645C13.1583%202.45118%2012.8417%202.45118%2012.6464%202.64645L8%207.29289L3.35355%202.64645C3.15829%202.45118%202.84171%202.45118%202.64645%202.64645C2.45118%202.84171%202.45118%203.15829%202.64645%203.35355L7.29289%208L2.64645%2012.6464C2.45118%2012.8417%202.45118%2013.1583%202.64645%2013.3536Z%22%20fill%3D%22%2368737D%22%20style%3D%22fill%3A%2368737D%3Bfill%3Acolor(display-p3%200.4078%200.4510%200.4902)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3Cmask%20id%3D%22mask0_5153_15836%22%20style%3D%22mask-type%3Aluminance%22%20maskUnits%3D%22userSpaceOnUse%22%20x%3D%222%22%20y%3D%222%22%20width%3D%2212%22%20height%3D%2212%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.64645%2013.3536C2.84171%2013.5488%203.15829%2013.5488%203.35355%2013.3536L8%208.70711L12.6464%2013.3536C12.8417%2013.5488%2013.1583%2013.5488%2013.3536%2013.3536C13.5488%2013.1583%2013.5488%2012.8417%2013.3536%2012.6464L8.70711%208L13.3536%203.35355C13.5488%203.15829%2013.5488%202.84171%2013.3536%202.64645C13.1583%202.45118%2012.8417%202.45118%2012.6464%202.64645L8%207.29289L3.35355%202.64645C3.15829%202.45118%202.84171%202.45118%202.64645%202.64645C2.45118%202.84171%202.45118%203.15829%202.64645%203.35355L7.29289%208L2.64645%2012.6464C2.45118%2012.8417%202.45118%2013.1583%202.64645%2013.3536Z%22%20fill%3D%22white%22%20style%3D%22fill%3Awhite%3Bfill%3Awhite%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fmask%3E%0A%3Cg%20mask%3D%22url(%23mask0_5153_15836)%22%3E%0A%3C%2Fg%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cs-sidebar-website-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cs-sidebar-website-info")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-lg", "fw-semibold")}
            tag="div"
          >
            {"Enter company website"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600")}
            tag="div"
          >
            {
              "Enter your company website URL, and our system will automatically fetch the necessary details to set up your company profile."
            }
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cs-sidebar-website-input")}
          tag="div"
        >
          {slotWebsiteInput}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cs-sidebar-company-info")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cs-sidebar-company-top")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Company Logo"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "sl-company-title-block")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "sl-company-image-block")}
              tag="div"
            >
              {slotLogo}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "sl-com-title-info-block")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-grey-600")}
                tag="div"
              >
                {
                  "Please upload your logo in PNG/jpeg format with dimensions of 512px x 512px and ensure it's under 5 MB."
                }
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cs-sidebar-company-form")}
          tag="div"
        >
          {slotCompanyDetails}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
