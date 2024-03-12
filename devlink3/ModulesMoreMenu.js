import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./ModulesMoreMenu.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-3":{"id":"e-3","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-5","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-4"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"b06ea765-399f-e2f7-69e6-48dbcb5cb724","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b06ea765-399f-e2f7-69e6-48dbcb5cb724","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1709100603611},"e-4":{"id":"e-4","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-6","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-3"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"b06ea765-399f-e2f7-69e6-48dbcb5cb724","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b06ea765-399f-e2f7-69e6-48dbcb5cb724","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1709100603612},"e-11":{"id":"e-11","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-13","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-12"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"0c07d368-5cf7-6b55-4c08-fb06f04e73c3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1710144974423},"e-12":{"id":"e-12","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-14","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-11"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"0c07d368-5cf7-6b55-4c08-fb06f04e73c3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1710144974423},"e-13":{"id":"e-13","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-13","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-14"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"65ee9cf1db8a6d711b987766|90a0755a-77e2-ac88-7dda-c13db3081279","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1710145027413},"e-14":{"id":"e-14","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-14","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-13"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"65ee9cf1db8a6d711b987766|90a0755a-77e2-ac88-7dda-c13db3081279","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1710145027413}},"actionLists":{"a-5":{"id":"a-5","title":"MoreMenu [Hover In]","actionItemGroups":[{"actionItems":[{"id":"a-5-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".more-menu-copy","selectorGuids":["ebb3f572-8d52-43db-13bc-56dcdad40aaa"]},"value":"none"}},{"id":"a-5-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".more-menu-copy","selectorGuids":["ebb3f572-8d52-43db-13bc-56dcdad40aaa"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-5-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".more-menu-copy","selectorGuids":["ebb3f572-8d52-43db-13bc-56dcdad40aaa"]},"value":"flex"}}]},{"actionItems":[{"id":"a-5-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".more-menu-copy","selectorGuids":["ebb3f572-8d52-43db-13bc-56dcdad40aaa"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1709100608565},"a-6":{"id":"a-6","title":"MoreMenu [Hover In] 2","actionItemGroups":[{"actionItems":[{"id":"a-6-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".more-menu-copy","selectorGuids":["ebb3f572-8d52-43db-13bc-56dcdad40aaa"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-6-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".more-menu-copy","selectorGuids":["ebb3f572-8d52-43db-13bc-56dcdad40aaa"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1709100608565},"a-13":{"id":"a-13","title":"MoreMenu [Hover In] 3","actionItemGroups":[{"actionItems":[{"id":"a-13-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".more-menu-copy","selectorGuids":["ebb3f572-8d52-43db-13bc-56dcdad40aaa"]},"value":"none"}},{"id":"a-13-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".more-menu-copy","selectorGuids":["ebb3f572-8d52-43db-13bc-56dcdad40aaa"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-13-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".more-menu-copy","selectorGuids":["ebb3f572-8d52-43db-13bc-56dcdad40aaa"]},"value":"flex"}}]},{"actionItems":[{"id":"a-13-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".more-menu-copy","selectorGuids":["ebb3f572-8d52-43db-13bc-56dcdad40aaa"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1709100608565},"a-14":{"id":"a-14","title":"MoreMenu [Hover In] 4","actionItemGroups":[{"actionItems":[{"id":"a-14-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".more-menu-copy","selectorGuids":["ebb3f572-8d52-43db-13bc-56dcdad40aaa"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-14-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".more-menu-copy","selectorGuids":["ebb3f572-8d52-43db-13bc-56dcdad40aaa"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1709100608565}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function ModulesMoreMenu({
  as: _Component = _Builtin.Block,
  isQualifiedModules = false,
  isTrainingModules = false,
  onClickPause = {},
  onClickRemove = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "more_settings")}
      data-w-id="0c07d368-5cf7-6b55-4c08-fb06f04e73c3"
      tag="div"
    >
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "embed_flex-2")}
        value="%3Csvg%20width%3D%2214%22%20height%3D%2217%22%20viewBox%3D%220%200%2014%2017%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0.25%208.5C0.270833%207.83333%200.5625%207.33333%201.125%207C1.70833%206.66667%202.29167%206.66667%202.875%207C3.4375%207.33333%203.72917%207.83333%203.75%208.5C3.72917%209.16667%203.4375%209.66667%202.875%2010C2.29167%2010.3333%201.70833%2010.3333%201.125%2010C0.5625%209.66667%200.270833%209.16667%200.25%208.5ZM5.25%208.5C5.27083%207.83333%205.5625%207.33333%206.125%207C6.70833%206.66667%207.29167%206.66667%207.875%207C8.4375%207.33333%208.72917%207.83333%208.75%208.5C8.72917%209.16667%208.4375%209.66667%207.875%2010C7.29167%2010.3333%206.70833%2010.3333%206.125%2010C5.5625%209.66667%205.27083%209.16667%205.25%208.5ZM12%206.75C12.6667%206.77083%2013.1667%207.0625%2013.5%207.625C13.8333%208.20833%2013.8333%208.79167%2013.5%209.375C13.1667%209.9375%2012.6667%2010.2292%2012%2010.25C11.3333%2010.2292%2010.8333%209.9375%2010.5%209.375C10.1667%208.79167%2010.1667%208.20833%2010.5%207.625C10.8333%207.0625%2011.3333%206.77083%2012%206.75Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "more-menu-copy")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "more-menu", "auto_width")}
          tag="div"
        >
          {isQualifiedModules ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "menu_drop")}
              tag="div"
              {...onClickPause}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "v6-icon-2")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "embed_flex-2")}
                  value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.5%205C6.1875%205.02083%206.02083%205.1875%206%205.5V14.5C6.02083%2014.8125%206.1875%2014.9792%206.5%2015H8C8.3125%2014.9792%208.47917%2014.8125%208.5%2014.5V5.5C8.47917%205.1875%208.3125%205.02083%208%205H6.5ZM5%205.5C5.02083%205.08333%205.16667%204.72917%205.4375%204.4375C5.72917%204.16667%206.08333%204.02083%206.5%204H8C8.41667%204.02083%208.77083%204.16667%209.0625%204.4375C9.33333%204.72917%209.47917%205.08333%209.5%205.5V14.5C9.47917%2014.9167%209.33333%2015.2708%209.0625%2015.5625C8.77083%2015.8333%208.41667%2015.9792%208%2016H6.5C6.08333%2015.9792%205.72917%2015.8333%205.4375%2015.5625C5.16667%2015.2708%205.02083%2014.9167%205%2014.5V5.5ZM12%205C11.6875%205.02083%2011.5208%205.1875%2011.5%205.5V14.5C11.5208%2014.8125%2011.6875%2014.9792%2012%2015H13.5C13.8125%2014.9792%2013.9792%2014.8125%2014%2014.5V5.5C13.9792%205.1875%2013.8125%205.02083%2013.5%205H12ZM10.5%205.5C10.5208%205.08333%2010.6667%204.72917%2010.9375%204.4375C11.2292%204.16667%2011.5833%204.02083%2012%204H13.5C13.9167%204.02083%2014.2708%204.16667%2014.5625%204.4375C14.8333%204.72917%2014.9792%205.08333%2015%205.5V14.5C14.9792%2014.9167%2014.8333%2015.2708%2014.5625%2015.5625C14.2708%2015.8333%2013.9167%2015.9792%2013.5%2016H12C11.5833%2015.9792%2011.2292%2015.8333%2010.9375%2015.5625C10.6667%2015.2708%2010.5208%2014.9167%2010.5%2014.5V5.5Z%22%20fill%3D%22%23F79A3E%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text", "orange")}
                tag="div"
              >
                {"Pause from all modules"}
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
          {isTrainingModules ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "menu_drop")}
              tag="div"
              {...onClickPause}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "v6-icon-2")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "embed_flex-2")}
                  value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.5%205C6.1875%205.02083%206.02083%205.1875%206%205.5V14.5C6.02083%2014.8125%206.1875%2014.9792%206.5%2015H8C8.3125%2014.9792%208.47917%2014.8125%208.5%2014.5V5.5C8.47917%205.1875%208.3125%205.02083%208%205H6.5ZM5%205.5C5.02083%205.08333%205.16667%204.72917%205.4375%204.4375C5.72917%204.16667%206.08333%204.02083%206.5%204H8C8.41667%204.02083%208.77083%204.16667%209.0625%204.4375C9.33333%204.72917%209.47917%205.08333%209.5%205.5V14.5C9.47917%2014.9167%209.33333%2015.2708%209.0625%2015.5625C8.77083%2015.8333%208.41667%2015.9792%208%2016H6.5C6.08333%2015.9792%205.72917%2015.8333%205.4375%2015.5625C5.16667%2015.2708%205.02083%2014.9167%205%2014.5V5.5ZM12%205C11.6875%205.02083%2011.5208%205.1875%2011.5%205.5V14.5C11.5208%2014.8125%2011.6875%2014.9792%2012%2015H13.5C13.8125%2014.9792%2013.9792%2014.8125%2014%2014.5V5.5C13.9792%205.1875%2013.8125%205.02083%2013.5%205H12ZM10.5%205.5C10.5208%205.08333%2010.6667%204.72917%2010.9375%204.4375C11.2292%204.16667%2011.5833%204.02083%2012%204H13.5C13.9167%204.02083%2014.2708%204.16667%2014.5625%204.4375C14.8333%204.72917%2014.9792%205.08333%2015%205.5V14.5C14.9792%2014.9167%2014.8333%2015.2708%2014.5625%2015.5625C14.2708%2015.8333%2013.9167%2015.9792%2013.5%2016H12C11.5833%2015.9792%2011.2292%2015.8333%2010.9375%2015.5625C10.6667%2015.2708%2010.5208%2014.9167%2010.5%2014.5V5.5Z%22%20fill%3D%22%23F79A3E%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text", "orange")}
                tag="div"
              >
                {"Pause from all training modules"}
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
          {isQualifiedModules ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "", "menu_drop")}
              tag="div"
              {...onClickRemove}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "", "v6-icon-2")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "embed_flex-2")}
                  value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M8.5625%203C8.375%203%208.22917%203.08333%208.125%203.25L7.65625%204H12.3438L11.875%203.25C11.7708%203.08333%2011.625%203%2011.4375%203H8.5625ZM13.5312%204H15H16H16.5C16.8125%204.02083%2016.9792%204.1875%2017%204.5C16.9792%204.8125%2016.8125%204.97917%2016.5%205H15.9375L15.125%2016.1562C15.0833%2016.6771%2014.875%2017.1146%2014.5%2017.4688C14.125%2017.8021%2013.6667%2017.9792%2013.125%2018H6.875C6.33333%2017.9792%205.875%2017.8021%205.5%2017.4688C5.125%2017.1146%204.91667%2016.6771%204.875%2016.1562L4.0625%205H3.5C3.1875%204.97917%203.02083%204.8125%203%204.5C3.02083%204.1875%203.1875%204.02083%203.5%204H4H5H6.46875L7.28125%202.71875C7.59375%202.26042%208.02083%202.02083%208.5625%202H11.4375C11.9792%202.02083%2012.4062%202.26042%2012.7188%202.71875L13.5312%204ZM14.9375%205H5.0625L5.875%2016.0625C5.89583%2016.3333%206%2016.5521%206.1875%2016.7188C6.375%2016.9062%206.60417%2017%206.875%2017H13.125C13.3958%2017%2013.625%2016.9062%2013.8125%2016.7188C14%2016.5521%2014.1042%2016.3333%2014.125%2016.0625L14.9375%205Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-2")}
                tag="div"
              >
                {"Remove from all modules"}
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
          {isTrainingModules ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "", "menu_drop")}
              tag="div"
              {...onClickRemove}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "", "v6-icon-2")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "embed_flex-2")}
                  value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M8.5625%203C8.375%203%208.22917%203.08333%208.125%203.25L7.65625%204H12.3438L11.875%203.25C11.7708%203.08333%2011.625%203%2011.4375%203H8.5625ZM13.5312%204H15H16H16.5C16.8125%204.02083%2016.9792%204.1875%2017%204.5C16.9792%204.8125%2016.8125%204.97917%2016.5%205H15.9375L15.125%2016.1562C15.0833%2016.6771%2014.875%2017.1146%2014.5%2017.4688C14.125%2017.8021%2013.6667%2017.9792%2013.125%2018H6.875C6.33333%2017.9792%205.875%2017.8021%205.5%2017.4688C5.125%2017.1146%204.91667%2016.6771%204.875%2016.1562L4.0625%205H3.5C3.1875%204.97917%203.02083%204.8125%203%204.5C3.02083%204.1875%203.1875%204.02083%203.5%204H4H5H6.46875L7.28125%202.71875C7.59375%202.26042%208.02083%202.02083%208.5625%202H11.4375C11.9792%202.02083%2012.4062%202.26042%2012.7188%202.71875L13.5312%204ZM14.9375%205H5.0625L5.875%2016.0625C5.89583%2016.3333%206%2016.5521%206.1875%2016.7188C6.375%2016.9062%206.60417%2017%206.875%2017H13.125C13.3958%2017%2013.625%2016.9062%2013.8125%2016.7188C14%2016.5521%2014.1042%2016.3333%2014.125%2016.0625L14.9375%205Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-2")}
                tag="div"
              >
                {"Remove from all training modules"}
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
