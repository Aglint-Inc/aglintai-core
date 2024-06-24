"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./AvailabilitySlot.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-123":{"id":"e-123","name":"","animationType":"custom","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-72","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-124"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"38140510-fb36-39f4-c259-52715097020d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"38140510-fb36-39f4-c259-52715097020d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1708089463350}},"actionLists":{"a-72":{"id":"a-72","title":"DemoSlotAvailability","actionItemGroups":[{"actionItems":[{"id":"a-72-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-950._1","selectorGuids":["783cb84e-a24c-40be-fdd3-9249e3fe795a","8a34af14-268d-fc7d-a518-ede9d9783b36"]},"value":"none"}},{"id":"a-72-n-12","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".div-block-950._3","selectorGuids":["783cb84e-a24c-40be-fdd3-9249e3fe795a","a01c25ba-4c7b-aa71-e326-59da037a126b"]},"value":0,"unit":""}},{"id":"a-72-n-11","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".div-block-950._2","selectorGuids":["783cb84e-a24c-40be-fdd3-9249e3fe795a","60581b33-b6d0-6d79-6226-258c169454ef"]},"value":0,"unit":""}},{"id":"a-72-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".div-block-950._1","selectorGuids":["783cb84e-a24c-40be-fdd3-9249e3fe795a","8a34af14-268d-fc7d-a518-ede9d9783b36"]},"value":0,"unit":""}},{"id":"a-72-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-950._3","selectorGuids":["783cb84e-a24c-40be-fdd3-9249e3fe795a","a01c25ba-4c7b-aa71-e326-59da037a126b"]},"value":"none"}},{"id":"a-72-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-950._2","selectorGuids":["783cb84e-a24c-40be-fdd3-9249e3fe795a","60581b33-b6d0-6d79-6226-258c169454ef"]},"value":"none"}}]},{"actionItems":[{"id":"a-72-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":700,"easing":"ease","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".div-block-950._1","selectorGuids":["783cb84e-a24c-40be-fdd3-9249e3fe795a","8a34af14-268d-fc7d-a518-ede9d9783b36"]},"value":1,"unit":""}},{"id":"a-72-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":700,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-950._1","selectorGuids":["783cb84e-a24c-40be-fdd3-9249e3fe795a","8a34af14-268d-fc7d-a518-ede9d9783b36"]},"value":"flex"}},{"id":"a-72-n-7","actionTypeId":"GENERAL_DISPLAY","config":{"delay":1800,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-950._2","selectorGuids":["783cb84e-a24c-40be-fdd3-9249e3fe795a","60581b33-b6d0-6d79-6226-258c169454ef"]},"value":"flex"}},{"id":"a-72-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":1800,"easing":"ease","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".div-block-950._2","selectorGuids":["783cb84e-a24c-40be-fdd3-9249e3fe795a","60581b33-b6d0-6d79-6226-258c169454ef"]},"value":1,"unit":""}},{"id":"a-72-n-9","actionTypeId":"STYLE_OPACITY","config":{"delay":2800,"easing":"ease","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".div-block-950._3","selectorGuids":["783cb84e-a24c-40be-fdd3-9249e3fe795a","a01c25ba-4c7b-aa71-e326-59da037a126b"]},"value":1,"unit":""}},{"id":"a-72-n-10","actionTypeId":"GENERAL_DISPLAY","config":{"delay":2800,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-950._3","selectorGuids":["783cb84e-a24c-40be-fdd3-9249e3fe795a","a01c25ba-4c7b-aa71-e326-59da037a126b"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1708089468830}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function AvailabilitySlot({
  as: _Component = _Builtin.Block,
  slotTeamAvailabilityCard,
  slotProgressLoader,
  textHeader = "Collect availability slots from team engineering.",
  textMessage1 = "Send availability slots to team members",
  isUserSlotVisible = true,
  isWaitingResponseVisible = true,
  isMessage1Visible = true,
  textMessage2 = "Waiting response from other team members",
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "slot-availability-wrap")}
      data-w-id="38140510-fb36-39f4-c259-52715097020d"
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
        {textHeader}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-946")} tag="div">
        {isMessage1Visible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-950")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-949")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-947")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.375%202C5.60938%202.01563%205.73438%202.14062%205.75%202.375V3.5H10.25V2.375C10.2656%202.14062%2010.3906%202.01563%2010.625%202C10.8594%202.01563%2010.9844%202.14062%2011%202.375V3.5H11.75C12.1719%203.51563%2012.5234%203.66406%2012.8047%203.94531C13.0859%204.22656%2013.2344%204.57812%2013.25%205V5.75V6.5V12.5C13.2344%2012.9219%2013.0859%2013.2734%2012.8047%2013.5547C12.5234%2013.8359%2012.1719%2013.9844%2011.75%2014H4.25C3.82812%2013.9844%203.47656%2013.8359%203.19531%2013.5547C2.91406%2013.2734%202.76562%2012.9219%202.75%2012.5V6.5V5.75V5C2.76562%204.57812%202.91406%204.22656%203.19531%203.94531C3.47656%203.66406%203.82812%203.51563%204.25%203.5H5V2.375C5.01562%202.14062%205.14062%202.01563%205.375%202ZM12.5%206.5H3.5V12.5C3.5%2012.7188%203.57031%2012.8984%203.71094%2013.0391C3.85156%2013.1797%204.03125%2013.25%204.25%2013.25H11.75C11.9688%2013.25%2012.1484%2013.1797%2012.2891%2013.0391C12.4297%2012.8984%2012.5%2012.7188%2012.5%2012.5V6.5ZM11.75%204.25H4.25C4.03125%204.25%203.85156%204.32031%203.71094%204.46094C3.57031%204.60156%203.5%204.78125%203.5%205V5.75H12.5V5C12.5%204.78125%2012.4297%204.60156%2012.2891%204.46094C12.1484%204.32031%2011.9688%204.25%2011.75%204.25Z%22%20fill%3D%22%23FF6224%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-948")}
                tag="div"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-952")}
              tag="div"
            >
              <_Builtin.Block tag="div">{textMessage1}</_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-951")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-sm", "text-grey-600")}
                  tag="div"
                >
                  {"Just now"}
                </_Builtin.Block>
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6%2012C4.90625%2011.9844%203.90625%2011.7188%203%2011.2031C2.09375%2010.6719%201.35938%209.9375%200.796875%209C0.265625%208.04688%200%207.04688%200%206C0%204.95312%200.265625%203.95313%200.796875%203C1.35938%202.0625%202.09375%201.32813%203%200.796875C3.90625%200.28125%204.90625%200.015625%206%200C7.09375%200.015625%208.09375%200.28125%209%200.796875C9.90625%201.32813%2010.6406%202.0625%2011.2031%203C11.7344%203.95313%2012%204.95312%2012%206C12%207.04688%2011.7344%208.04688%2011.2031%209C10.6406%209.9375%209.90625%2010.6719%209%2011.2031C8.09375%2011.7188%207.09375%2011.9844%206%2012ZM8.64844%204.89844C8.86719%204.63281%208.86719%204.36719%208.64844%204.10156C8.38281%203.88281%208.11719%203.88281%207.85156%204.10156L5.25%206.70312L4.14844%205.60156C3.88281%205.38281%203.61719%205.38281%203.35156%205.60156C3.13281%205.86719%203.13281%206.13281%203.35156%206.39844L4.85156%207.89844C5.11719%208.11719%205.38281%208.11719%205.64844%207.89844L8.64844%204.89844Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isUserSlotVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-954")}
            tag="div"
          >
            {slotTeamAvailabilityCard ?? (
              <>
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-950", "_1")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "div-block-949")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "div-block-947",
                        "no-border"
                      )}
                      tag="div"
                    >
                      <_Builtin.Image
                        loading="lazy"
                        width="auto"
                        height="auto"
                        alt=""
                        src="https://uploads-ssl.webflow.com/651419e73ebbb12148f96ccc/65cf56cf24e1ad689fef10aa_timelineAvatar.svg"
                      />
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "div-block-948")}
                      tag="div"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "div-block-952")}
                    tag="div"
                  >
                    <_Builtin.Block tag="div">
                      {"John confirmed 3 slots"}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "div-block-951")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "text-sm",
                          "text-grey-600"
                        )}
                        tag="div"
                      >
                        {"Just now"}
                      </_Builtin.Block>
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icons")}
                        value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6%2012C4.90625%2011.9844%203.90625%2011.7188%203%2011.2031C2.09375%2010.6719%201.35938%209.9375%200.796875%209C0.265625%208.04688%200%207.04688%200%206C0%204.95312%200.265625%203.95313%200.796875%203C1.35938%202.0625%202.09375%201.32813%203%200.796875C3.90625%200.28125%204.90625%200.015625%206%200C7.09375%200.015625%208.09375%200.28125%209%200.796875C9.90625%201.32813%2010.6406%202.0625%2011.2031%203C11.7344%203.95313%2012%204.95312%2012%206C12%207.04688%2011.7344%208.04688%2011.2031%209C10.6406%209.9375%209.90625%2010.6719%209%2011.2031C8.09375%2011.7188%207.09375%2011.9844%206%2012ZM8.64844%204.89844C8.86719%204.63281%208.86719%204.36719%208.64844%204.10156C8.38281%203.88281%208.11719%203.88281%207.85156%204.10156L5.25%206.70312L4.14844%205.60156C3.88281%205.38281%203.61719%205.38281%203.35156%205.60156C3.13281%205.86719%203.13281%206.13281%203.35156%206.39844L4.85156%207.89844C5.11719%208.11719%205.38281%208.11719%205.64844%207.89844L8.64844%204.89844Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                      />
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-950", "_2")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "div-block-949")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "div-block-947",
                        "no-border"
                      )}
                      tag="div"
                    >
                      <_Builtin.Image
                        loading="lazy"
                        width="auto"
                        height="auto"
                        alt=""
                        src="https://uploads-ssl.webflow.com/651419e73ebbb12148f96ccc/65cf5720ad9b46512092c285_Image.svg"
                      />
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "div-block-948")}
                      tag="div"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "div-block-952")}
                    tag="div"
                  >
                    <_Builtin.Block tag="div">
                      {"Lisa confirmed 4 slots"}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "div-block-951")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "text-sm",
                          "text-grey-600"
                        )}
                        tag="div"
                      >
                        {"Just now"}
                      </_Builtin.Block>
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icons")}
                        value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6%2012C4.90625%2011.9844%203.90625%2011.7188%203%2011.2031C2.09375%2010.6719%201.35938%209.9375%200.796875%209C0.265625%208.04688%200%207.04688%200%206C0%204.95312%200.265625%203.95313%200.796875%203C1.35938%202.0625%202.09375%201.32813%203%200.796875C3.90625%200.28125%204.90625%200.015625%206%200C7.09375%200.015625%208.09375%200.28125%209%200.796875C9.90625%201.32813%2010.6406%202.0625%2011.2031%203C11.7344%203.95313%2012%204.95312%2012%206C12%207.04688%2011.7344%208.04688%2011.2031%209C10.6406%209.9375%209.90625%2010.6719%209%2011.2031C8.09375%2011.7188%207.09375%2011.9844%206%2012ZM8.64844%204.89844C8.86719%204.63281%208.86719%204.36719%208.64844%204.10156C8.38281%203.88281%208.11719%203.88281%207.85156%204.10156L5.25%206.70312L4.14844%205.60156C3.88281%205.38281%203.61719%205.38281%203.35156%205.60156C3.13281%205.86719%203.13281%206.13281%203.35156%206.39844L4.85156%207.89844C5.11719%208.11719%205.38281%208.11719%205.64844%207.89844L8.64844%204.89844Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                      />
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </>
            )}
          </_Builtin.Block>
        ) : null}
        {isWaitingResponseVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-950", "_3")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-949")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-947")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.375%202C5.60938%202.01563%205.73438%202.14062%205.75%202.375V3.5H10.25V2.375C10.2656%202.14062%2010.3906%202.01563%2010.625%202C10.8594%202.01563%2010.9844%202.14062%2011%202.375V3.5H11.75C12.1719%203.51563%2012.5234%203.66406%2012.8047%203.94531C13.0859%204.22656%2013.2344%204.57812%2013.25%205V5.75V6.5V12.5C13.2344%2012.9219%2013.0859%2013.2734%2012.8047%2013.5547C12.5234%2013.8359%2012.1719%2013.9844%2011.75%2014H4.25C3.82812%2013.9844%203.47656%2013.8359%203.19531%2013.5547C2.91406%2013.2734%202.76562%2012.9219%202.75%2012.5V6.5V5.75V5C2.76562%204.57812%202.91406%204.22656%203.19531%203.94531C3.47656%203.66406%203.82812%203.51563%204.25%203.5H5V2.375C5.01562%202.14062%205.14062%202.01563%205.375%202ZM12.5%206.5H3.5V12.5C3.5%2012.7188%203.57031%2012.8984%203.71094%2013.0391C3.85156%2013.1797%204.03125%2013.25%204.25%2013.25H11.75C11.9688%2013.25%2012.1484%2013.1797%2012.2891%2013.0391C12.4297%2012.8984%2012.5%2012.7188%2012.5%2012.5V6.5ZM11.75%204.25H4.25C4.03125%204.25%203.85156%204.32031%203.71094%204.46094C3.57031%204.60156%203.5%204.78125%203.5%205V5.75H12.5V5C12.5%204.78125%2012.4297%204.60156%2012.2891%204.46094C12.1484%204.32031%2011.9688%204.25%2011.75%204.25Z%22%20fill%3D%22%23FF6224%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-948")}
                tag="div"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-952")}
              tag="div"
            >
              <_Builtin.Block tag="div">{textMessage2}</_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-951")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-sm", "text-grey-600")}
                  tag="div"
                >
                  {"Just now"}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-953")}
                  tag="div"
                >
                  <_Builtin.Block tag="div">
                    {slotProgressLoader ?? (
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icons")}
                        value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.75%200.75V2.25C6.75%202.46875%206.67969%202.64844%206.53906%202.78906C6.39844%202.92969%206.21875%203%206%203C5.78125%203%205.60156%202.92969%205.46094%202.78906C5.32031%202.64844%205.25%202.46875%205.25%202.25V0.75C5.25%200.53125%205.32031%200.351562%205.46094%200.210938C5.60156%200.0703125%205.78125%200%206%200C6.21875%200%206.39844%200.0703125%206.53906%200.210938C6.67969%200.351562%206.75%200.53125%206.75%200.75ZM6.75%209.75V11.25C6.75%2011.4688%206.67969%2011.6484%206.53906%2011.7891C6.39844%2011.9297%206.21875%2012%206%2012C5.78125%2012%205.60156%2011.9297%205.46094%2011.7891C5.32031%2011.6484%205.25%2011.4688%205.25%2011.25V9.75C5.25%209.53125%205.32031%209.35156%205.46094%209.21094C5.60156%209.07031%205.78125%209%206%209C6.21875%209%206.39844%209.07031%206.53906%209.21094C6.67969%209.35156%206.75%209.53125%206.75%209.75ZM0%206C0%205.78125%200.0703125%205.60156%200.210938%205.46094C0.351562%205.32031%200.53125%205.25%200.75%205.25H2.25C2.46875%205.25%202.64844%205.32031%202.78906%205.46094C2.92969%205.60156%203%205.78125%203%206C3%206.21875%202.92969%206.39844%202.78906%206.53906C2.64844%206.67969%202.46875%206.75%202.25%206.75H0.75C0.53125%206.75%200.351562%206.67969%200.210938%206.53906C0.0703125%206.39844%200%206.21875%200%206ZM9.75%205.25H11.25C11.4688%205.25%2011.6484%205.32031%2011.7891%205.46094C11.9297%205.60156%2012%205.78125%2012%206C12%206.21875%2011.9297%206.39844%2011.7891%206.53906C11.6484%206.67969%2011.4688%206.75%2011.25%206.75H9.75C9.53125%206.75%209.35156%206.67969%209.21094%206.53906C9.07031%206.39844%209%206.21875%209%206C9%205.78125%209.07031%205.60156%209.21094%205.46094C9.35156%205.32031%209.53125%205.25%209.75%205.25ZM1.75781%201.75781C1.91406%201.61719%202.09375%201.54688%202.29688%201.54688C2.48438%201.54688%202.65625%201.61719%202.8125%201.75781L3.89062%202.8125C4.03125%202.96875%204.10156%203.14844%204.10156%203.35156C4.10156%203.55469%204.03125%203.73437%203.89062%203.89062C3.73438%204.03125%203.55469%204.10156%203.35156%204.10156C3.14844%204.10156%202.96875%204.03125%202.8125%203.89062L1.75781%202.8125C1.61719%202.65625%201.54688%202.48438%201.54688%202.29688C1.54688%202.09375%201.61719%201.91406%201.75781%201.75781ZM9.1875%208.13281V8.10938L10.2422%209.1875C10.3828%209.34375%2010.4531%209.51562%2010.4531%209.70312C10.4531%209.90625%2010.3828%2010.0859%2010.2422%2010.2422C10.0859%2010.3828%209.90625%2010.4531%209.70312%2010.4531C9.51562%2010.4531%209.34375%2010.3828%209.1875%2010.2422L8.13281%209.1875C7.97656%209.03125%207.89844%208.85156%207.89844%208.64844C7.89844%208.44531%207.97656%208.27344%208.13281%208.13281C8.27344%207.97656%208.44531%207.89844%208.64844%207.89844C8.85156%207.89844%209.03125%207.97656%209.1875%208.13281ZM1.75781%2010.2422C1.61719%2010.0859%201.54688%209.90625%201.54688%209.70312C1.54688%209.51562%201.61719%209.34375%201.75781%209.1875L2.8125%208.10938C2.96875%207.96875%203.14844%207.89844%203.35156%207.89844C3.55469%207.89844%203.73438%207.96875%203.89062%208.10938C4.03125%208.26562%204.10156%208.44531%204.10156%208.64844C4.10156%208.85156%204.03125%209.03125%203.89062%209.1875L2.8125%2010.2422C2.65625%2010.3828%202.48438%2010.4531%202.29688%2010.4531C2.09375%2010.4531%201.91406%2010.3828%201.75781%2010.2422ZM8.13281%202.8125H8.10938L9.1875%201.75781C9.34375%201.61719%209.51562%201.54688%209.70312%201.54688C9.90625%201.54688%2010.0859%201.61719%2010.2422%201.75781C10.3828%201.91406%2010.4531%202.09375%2010.4531%202.29688C10.4531%202.48438%2010.3828%202.65625%2010.2422%202.8125L9.1875%203.89062C9.03125%204.03125%208.85156%204.10156%208.64844%204.10156C8.44531%204.10156%208.27344%204.03125%208.13281%203.89062C7.97656%203.73437%207.89844%203.55469%207.89844%203.35156C7.89844%203.14844%207.97656%202.96875%208.13281%202.8125Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
                      />
                    )}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-sm", "text-grey-600")}
                    tag="div"
                  >
                    {"In progress"}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
