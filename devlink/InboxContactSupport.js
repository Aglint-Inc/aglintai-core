import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Checkbox } from "./Checkbox";
import { ButtonOutlinedRegular } from "./ButtonOutlinedRegular";
import * as _utils from "./utils";
import _styles from "./InboxContactSupport.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-948":{"id":"e-948","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-386","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-949"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".aui-button-wrap.email","originalId":"650c129b14ba3ec43089005f|f3340951-3b1b-ee78-4e07-92dd67f04da8","appliesTo":"CLASS"},"targets":[{"selector":".aui-button-wrap.email","originalId":"650c129b14ba3ec43089005f|f3340951-3b1b-ee78-4e07-92dd67f04da8","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694910129600}},"actionLists":{"a-386":{"id":"a-386","title":"email-temp-editor-[close]","actionItemGroups":[{"actionItems":[{"id":"a-386-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".rd-company-sidebar","selectorGuids":["5acd8927-8dc5-556d-8bbb-b45e8eb0ffa7"]},"value":0,"unit":""}},{"id":"a-386-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outExpo","duration":800,"target":{"selector":".rd-email-edit-wrapper","selectorGuids":["2295ead5-85e1-b9a6-3337-5728082f803c"]},"xValue":500,"xUnit":"px","yUnit":"PX","zUnit":"PX"}},{"id":"a-386-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":600,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".rd-company-sidebar","selectorGuids":["5acd8927-8dc5-556d-8bbb-b45e8eb0ffa7"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694910134507}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function InboxContactSupport({
  as: _Component = _Builtin.Block,
  textJobRole = "This is some text inside of a div block.",
  textJobCompanyLocations = "This is some text inside of a div block.",
  slotFormSupport,
  slotCheckbox,
  onClickReport = {},
  isTicketSubmitSuccessfully = false,
  onClickCopyLinkToTicket = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "contact-support-wrappers")}
      tag="div"
    >
      <_Builtin.Block tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "contact-support-header-wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-xl", "fw-semibold")}
            tag="div"
          >
            {"Contact Support"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600")}
            tag="div"
          >
            {
              "Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
            }
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-contact-form-support")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Job"}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "job-wrappers")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {textJobRole}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "text-sm",
                "fw-semibold",
                "text-grey-600"
              )}
              tag="div"
            >
              {textJobCompanyLocations}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "slot-form-contact")}
            tag="div"
          >
            {slotFormSupport}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "support-check-wrappers")}
            tag="div"
          >
            <_Builtin.Block tag="div">
              {slotCheckbox ?? <Checkbox />}
            </_Builtin.Block>
            <_Builtin.Block tag="div">
              {"Send updates via email"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-412")}
            tag="div"
          >
            <_Builtin.Block tag="div" {...onClickReport}>
              <ButtonOutlinedRegular textLabel="Report" />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      {isTicketSubmitSuccessfully ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "ticket-successfully-wrappers")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "ticket-successfuly")}
            tag="div"
          >
            <_Builtin.Block tag="div">
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M28.8215%2013.8215C29.4724%2013.1706%2030.5276%2013.1706%2031.1785%2013.8215C31.8294%2014.4724%2031.8294%2015.5276%2031.1785%2016.1785L19.5118%2027.8452C18.861%2028.496%2017.8057%2028.496%2017.1548%2027.8452L10.4882%2021.1785C9.83728%2020.5276%209.83728%2019.4724%2010.4882%2018.8215C11.139%2018.1706%2012.1943%2018.1706%2012.8452%2018.8215L18.3333%2024.3096L28.8215%2013.8215ZM20%2040C8.9543%2040%200%2031.0457%200%2020C0%208.9543%208.9543%200%2020%200C31.0457%200%2040%208.9543%2040%2020C40%2031.0457%2031.0457%2040%2020%2040ZM20%2036.6667C29.2047%2036.6667%2036.6667%2029.2047%2036.6667%2020C36.6667%2010.7953%2029.2047%203.33333%2020%203.33333C10.7953%203.33333%203.33333%2010.7953%203.33333%2020C3.33333%2029.2047%2010.7953%2036.6667%2020%2036.6667Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-413")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-xl", "fw-semibold")}
                tag="div"
              >
                {"Your issue submitted successfully"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-xl", "fw-semibold")}
                tag="div"
              >
                {"Ticket ID #9120i123"}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-414")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-grey-600")}
                tag="div"
              >
                {
                  "You will receive an email containing the ticket details, and a dedicated representative will be in contact with you shortly."
                }
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-415")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "aui-button-wrap")}
                  tag="div"
                  tabIndex=""
                  {...onClickCopyLinkToTicket}
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "aui-button",
                      "is-small",
                      "is-button-outlined"
                    )}
                    tag="div"
                    tabIndex=""
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "button-icon", "is-large")}
                      tag="div"
                    >
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icon")}
                        value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3%207.5C3%207.22386%202.77614%207%202.5%207H1V1H7V2.5C7%202.77614%207.22386%203%207.5%203C7.77614%203%208%202.77614%208%202.5V1C8%200.447715%207.55228%200%207%200H1C0.447715%200%200%200.447715%200%201V7C0%207.55228%200.447715%208%201%208H2.5C2.77614%208%203%207.77614%203%207.5ZM12%205C12%204.44772%2011.5523%204%2011%204H5C4.44772%204%204%204.44772%204%205V11C4%2011.5523%204.44772%2012%205%2012H11C11.5523%2012%2012%2011.5523%2012%2011V5ZM5%2011V5H11V11H5Z%22%20fill%3D%22%231F73B7%22%2F%3E%0A%20%20%3Cmask%20id%3D%22mask0_2456_113832%22%20style%3D%22mask-type%3Aluminance%22%20maskUnits%3D%22userSpaceOnUse%22%20x%3D%220%22%20y%3D%220%22%20width%3D%2212%22%20height%3D%2212%22%3E%0A%20%20%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3%207.5C3%207.22386%202.77614%207%202.5%207H1V1H7V2.5C7%202.77614%207.22386%203%207.5%203C7.77614%203%208%202.77614%208%202.5V1C8%200.447715%207.55228%200%207%200H1C0.447715%200%200%200.447715%200%201V7C0%207.55228%200.447715%208%201%208H2.5C2.77614%208%203%207.77614%203%207.5ZM12%205C12%204.44772%2011.5523%204%2011%204H5C4.44772%204%204%204.44772%204%205V11C4%2011.5523%204.44772%2012%205%2012H11C11.5523%2012%2012%2011.5523%2012%2011V5ZM5%2011V5H11V11H5Z%22%20fill%3D%22white%22%2F%3E%0A%20%20%3C%2Fmask%3E%0A%20%20%3Cg%20mask%3D%22url(%23mask0_2456_113832)%22%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E"
                      />
                    </_Builtin.Block>
                    <_Builtin.Block tag="div">
                      {"Copy link to the ticket"}
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
