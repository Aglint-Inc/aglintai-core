"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { SlotComp } from "./SlotComp";
import { Text } from "./Text";
import { EditOptionModule } from "./EditOptionModule";
import * as _utils from "./utils";
import _styles from "./NewInterviewPlanCard.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-35":{"id":"e-35","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-36"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"b6652d53-78c1-0f96-30a0-40aa8431d39a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b6652d53-78c1-0f96-30a0-40aa8431d39a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1711953151594},"e-36":{"id":"e-36","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-35"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"b6652d53-78c1-0f96-30a0-40aa8431d39a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b6652d53-78c1-0f96-30a0-40aa8431d39a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1711953151594},"e-45":{"id":"e-45","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-25","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-46"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"a3dd66ab-b625-b411-593b-d8d3a0dcaf83","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"a3dd66ab-b625-b411-593b-d8d3a0dcaf83","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1712832309435},"e-46":{"id":"e-46","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-26","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-45"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"a3dd66ab-b625-b411-593b-d8d3a0dcaf83","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"a3dd66ab-b625-b411-593b-d8d3a0dcaf83","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1712832309435},"e-47":{"id":"e-47","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-48"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"fa39f503-e285-8ca8-e1d3-b0b7549642dd","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"fa39f503-e285-8ca8-e1d3-b0b7549642dd","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1712915751014},"e-48":{"id":"e-48","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-47"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"fa39f503-e285-8ca8-e1d3-b0b7549642dd","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"fa39f503-e285-8ca8-e1d3-b0b7549642dd","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1712915751015},"e-81":{"id":"e-81","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-82"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"81140247-8670-8afa-be02-2d78ca36a57e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"81140247-8670-8afa-be02-2d78ca36a57e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718027263031},"e-82":{"id":"e-82","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-81"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"81140247-8670-8afa-be02-2d78ca36a57e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"81140247-8670-8afa-be02-2d78ca36a57e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718027263032}},"actionLists":{"a-19":{"id":"a-19","title":"option schedule hover in","actionItemGroups":[{"actionItems":[{"id":"a-19-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".sloteditoptions","selectorGuids":["85d382d5-45c9-d0d9-26ad-438675b051ba"]},"value":"none"}},{"id":"a-19-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".sloteditoptions","selectorGuids":["85d382d5-45c9-d0d9-26ad-438675b051ba"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-19-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".sloteditoptions","selectorGuids":["85d382d5-45c9-d0d9-26ad-438675b051ba"]},"value":"block"}},{"id":"a-19-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".sloteditoptions","selectorGuids":["85d382d5-45c9-d0d9-26ad-438675b051ba"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1711953157238},"a-20":{"id":"a-20","title":"option schedule hover out","actionItemGroups":[{"actionItems":[{"id":"a-20-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".sloteditoptions","selectorGuids":["85d382d5-45c9-d0d9-26ad-438675b051ba"]},"value":0,"unit":""}},{"id":"a-20-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":300,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".sloteditoptions","selectorGuids":["85d382d5-45c9-d0d9-26ad-438675b051ba"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1711953157238},"a-25":{"id":"a-25","title":"option schedule hover in 2","actionItemGroups":[{"actionItems":[{"id":"a-25-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".sloteditoptions","selectorGuids":["85d382d5-45c9-d0d9-26ad-438675b051ba"]},"value":"none"}},{"id":"a-25-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".sloteditoptions","selectorGuids":["85d382d5-45c9-d0d9-26ad-438675b051ba"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-25-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".sloteditoptions","selectorGuids":["85d382d5-45c9-d0d9-26ad-438675b051ba"]},"value":"block"}},{"id":"a-25-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".sloteditoptions","selectorGuids":["85d382d5-45c9-d0d9-26ad-438675b051ba"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1711953157238},"a-26":{"id":"a-26","title":"option schedule hover out 2","actionItemGroups":[{"actionItems":[{"id":"a-26-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".sloteditoptions","selectorGuids":["85d382d5-45c9-d0d9-26ad-438675b051ba"]},"value":0,"unit":""}},{"id":"a-26-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":300,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".sloteditoptions","selectorGuids":["85d382d5-45c9-d0d9-26ad-438675b051ba"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1711953157238}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
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
  isLocationVisible = false,
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
    <_Component
      className={_utils.cx(_styles, "newinterviewplancard")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "npc-wrap")}
        tag="div"
        {...onClickCard}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "npc-left-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "npc-slot-checkbox")}
            tag="div"
          >
            {isCheckboxVisible ? (
              <_Builtin.Block tag="div">{slotCheckbox}</_Builtin.Block>
            ) : null}
            <_Builtin.Block tag="div">
              {slotStatus ?? <SlotComp componentNeme="Status" />}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "npc-interview-detail-wrap")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "card_flex")}
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
                <Text content={textMeetingTitle} weight="medium" />
              </_Builtin.Block>
              {isDurationVisible ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "card_flex")}
                  tag="div"
                >
                  <_Builtin.Block tag="div">
                    <_Builtin.Block tag="div">
                      {slotPlatformIcon ?? (
                        <_Builtin.HtmlEmbed
                          className={_utils.cx(_styles, "icons")}
                          value="%3Csvg%20width%3D%2224%22%20height%3D%2220%22%20viewBox%3D%220%200%2024%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5%205C4.70833%205%204.46875%205.09375%204.28125%205.28125C4.09375%205.46875%204%205.70833%204%206V14C4%2014.2917%204.09375%2014.5312%204.28125%2014.7188C4.46875%2014.9062%204.70833%2015%205%2015H13C13.2917%2015%2013.5312%2014.9062%2013.7188%2014.7188C13.9062%2014.5312%2014%2014.2917%2014%2014V6C14%205.70833%2013.9062%205.46875%2013.7188%205.28125C13.5312%205.09375%2013.2917%205%2013%205H5ZM3%206C3.02083%205.4375%203.21875%204.96875%203.59375%204.59375C3.96875%204.21875%204.4375%204.02083%205%204H13C13.5625%204.02083%2014.0312%204.21875%2014.4062%204.59375C14.7812%204.96875%2014.9792%205.4375%2015%206V7.46875V12.5312V14C14.9792%2014.5625%2014.7812%2015.0312%2014.4062%2015.4062C14.0312%2015.7812%2013.5625%2015.9792%2013%2016H5C4.4375%2015.9792%203.96875%2015.7812%203.59375%2015.4062C3.21875%2015.0312%203.02083%2014.5625%203%2014V6ZM19.2188%2014.8438L16%2013.0625V11.9375L19.7188%2013.9688C19.7396%2013.9896%2019.7708%2014%2019.8125%2014C19.9167%2014%2019.9792%2013.9375%2020%2013.8125V6.1875C19.9792%206.08333%2019.9167%206.02083%2019.8125%206C19.7708%206%2019.7396%206.01042%2019.7188%206.03125L16%208.0625V6.9375L19.2188%205.15625C19.4062%205.05208%2019.6042%205%2019.8125%205C20.1458%205%2020.4271%205.11458%2020.6562%205.34375C20.8854%205.57292%2021%205.85417%2021%206.1875V13.8125C21%2014.1458%2020.8854%2014.4271%2020.6562%2014.6562C20.4271%2014.8854%2020.1458%2015%2019.8125%2015C19.6042%2015%2019.4062%2014.9479%2019.2188%2014.8438Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                        />
                      )}
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <Text content={textMeetingPlatform} weight="medium" />
                </_Builtin.Block>
              ) : null}
              {isDurationVisible ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "card_flex")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "timer-icon-wrap")}
                    tag="div"
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icons")}
                      value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10%202C11.5%202.02083%2012.8438%202.38542%2014.0312%203.09375C15.2396%203.80208%2016.1979%204.76042%2016.9062%205.96875C17.6146%207.15625%2017.9792%208.5%2018%2010C17.9792%2011.5%2017.6146%2012.8438%2016.9062%2014.0312C16.1979%2015.2396%2015.2396%2016.1979%2014.0312%2016.9062C12.8438%2017.6146%2011.5%2017.9792%2010%2018C8.5%2017.9792%207.15625%2017.6146%205.96875%2016.9062C4.76042%2016.1979%203.80208%2015.2396%203.09375%2014.0312C2.38542%2012.8438%202.02083%2011.5%202%2010C2.02083%208.3125%202.47917%206.8125%203.375%205.5C3.58333%205.27083%203.8125%205.22917%204.0625%205.375C4.3125%205.5625%204.36458%205.79167%204.21875%206.0625C3.42708%207.20833%203.02083%208.52083%203%2010C3.02083%2011.3125%203.34375%2012.4896%203.96875%2013.5312C4.57292%2014.5938%205.40625%2015.4271%206.46875%2016.0312C7.51042%2016.6562%208.6875%2016.9792%2010%2017C11.3125%2016.9792%2012.4896%2016.6562%2013.5312%2016.0312C14.5938%2015.4271%2015.4271%2014.5938%2016.0312%2013.5312C16.6562%2012.4896%2016.9792%2011.3125%2017%2010C16.9583%208.10417%2016.3333%206.51042%2015.125%205.21875C13.8958%203.92708%2012.3542%203.19792%2010.5%203.03125V5.5C10.4792%205.8125%2010.3125%205.97917%2010%206C9.6875%205.97917%209.52083%205.8125%209.5%205.5V2.5C9.52083%202.1875%209.6875%202.02083%2010%202ZM7.34375%206.65625L10.3438%209.65625C10.5521%209.88542%2010.5521%2010.1146%2010.3438%2010.3438C10.1146%2010.5521%209.88542%2010.5521%209.65625%2010.3438L6.65625%207.34375C6.44792%207.11458%206.44792%206.88542%206.65625%206.65625C6.88542%206.44792%207.11458%206.44792%207.34375%206.65625Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                  <Text content={textDuration} weight="medium" />
                </_Builtin.Block>
              ) : null}
              {isLocationVisible ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "card_flex", "hide")}
                  tag="div"
                >
                  <_Builtin.Block tag="div">
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icons")}
                      value="%3Csvg%20width%3D%2210%22%20height%3D%2212%22%20viewbox%3D%220%200%2010%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M8.75%204.5C8.71875%203.4375%208.35156%202.55469%207.64844%201.85156C6.94531%201.14844%206.0625%200.78125%205%200.75C3.9375%200.78125%203.05469%201.14844%202.35156%201.85156C1.64844%202.55469%201.28125%203.4375%201.25%204.5C1.25%204.875%201.38281%205.36719%201.64844%205.97656C1.91406%206.60156%202.25%207.25%202.65625%207.92188C3.0625%208.57812%203.47656%209.1875%203.89844%209.75C4.32031%2010.3281%204.6875%2010.8125%205%2011.2031C5.3125%2010.8125%205.67969%2010.3281%206.10156%209.75C6.52344%209.1875%206.9375%208.57812%207.34375%207.92188C7.76562%207.25%208.10938%206.60156%208.375%205.97656C8.625%205.36719%208.75%204.875%208.75%204.5ZM9.5%204.5C9.46875%205.20312%209.21875%206.01562%208.75%206.9375C8.26562%207.85938%207.71875%208.75%207.10938%209.60938C6.5%2010.4844%205.98438%2011.1797%205.5625%2011.6953C5.40625%2011.8828%205.21875%2011.9766%205%2011.9766C4.78125%2011.9766%204.59375%2011.8828%204.4375%2011.6953C4.01562%2011.1797%203.5%2010.4844%202.89062%209.60938C2.28125%208.75%201.73438%207.85938%201.25%206.9375C0.78125%206.01562%200.53125%205.20312%200.5%204.5C0.53125%203.21875%200.96875%202.15625%201.8125%201.3125C2.65625%200.46875%203.71875%200.03125%205%200C6.28125%200.03125%207.34375%200.46875%208.1875%201.3125C9.03125%202.15625%209.46875%203.21875%209.5%204.5ZM3.875%204.5C3.89062%204.92188%204.07812%205.25%204.4375%205.48438C4.8125%205.67188%205.1875%205.67188%205.5625%205.48438C5.92188%205.25%206.10938%204.92188%206.125%204.5C6.10938%204.07812%205.92188%203.75%205.5625%203.51562C5.1875%203.32812%204.8125%203.32812%204.4375%203.51562C4.07812%203.75%203.89062%204.07812%203.875%204.5ZM5%206.375C4.29688%206.35938%203.75781%206.04688%203.38281%205.4375C3.03906%204.8125%203.03906%204.1875%203.38281%203.5625C3.75781%202.95312%204.29688%202.64063%205%202.625C5.70312%202.64063%206.24219%202.95312%206.61719%203.5625C6.96094%204.1875%206.96094%204.8125%206.61719%205.4375C6.24219%206.04688%205.70312%206.35938%205%206.375Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block tag="div">{textLocation}</_Builtin.Block>
                </_Builtin.Block>
              ) : null}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "npc-right-wrap")}
          tag="div"
        >
          <_Builtin.Block className={_utils.cx(_styles, "npc-right")} tag="div">
            {isScheduleNowButtonVisible ? (
              <_Builtin.Block tag="div">
                {slotScheduleNowButton ?? (
                  <SlotComp componentNeme="Schedule Now" />
                )}
              </_Builtin.Block>
            ) : null}
            {isThreeDotVisible ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "three-dot-wrap")}
                data-w-id="81140247-8670-8afa-be02-2d78ca36a57e"
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
          className={_utils.cx(_styles, "npc-acitve-wrap")}
          tag="div"
        />
      ) : null}
    </_Component>
  );
}
