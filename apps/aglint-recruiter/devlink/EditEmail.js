"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { ButtonSolid } from "./ButtonSolid";
import * as _utils from "./utils";
import _styles from "./EditEmail.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"createdOn":1718275975402,"useFirstGroupAsInitialState":true},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"createdOn":1718275975402,"useFirstGroupAsInitialState":false}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

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
  textTipsMessage = "For dynamic content, utilize placeholders like [firstName], [lastName], [companyName], and [jobTitle].",
  onClickPreview = {},
  isPreviewVisible = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "edit-email-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "company-email-edit")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "company-email-header")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "edit-email-head")}
            tag="div"
          >
            <Text content={textEmailName} weight="bold" />
            {isPreviewVisible ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "edit-email-preview-btn")}
                tag="div"
                {...onClickPreview}
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewBox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.5%202.75C8.45312%202.76563%209.30469%202.95313%2010.0547%203.3125C10.8047%203.67187%2011.4609%204.11719%2012.0234%204.64844C12.5703%205.16406%2013.0234%205.69531%2013.3828%206.24219C13.7422%206.78906%2014.0156%207.28125%2014.2031%207.71875C14.2812%207.90625%2014.2812%208.09375%2014.2031%208.28125C14.0156%208.71875%2013.7422%209.21094%2013.3828%209.75781C13.0234%2010.3047%2012.5703%2010.8359%2012.0234%2011.3516C11.4609%2011.8828%2010.8047%2012.3281%2010.0547%2012.6875C9.30469%2013.0469%208.45312%2013.2344%207.5%2013.25C6.54688%2013.2344%205.69531%2013.0469%204.94531%2012.6875C4.19531%2012.3281%203.53906%2011.8828%202.97656%2011.3516C2.42969%2010.8359%201.97656%2010.3047%201.61719%209.75781C1.25781%209.21094%200.992188%208.71875%200.820312%208.28125C0.742188%208.09375%200.742188%207.90625%200.820312%207.71875C0.992188%207.28125%201.25781%206.78906%201.61719%206.24219C1.97656%205.69531%202.42969%205.16406%202.97656%204.64844C3.53906%204.11719%204.19531%203.67187%204.94531%203.3125C5.69531%202.95313%206.54688%202.76563%207.5%202.75ZM4.125%208C4.125%208.60938%204.27344%209.17188%204.57031%209.6875C4.86719%2010.2031%205.28125%2010.6172%205.8125%2010.9297C6.34375%2011.2266%206.90625%2011.375%207.5%2011.375C8.09375%2011.375%208.65625%2011.2266%209.1875%2010.9297C9.71875%2010.6172%2010.1328%2010.2031%2010.4297%209.6875C10.7266%209.17188%2010.875%208.60938%2010.875%208C10.875%207.39062%2010.7266%206.82812%2010.4297%206.3125C10.1328%205.79688%209.71875%205.38281%209.1875%205.07031C8.65625%204.77344%208.09375%204.625%207.5%204.625C6.90625%204.625%206.34375%204.77344%205.8125%205.07031C5.28125%205.38281%204.86719%205.79688%204.57031%206.3125C4.27344%206.82812%204.125%207.39062%204.125%208ZM7.5%206.5C7.5%206.32812%207.47656%206.17188%207.42969%206.03125C7.39844%205.875%207.45312%205.78125%207.59375%205.75C8.07812%205.78125%208.51562%205.94531%208.90625%206.24219C9.28125%206.53906%209.53906%206.92969%209.67969%207.41406C9.82031%208.03906%209.74219%208.60938%209.44531%209.125C9.14844%209.64062%208.69531%209.99219%208.08594%2010.1797C7.46094%2010.3203%206.89062%2010.2422%206.375%209.94531C5.85938%209.64844%205.50781%209.19531%205.32031%208.58594C5.27344%208.41406%205.25%208.25%205.25%208.09375C5.28125%207.95312%205.375%207.89844%205.53125%207.92969C5.67188%207.97656%205.82812%208%206%208C6.42188%207.98438%206.77344%207.83594%207.05469%207.55469C7.33594%207.27344%207.48438%206.92188%207.5%206.5Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
                />
                <Text content="Preview" />
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
          <Text content={editEmailDescription} color="neutral" />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "edit-email-tip-wrap")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons", "mt-3")}
            value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewbox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.375%2011H5.625C5.35938%2010.2656%204.97656%209.59375%204.47656%208.98438C4.47656%208.98438%204.47656%208.97656%204.47656%208.96094C4.35156%208.80469%204.22656%208.64062%204.10156%208.46875C3.63281%207.79688%203.39062%207.01562%203.375%206.125C3.40625%204.95312%203.8125%203.98438%204.59375%203.21875C5.35938%202.4375%206.32812%202.03125%207.5%202C8.67188%202.03125%209.64062%202.4375%2010.4062%203.21875C11.1875%203.98438%2011.5938%204.95312%2011.625%206.125C11.6094%207.01562%2011.3672%207.79688%2010.8984%208.46875C10.7734%208.64062%2010.6484%208.8125%2010.5234%208.98438C10.5234%208.98438%2010.5234%208.99219%2010.5234%209.00781C10.0234%209.61719%209.64062%2010.2812%209.375%2011ZM7.5%2014C6.96875%2013.9844%206.52344%2013.8047%206.16406%2013.4609C5.82031%2013.1016%205.64062%2012.6562%205.625%2012.125V11.75H9.375V12.125C9.35938%2012.6562%209.17969%2013.1016%208.83594%2013.4609C8.47656%2013.8047%208.03125%2013.9844%207.5%2014ZM5.625%206.125C5.64062%205.59375%205.82031%205.14844%206.16406%204.78906C6.52344%204.44531%206.96875%204.26562%207.5%204.25C7.73438%204.23438%207.85938%204.10938%207.875%203.875C7.85938%203.64062%207.73438%203.51563%207.5%203.5C6.75%203.51563%206.13281%203.77344%205.64844%204.27344C5.14844%204.75781%204.89062%205.375%204.875%206.125C4.89062%206.35938%205.01562%206.48438%205.25%206.5C5.48438%206.48438%205.60938%206.35938%205.625%206.125Z%22%20fill%3D%22%23ED8F1C%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block tag="div">
            <Text content="Pro Tip: Customize Your Message" />
            <Text content={textTipsMessage} color="neutral" />
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
            className={_utils.cx(_styles, "edit-email-btn-wrap")}
            tag="div"
          >
            <_Builtin.Block tag="div" {...onClickSaveChanges}>
              <ButtonSolid
                isLeftIcon={false}
                isRightIcon={false}
                textButton="Save Changes"
                size="2"
              />
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isRequestTestMailVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "slot-edit-email-bottom")}
            tag="div"
          >
            {slotBottom}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
