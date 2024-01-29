import React from "react";
import * as _Builtin from "./_Builtin";
import { ButtonPrimarySmall } from "./ButtonPrimarySmall";
import * as _utils from "./utils";
import _styles from "./EditEmail.module.css";

export function EditEmail({
  as: _Component = _Builtin.Block,
  textEmailName = "This is some text inside of a div block.",
  onClickSaveChanges = {},
  onClickClose = {},
  slotForm,
  editEmailDescription = "This is some text inside of a div block.",
  slotBottom,
  isSaveChangesButtonVisible = true,
  isRequestTestMailVisible = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-769")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "company-email-edit")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "company-email-header")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cem-header-content")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {textEmailName}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-600")}
              tag="div"
            >
              {editEmailDescription}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block className={_utils.cx(_styles, "hide")} tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "header-right-button--company")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "clickable")}
                tag="div"
                {...onClickClose}
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icon-embed")}
                  value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.64645%2013.3536C2.84171%2013.5488%203.15829%2013.5488%203.35355%2013.3536L8%208.70711L12.6464%2013.3536C12.8417%2013.5488%2013.1583%2013.5488%2013.3536%2013.3536C13.5488%2013.1583%2013.5488%2012.8417%2013.3536%2012.6464L8.70711%208L13.3536%203.35355C13.5488%203.15829%2013.5488%202.84171%2013.3536%202.64645C13.1583%202.45118%2012.8417%202.45118%2012.6464%202.64645L8%207.29289L3.35355%202.64645C3.15829%202.45118%202.84171%202.45118%202.64645%202.64645C2.45118%202.84171%202.45118%203.15829%202.64645%203.35355L7.29289%208L2.64645%2012.6464C2.45118%2012.8417%202.45118%2013.1583%202.64645%2013.3536Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%20%20%3Cmask%20id%3D%22mask0_3105_9239%22%20style%3D%22mask-type%3Aluminance%22%20maskUnits%3D%22userSpaceOnUse%22%20x%3D%222%22%20y%3D%222%22%20width%3D%2212%22%20height%3D%2212%22%3E%0A%20%20%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.64645%2013.3536C2.84171%2013.5488%203.15829%2013.5488%203.35355%2013.3536L8%208.70711L12.6464%2013.3536C12.8417%2013.5488%2013.1583%2013.5488%2013.3536%2013.3536C13.5488%2013.1583%2013.5488%2012.8417%2013.3536%2012.6464L8.70711%208L13.3536%203.35355C13.5488%203.15829%2013.5488%202.84171%2013.3536%202.64645C13.1583%202.45118%2012.8417%202.45118%2012.6464%202.64645L8%207.29289L3.35355%202.64645C3.15829%202.45118%202.84171%202.45118%202.64645%202.64645C2.45118%202.84171%202.45118%203.15829%202.64645%203.35355L7.29289%208L2.64645%2012.6464C2.45118%2012.8417%202.45118%2013.1583%202.64645%2013.3536Z%22%20fill%3D%22white%22%2F%3E%0A%20%20%3C%2Fmask%3E%0A%20%20%3Cg%20mask%3D%22url(%23mask0_3105_9239)%22%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-795")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-796")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewBox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.375%2011H5.625C5.35938%2010.2656%204.97656%209.59375%204.47656%208.98438C4.47656%208.98438%204.47656%208.97656%204.47656%208.96094C4.35156%208.80469%204.22656%208.64062%204.10156%208.46875C3.63281%207.79688%203.39062%207.01562%203.375%206.125C3.40625%204.95312%203.8125%203.98438%204.59375%203.21875C5.35938%202.4375%206.32812%202.03125%207.5%202C8.67188%202.03125%209.64062%202.4375%2010.4062%203.21875C11.1875%203.98438%2011.5938%204.95312%2011.625%206.125C11.6094%207.01562%2011.3672%207.79688%2010.8984%208.46875C10.7734%208.64062%2010.6484%208.8125%2010.5234%208.98438C10.5234%208.98438%2010.5234%208.99219%2010.5234%209.00781C10.0234%209.61719%209.64062%2010.2812%209.375%2011ZM7.5%2014C6.96875%2013.9844%206.52344%2013.8047%206.16406%2013.4609C5.82031%2013.1016%205.64062%2012.6562%205.625%2012.125V11.75H9.375V12.125C9.35938%2012.6562%209.17969%2013.1016%208.83594%2013.4609C8.47656%2013.8047%208.03125%2013.9844%207.5%2014ZM5.625%206.125C5.64062%205.59375%205.82031%205.14844%206.16406%204.78906C6.52344%204.44531%206.96875%204.26562%207.5%204.25C7.73438%204.23438%207.85938%204.10938%207.875%203.875C7.85938%203.64062%207.73438%203.51563%207.5%203.5C6.75%203.51563%206.13281%203.77344%205.64844%204.27344C5.14844%204.75781%204.89062%205.375%204.875%206.125C4.89062%206.35938%205.01562%206.48438%205.25%206.5C5.48438%206.48438%205.60938%206.35938%205.625%206.125Z%22%20fill%3D%22%23ED8F1C%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block tag="div">
              {"Pro Tip: Customize Your Message"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600", "mt-8")}
            tag="div"
          >
            {
              "For dynamic content, utilize placeholders like [firstName], [lastName], [companyName], and [jobTitle]."
            }
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-company-email-form")}
          tag="div"
        >
          {slotForm}
        </_Builtin.Block>
        {isSaveChangesButtonVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-457")}
            tag="div"
          >
            <_Builtin.Block tag="div" {...onClickSaveChanges}>
              <ButtonPrimarySmall textLabel="Save Changes" />
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isRequestTestMailVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-470")}
            tag="div"
          >
            {slotBottom}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "hide")}
        value="%3Cstyle%3E%0A%5Bclass*%3D'EditEmail_div-block-769__'%5D%7B%0Aheight%3Acalc(100vh%20-%2060px)%0A%7D%0A%3C%2Fstyle%3E"
      />
    </_Component>
  );
}
