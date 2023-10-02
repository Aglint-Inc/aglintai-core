import React from "react";
import * as _Builtin from "./_Builtin";
import { ContactDetails } from "./ContactDetails";
import { ButtonOutlinedSmall } from "./ButtonOutlinedSmall";
import * as _utils from "./utils";
import _styles from "./ContactDetailsPop.module.css";

export function ContactDetailsPop({
  as: _Component = _Builtin.Block,
  onClickClose = {},
  slotContactDetails,
  onClickDiscard = {},
  onClickApplyChanges = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "text-pop-questions")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "div-block-403")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-421")}
          tag="div"
        >
          <_Builtin.Block tag="div">
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M7.99993%209C10.2091%209%2011.9999%207.20914%2011.9999%205C11.9999%202.79086%2010.2091%201%207.99993%201C5.79079%201%203.99993%202.79086%203.99993%205C3.99993%207.20914%205.79079%209%207.99993%209ZM1.99993%2015.47C2.27592%2012.3649%204.88941%209.98786%208.01406%2010C11.1272%2010.0034%2013.7231%2012.3764%2013.9981%2015.47C14.0064%2015.6078%2013.9573%2015.7428%2013.8624%2015.8432C13.7675%2015.9435%2013.6352%2016.0003%2013.4969%2016H2.50111C2.36281%2016.0003%202.23055%2015.9435%202.13565%2015.8432C2.04075%2015.7428%201.99163%2015.6078%201.99993%2015.47Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-lg", "fw-semibold")}
            tag="div"
          >
            {"Contact Details"}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "close-pop-inbox")}
          tag="div"
          {...onClickClose}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.64645%2013.3536C2.84171%2013.5488%203.15829%2013.5488%203.35355%2013.3536L8%208.70711L12.6464%2013.3536C12.8417%2013.5488%2013.1583%2013.5488%2013.3536%2013.3536C13.5488%2013.1583%2013.5488%2012.8417%2013.3536%2012.6464L8.70711%208L13.3536%203.35355C13.5488%203.15829%2013.5488%202.84171%2013.3536%202.64645C13.1583%202.45118%2012.8417%202.45118%2012.6464%202.64645L8%207.29289L3.35355%202.64645C3.15829%202.45118%202.84171%202.45118%202.64645%202.64645C2.45118%202.84171%202.45118%203.15829%202.64645%203.35355L7.29289%208L2.64645%2012.6464C2.45118%2012.8417%202.45118%2013.1583%202.64645%2013.3536Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%20%20%3Cmask%20id%3D%22mask0_2377_4068%22%20style%3D%22mask-type%3Aluminance%22%20maskUnits%3D%22userSpaceOnUse%22%20x%3D%222%22%20y%3D%222%22%20width%3D%2212%22%20height%3D%2212%22%3E%0A%20%20%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.64645%2013.3536C2.84171%2013.5488%203.15829%2013.5488%203.35355%2013.3536L8%208.70711L12.6464%2013.3536C12.8417%2013.5488%2013.1583%2013.5488%2013.3536%2013.3536C13.5488%2013.1583%2013.5488%2012.8417%2013.3536%2012.6464L8.70711%208L13.3536%203.35355C13.5488%203.15829%2013.5488%202.84171%2013.3536%202.64645C13.1583%202.45118%2012.8417%202.45118%2012.6464%202.64645L8%207.29289L3.35355%202.64645C3.15829%202.45118%202.84171%202.45118%202.64645%202.64645C2.45118%202.84171%202.45118%203.15829%202.64645%203.35355L7.29289%208L2.64645%2012.6464C2.45118%2012.8417%202.45118%2013.1583%202.64645%2013.3536Z%22%20fill%3D%22white%22%2F%3E%0A%20%20%3C%2Fmask%3E%0A%20%20%3Cg%20mask%3D%22url(%23mask0_2377_4068)%22%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block tag="div">
        {"Select what should be included or required in the apply form."}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "contact-detail-grids")}
        tag="div"
      >
        <_Builtin.Block
          id={_utils.cx(
            _styles,
            "w-node-_1aff2e56-11f6-55c6-e7a7-29ea9f4d193a-9f4d1931"
          )}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Fields"}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-input")}
          id={_utils.cx(
            _styles,
            "w-node-_1aff2e56-11f6-55c6-e7a7-29ea9f4d193d-9f4d1931"
          )}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Require an answer"}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block tag="div">
        {slotContactDetails ?? <ContactDetails />}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "social-btn-wrappers-pop")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "pop-button-wrappers")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cancel-text")}
            tag="div"
            {...onClickDiscard}
          >
            {"Discard"}
          </_Builtin.Block>
          <_Builtin.Block tag="div" {...onClickApplyChanges}>
            <ButtonOutlinedSmall textLabel="Apply Changes" />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
