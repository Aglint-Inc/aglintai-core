"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./IntegrationCard.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-157":{"id":"e-157","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-102","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-158"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1715600282313},"e-158":{"id":"e-158","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-103","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-157"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1715600282314}},"actionLists":{"a-102":{"id":"a-102","title":"DayoffList Hover in","actionItemGroups":[{"actionItems":[{"id":"a-102-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":0,"unit":""}},{"id":"a-102-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"none"}}]},{"actionItems":[{"id":"a-102-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":1,"unit":""}},{"id":"a-102-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1715600286589},"a-103":{"id":"a-103","title":"DayoffList Hover out","actionItemGroups":[{"actionItems":[{"id":"a-103-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":0,"unit":""}},{"id":"a-103-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1715600286589}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function IntegrationCard({
  as: _Component = _Builtin.Block,
  slotLogo,
  textName = "Greenhouse",
  isConnectedVisible = true,
  onClickCopyLink = {},
  slotButton,
  textLink = "greenhouse.com",
  isComingSoon = false,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "intigrations-card")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "card-heading-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "intigration-icon")}
          tag="div"
          editable={false}
        >
          {slotLogo}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "card-heading")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "header-row")}
            tag="div"
          >
            <Text content={textName} align="" weight="medium" />
            {isConnectedVisible ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "connected-status")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6%2012C4.90625%2011.9844%203.90625%2011.7188%203%2011.2031C2.09375%2010.6719%201.35938%209.9375%200.796875%209C0.265625%208.04688%200%207.04688%200%206C0%204.95312%200.265625%203.95313%200.796875%203C1.35938%202.0625%202.09375%201.32813%203%200.796875C3.90625%200.28125%204.90625%200.015625%206%200C7.09375%200.015625%208.09375%200.28125%209%200.796875C9.90625%201.32813%2010.6406%202.0625%2011.2031%203C11.7344%203.95313%2012%204.95312%2012%206C12%207.04688%2011.7344%208.04688%2011.2031%209C10.6406%209.9375%209.90625%2010.6719%209%2011.2031C8.09375%2011.7188%207.09375%2011.9844%206%2012ZM8.64844%204.89844C8.86719%204.63281%208.86719%204.36719%208.64844%204.10156C8.38281%203.88281%208.11719%203.88281%207.85156%204.10156L5.25%206.70312L4.14844%205.60156C3.88281%205.38281%203.61719%205.38281%203.35156%205.60156C3.13281%205.86719%203.13281%206.13281%203.35156%206.39844L4.85156%207.89844C5.11719%208.11719%205.38281%208.11719%205.64844%207.89844L8.64844%204.89844Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "intagration-link", "cursor-pointer")}
            tag="div"
            {...onClickCopyLink}
          >
            <Text
              content={textLink}
              align=""
              weight=""
              color="neutral"
              highContrast=""
            />
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2216%22%20height%3D%2212%22%20viewbox%3D%220%200%2016%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M14.375%206L11.4453%208.90625C10.8203%209.5%2010.1094%209.79688%209.3125%209.79688C8.51562%209.79688%207.8125%209.5%207.20312%208.90625C6.64062%208.32812%206.35156%207.66406%206.33594%206.91406C6.30469%206.14844%206.54688%205.45312%207.0625%204.82812L7.17969%204.6875C7.35156%204.53125%207.53125%204.52344%207.71875%204.66406C7.875%204.82031%207.88281%204.99219%207.74219%205.17969L7.625%205.32031C7.23438%205.78906%207.05469%206.3125%207.08594%206.89062C7.10156%207.45312%207.32031%207.95312%207.74219%208.39062C8.19531%208.82812%208.72656%209.04688%209.33594%209.04688C9.92969%209.04688%2010.4531%208.82812%2010.9062%208.39062L13.8359%205.46094C14.2734%205.00781%2014.4922%204.48438%2014.4922%203.89062C14.4922%203.28125%2014.2734%202.75%2013.8359%202.29688C13.3672%201.84375%2012.8359%201.61719%2012.2422%201.61719C11.6484%201.61719%2011.1172%201.84375%2010.6484%202.29688L10.1328%202.8125C9.94531%202.96875%209.76562%202.96875%209.59375%202.8125C9.45312%202.64063%209.45312%202.46875%209.59375%202.29688L10.1328%201.75781C10.7422%201.17969%2011.4453%200.890625%2012.2422%200.890625C13.0391%200.890625%2013.75%201.17969%2014.375%201.75781C14.9531%202.36719%2015.2422%203.07812%2015.2422%203.89062C15.2422%204.6875%2014.9531%205.39062%2014.375%206ZM1.64844%206L4.55469%203.07031C5.16406%202.49219%205.86719%202.20312%206.66406%202.20312C7.46094%202.20312%208.17188%202.5%208.79688%203.09375C9.35938%203.67188%209.64844%204.33594%209.66406%205.08594C9.69531%205.85156%209.45312%206.54688%208.9375%207.17188L8.82031%207.3125C8.64844%207.46875%208.46875%207.47656%208.28125%207.33594C8.125%207.17969%208.11719%207.00781%208.25781%206.82031L8.375%206.67969C8.76562%206.21094%208.94531%205.69531%208.91406%205.13281C8.89844%204.55469%208.67969%204.04688%208.25781%203.60938C7.80469%203.17187%207.27344%202.95312%206.66406%202.95312C6.07031%202.95312%205.54688%203.17187%205.09375%203.60938L2.16406%206.53906C1.72656%206.99219%201.50781%207.52344%201.50781%208.13281C1.50781%208.72656%201.72656%209.25%202.16406%209.70312C2.63281%2010.1562%203.16406%2010.3828%203.75781%2010.3828C4.35156%2010.3828%204.88281%2010.1562%205.35156%209.70312L5.89062%209.1875C6.0625%209.04688%206.23438%209.04688%206.40625%209.1875C6.54688%209.35938%206.54688%209.53125%206.40625%209.70312L5.89062%2010.2422C5.26562%2010.8359%204.55469%2011.1328%203.75781%2011.1328C2.96094%2011.1328%202.25781%2010.8359%201.64844%2010.2422C1.05469%209.63281%200.757812%208.92969%200.757812%208.13281C0.757812%207.32031%201.05469%206.60938%201.64844%206Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "intagration_actions")}
        tag="div"
      >
        {slotButton ??
          (isComingSoon ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "coming_soon_button")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "embed_flex")}
                value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.125%205.5V7H9.875V5.5C9.85938%204.96875%209.67969%204.52344%209.33594%204.16406C8.97656%203.82031%208.53125%203.64063%208%203.625C7.46875%203.64063%207.02344%203.82031%206.66406%204.16406C6.32031%204.52344%206.14062%204.96875%206.125%205.5ZM5%207V5.5C5.01562%204.65625%205.30469%203.94531%205.86719%203.36719C6.44531%202.80469%207.15625%202.51563%208%202.5C8.84375%202.51563%209.55469%202.80469%2010.1328%203.36719C10.6953%203.94531%2010.9844%204.65625%2011%205.5V7H11.75C12.1719%207.01562%2012.5234%207.16406%2012.8047%207.44531C13.0859%207.72656%2013.2344%208.07812%2013.25%208.5V13C13.2344%2013.4219%2013.0859%2013.7734%2012.8047%2014.0547C12.5234%2014.3359%2012.1719%2014.4844%2011.75%2014.5H4.25C3.82812%2014.4844%203.47656%2014.3359%203.19531%2014.0547C2.91406%2013.7734%202.76562%2013.4219%202.75%2013V8.5C2.76562%208.07812%202.91406%207.72656%203.19531%207.44531C3.47656%207.16406%203.82812%207.01562%204.25%207H5ZM3.875%208.5V13C3.89062%2013.2344%204.01562%2013.3594%204.25%2013.375H11.75C11.9844%2013.3594%2012.1094%2013.2344%2012.125%2013V8.5C12.1094%208.26562%2011.9844%208.14062%2011.75%208.125H4.25C4.01562%208.14062%203.89062%208.26562%203.875%208.5Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block tag="div">{"Coming Soon"}</_Builtin.Block>
            </_Builtin.Block>
          ) : null)}
      </_Builtin.Block>
    </_Component>
  );
}
