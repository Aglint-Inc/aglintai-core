"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./MoreButton.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-3":{"id":"e-3","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-5","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-4"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"b06ea765-399f-e2f7-69e6-48dbcb5cb724","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b06ea765-399f-e2f7-69e6-48dbcb5cb724","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1709100603611},"e-4":{"id":"e-4","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-6","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-3"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"b06ea765-399f-e2f7-69e6-48dbcb5cb724","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b06ea765-399f-e2f7-69e6-48dbcb5cb724","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1709100603612},"e-13":{"id":"e-13","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-13","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-14"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"65ee9cf1db8a6d711b987766|90a0755a-77e2-ac88-7dda-c13db3081279","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"65ee9cf1db8a6d711b987766|90a0755a-77e2-ac88-7dda-c13db3081279","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1710145027413},"e-14":{"id":"e-14","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-14","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-13"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"65ee9cf1db8a6d711b987766|90a0755a-77e2-ac88-7dda-c13db3081279","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"65ee9cf1db8a6d711b987766|90a0755a-77e2-ac88-7dda-c13db3081279","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1710145027413}},"actionLists":{"a-5":{"id":"a-5","title":"MoreMenu [Hover In]","actionItemGroups":[{"actionItems":[{"id":"a-5-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".more-menu-copy","selectorGuids":["ebb3f572-8d52-43db-13bc-56dcdad40aaa"]},"value":"none"}},{"id":"a-5-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".more-menu-copy","selectorGuids":["ebb3f572-8d52-43db-13bc-56dcdad40aaa"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-5-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".more-menu-copy","selectorGuids":["ebb3f572-8d52-43db-13bc-56dcdad40aaa"]},"value":"flex"}}]},{"actionItems":[{"id":"a-5-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".more-menu-copy","selectorGuids":["ebb3f572-8d52-43db-13bc-56dcdad40aaa"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1709100608565},"a-6":{"id":"a-6","title":"MoreMenu [Hover In] 2","actionItemGroups":[{"actionItems":[{"id":"a-6-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".more-menu-copy","selectorGuids":["ebb3f572-8d52-43db-13bc-56dcdad40aaa"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-6-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".more-menu-copy","selectorGuids":["ebb3f572-8d52-43db-13bc-56dcdad40aaa"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1709100608565},"a-13":{"id":"a-13","title":"MoreMenu [Hover In] 3","actionItemGroups":[{"actionItems":[{"id":"a-13-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".more-menu-copy","selectorGuids":["ebb3f572-8d52-43db-13bc-56dcdad40aaa"]},"value":"none"}},{"id":"a-13-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".more-menu-copy","selectorGuids":["ebb3f572-8d52-43db-13bc-56dcdad40aaa"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-13-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".more-menu-copy","selectorGuids":["ebb3f572-8d52-43db-13bc-56dcdad40aaa"]},"value":"flex"}}]},{"actionItems":[{"id":"a-13-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".more-menu-copy","selectorGuids":["ebb3f572-8d52-43db-13bc-56dcdad40aaa"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1709100608565},"a-14":{"id":"a-14","title":"MoreMenu [Hover In] 4","actionItemGroups":[{"actionItems":[{"id":"a-14-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".more-menu-copy","selectorGuids":["ebb3f572-8d52-43db-13bc-56dcdad40aaa"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-14-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".more-menu-copy","selectorGuids":["ebb3f572-8d52-43db-13bc-56dcdad40aaa"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1709100608565}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function MoreButton({
  as: _Component = _Builtin.Block,
  onClickDelete = {},
  onClickArchive = {},
  isArchiveVisible = true,
  onClickUnarchive = {},
  isUnarchiveVisible = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "more_settings")}
      data-w-id="b06ea765-399f-e2f7-69e6-48dbcb5cb724"
      tag="div"
    >
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "embed_flex-2")}
        value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewbox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M12%2015.5C12.5625%2015.5208%2013%2015.7708%2013.3125%2016.25C13.5625%2016.75%2013.5625%2017.25%2013.3125%2017.75C13%2018.2292%2012.5625%2018.4792%2012%2018.5C11.4375%2018.4792%2011%2018.2292%2010.6875%2017.75C10.4375%2017.25%2010.4375%2016.75%2010.6875%2016.25C11%2015.7708%2011.4375%2015.5208%2012%2015.5ZM12%2010.5C12.5625%2010.5208%2013%2010.7708%2013.3125%2011.25C13.5625%2011.75%2013.5625%2012.25%2013.3125%2012.75C13%2013.2292%2012.5625%2013.4792%2012%2013.5C11.4375%2013.4792%2011%2013.2292%2010.6875%2012.75C10.4375%2012.25%2010.4375%2011.75%2010.6875%2011.25C11%2010.7708%2011.4375%2010.5208%2012%2010.5ZM13.5%207C13.4792%207.5625%2013.2292%208%2012.75%208.3125C12.25%208.5625%2011.75%208.5625%2011.25%208.3125C10.7708%208%2010.5208%207.5625%2010.5%207C10.5208%206.4375%2010.7708%206%2011.25%205.6875C11.75%205.4375%2012.25%205.4375%2012.75%205.6875C13.2292%206%2013.4792%206.4375%2013.5%207Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "more-menu-copy")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "more-menu")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "menu_drop", "hide")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "v6-icon-2")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "embed_flex-2")}
                value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewbox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M15%2013C15.2917%2013%2015.5312%2012.9062%2015.7188%2012.7188C15.9062%2012.5312%2016%2012.2917%2016%2012V5.625C16%205.47917%2015.9479%205.36458%2015.8438%205.28125L13.7188%203.15625C13.6354%203.05208%2013.5208%203%2013.375%203H10C9.70833%203%209.46875%203.09375%209.28125%203.28125C9.09375%203.46875%209%203.70833%209%204V12C9%2012.2917%209.09375%2012.5312%209.28125%2012.7188C9.46875%2012.9062%209.70833%2013%2010%2013H15ZM16.5625%204.5625C16.8542%204.85417%2017%205.20833%2017%205.625V12C16.9792%2012.5625%2016.7812%2013.0312%2016.4062%2013.4062C16.0312%2013.7812%2015.5625%2013.9792%2015%2014H10C9.4375%2013.9792%208.96875%2013.7812%208.59375%2013.4062C8.21875%2013.0312%208.02083%2012.5625%208%2012V4C8.02083%203.4375%208.21875%202.96875%208.59375%202.59375C8.96875%202.21875%209.4375%202.02083%2010%202H13.375C13.7917%202%2014.1458%202.14583%2014.4375%202.4375L16.5625%204.5625ZM5%206H7V7H5C4.70833%207%204.46875%207.09375%204.28125%207.28125C4.09375%207.46875%204%207.70833%204%208V16C4%2016.2917%204.09375%2016.5312%204.28125%2016.7188C4.46875%2016.9062%204.70833%2017%205%2017H10C10.2917%2017%2010.5312%2016.9062%2010.7188%2016.7188C10.9062%2016.5312%2011%2016.2917%2011%2016V15H12V16C11.9792%2016.5625%2011.7812%2017.0312%2011.4062%2017.4062C11.0312%2017.7812%2010.5625%2017.9792%2010%2018H5C4.4375%2017.9792%203.96875%2017.7812%203.59375%2017.4062C3.21875%2017.0312%203.02083%2016.5625%203%2016V8C3.02083%207.4375%203.21875%206.96875%203.59375%206.59375C3.96875%206.21875%204.4375%206.02083%205%206Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "text")} tag="div">
              {"Duplicate"}
            </_Builtin.Block>
          </_Builtin.Block>
          {isArchiveVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "", "menu_drop")}
              tag="div"
              {...onClickArchive}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "", "v6-icon-2")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "embed_flex-2")}
                  value="%3Csvg%20width%3D%2215%22%20height%3D%2215%22%20viewbox%3D%220%200%2015%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2.25%203.75V11.25C2.25%2011.4688%202.32031%2011.6484%202.46094%2011.7891C2.60156%2011.9297%202.78125%2012%203%2012H12C12.2188%2012%2012.3984%2011.9297%2012.5391%2011.7891C12.6797%2011.6484%2012.75%2011.4688%2012.75%2011.25V5.25C12.75%205.03125%2012.6797%204.85156%2012.5391%204.71094C12.3984%204.57031%2012.2188%204.5%2012%204.5H8.34375C7.9375%204.5%207.58594%204.35156%207.28906%204.05469L6.44531%203.21094C6.28906%203.07031%206.10938%203%205.90625%203H3C2.78125%203%202.60156%203.07031%202.46094%203.21094C2.32031%203.35156%202.25%203.53125%202.25%203.75ZM3%202.25H5.90625C6.3125%202.25%206.66406%202.39844%206.96094%202.69531L7.80469%203.53906C7.96094%203.67969%208.14062%203.75%208.34375%203.75H12C12.4219%203.76563%2012.7734%203.91406%2013.0547%204.19531C13.3359%204.47656%2013.4844%204.82812%2013.5%205.25V11.25C13.4844%2011.6719%2013.3359%2012.0234%2013.0547%2012.3047C12.7734%2012.5859%2012.4219%2012.7344%2012%2012.75H3C2.57812%2012.7344%202.22656%2012.5859%201.94531%2012.3047C1.66406%2012.0234%201.51562%2011.6719%201.5%2011.25V3.75C1.51562%203.32812%201.66406%202.97656%201.94531%202.69531C2.22656%202.41406%202.57812%202.26563%203%202.25ZM7.875%206.375V9.21094L9.11719%207.99219C9.28906%207.83594%209.46094%207.83594%209.63281%207.99219C9.78906%208.16406%209.78906%208.33594%209.63281%208.50781L7.75781%2010.3828C7.58594%2010.5391%207.41406%2010.5391%207.24219%2010.3828L5.36719%208.50781C5.21094%208.33594%205.21094%208.16406%205.36719%207.99219C5.53906%207.83594%205.71094%207.83594%205.88281%207.99219L7.125%209.21094V6.375C7.14062%206.14062%207.26562%206.01562%207.5%206C7.73438%206.01562%207.85938%206.14062%207.875%206.375Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
              <_Builtin.Block tag="div">{"Archive"}</_Builtin.Block>
            </_Builtin.Block>
          ) : null}
          {isUnarchiveVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "", "menu_drop")}
              tag="div"
              {...onClickUnarchive}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "", "v6-icon-2")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "embed_flex-2")}
                  value="%3Csvg%20width%3D%2215%22%20height%3D%2215%22%20viewbox%3D%220%200%2015%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2.25%203.75V11.25C2.25%2011.4688%202.32031%2011.6484%202.46094%2011.7891C2.60156%2011.9297%202.78125%2012%203%2012H12C12.2188%2012%2012.3984%2011.9297%2012.5391%2011.7891C12.6797%2011.6484%2012.75%2011.4688%2012.75%2011.25V5.25C12.75%205.03125%2012.6797%204.85156%2012.5391%204.71094C12.3984%204.57031%2012.2188%204.5%2012%204.5H8.34375C7.9375%204.5%207.58594%204.35156%207.28906%204.05469L6.44531%203.21094C6.28906%203.07031%206.10938%203%205.90625%203H3C2.78125%203%202.60156%203.07031%202.46094%203.21094C2.32031%203.35156%202.25%203.53125%202.25%203.75ZM3%202.25H5.90625C6.3125%202.25%206.66406%202.39844%206.96094%202.69531L7.80469%203.53906C7.96094%203.67969%208.14062%203.75%208.34375%203.75H12C12.4219%203.76563%2012.7734%203.91406%2013.0547%204.19531C13.3359%204.47656%2013.4844%204.82812%2013.5%205.25V11.25C13.4844%2011.6719%2013.3359%2012.0234%2013.0547%2012.3047C12.7734%2012.5859%2012.4219%2012.7344%2012%2012.75H3C2.57812%2012.7344%202.22656%2012.5859%201.94531%2012.3047C1.66406%2012.0234%201.51562%2011.6719%201.5%2011.25V3.75C1.51562%203.32812%201.66406%202.97656%201.94531%202.69531C2.22656%202.41406%202.57812%202.26563%203%202.25ZM7.875%207.28906V10.125C7.85938%2010.3594%207.73438%2010.4844%207.5%2010.5C7.26562%2010.4844%207.14062%2010.3594%207.125%2010.125V7.28906L5.88281%208.50781C5.71094%208.66406%205.53906%208.66406%205.36719%208.50781C5.21094%208.33594%205.21094%208.16406%205.36719%207.99219L7.24219%206.11719C7.41406%205.96094%207.58594%205.96094%207.75781%206.11719L9.63281%207.99219C9.78906%208.16406%209.78906%208.33594%209.63281%208.50781C9.46094%208.66406%209.28906%208.66406%209.11719%208.50781L7.875%207.28906Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
              <_Builtin.Block tag="div">{"Unarchive"}</_Builtin.Block>
            </_Builtin.Block>
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "", "menu_drop")}
            tag="div"
            {...onClickDelete}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "", "v6-icon-2")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "embed_flex-2")}
                value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewbox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M8.5625%203C8.375%203%208.22917%203.08333%208.125%203.25L7.65625%204H12.3438L11.875%203.25C11.7708%203.08333%2011.625%203%2011.4375%203H8.5625ZM13.5312%204H15H16H16.5C16.8125%204.02083%2016.9792%204.1875%2017%204.5C16.9792%204.8125%2016.8125%204.97917%2016.5%205H15.9375L15.125%2016.1562C15.0833%2016.6771%2014.875%2017.1146%2014.5%2017.4688C14.125%2017.8021%2013.6667%2017.9792%2013.125%2018H6.875C6.33333%2017.9792%205.875%2017.8021%205.5%2017.4688C5.125%2017.1146%204.91667%2016.6771%204.875%2016.1562L4.0625%205H3.5C3.1875%204.97917%203.02083%204.8125%203%204.5C3.02083%204.1875%203.1875%204.02083%203.5%204H4H5H6.46875L7.28125%202.71875C7.59375%202.26042%208.02083%202.02083%208.5625%202H11.4375C11.9792%202.02083%2012.4062%202.26042%2012.7188%202.71875L13.5312%204ZM14.9375%205H5.0625L5.875%2016.0625C5.89583%2016.3333%206%2016.5521%206.1875%2016.7188C6.375%2016.9062%206.60417%2017%206.875%2017H13.125C13.3958%2017%2013.625%2016.9062%2013.8125%2016.7188C14%2016.5521%2014.1042%2016.3333%2014.125%2016.0625L14.9375%205Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "text-2")} tag="div">
              {"Delete"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
