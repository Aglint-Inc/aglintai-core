"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./CdSavedList.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function CdSavedList({
  as: _Component = _Builtin.Block,
  onClickViewSavedList = {},
  isSavetoListVisible = false,
  isViewSavedVisible = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "div-block-726")}
      tag="div"
      {...onClickViewSavedList}
    >
      {isSavetoListVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "text-blue-700")}
          tag="div"
        >
          {"Save to list"}
        </_Builtin.Block>
      ) : null}
      {isViewSavedVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "text-blue-700")}
          tag="div"
        >
          {"View saved lists"}
        </_Builtin.Block>
      ) : null}
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "icons")}
        value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewbox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.75781%2011.2578C7.58594%2011.4141%207.41406%2011.4141%207.24219%2011.2578L2.74219%206.75781C2.58594%206.58594%202.58594%206.41406%202.74219%206.24219C2.91406%206.08594%203.08594%206.08594%203.25781%206.24219L7.5%2010.4609L11.7422%206.24219C11.9141%206.08594%2012.0859%206.08594%2012.2578%206.24219C12.4141%206.41406%2012.4141%206.58594%2012.2578%206.75781L7.75781%2011.2578Z%22%20fill%3D%22%23144A75%22%2F%3E%0A%3C%2Fsvg%3E"
      />
      {isViewSavedVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-756")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-755")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewbox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M4.55811%206.05829H5.3658V5.2506H4.55811V6.05829ZM3.75041%205.04868C3.78407%204.67849%203.98599%204.47656%204.35618%204.44291H5.56772C5.93791%204.47656%206.13984%204.67849%206.17349%205.04868V6.26022C6.13984%206.63041%205.93791%206.83233%205.56772%206.86599H4.35618C3.98599%206.83233%203.78407%206.63041%203.75041%206.26022V5.04868ZM7.78887%205.2506H15.8658C16.1182%205.26743%2016.2528%205.40204%2016.2696%205.65445C16.2528%205.90685%2016.1182%206.04147%2015.8658%206.05829H7.78887C7.53647%206.04147%207.40186%205.90685%207.38503%205.65445C7.40186%205.40204%207.53647%205.26743%207.78887%205.2506ZM7.78887%209.28906H15.8658C16.1182%209.30589%2016.2528%209.4405%2016.2696%209.69291C16.2528%209.94531%2016.1182%2010.0799%2015.8658%2010.0968H7.78887C7.53647%2010.0799%207.40186%209.94531%207.38503%209.69291C7.40186%209.4405%207.53647%209.30589%207.78887%209.28906ZM7.78887%2013.3275H15.8658C16.1182%2013.3444%2016.2528%2013.479%2016.2696%2013.7314C16.2528%2013.9838%2016.1182%2014.1184%2015.8658%2014.1352H7.78887C7.53647%2014.1184%207.40186%2013.9838%207.38503%2013.7314C7.40186%2013.479%207.53647%2013.3444%207.78887%2013.3275ZM4.55811%209.28906V10.0968H5.3658V9.28906H4.55811ZM4.35618%208.48137H5.56772C5.93791%208.51502%206.13984%208.71695%206.17349%209.08714V10.2987C6.13984%2010.6689%205.93791%2010.8708%205.56772%2010.9044H4.35618C3.98599%2010.8708%203.78407%2010.6689%203.75041%2010.2987V9.08714C3.78407%208.71695%203.98599%208.51502%204.35618%208.48137ZM4.55811%2014.1352H5.3658V13.3275H4.55811V14.1352ZM3.75041%2013.1256C3.78407%2012.7554%203.98599%2012.5535%204.35618%2012.5198H5.56772C5.93791%2012.5535%206.13984%2012.7554%206.17349%2013.1256V14.3371C6.13984%2014.7073%205.93791%2014.9093%205.56772%2014.9429H4.35618C3.98599%2014.9093%203.78407%2014.7073%203.75041%2014.3371V13.1256Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"View Saved Lists"}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
