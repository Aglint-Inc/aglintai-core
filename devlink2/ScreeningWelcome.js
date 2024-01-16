import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./ScreeningWelcome.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-119":{"id":"e-119","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-66","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-120"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"4dffee4e-4723-32e0-5541-3b229cee5e44","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"4dffee4e-4723-32e0-5541-3b229cee5e44","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1705071559416},"e-120":{"id":"e-120","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-67","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-119"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"4dffee4e-4723-32e0-5541-3b229cee5e44","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"4dffee4e-4723-32e0-5541-3b229cee5e44","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1705071559416}},"actionLists":{"a-66":{"id":"a-66","title":"scr-tooltip-[hover-in]","actionItemGroups":[{"actionItems":[{"id":"a-66-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".scr-header-tooltip-content","selectorGuids":["2848eeda-b118-6214-79a1-f0d63fd94604"]},"value":"none"}}]},{"actionItems":[{"id":"a-66-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".scr-header-tooltip-content","selectorGuids":["2848eeda-b118-6214-79a1-f0d63fd94604"]},"value":"block"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1705071432343},"a-67":{"id":"a-67","title":"scr-tooltip-[hover-out]","actionItemGroups":[{"actionItems":[{"id":"a-67-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".scr-header-tooltip-content","selectorGuids":["2848eeda-b118-6214-79a1-f0d63fd94604"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1705071492040}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function ScreeningWelcome({
  as: _Component = _Builtin.Block,
  isDefaultView = true,
  isEditView = false,
  defaultText = "Welcome to the candidate application form.Please fill out the following information",
  onclickEdit = {},
  editHeading = "Start message",
  slotInput,
  slotButtons,
  tooltipText = "This message will appear to the candidate as a welcome message before filling the form",
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "screening-header-info")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "screening-header")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "scr-header-info-icon-block")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "svg-icon")}
            value="%3Csvg%20width%3D%2213%22%20height%3D%2211%22%20viewBox%3D%220%200%2013%2011%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0%202C0%200.895431%200.895431%200%202%200H7V11H2C0.89543%2011%200%2010.1046%200%209V2Z%22%20fill%3D%22%2368737D%22%20style%3D%22fill%3A%2368737D%3Bfill%3Acolor(display-p3%200.4078%200.4510%200.4902)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3Crect%20x%3D%228%22%20y%3D%221%22%20width%3D%221%22%20height%3D%229%22%20rx%3D%220.5%22%20fill%3D%22%2368737D%22%20style%3D%22fill%3A%2368737D%3Bfill%3Acolor(display-p3%200.4078%200.4510%200.4902)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3Crect%20x%3D%2210%22%20y%3D%222%22%20width%3D%221%22%20height%3D%227%22%20rx%3D%220.5%22%20fill%3D%22%2368737D%22%20style%3D%22fill%3A%2368737D%3Bfill%3Acolor(display-p3%200.4078%200.4510%200.4902)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3Crect%20x%3D%2212%22%20y%3D%223%22%20width%3D%221%22%20height%3D%225%22%20rx%3D%220.5%22%20fill%3D%22%2368737D%22%20style%3D%22fill%3A%2368737D%3Bfill%3Acolor(display-p3%200.4078%200.4510%200.4902)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
        <_Builtin.Block tag="div">{editHeading}</_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "scr-header-tooltip-wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "icon-block", "_16x16", "clickable")}
            data-w-id="4dffee4e-4723-32e0-5541-3b229cee5e44"
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "svg-icon")}
              value="%3Csvg%20width%3D%2213%22%20height%3D%2213%22%20viewBox%3D%220%200%2013%2013%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.5%2012.5C5.40625%2012.4844%204.40625%2012.2188%203.5%2011.7031C2.59375%2011.1719%201.85938%2010.4375%201.29688%209.5C0.765625%208.54688%200.5%207.54688%200.5%206.5C0.5%205.45312%200.765625%204.45312%201.29688%203.5C1.85938%202.5625%202.59375%201.82813%203.5%201.29688C4.40625%200.78125%205.40625%200.515625%206.5%200.5C7.59375%200.515625%208.59375%200.78125%209.5%201.29688C10.4062%201.82813%2011.1406%202.5625%2011.7031%203.5C12.2344%204.45312%2012.5%205.45312%2012.5%206.5C12.5%207.54688%2012.2344%208.54688%2011.7031%209.5C11.1406%2010.4375%2010.4062%2011.1719%209.5%2011.7031C8.59375%2012.2188%207.59375%2012.4844%206.5%2012.5ZM5.5625%208.375C5.21875%208.40625%205.03125%208.59375%205%208.9375C5.03125%209.28125%205.21875%209.46875%205.5625%209.5H7.4375C7.78125%209.46875%207.96875%209.28125%208%208.9375C7.96875%208.59375%207.78125%208.40625%207.4375%208.375H7.25V6.3125C7.21875%205.96875%207.03125%205.78125%206.6875%205.75H5.5625C5.21875%205.78125%205.03125%205.96875%205%206.3125C5.03125%206.65625%205.21875%206.84375%205.5625%206.875H6.125V8.375H5.5625ZM6.5%203.5C6.28125%203.5%206.10156%203.57031%205.96094%203.71094C5.82031%203.85156%205.75%204.03125%205.75%204.25C5.75%204.46875%205.82031%204.64844%205.96094%204.78906C6.10156%204.92969%206.28125%205%206.5%205C6.71875%205%206.89844%204.92969%207.03906%204.78906C7.17969%204.64844%207.25%204.46875%207.25%204.25C7.25%204.03125%207.17969%203.85156%207.03906%203.71094C6.89844%203.57031%206.71875%203.5%206.5%203.5Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "scr-header-tooltip-content")}
            tag="div"
          >
            <_Builtin.Block tag="div">{tooltipText}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "scr-header-edit-icon-block")}
          tag="div"
          {...onclickEdit}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "svg-icon")}
            value="%3Csvg%20width%3D%2213%22%20height%3D%2213%22%20viewBox%3D%220%200%2013%2013%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10.8359%201.88281C10.5703%201.66406%2010.3047%201.66406%2010.0391%201.88281L9.35938%202.5625L10.4375%203.64062L11.1172%202.96094C11.3359%202.69531%2011.3359%202.42969%2011.1172%202.16406L10.8359%201.88281ZM5.42188%206.5C5.34375%206.57812%205.29688%206.66406%205.28125%206.75781L4.88281%208.11719L6.24219%207.71875C6.33594%207.70312%206.42188%207.65625%206.5%207.57812L9.64062%204.4375L8.5625%203.35938L5.42188%206.5ZM9.24219%201.08594C9.58594%200.757812%209.98438%200.59375%2010.4375%200.59375C10.8906%200.59375%2011.2891%200.757812%2011.6328%201.08594L11.9141%201.36719C12.2422%201.71094%2012.4062%202.10938%2012.4062%202.5625C12.4062%203.01562%2012.2422%203.41406%2011.9141%203.75781L7.29688%208.375C7.09375%208.57812%206.85156%208.71875%206.57031%208.79688L4.22656%209.47656C4.00781%209.52344%203.82031%209.47656%203.66406%209.33594C3.50781%209.17969%203.46094%208.99219%203.52344%208.77344L4.20312%206.42969C4.28125%206.16406%204.42188%205.92188%204.625%205.70312L9.24219%201.08594ZM2.5625%202H5.1875C5.53125%202.03125%205.71875%202.21875%205.75%202.5625C5.71875%202.90625%205.53125%203.09375%205.1875%203.125H2.5625C2.29688%203.125%202.07812%203.21875%201.90625%203.40625C1.71875%203.57812%201.625%203.79688%201.625%204.0625V10.4375C1.625%2010.7031%201.71875%2010.9219%201.90625%2011.0938C2.07812%2011.2812%202.29688%2011.375%202.5625%2011.375H8.9375C9.20312%2011.375%209.42188%2011.2812%209.59375%2011.0938C9.78125%2010.9219%209.875%2010.7031%209.875%2010.4375V7.8125C9.90625%207.46875%2010.0938%207.28125%2010.4375%207.25C10.7812%207.28125%2010.9688%207.46875%2011%207.8125V10.4375C10.9844%2011.0156%2010.7812%2011.5%2010.3906%2011.8906C10%2012.2812%209.51562%2012.4844%208.9375%2012.5H2.5625C1.98438%2012.4844%201.5%2012.2812%201.10938%2011.8906C0.71875%2011.5%200.515625%2011.0156%200.5%2010.4375V4.0625C0.515625%203.48437%200.71875%203%201.10938%202.60938C1.5%202.21875%201.98438%202.01563%202.5625%202Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
      </_Builtin.Block>
      {isDefaultView ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "screening-header-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "scr-header-text-block")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {defaultText}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isEditView ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "screening-header-edit-block")}
          tag="div"
        >
          <_Builtin.Block tag="div">{slotInput}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "sh-edit-buttons-wrapper")}
            tag="div"
          >
            {slotButtons}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
