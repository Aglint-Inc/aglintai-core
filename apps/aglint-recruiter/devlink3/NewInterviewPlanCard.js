"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { EditOptionModule } from "./EditOptionModule";
import * as _utils from "./utils";
import _styles from "./NewInterviewPlanCard.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-35":{"id":"e-35","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-36"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"b6652d53-78c1-0f96-30a0-40aa8431d39a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b6652d53-78c1-0f96-30a0-40aa8431d39a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1711953151594},"e-36":{"id":"e-36","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-35"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"b6652d53-78c1-0f96-30a0-40aa8431d39a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b6652d53-78c1-0f96-30a0-40aa8431d39a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1711953151594},"e-41":{"id":"e-41","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-42"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"1203848f-846a-68b4-5b32-d1ae8200d234","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"1203848f-846a-68b4-5b32-d1ae8200d234","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1712829112157},"e-42":{"id":"e-42","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-41"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"1203848f-846a-68b4-5b32-d1ae8200d234","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"1203848f-846a-68b4-5b32-d1ae8200d234","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1712829112158},"e-45":{"id":"e-45","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-25","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-46"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"a3dd66ab-b625-b411-593b-d8d3a0dcaf83","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"a3dd66ab-b625-b411-593b-d8d3a0dcaf83","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1712832309435},"e-46":{"id":"e-46","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-26","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-45"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"a3dd66ab-b625-b411-593b-d8d3a0dcaf83","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"a3dd66ab-b625-b411-593b-d8d3a0dcaf83","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1712832309435},"e-47":{"id":"e-47","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-48"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"fa39f503-e285-8ca8-e1d3-b0b7549642dd","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"fa39f503-e285-8ca8-e1d3-b0b7549642dd","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1712915751014},"e-48":{"id":"e-48","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-47"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"fa39f503-e285-8ca8-e1d3-b0b7549642dd","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"fa39f503-e285-8ca8-e1d3-b0b7549642dd","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1712915751015},"e-81":{"id":"e-81","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-58","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-82"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"b9121ed1-beeb-6c7a-90d1-55885df7ceae","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b9121ed1-beeb-6c7a-90d1-55885df7ceae","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1716979210746}},"actionLists":{"a-19":{"id":"a-19","title":"option schedule hover in","actionItemGroups":[{"actionItems":[{"id":"a-19-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".sloteditoptions","selectorGuids":["85d382d5-45c9-d0d9-26ad-438675b051ba"]},"value":"none"}},{"id":"a-19-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".sloteditoptions","selectorGuids":["85d382d5-45c9-d0d9-26ad-438675b051ba"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-19-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".sloteditoptions","selectorGuids":["85d382d5-45c9-d0d9-26ad-438675b051ba"]},"value":"block"}},{"id":"a-19-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".sloteditoptions","selectorGuids":["85d382d5-45c9-d0d9-26ad-438675b051ba"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1711953157238},"a-20":{"id":"a-20","title":"option schedule hover out","actionItemGroups":[{"actionItems":[{"id":"a-20-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".sloteditoptions","selectorGuids":["85d382d5-45c9-d0d9-26ad-438675b051ba"]},"value":0,"unit":""}},{"id":"a-20-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":300,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".sloteditoptions","selectorGuids":["85d382d5-45c9-d0d9-26ad-438675b051ba"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1711953157238},"a-25":{"id":"a-25","title":"option schedule hover in 2","actionItemGroups":[{"actionItems":[{"id":"a-25-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".sloteditoptions","selectorGuids":["85d382d5-45c9-d0d9-26ad-438675b051ba"]},"value":"none"}},{"id":"a-25-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".sloteditoptions","selectorGuids":["85d382d5-45c9-d0d9-26ad-438675b051ba"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-25-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".sloteditoptions","selectorGuids":["85d382d5-45c9-d0d9-26ad-438675b051ba"]},"value":"block"}},{"id":"a-25-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".sloteditoptions","selectorGuids":["85d382d5-45c9-d0d9-26ad-438675b051ba"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1711953157238},"a-26":{"id":"a-26","title":"option schedule hover out 2","actionItemGroups":[{"actionItems":[{"id":"a-26-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".sloteditoptions","selectorGuids":["85d382d5-45c9-d0d9-26ad-438675b051ba"]},"value":0,"unit":""}},{"id":"a-26-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":300,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".sloteditoptions","selectorGuids":["85d382d5-45c9-d0d9-26ad-438675b051ba"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1711953157238},"a-58":{"id":"a-58","title":"Req-recent-reschedule hover in","actionItemGroups":[{"actionItems":[{"id":"a-58-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.text-underline.text-blue-500.view-req","selectorGuids":["8dc9ea7b-682a-9ca2-5212-49b405bc4978","3ee0110b-cb1a-ae21-d0cd-e1755ffe60cb","8f018daf-ab50-e59f-ddde-28a63babe37d","756eda23-1f35-5cde-d354-ecb6f9929139"]},"value":0,"unit":""}},{"id":"a-58-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"b9121ed1-beeb-6c7a-90d1-55885df7ceae"},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-58-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.text-underline.text-blue-500.view-req","selectorGuids":["8dc9ea7b-682a-9ca2-5212-49b405bc4978","3ee0110b-cb1a-ae21-d0cd-e1755ffe60cb","8f018daf-ab50-e59f-ddde-28a63babe37d","756eda23-1f35-5cde-d354-ecb6f9929139"]},"value":"none"}}]},{"actionItems":[{"id":"a-58-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.text-underline.text-blue-500.view-req","selectorGuids":["8dc9ea7b-682a-9ca2-5212-49b405bc4978","3ee0110b-cb1a-ae21-d0cd-e1755ffe60cb","8f018daf-ab50-e59f-ddde-28a63babe37d","756eda23-1f35-5cde-d354-ecb6f9929139"]},"value":1,"unit":""}},{"id":"a-58-n-6","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":true,"id":"b9121ed1-beeb-6c7a-90d1-55885df7ceae"},"globalSwatchId":"","rValue":247,"bValue":251,"gValue":249,"aValue":1}},{"id":"a-58-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.text-underline.text-blue-500.view-req","selectorGuids":["8dc9ea7b-682a-9ca2-5212-49b405bc4978","3ee0110b-cb1a-ae21-d0cd-e1755ffe60cb","8f018daf-ab50-e59f-ddde-28a63babe37d","756eda23-1f35-5cde-d354-ecb6f9929139"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1716979214379}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function NewInterviewPlanCard({
  as: _Component = _Builtin.Block,
  slotCheckbox,
  isNotScheduledIconVisible = true,
  textMonth = "February",
  textDate = "27",
  textDay = "FRIDAY",
  slotStatus,
  textTime = "09:00 - 09:30 AM",
  isTimeVisible = true,
  textMeetingTitle = "Personality and cultural fit",
  textMeetingPlatform = "Zoom",
  slotPlatformIcon,
  textDuration = "45 Minutes",
  textLocation = "San Fransisco",
  isLocationVisible = true,
  isDurationVisible = true,
  slotScheduleNowButton,
  isScheduleNowButtonVisible = true,
  isSelected = false,
  slotEditOptionModule,
  isOnetoOneIconVisible = false,
  isPanelIconVisible = true,
  isDebriefIconVisible = false,
  onClickDots = {},
  isThreeDotVisible = true,
  onClickCard = {},
  propsBgColorStatus = {},
  isCheckboxVisible = true,
  isDateVisible = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "div-block-1400")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1394")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1402")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1385")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1589")}
              tag="div"
              {...propsBgColorStatus}
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1399", "hide")}
              tag="div"
              {...onClickCard}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-1393")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-1395")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-sm", "text-grey_600")}
                    tag="div"
                  >
                    {textMonth}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-20", "fw-semibold")}
                    tag="div"
                  >
                    {textDate}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-xsm")}
                    tag="div"
                  >
                    {textDay}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
              {isNotScheduledIconVisible ? (
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "div-block-1393",
                    "empty-schedule-date"
                  )}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "div-block-1395")}
                    tag="div"
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icons")}
                      value="%3Csvg%20width%3D%2236%22%20height%3D%2236%22%20viewbox%3D%220%200%2036%2036%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10.5%206.75V9H19.5V6.75C19.5312%206.28125%2019.7812%206.03125%2020.25%206C20.7188%206.03125%2020.9688%206.28125%2021%206.75V9H22.5C23.3438%209.03125%2024.0469%209.32812%2024.6094%209.89062C25.1719%2010.4531%2025.4688%2011.1562%2025.5%2012V13.5V15H24.75H24H21H6V27C6%2027.4375%206.14062%2027.7969%206.42188%2028.0781C6.70312%2028.3594%207.0625%2028.5%207.5%2028.5H18.375C18.8438%2029.0625%2019.3906%2029.5625%2020.0156%2030H7.5C6.65625%2029.9688%205.95312%2029.6719%205.39062%2029.1094C4.82812%2028.5469%204.53125%2027.8438%204.5%2027V15V13.5V12C4.53125%2011.1562%204.82812%2010.4531%205.39062%209.89062C5.95312%209.32812%206.65625%209.03125%207.5%209H9V6.75C9.03125%206.28125%209.28125%206.03125%209.75%206C10.2188%206.03125%2010.4688%206.28125%2010.5%206.75ZM7.5%2010.5C7.0625%2010.5%206.70312%2010.6406%206.42188%2010.9219C6.14062%2011.2031%206%2011.5625%206%2012V13.5H24V12C24%2011.5625%2023.8594%2011.2031%2023.5781%2010.9219C23.2969%2010.6406%2022.9375%2010.5%2022.5%2010.5H7.5ZM19.5%2023.25C19.5%2024.1875%2019.7344%2025.0625%2020.2031%2025.875C20.6719%2026.6875%2021.3125%2027.3281%2022.125%2027.7969C22.9375%2028.2656%2023.8125%2028.5%2024.75%2028.5C25.6875%2028.5%2026.5625%2028.2656%2027.375%2027.7969C28.1875%2027.3281%2028.8281%2026.6875%2029.2969%2025.875C29.7656%2025.0625%2030%2024.1875%2030%2023.25C30%2022.3125%2029.7656%2021.4375%2029.2969%2020.625C28.8281%2019.8125%2028.1875%2019.1719%2027.375%2018.7031C26.5625%2018.2344%2025.6875%2018%2024.75%2018C23.8125%2018%2022.9375%2018.2344%2022.125%2018.7031C21.3125%2019.1719%2020.6719%2019.8125%2020.2031%2020.625C19.7344%2021.4375%2019.5%2022.3125%2019.5%2023.25ZM31.5%2023.25C31.5%2024.4688%2031.2031%2025.5938%2030.6094%2026.625C30.0156%2027.6562%2029.1875%2028.4844%2028.125%2029.1094C27.0625%2029.7031%2025.9375%2030%2024.75%2030C23.5625%2030%2022.4375%2029.7031%2021.375%2029.1094C20.3125%2028.4844%2019.4844%2027.6562%2018.8906%2026.625C18.2969%2025.5938%2018%2024.4688%2018%2023.25C18%2022.0312%2018.2969%2020.9062%2018.8906%2019.875C19.4844%2018.8438%2020.3125%2018.0156%2021.375%2017.3906C22.4375%2016.7969%2023.5625%2016.5%2024.75%2016.5C25.9375%2016.5%2027.0625%2016.7969%2028.125%2017.3906C29.1875%2018.0156%2030.0156%2018.8438%2030.6094%2019.875C31.2031%2020.9062%2031.5%2022.0312%2031.5%2023.25ZM25.5%2020.25V22.5H27.75C28.2188%2022.5312%2028.4688%2022.7812%2028.5%2023.25C28.4688%2023.7188%2028.2188%2023.9688%2027.75%2024H25.5V26.25C25.4688%2026.7188%2025.2188%2026.9688%2024.75%2027C24.2812%2026.9688%2024.0312%2026.7188%2024%2026.25V24H21.75C21.2812%2023.9688%2021.0312%2023.7188%2021%2023.25C21.0312%2022.7812%2021.2812%2022.5312%2021.75%2022.5H24V20.25C24.0312%2019.7812%2024.2812%2019.5312%2024.75%2019.5C25.2188%2019.5312%2025.4688%2019.7812%2025.5%2020.25Z%22%20fill%3D%22%23C2C8CC%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                </_Builtin.Block>
              ) : null}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1388")}
              tag="div"
              {...onClickCard}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-1387")}
                tag="div"
              >
                {isCheckboxVisible ? (
                  <_Builtin.Block tag="div">{slotCheckbox}</_Builtin.Block>
                ) : null}
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-1386")}
                  tag="div"
                  {...onClickCard}
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "div-block-1398")}
                    tag="div"
                  >
                    {isDateVisible ? (
                      <_Builtin.Block
                        className={_utils.cx(_styles, "fw-semibold")}
                        tag="div"
                      >
                        {textDate}
                      </_Builtin.Block>
                    ) : null}
                    {isTimeVisible ? (
                      <_Builtin.Block tag="div">{textTime}</_Builtin.Block>
                    ) : null}
                    <_Builtin.Block tag="div">{slotStatus}</_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "div-block-1392")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "div-block-1384")}
                      tag="div"
                    >
                      <_Builtin.Block tag="div">
                        {isOnetoOneIconVisible ? (
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "icons")}
                            value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewbox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M4.5%204H19.5C20.2083%204.02083%2020.8021%204.26042%2021.2812%204.71875C21.7396%205.19792%2021.9792%205.79167%2022%206.5V17.5C21.9792%2018.2083%2021.7396%2018.8021%2021.2812%2019.2812C20.8021%2019.7396%2020.2083%2019.9792%2019.5%2020H4.5C3.79167%2019.9792%203.19792%2019.7396%202.71875%2019.2812C2.26042%2018.8021%202.02083%2018.2083%202%2017.5V6.5C2.02083%205.79167%202.26042%205.19792%202.71875%204.71875C3.19792%204.26042%203.79167%204.02083%204.5%204ZM3%206.5V17.5C3.02083%2017.9167%203.16667%2018.2708%203.4375%2018.5625C3.72917%2018.8333%204.08333%2018.9792%204.5%2019H19.5C19.9167%2018.9792%2020.2708%2018.8333%2020.5625%2018.5625C20.8333%2018.2708%2020.9792%2017.9167%2021%2017.5V6.5C20.9792%206.08333%2020.8333%205.72917%2020.5625%205.4375C20.2708%205.16667%2019.9167%205.02083%2019.5%205H4.5C4.08333%205.02083%203.72917%205.16667%203.4375%205.4375C3.16667%205.72917%203.02083%206.08333%203%206.5ZM11%2010C11%2010.2917%2011.0938%2010.5312%2011.2812%2010.7188C11.4688%2010.9062%2011.7083%2011%2012%2011C12.2917%2011%2012.5312%2010.9062%2012.7188%2010.7188C12.9062%2010.5312%2013%2010.2917%2013%2010C13%209.70833%2012.9062%209.46875%2012.7188%209.28125C12.5312%209.09375%2012.2917%209%2012%209C11.7083%209%2011.4688%209.09375%2011.2812%209.28125C11.0938%209.46875%2011%209.70833%2011%2010ZM14%2010C13.9792%2010.75%2013.6458%2011.3229%2013%2011.7188C12.3333%2012.0938%2011.6667%2012.0938%2011%2011.7188C10.3542%2011.3229%2010.0208%2010.75%2010%2010C10.0208%209.25%2010.3542%208.67708%2011%208.28125C11.6667%207.90625%2012.3333%207.90625%2013%208.28125C13.6458%208.67708%2013.9792%209.25%2014%2010ZM13.25%2014H10.75C10.1042%2014.0417%209.69792%2014.375%209.53125%2015H14.4688C14.3021%2014.375%2013.8958%2014.0417%2013.25%2014ZM10.75%2013H13.25C13.8958%2013.0208%2014.4271%2013.2396%2014.8438%2013.6562C15.2604%2014.0729%2015.4792%2014.6042%2015.5%2015.25C15.4583%2015.7083%2015.2083%2015.9583%2014.75%2016H9.25C8.79167%2015.9583%208.54167%2015.7083%208.5%2015.25C8.52083%2014.6042%208.73958%2014.0729%209.15625%2013.6562C9.57292%2013.2396%2010.1042%2013.0208%2010.75%2013Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                        ) : null}
                        {isPanelIconVisible ? (
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "icons")}
                            value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewbox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M4.5%204H19.5C20.2083%204.02083%2020.8021%204.26042%2021.2812%204.71875C21.7396%205.19792%2021.9792%205.79167%2022%206.5V17.5C21.9792%2018.2083%2021.7396%2018.8021%2021.2812%2019.2812C20.8021%2019.7396%2020.2083%2019.9792%2019.5%2020H4.5C3.79167%2019.9792%203.19792%2019.7396%202.71875%2019.2812C2.26042%2018.8021%202.02083%2018.2083%202%2017.5V6.5C2.02083%205.79167%202.26042%205.19792%202.71875%204.71875C3.19792%204.26042%203.79167%204.02083%204.5%204ZM3%206.5V17.5C3.02083%2017.9167%203.16667%2018.2708%203.4375%2018.5625C3.72917%2018.8333%204.08333%2018.9792%204.5%2019H19.5C19.9167%2018.9792%2020.2708%2018.8333%2020.5625%2018.5625C20.8333%2018.2708%2020.9792%2017.9167%2021%2017.5V6.5C20.9792%206.08333%2020.8333%205.72917%2020.5625%205.4375C20.2708%205.16667%2019.9167%205.02083%2019.5%205H4.5C4.08333%205.02083%203.72917%205.16667%203.4375%205.4375C3.16667%205.72917%203.02083%206.08333%203%206.5ZM11%2010C11%2010.2917%2011.0938%2010.5312%2011.2812%2010.7188C11.4688%2010.9062%2011.7083%2011%2012%2011C12.2917%2011%2012.5312%2010.9062%2012.7188%2010.7188C12.9062%2010.5312%2013%2010.2917%2013%2010C13%209.70833%2012.9062%209.46875%2012.7188%209.28125C12.5312%209.09375%2012.2917%209%2012%209C11.7083%209%2011.4688%209.09375%2011.2812%209.28125C11.0938%209.46875%2011%209.70833%2011%2010ZM14%2010C13.9792%2010.75%2013.6458%2011.3229%2013%2011.7188C12.3333%2012.0938%2011.6667%2012.0938%2011%2011.7188C10.3542%2011.3229%2010.0208%2010.75%2010%2010C10.0208%209.25%2010.3542%208.67708%2011%208.28125C11.6667%207.90625%2012.3333%207.90625%2013%208.28125C13.6458%208.67708%2013.9792%209.25%2014%2010ZM13.25%2014H10.75C10.1042%2014.0417%209.69792%2014.375%209.53125%2015H14.4688C14.3021%2014.375%2013.8958%2014.0417%2013.25%2014ZM10.75%2013H12H13.25C13.8958%2013.0208%2014.4271%2013.2396%2014.8438%2013.6562C15.2604%2014.0729%2015.4792%2014.6042%2015.5%2015.25C15.4583%2015.7083%2015.2083%2015.9583%2014.75%2016H9.25C8.79167%2015.9583%208.54167%2015.7083%208.5%2015.25C8.52083%2014.6042%208.73958%2014.0729%209.15625%2013.6562C9.57292%2013.2396%2010.1042%2013.0208%2010.75%2013ZM7%209.5C7.02083%209.8125%207.1875%209.97917%207.5%2010C7.79167%209.97917%207.95833%209.8125%208%209.5C7.95833%209.1875%207.79167%209.02083%207.5%209C7.1875%209.02083%207.02083%209.1875%207%209.5ZM9%209.5C8.97917%2010.0625%208.72917%2010.5%208.25%2010.8125C7.75%2011.0625%207.25%2011.0625%206.75%2010.8125C6.27083%2010.5%206.02083%2010.0625%206%209.5C6.02083%208.9375%206.27083%208.5%206.75%208.1875C7.25%207.9375%207.75%207.9375%208.25%208.1875C8.72917%208.5%208.97917%208.9375%209%209.5ZM6%2013.75V14C5.97917%2014.3125%205.8125%2014.4792%205.5%2014.5C5.1875%2014.4792%205.02083%2014.3125%205%2014V13.75C5.02083%2013.25%205.1875%2012.8333%205.5%2012.5C5.83333%2012.1875%206.25%2012.0208%206.75%2012H8.5C8.8125%2012.0208%208.97917%2012.1875%209%2012.5C8.97917%2012.8125%208.8125%2012.9792%208.5%2013H6.75C6.29167%2013.0417%206.04167%2013.2917%206%2013.75ZM16.5%209C16.2083%209.02083%2016.0417%209.1875%2016%209.5C16.0417%209.8125%2016.2083%209.97917%2016.5%2010C16.8125%209.97917%2016.9792%209.8125%2017%209.5C16.9792%209.1875%2016.8125%209.02083%2016.5%209ZM16.5%2011C15.9375%2010.9792%2015.5104%2010.7292%2015.2188%2010.25C14.9479%209.75%2014.9479%209.25%2015.2188%208.75C15.5104%208.27083%2015.9375%208.02083%2016.5%208C17.0625%208.02083%2017.5%208.27083%2017.8125%208.75C18.0833%209.25%2018.0833%209.75%2017.8125%2010.25C17.5%2010.7292%2017.0625%2010.9792%2016.5%2011ZM17.25%2013H15.5C15.1875%2012.9792%2015.0208%2012.8125%2015%2012.5C15.0208%2012.1875%2015.1875%2012.0208%2015.5%2012H17.25C17.75%2012.0208%2018.1667%2012.1875%2018.5%2012.5C18.8125%2012.8333%2018.9792%2013.25%2019%2013.75V14C18.9792%2014.3125%2018.8125%2014.4792%2018.5%2014.5C18.1875%2014.4792%2018.0208%2014.3125%2018%2014V13.75C17.9583%2013.2917%2017.7083%2013.0417%2017.25%2013Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                        ) : null}
                        {isDebriefIconVisible ? (
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "icons")}
                            value="%3Csvg%20width%3D%2222%22%20height%3D%2216%22%20viewbox%3D%220%200%2022%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2%205.5C2.04167%206.64583%202.51042%207.65625%203.40625%208.53125C3.55208%208.69792%203.58333%208.88542%203.5%209.09375C3.16667%209.73958%202.77083%2010.3646%202.3125%2010.9688C3.3125%2010.8646%204.27083%2010.5938%205.1875%2010.1562C5.35417%2010.0729%205.54167%209.97917%205.75%209.875C5.83333%209.83333%205.9375%209.82292%206.0625%209.84375C6.54167%209.94792%207.02083%2010%207.5%2010C9.125%209.95833%2010.4375%209.5%2011.4375%208.625C12.4583%207.75%2012.9792%206.70833%2013%205.5C12.9792%204.29167%2012.4583%203.25%2011.4375%202.375C10.4375%201.5%209.125%201.04167%207.5%201C5.875%201.04167%204.5625%201.5%203.5625%202.375C2.54167%203.25%202.02083%204.29167%202%205.5ZM7.5%200C9.33333%200.0416667%2010.8646%200.583333%2012.0938%201.625C13.3229%202.64583%2013.9583%203.9375%2014%205.5C13.9583%207.0625%2013.3229%208.36458%2012.0938%209.40625C10.8646%2010.4271%209.33333%2010.9583%207.5%2011C7%2011%206.51042%2010.9583%206.03125%2010.875C5.88542%2010.9375%205.73958%2011%205.59375%2011.0625C4.40625%2011.625%203.125%2011.9375%201.75%2012C1.4375%2011.9792%201.20833%2011.8229%201.0625%2011.5312C0.9375%2011.2396%200.979167%2010.9792%201.1875%2010.75H1.21875C1.67708%2010.2083%202.08333%209.60417%202.4375%208.9375C2.02083%208.47917%201.67708%207.95833%201.40625%207.375C1.13542%206.8125%201%206.1875%201%205.5C1.04167%203.9375%201.67708%202.64583%202.90625%201.625C4.13542%200.583333%205.66667%200.0416667%207.5%200ZM14.9688%205.03125C14.9479%204.67708%2014.8958%204.33333%2014.8125%204C16.5833%204.10417%2018.0417%204.66667%2019.1875%205.6875C20.3542%206.72917%2020.9583%208%2021%209.5C21%2010.1875%2020.8646%2010.8125%2020.5938%2011.375C20.3229%2011.9583%2019.9792%2012.4792%2019.5625%2012.9375C19.9167%2013.6042%2020.3333%2014.2083%2020.8125%2014.75C21%2014.9792%2021.0417%2015.25%2020.9375%2015.5625C20.7917%2015.8333%2020.5625%2015.9792%2020.25%2016C18.875%2015.9375%2017.5938%2015.625%2016.4062%2015.0625C16.2604%2015%2016.1146%2014.9271%2015.9688%2014.8438C15.4896%2014.9479%2015%2015%2014.5%2015C13.2083%2014.9792%2012.0417%2014.6979%2011%2014.1562C9.97917%2013.5938%209.19792%2012.8542%208.65625%2011.9375C9.01042%2011.875%209.36458%2011.8021%209.71875%2011.7188C10.1771%2012.3854%2010.8229%2012.9271%2011.6562%2013.3438C12.4688%2013.7604%2013.4167%2013.9792%2014.5%2014C14.9792%2014%2015.4583%2013.9479%2015.9375%2013.8438C16.0625%2013.8229%2016.1771%2013.8333%2016.2812%2013.875C16.4688%2013.9792%2016.6562%2014.0729%2016.8438%2014.1562C17.7396%2014.5729%2018.6875%2014.8438%2019.6875%2014.9688C19.2292%2014.3646%2018.8333%2013.7396%2018.5%2013.0938C18.4167%2012.8854%2018.4479%2012.6979%2018.5938%2012.5312C19.4896%2011.6562%2019.9583%2010.6458%2020%209.5C19.9792%208.35417%2019.5104%207.35417%2018.5938%206.5C17.6771%205.64583%2016.4688%205.15625%2014.9688%205.03125Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                        ) : null}
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "fw-semibold")}
                        tag="div"
                      >
                        {textMeetingTitle}
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "div-block-1391")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "div-block-1390")}
                        tag="div"
                      >
                        <_Builtin.Block tag="div">
                          {slotPlatformIcon}
                        </_Builtin.Block>
                        <_Builtin.Block tag="div">
                          {textMeetingPlatform}
                        </_Builtin.Block>
                      </_Builtin.Block>
                      {isDurationVisible ? (
                        <_Builtin.Block
                          className={_utils.cx(_styles, "div-block-1390")}
                          tag="div"
                        >
                          <_Builtin.Block tag="div">
                            <_Builtin.HtmlEmbed
                              className={_utils.cx(_styles, "icons")}
                              value="%3Csvg%20width%3D%2224%22%20height%3D%2212%22%20viewbox%3D%220%200%2024%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6%200C7.125%200.015625%208.13281%200.289062%209.02344%200.820312C9.92969%201.35156%2010.6484%202.07031%2011.1797%202.97656C11.7109%203.86719%2011.9844%204.875%2012%206C11.9844%207.125%2011.7109%208.13281%2011.1797%209.02344C10.6484%209.92969%209.92969%2010.6484%209.02344%2011.1797C8.13281%2011.7109%207.125%2011.9844%206%2012C4.875%2011.9844%203.86719%2011.7109%202.97656%2011.1797C2.07031%2010.6484%201.35156%209.92969%200.820312%209.02344C0.289062%208.13281%200.015625%207.125%200%206C0%205.15625%200.164062%204.36719%200.492188%203.63281C0.804688%202.89844%201.24219%202.25781%201.80469%201.71094C1.96094%201.57031%202.14062%201.5%202.34375%201.5C2.53125%201.5%202.70312%201.57812%202.85938%201.73438C3%201.89063%203.07031%202.0625%203.07031%202.25C3.07031%202.45313%203%202.63281%202.85938%202.78906C1.98438%203.63281%201.53125%204.70312%201.5%206C1.53125%207.28125%201.96875%208.34375%202.8125%209.1875C3.65625%2010.0312%204.71875%2010.4688%206%2010.5C7.28125%2010.4688%208.34375%2010.0312%209.1875%209.1875C10.0312%208.34375%2010.4688%207.28125%2010.5%206C10.4844%204.85938%2010.125%203.88281%209.42188%203.07031C8.73438%202.27344%207.84375%201.77344%206.75%201.57031V2.25C6.75%202.46875%206.67969%202.64844%206.53906%202.78906C6.39844%202.92969%206.21875%203%206%203C5.78125%203%205.60156%202.92969%205.46094%202.78906C5.32031%202.64844%205.25%202.46875%205.25%202.25V0.75C5.25%200.53125%205.32031%200.351562%205.46094%200.210938C5.60156%200.0703125%205.78125%200%206%200ZM4.52344%203.72656L6.39844%205.60156C6.61719%205.86719%206.61719%206.13281%206.39844%206.39844C6.13281%206.61719%205.86719%206.61719%205.60156%206.39844L3.72656%204.52344C3.50781%204.25781%203.50781%203.99219%203.72656%203.72656C3.99219%203.50781%204.25781%203.50781%204.52344%203.72656Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                            />
                          </_Builtin.Block>
                          <_Builtin.Block tag="div">
                            {textDuration}
                          </_Builtin.Block>
                        </_Builtin.Block>
                      ) : null}
                      {isLocationVisible ? (
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "div-block-1390",
                            "hide"
                          )}
                          tag="div"
                        >
                          <_Builtin.Block tag="div">
                            <_Builtin.HtmlEmbed
                              className={_utils.cx(_styles, "icons")}
                              value="%3Csvg%20width%3D%2210%22%20height%3D%2212%22%20viewbox%3D%220%200%2010%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M8.75%204.5C8.71875%203.4375%208.35156%202.55469%207.64844%201.85156C6.94531%201.14844%206.0625%200.78125%205%200.75C3.9375%200.78125%203.05469%201.14844%202.35156%201.85156C1.64844%202.55469%201.28125%203.4375%201.25%204.5C1.25%204.875%201.38281%205.36719%201.64844%205.97656C1.91406%206.60156%202.25%207.25%202.65625%207.92188C3.0625%208.57812%203.47656%209.1875%203.89844%209.75C4.32031%2010.3281%204.6875%2010.8125%205%2011.2031C5.3125%2010.8125%205.67969%2010.3281%206.10156%209.75C6.52344%209.1875%206.9375%208.57812%207.34375%207.92188C7.76562%207.25%208.10938%206.60156%208.375%205.97656C8.625%205.36719%208.75%204.875%208.75%204.5ZM9.5%204.5C9.46875%205.20312%209.21875%206.01562%208.75%206.9375C8.26562%207.85938%207.71875%208.75%207.10938%209.60938C6.5%2010.4844%205.98438%2011.1797%205.5625%2011.6953C5.40625%2011.8828%205.21875%2011.9766%205%2011.9766C4.78125%2011.9766%204.59375%2011.8828%204.4375%2011.6953C4.01562%2011.1797%203.5%2010.4844%202.89062%209.60938C2.28125%208.75%201.73438%207.85938%201.25%206.9375C0.78125%206.01562%200.53125%205.20312%200.5%204.5C0.53125%203.21875%200.96875%202.15625%201.8125%201.3125C2.65625%200.46875%203.71875%200.03125%205%200C6.28125%200.03125%207.34375%200.46875%208.1875%201.3125C9.03125%202.15625%209.46875%203.21875%209.5%204.5ZM3.875%204.5C3.89062%204.92188%204.07812%205.25%204.4375%205.48438C4.8125%205.67188%205.1875%205.67188%205.5625%205.48438C5.92188%205.25%206.10938%204.92188%206.125%204.5C6.10938%204.07812%205.92188%203.75%205.5625%203.51562C5.1875%203.32812%204.8125%203.32812%204.4375%203.51562C4.07812%203.75%203.89062%204.07812%203.875%204.5ZM5%206.375C4.29688%206.35938%203.75781%206.04688%203.38281%205.4375C3.03906%204.8125%203.03906%204.1875%203.38281%203.5625C3.75781%202.95312%204.29688%202.64063%205%202.625C5.70312%202.64063%206.24219%202.95312%206.61719%203.5625C6.96094%204.1875%206.96094%204.8125%206.61719%205.4375C6.24219%206.04688%205.70312%206.35938%205%206.375Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                            />
                          </_Builtin.Block>
                          <_Builtin.Block tag="div">
                            {textLocation}
                          </_Builtin.Block>
                        </_Builtin.Block>
                      ) : null}
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1575")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-1389")}
                tag="div"
              >
                {isScheduleNowButtonVisible ? (
                  <_Builtin.Block tag="div">
                    {slotScheduleNowButton}
                  </_Builtin.Block>
                ) : null}
                {isThreeDotVisible ? (
                  <_Builtin.Block
                    className={_utils.cx(_styles, "three-dot-wrap")}
                    data-w-id="1203848f-846a-68b4-5b32-d1ae8200d234"
                    tag="div"
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icons", "cursor-pointer")}
                      value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewbox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M12%2015.5C12.5625%2015.5208%2013%2015.7708%2013.3125%2016.25C13.5625%2016.75%2013.5625%2017.25%2013.3125%2017.75C13%2018.2292%2012.5625%2018.4792%2012%2018.5C11.4375%2018.4792%2011%2018.2292%2010.6875%2017.75C10.4375%2017.25%2010.4375%2016.75%2010.6875%2016.25C11%2015.7708%2011.4375%2015.5208%2012%2015.5ZM12%2010.5C12.5625%2010.5208%2013%2010.7708%2013.3125%2011.25C13.5625%2011.75%2013.5625%2012.25%2013.3125%2012.75C13%2013.2292%2012.5625%2013.4792%2012%2013.5C11.4375%2013.4792%2011%2013.2292%2010.6875%2012.75C10.4375%2012.25%2010.4375%2011.75%2010.6875%2011.25C11%2010.7708%2011.4375%2010.5208%2012%2010.5ZM13.5%207C13.4792%207.5625%2013.2292%208%2012.75%208.3125C12.25%208.5625%2011.75%208.5625%2011.25%208.3125C10.7708%208%2010.5208%207.5625%2010.5%207C10.5208%206.4375%2010.7708%206%2011.25%205.6875C11.75%205.4375%2012.25%205.4375%2012.75%205.6875C13.2292%206%2013.4792%206.4375%2013.5%207Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                      {...onClickDots}
                    />
                    <_Builtin.Block
                      className={_utils.cx(_styles, "sloteditoptions")}
                      tag="div"
                    >
                      {slotEditOptionModule ?? <EditOptionModule />}
                    </_Builtin.Block>
                  </_Builtin.Block>
                ) : null}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          {isSelected ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1401")}
              tag="div"
            />
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
