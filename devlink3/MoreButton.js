import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./MoreButton.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-3":{"id":"e-3","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-5","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-4"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"b06ea765-399f-e2f7-69e6-48dbcb5cb724","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b06ea765-399f-e2f7-69e6-48dbcb5cb724","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1709100603611},"e-4":{"id":"e-4","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-6","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-3"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"b06ea765-399f-e2f7-69e6-48dbcb5cb724","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b06ea765-399f-e2f7-69e6-48dbcb5cb724","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1709100603612}},"actionLists":{"a-5":{"id":"a-5","title":"MoreMenu [Hover In]","actionItemGroups":[{"actionItems":[{"id":"a-5-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".more-menu-copy","selectorGuids":["ebb3f572-8d52-43db-13bc-56dcdad40aaa"]},"value":"none"}},{"id":"a-5-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".more-menu-copy","selectorGuids":["ebb3f572-8d52-43db-13bc-56dcdad40aaa"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-5-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".more-menu-copy","selectorGuids":["ebb3f572-8d52-43db-13bc-56dcdad40aaa"]},"value":"flex"}}]},{"actionItems":[{"id":"a-5-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".more-menu-copy","selectorGuids":["ebb3f572-8d52-43db-13bc-56dcdad40aaa"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1709100608565},"a-6":{"id":"a-6","title":"MoreMenu [Hover In] 2","actionItemGroups":[{"actionItems":[{"id":"a-6-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".more-menu-copy","selectorGuids":["ebb3f572-8d52-43db-13bc-56dcdad40aaa"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-6-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".more-menu-copy","selectorGuids":["ebb3f572-8d52-43db-13bc-56dcdad40aaa"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1709100608565}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function MoreButton({
  as: _Component = _Builtin.Block,
  onClickDelete = {},
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
        value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M12%2015.5C12.5625%2015.5208%2013%2015.7708%2013.3125%2016.25C13.5625%2016.75%2013.5625%2017.25%2013.3125%2017.75C13%2018.2292%2012.5625%2018.4792%2012%2018.5C11.4375%2018.4792%2011%2018.2292%2010.6875%2017.75C10.4375%2017.25%2010.4375%2016.75%2010.6875%2016.25C11%2015.7708%2011.4375%2015.5208%2012%2015.5ZM12%2010.5C12.5625%2010.5208%2013%2010.7708%2013.3125%2011.25C13.5625%2011.75%2013.5625%2012.25%2013.3125%2012.75C13%2013.2292%2012.5625%2013.4792%2012%2013.5C11.4375%2013.4792%2011%2013.2292%2010.6875%2012.75C10.4375%2012.25%2010.4375%2011.75%2010.6875%2011.25C11%2010.7708%2011.4375%2010.5208%2012%2010.5ZM13.5%207C13.4792%207.5625%2013.2292%208%2012.75%208.3125C12.25%208.5625%2011.75%208.5625%2011.25%208.3125C10.7708%208%2010.5208%207.5625%2010.5%207C10.5208%206.4375%2010.7708%206%2011.25%205.6875C11.75%205.4375%2012.25%205.4375%2012.75%205.6875C13.2292%206%2013.4792%206.4375%2013.5%207Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
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
                value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M15%2013C15.2917%2013%2015.5312%2012.9062%2015.7188%2012.7188C15.9062%2012.5312%2016%2012.2917%2016%2012V5.625C16%205.47917%2015.9479%205.36458%2015.8438%205.28125L13.7188%203.15625C13.6354%203.05208%2013.5208%203%2013.375%203H10C9.70833%203%209.46875%203.09375%209.28125%203.28125C9.09375%203.46875%209%203.70833%209%204V12C9%2012.2917%209.09375%2012.5312%209.28125%2012.7188C9.46875%2012.9062%209.70833%2013%2010%2013H15ZM16.5625%204.5625C16.8542%204.85417%2017%205.20833%2017%205.625V12C16.9792%2012.5625%2016.7812%2013.0312%2016.4062%2013.4062C16.0312%2013.7812%2015.5625%2013.9792%2015%2014H10C9.4375%2013.9792%208.96875%2013.7812%208.59375%2013.4062C8.21875%2013.0312%208.02083%2012.5625%208%2012V4C8.02083%203.4375%208.21875%202.96875%208.59375%202.59375C8.96875%202.21875%209.4375%202.02083%2010%202H13.375C13.7917%202%2014.1458%202.14583%2014.4375%202.4375L16.5625%204.5625ZM5%206H7V7H5C4.70833%207%204.46875%207.09375%204.28125%207.28125C4.09375%207.46875%204%207.70833%204%208V16C4%2016.2917%204.09375%2016.5312%204.28125%2016.7188C4.46875%2016.9062%204.70833%2017%205%2017H10C10.2917%2017%2010.5312%2016.9062%2010.7188%2016.7188C10.9062%2016.5312%2011%2016.2917%2011%2016V15H12V16C11.9792%2016.5625%2011.7812%2017.0312%2011.4062%2017.4062C11.0312%2017.7812%2010.5625%2017.9792%2010%2018H5C4.4375%2017.9792%203.96875%2017.7812%203.59375%2017.4062C3.21875%2017.0312%203.02083%2016.5625%203%2016V8C3.02083%207.4375%203.21875%206.96875%203.59375%206.59375C3.96875%206.21875%204.4375%206.02083%205%206Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "text")} tag="div">
              {"Duplicate"}
            </_Builtin.Block>
          </_Builtin.Block>
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
                value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M8.5625%203C8.375%203%208.22917%203.08333%208.125%203.25L7.65625%204H12.3438L11.875%203.25C11.7708%203.08333%2011.625%203%2011.4375%203H8.5625ZM13.5312%204H15H16H16.5C16.8125%204.02083%2016.9792%204.1875%2017%204.5C16.9792%204.8125%2016.8125%204.97917%2016.5%205H15.9375L15.125%2016.1562C15.0833%2016.6771%2014.875%2017.1146%2014.5%2017.4688C14.125%2017.8021%2013.6667%2017.9792%2013.125%2018H6.875C6.33333%2017.9792%205.875%2017.8021%205.5%2017.4688C5.125%2017.1146%204.91667%2016.6771%204.875%2016.1562L4.0625%205H3.5C3.1875%204.97917%203.02083%204.8125%203%204.5C3.02083%204.1875%203.1875%204.02083%203.5%204H4H5H6.46875L7.28125%202.71875C7.59375%202.26042%208.02083%202.02083%208.5625%202H11.4375C11.9792%202.02083%2012.4062%202.26042%2012.7188%202.71875L13.5312%204ZM14.9375%205H5.0625L5.875%2016.0625C5.89583%2016.3333%206%2016.5521%206.1875%2016.7188C6.375%2016.9062%206.60417%2017%206.875%2017H13.125C13.3958%2017%2013.625%2016.9062%2013.8125%2016.7188C14%2016.5521%2014.1042%2016.3333%2014.125%2016.0625L14.9375%205Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
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
