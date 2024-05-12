"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./ScheduleNowButton.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-43":{"id":"e-43","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-44"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"aaab3739-c46d-1437-efb8-84eb64e564cb","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"aaab3739-c46d-1437-efb8-84eb64e564cb","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1712829998271},"e-44":{"id":"e-44","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-24","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-43"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"aaab3739-c46d-1437-efb8-84eb64e564cb","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"aaab3739-c46d-1437-efb8-84eb64e564cb","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1712829998271}},"actionLists":{"a-23":{"id":"a-23","title":"Schedule Now hover in","actionItemGroups":[{"actionItems":[{"id":"a-23-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1381","selectorGuids":["a359a436-8763-7c22-967e-83cd73f71f6f"]},"value":"none"}},{"id":"a-23-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1381","selectorGuids":["a359a436-8763-7c22-967e-83cd73f71f6f"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-23-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1381","selectorGuids":["a359a436-8763-7c22-967e-83cd73f71f6f"]},"value":1,"unit":""}},{"id":"a-23-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1381","selectorGuids":["a359a436-8763-7c22-967e-83cd73f71f6f"]},"value":"block"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1712728138351},"a-24":{"id":"a-24","title":"Schedule Now hover out","actionItemGroups":[{"actionItems":[{"id":"a-24-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1381","selectorGuids":["a359a436-8763-7c22-967e-83cd73f71f6f"]},"value":0,"unit":""}},{"id":"a-24-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1381","selectorGuids":["a359a436-8763-7c22-967e-83cd73f71f6f"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1712728138351}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function ScheduleNowButton({
  as: _Component = _Builtin.Block,
  onClickScheduleManually = {},
  onClickEmailAgent = {},
  onClickPhoneAgent = {},
  isScheduleManuallyVisible = true,
  isLoaderVisible = false,
  isDropIconVisible = true,
  slotLoaderIcon,
  isHoverScheduleVisible = true,
  onClickMySelf = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "div-block-1378")}
      data-w-id="aaab3739-c46d-1437-efb8-84eb64e564cb"
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1379")}
        tag="div"
        {...onClickScheduleManually}
      >
        <_Builtin.Block tag="div">{"Schedule Now"}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1380")}
        tag="div"
      >
        {isDropIconVisible ? (
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2212%22%20height%3D%226%22%20viewBox%3D%220%200%2012%206%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10.6877%200.609584C10.9033%200.437079%2011.2179%200.47204%2011.3905%200.687671C11.5438%200.879343%2011.5332%201.14925%2011.3775%201.32802L11.3124%201.39045L6.31237%205.39045C6.15584%205.51567%205.94285%205.53356%205.77019%205.44412L5.68767%205.39045L0.687671%201.39045C0.47204%201.21795%200.437079%200.903302%200.609584%200.687671C0.762922%200.495999%201.02857%200.447079%201.23715%200.55973L1.31237%200.609584L6.00002%204.35902L10.6877%200.609584Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        ) : null}
        {isLoaderVisible ? (
          <_Builtin.Block tag="div">{slotLoaderIcon}</_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      {isHoverScheduleVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1381")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1382", "border-down")}
            tag="div"
            {...onClickMySelf}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2225%22%20height%3D%2224%22%20viewBox%3D%220%200%2025%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M8.5%204C8.8125%204.02083%208.97917%204.1875%209%204.5V6H15V4.5C15.0208%204.1875%2015.1875%204.02083%2015.5%204C15.8125%204.02083%2015.9792%204.1875%2016%204.5V6H17C17.5625%206.02083%2018.0312%206.21875%2018.4062%206.59375C18.7812%206.96875%2018.9792%207.4375%2019%208V9V10V18C18.9792%2018.5625%2018.7812%2019.0312%2018.4062%2019.4062C18.0312%2019.7812%2017.5625%2019.9792%2017%2020H7C6.4375%2019.9792%205.96875%2019.7812%205.59375%2019.4062C5.21875%2019.0312%205.02083%2018.5625%205%2018V10V9V8C5.02083%207.4375%205.21875%206.96875%205.59375%206.59375C5.96875%206.21875%206.4375%206.02083%207%206H8V4.5C8.02083%204.1875%208.1875%204.02083%208.5%204ZM18%2010H6V18C6%2018.2917%206.09375%2018.5312%206.28125%2018.7188C6.46875%2018.9062%206.70833%2019%207%2019H17C17.2917%2019%2017.5312%2018.9062%2017.7188%2018.7188C17.9062%2018.5312%2018%2018.2917%2018%2018V10ZM17%207H7C6.70833%207%206.46875%207.09375%206.28125%207.28125C6.09375%207.46875%206%207.70833%206%208V9H18V8C18%207.70833%2017.9062%207.46875%2017.7188%207.28125C17.5312%207.09375%2017.2917%207%2017%207Z%22%20fill%3D%22%23FF6224%22%2F%3E%0A%3Cpath%20d%3D%22M22.4395%2017.2184L22.4395%2017.2185L23.5639%2017.5L22.4395%2017.7815L22.4395%2017.7816L22.3975%2017.7921C21.7419%2017.9563%2021.232%2018.0841%2020.8283%2018.229C20.4111%2018.3788%2020.0895%2018.5528%2019.8208%2018.8197L19.8203%2018.8203C19.5529%2019.0877%2019.3788%2019.4097%2019.229%2019.8272C19.0847%2020.2295%2018.9574%2020.7376%2018.7942%2021.3892L18.7816%2021.4395L18.7815%2021.4395L18.5%2022.5639L18.2185%2021.4395L18.2184%2021.4395L18.2079%2021.3975C18.0437%2020.7419%2017.9159%2020.232%2017.771%2019.8283C17.6212%2019.4111%2017.4472%2019.0895%2017.1803%2018.8208L17.1797%2018.8203C16.9123%2018.5529%2016.5903%2018.3788%2016.1728%2018.229C15.7705%2018.0847%2015.2624%2017.9574%2014.6108%2017.7942L14.5605%2017.7816L14.5605%2017.7815L13.4361%2017.5L14.5605%2017.2185L14.5605%2017.2184L14.6025%2017.2079C15.2581%2017.0437%2015.768%2016.9159%2016.1717%2016.771C16.5889%2016.6212%2016.9105%2016.4472%2017.1792%2016.1803L17.1797%2016.1797C17.4471%2015.9123%2017.6212%2015.5903%2017.771%2015.1728C17.9153%2014.7705%2018.0426%2014.2624%2018.2058%2013.6108L18.2184%2013.5605L18.2185%2013.5605L18.5%2012.4361L18.7815%2013.5605L18.7816%2013.5605L18.7921%2013.6025C18.9563%2014.2581%2019.0841%2014.768%2019.229%2015.1717C19.3788%2015.5889%2019.5528%2015.9105%2019.8197%2016.1792L19.8203%2016.1797C20.0877%2016.4471%2020.4097%2016.6212%2020.8272%2016.771C21.2295%2016.9153%2021.7376%2017.0426%2022.3892%2017.2058L22.4395%2017.2184Z%22%20fill%3D%22%23FF6224%22%20stroke%3D%22white%22%20stroke-width%3D%220.454737%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1597")}
              tag="div"
            >
              <_Builtin.Block tag="div">{"By myself"}</_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-sm", "text-grey-600")}
                tag="div"
              >
                {
                  "You'll get options to choose from within the date range. Your selections will be sent to the candidate for scheduling confirmation."
                }
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1382", "border-down")}
            tag="div"
            {...onClickEmailAgent}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2225%22%20height%3D%2224%22%20viewBox%3D%220%200%2025%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6%207C5.70833%207%205.46875%207.09375%205.28125%207.28125C5.09375%207.46875%205%207.70833%205%208V9.25L11.125%2013.7188C11.7083%2014.1146%2012.2917%2014.1146%2012.875%2013.7188L19%209.25V8C19%207.70833%2018.9062%207.46875%2018.7188%207.28125C18.5312%207.09375%2018.2917%207%2018%207H6ZM5%2010.5V16C5%2016.2917%205.09375%2016.5312%205.28125%2016.7188C5.46875%2016.9062%205.70833%2017%206%2017H18C18.2917%2017%2018.5312%2016.9062%2018.7188%2016.7188C18.9062%2016.5312%2019%2016.2917%2019%2016V10.5L13.4688%2014.5312C13.0312%2014.8646%2012.5417%2015.0312%2012%2015.0312C11.4583%2015.0312%2010.9688%2014.8646%2010.5312%2014.5312L5%2010.5ZM4%208C4.02083%207.4375%204.21875%206.96875%204.59375%206.59375C4.96875%206.21875%205.4375%206.02083%206%206H18C18.5625%206.02083%2019.0312%206.21875%2019.4062%206.59375C19.7812%206.96875%2019.9792%207.4375%2020%208V16C19.9792%2016.5625%2019.7812%2017.0312%2019.4062%2017.4062C19.0312%2017.7812%2018.5625%2017.9792%2018%2018H6C5.4375%2017.9792%204.96875%2017.7812%204.59375%2017.4062C4.21875%2017.0312%204.02083%2016.5625%204%2016V8Z%22%20fill%3D%22%23FF6224%22%2F%3E%0A%3Cpath%20d%3D%22M22.9395%208.71844L22.9395%208.71845L24.0639%209L22.9395%209.28155L22.9395%209.28156L22.8975%209.29208C22.2419%209.45634%2021.732%209.5841%2021.3283%209.72903C20.9111%209.87884%2020.5895%2010.0528%2020.3208%2010.3197L20.3203%2010.3203C20.0529%2010.5877%2019.8788%2010.9097%2019.729%2011.3272C19.5847%2011.7295%2019.4574%2012.2376%2019.2941%2012.8892L19.2816%2012.9395L19.2815%2012.9395L19%2014.0639L18.7185%2012.9395L18.7184%2012.9395L18.7079%2012.8975C18.5437%2012.2419%2018.4159%2011.732%2018.271%2011.3283C18.1212%2010.9111%2017.9472%2010.5895%2017.6803%2010.3208L17.6797%2010.3203C17.4123%2010.0529%2017.0903%209.87877%2016.6728%209.72901C16.2705%209.5847%2015.7624%209.4574%2015.1108%209.29415L15.0605%209.28156L15.0605%209.28155L13.9361%209L15.0605%208.71845L15.0605%208.71844L15.1025%208.70793C15.7581%208.54366%2016.268%208.4159%2016.6717%208.27097C17.0889%208.12116%2017.4105%207.94716%2017.6792%207.68026L17.6797%207.67972C17.9471%207.4123%2018.1212%207.09033%2018.271%206.67282C18.4153%206.2705%2018.5426%205.7624%2018.7059%205.11079L18.7184%205.06053L18.7185%205.06049L19%203.93608L19.2815%205.06049L19.2816%205.06053L19.2921%205.1025C19.4563%205.75813%2019.5841%206.26804%2019.729%206.6717C19.8788%207.08893%2020.0528%207.41049%2020.3197%207.67918L20.3203%207.67972C20.5877%207.94714%2020.9097%208.12123%2021.3272%208.27099C21.7295%208.4153%2022.2376%208.5426%2022.8892%208.70585L22.9395%208.71844Z%22%20fill%3D%22%23FF6224%22%20stroke%3D%22white%22%20stroke-width%3D%220.454737%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1597")}
              tag="div"
            >
              <_Builtin.Block tag="div">{"With Email Agent"}</_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-sm", "text-grey-600")}
                tag="div"
              >
                {
                  "The email agent will contact the candidate via email and arrange a suitable time within the provided date range."
                }
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1382", "border-down")}
            tag="div"
            {...onClickPhoneAgent}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M15.75%2012.5938L19.25%2014.0938C19.5208%2014.2188%2019.7292%2014.4167%2019.875%2014.6875C20%2014.9375%2020.0312%2015.2083%2019.9688%2015.5L19.2188%2019C19.0521%2019.625%2018.6458%2019.9583%2018%2020C17.8125%2020%2017.625%2020%2017.4375%2020C17.2917%2019.9792%2017.1458%2019.9688%2017%2019.9688C14.5625%2019.7604%2012.3646%2019.0208%2010.4062%2017.75C8.44792%2016.4792%206.89583%2014.8229%205.75%2012.7812C4.60417%2010.7604%204.02083%208.5%204%206C4.04167%205.35417%204.375%204.94792%205%204.78125L8.5%204.03125C8.79167%203.96875%209.0625%204.01042%209.3125%204.15625C9.58333%204.28125%209.78125%204.47917%209.90625%204.75L11.4062%208.25C11.6146%208.8125%2011.4896%209.30208%2011.0312%209.71875L9.78125%2010.75C10.6354%2012.2083%2011.7917%2013.3646%2013.25%2014.2188L14.2812%2012.9688C14.6979%2012.5104%2015.1875%2012.3854%2015.75%2012.5938ZM18%2019C18.125%2019%2018.2083%2018.9375%2018.25%2018.8125L19%2015.3125C19.0208%2015.1667%2018.9688%2015.0729%2018.8438%2015.0312L15.3438%2013.5312C15.2396%2013.4896%2015.1458%2013.5104%2015.0625%2013.5938L14.0312%2014.875C13.6562%2015.25%2013.2292%2015.3229%2012.75%2015.0938C11.125%2014.1562%209.84375%2012.875%208.90625%2011.25C8.67708%2010.7708%208.75%2010.3438%209.125%209.96875L10.4062%208.9375C10.4896%208.85417%2010.5104%208.76042%2010.4688%208.65625L8.96875%205.15625C8.90625%205.03125%208.8125%204.97917%208.6875%205L5.1875%205.75C5.0625%205.79167%205%205.875%205%206C5.02083%208.41667%205.61458%2010.6042%206.78125%2012.5625C7.92708%2014.5208%209.47917%2016.0729%2011.4375%2017.2188C13.3958%2018.3854%2015.5833%2018.9792%2018%2019Z%22%20fill%3D%22%23FF6224%22%2F%3E%0A%3Cpath%20d%3D%22M20.2829%207.76537L20.2829%207.76538L21.2199%208L20.2829%208.23462L20.2829%208.23463L20.2479%208.2434C19.7016%208.38029%2019.2766%208.48675%2018.9402%208.60753C18.5926%208.73237%2018.3246%208.87736%2018.1007%209.09978L18.1002%209.10023C17.8774%209.32308%2017.7323%209.59139%2017.6075%209.93932C17.4872%2010.2746%2017.3812%2010.698%2017.2451%2011.241L17.2346%2011.2829L17.2346%2011.2829L17%2012.2199L16.7654%2011.2829L16.7654%2011.2829L16.7566%2011.2479C16.6197%2010.7016%2016.5133%2010.2766%2016.3925%209.94025C16.2676%209.59256%2016.1226%209.3246%2015.9002%209.10068L15.8998%209.10023C15.6769%208.87739%2015.4086%208.73231%2015.0607%208.60751C14.7254%208.48725%2014.302%208.38117%2013.759%208.24512L13.7171%208.23463L13.7171%208.23462L12.7801%208L13.7171%207.76538L13.7171%207.76537L13.7521%207.75661C14.2984%207.61972%2014.7234%207.51325%2015.0598%207.39247C15.4074%207.26764%2015.6754%207.12264%2015.8993%206.90022L15.8998%206.89977C16.1226%206.67692%2016.2677%206.40861%2016.3925%206.06068C16.5128%205.72541%2016.6188%205.302%2016.7549%204.75899L16.7654%204.71711L16.7654%204.71707L17%203.78006L17.2346%204.71708L17.2346%204.71711L17.2434%204.7521C17.3803%205.29845%2017.4868%205.72337%2017.6075%206.05975C17.7324%206.40744%2017.8774%206.6754%2018.0998%206.89932L18.1002%206.89977C18.3231%207.12261%2018.5914%207.26769%2018.9393%207.39249C19.2746%207.51275%2019.698%207.61883%2020.241%207.75488L20.2829%207.76537Z%22%20fill%3D%22%23FF6224%22%20stroke%3D%22white%22%20stroke-width%3D%220.378947%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1597")}
              tag="div"
            >
              <_Builtin.Block tag="div">{"With Phone Agent"}</_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-sm", "text-grey-600")}
                tag="div"
              >
                {
                  "The phone agent will contact the candidate via phone call and arrange a suitable time within the provided date range."
                }
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
