"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./BookMark.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function BookMark({
  as: _Component = _Builtin.Block,
  onClickBookmark = {},
  isBookMarked = false,
  isDarkIconVisible = false,
  isLightIconVisible = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "div-block-968")}
      tag="div"
      {...onClickBookmark}
    >
      {isLightIconVisible ? (
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons")}
          value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewbox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2224%22%20height%3D%2224%22%20rx%3D%224%22%20fill%3D%22%23F7F9FB%22%2F%3E%0A%3Cpath%20d%3D%22M7.25098%206.28125C7.2692%205.84375%207.41504%205.47917%207.68848%205.1875C7.98014%204.91406%208.34473%204.76823%208.78223%204.75H16.2197C16.6572%204.76823%2017.0218%204.91406%2017.3135%205.1875C17.5869%205.47917%2017.7327%205.84375%2017.751%206.28125V18.0391C17.7145%2018.4766%2017.4775%2018.7135%2017.04%2018.75C16.8942%2018.75%2016.7575%2018.7044%2016.6299%2018.6133L12.501%2015.7422L8.37207%2018.6133C8.26269%2018.7044%208.12598%2018.75%207.96191%2018.75C7.76139%2018.75%207.59733%2018.6771%207.46973%2018.5313C7.32389%2018.4036%207.25098%2018.2396%207.25098%2018.0391V6.28125ZM8.78223%205.1875C8.47233%205.1875%208.21712%205.29687%208.0166%205.51562C7.79785%205.71614%207.68848%205.97135%207.68848%206.28125V18.0391C7.7067%2018.2031%207.79785%2018.2943%207.96191%2018.3125C8.0166%2018.3125%208.07129%2018.2943%208.12598%2018.2578L12.3643%2015.2773C12.4554%2015.2409%2012.5465%2015.2409%2012.6377%2015.2773L16.876%2018.2578C16.9307%2018.2943%2016.9854%2018.3125%2017.04%2018.3125C17.2041%2018.2943%2017.2952%2018.2031%2017.3135%2018.0391V6.28125C17.3135%205.97135%2017.2041%205.71614%2016.9854%205.51562C16.7848%205.29687%2016.5296%205.1875%2016.2197%205.1875H8.78223Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
        />
      ) : null}
      {isBookMarked ? (
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons", "bookmarked")}
          value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewbox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2224%22%20height%3D%2224%22%20rx%3D%224%22%20fill%3D%22%23FFEEDB%22%2F%3E%0A%3Cpath%20d%3D%22M7.25098%206.0625C7.2692%205.69792%207.39681%205.38802%207.63379%205.13281C7.889%204.89583%208.19889%204.76823%208.56348%204.75H16.4385C16.8031%204.76823%2017.113%204.89583%2017.3682%205.13281C17.6051%205.38802%2017.7327%205.69792%2017.751%206.0625V18.0938C17.7145%2018.4948%2017.4958%2018.7135%2017.0947%2018.75C16.9489%2018.75%2016.8213%2018.7135%2016.7119%2018.6406L12.501%2015.6875L8.29004%2018.6406C8.18066%2018.7135%208.05306%2018.75%207.90723%2018.75C7.50618%2018.7135%207.28743%2018.4948%207.25098%2018.0938V6.0625Z%22%20fill%3D%22%23F79A3E%22%2F%3E%0A%3C%2Fsvg%3E"
        />
      ) : null}
      {isDarkIconVisible ? (
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons")}
          value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2224%22%20height%3D%2224%22%20rx%3D%224%22%20fill%3D%22%233a3e41%0A%22%2F%3E%0A%3Cpath%20d%3D%22M7.25098%206.28125C7.2692%205.84375%207.41504%205.47917%207.68848%205.1875C7.98014%204.91406%208.34473%204.76823%208.78223%204.75H16.2197C16.6572%204.76823%2017.0218%204.91406%2017.3135%205.1875C17.5869%205.47917%2017.7327%205.84375%2017.751%206.28125V18.0391C17.7145%2018.4766%2017.4775%2018.7135%2017.04%2018.75C16.8942%2018.75%2016.7575%2018.7044%2016.6299%2018.6133L12.501%2015.7422L8.37207%2018.6133C8.26269%2018.7044%208.12598%2018.75%207.96191%2018.75C7.76139%2018.75%207.59733%2018.6771%207.46973%2018.5313C7.32389%2018.4036%207.25098%2018.2396%207.25098%2018.0391V6.28125ZM8.78223%205.1875C8.47233%205.1875%208.21712%205.29687%208.0166%205.51562C7.79785%205.71614%207.68848%205.97135%207.68848%206.28125V18.0391C7.7067%2018.2031%207.79785%2018.2943%207.96191%2018.3125C8.0166%2018.3125%208.07129%2018.2943%208.12598%2018.2578L12.3643%2015.2773C12.4554%2015.2409%2012.5465%2015.2409%2012.6377%2015.2773L16.876%2018.2578C16.9307%2018.2943%2016.9854%2018.3125%2017.04%2018.3125C17.2041%2018.2943%2017.2952%2018.2031%2017.3135%2018.0391V6.28125C17.3135%205.97135%2017.2041%205.71614%2016.9854%205.51562C16.7848%205.29687%2016.5296%205.1875%2016.2197%205.1875H8.78223Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
        />
      ) : null}
    </_Component>
  );
}
