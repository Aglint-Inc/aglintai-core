"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { ButtonSoft } from "./ButtonSoft";
import * as _utils from "./utils";
import _styles from "./EmailChangePop.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function EmailChangePop({
  as: _Component = _Builtin.Block,
  onClickClose = {},
  textDesc = "A confirmation link has been sent to newemail@example.com. Please confirm it to update your email ID.",
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "email-change-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "sub-wrap-email")}
        tag="div"
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons")}
          value="%3Csvg%20width%3D%2294%22%20height%3D%2284%22%20viewbox%3D%220%200%2094%2084%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_3641_57857)%22%3E%0A%3Cmask%20id%3D%22mask0_3641_57857%22%20style%3D%22mask-type%3Aluminance%22%20maskunits%3D%22userSpaceOnUse%22%20x%3D%220%22%20y%3D%220%22%20width%3D%22100%22%20height%3D%22100%22%3E%0A%3Cpath%20d%3D%22M100%200H0V100H100V0Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fmask%3E%0A%3Cg%20mask%3D%22url(%23mask0_3641_57857)%22%3E%0A%3Cpath%20d%3D%22M79.1922%2023.9034L82.6095%2062.963C82.8458%2065.6639%2080.7262%2068.0554%2077.8757%2068.3048L21.1892%2073.2642C18.3384%2073.5136%2015.8358%2071.5265%2015.5995%2068.8256L12.1822%2029.766L40.1552%202.73209C42.1496%201.05339%2045.0552%200.79918%2047.3106%202.10608L79.1922%2023.9034Z%22%20fill%3D%22white%22%2F%3E%0A%3Cpath%20d%3D%22M79.1922%2023.9034L82.6095%2062.963C82.8458%2065.6639%2080.7262%2068.0554%2077.8757%2068.3048L21.1892%2073.2642C18.3384%2073.5136%2015.8358%2071.5265%2015.5995%2068.8256L12.1822%2029.766L40.1552%202.73209C42.1496%201.05339%2045.0552%200.79918%2047.3106%202.10608L79.1922%2023.9034Z%22%20stroke%3D%22%23221F1F%22%20stroke-width%3D%221.0274%22%20stroke-miterlimit%3D%2210%22%2F%3E%0A%3Cpath%20d%3D%22M70.8046%2050.0784L24.6573%2054.1158C21.8446%2054.3619%2019.3545%2052.1615%2019.0955%2049.2007L16.6742%2022.0622C16.4152%2019.1015%2018.4853%2016.5019%2021.298%2016.2559L67.4453%2012.2185C70.258%2011.9724%2072.7482%2014.173%2073.0073%2017.1337L75.4285%2044.2722C75.6876%2047.233%2073.6173%2049.8324%2070.8046%2050.0784Z%22%20fill%3D%22white%22%2F%3E%0A%3Cpath%20d%3D%22M70.8046%2050.0784L24.6573%2054.1158C21.8446%2054.3619%2019.3545%2052.1615%2019.0955%2049.2007L16.6742%2022.0622C16.4152%2019.1015%2018.4853%2016.5019%2021.298%2016.2559L67.4453%2012.2185C70.258%2011.9724%2072.7482%2014.173%2073.0073%2017.1337L75.4285%2044.2722C75.6876%2047.233%2073.6173%2049.8324%2070.8046%2050.0784Z%22%20stroke%3D%22%23221F1F%22%20stroke-width%3D%221.08298%22%20stroke-miterlimit%3D%2210%22%2F%3E%0A%3Cpath%20d%3D%22M21.1594%2073.1273L21.8136%2073.0701L46.9561%2052.3085L12.888%2029.4056C12.553%2029.2035%2012.1435%2029.4786%2012.1788%2029.8818L15.5224%2068.1456C15.7849%2071.1464%2018.3087%2073.3767%2021.1594%2073.1273Z%22%20fill%3D%22white%22%2F%3E%0A%3Cpath%20d%3D%22M21.1594%2073.1273L21.8136%2073.0701L46.9561%2052.3085L12.888%2029.4056C12.553%2029.2035%2012.1435%2029.4786%2012.1788%2029.8818L15.5224%2068.1456C15.7849%2071.1464%2018.3087%2073.3767%2021.1594%2073.1273Z%22%20stroke%3D%22%23221F1F%22%20stroke-width%3D%221.08298%22%20stroke-miterlimit%3D%2210%22%2F%3E%0A%3Cpath%20d%3D%22M77.846%2068.1679L77.1916%2068.2251L48.8256%2052.1449L78.4106%2023.7463C78.7054%2023.4891%2079.1566%2023.6889%2079.1919%2024.0921L82.5323%2062.283C82.7948%2065.2837%2080.6967%2067.9185%2077.846%2068.1679Z%22%20fill%3D%22white%22%2F%3E%0A%3Cpath%20d%3D%22M77.846%2068.1679L77.1916%2068.2251L48.8256%2052.1449L78.4106%2023.7463C78.7054%2023.4891%2079.1566%2023.6889%2079.1919%2024.0921L82.5323%2062.283C82.7948%2065.2837%2080.6967%2067.9185%2077.846%2068.1679Z%22%20stroke%3D%22%23221F1F%22%20stroke-width%3D%221.08298%22%20stroke-miterlimit%3D%2210%22%2F%3E%0A%3Cpath%20d%3D%22M20.0343%2072.8779C19.946%2072.9601%2019.9953%2073.1138%2020.1133%2073.1264C20.4252%2073.1597%2020.7442%2073.1639%2021.0675%2073.1356L77.7541%2068.1762C78.0774%2068.1479%2078.3906%2068.0884%2078.6921%2068.0014C78.8061%2067.9685%2078.8279%2067.8086%2078.7268%2067.7429L51.4207%2045.9566C48.9291%2043.9688%2045.4293%2044.2692%2043.3136%2046.6525L20.0343%2072.8779Z%22%20fill%3D%22white%22%2F%3E%0A%3Cpath%20d%3D%22M20.0343%2072.8779C19.946%2072.9601%2019.9953%2073.1138%2020.1133%2073.1264C20.4252%2073.1597%2020.7442%2073.1639%2021.0675%2073.1356L77.7541%2068.1762C78.0774%2068.1479%2078.3906%2068.0884%2078.6921%2068.0014C78.8061%2067.9686%2078.8279%2067.8086%2078.7268%2067.7429L51.4207%2045.9566C48.9291%2043.9688%2045.4293%2044.2692%2043.3136%2046.6525L20.0343%2072.8779Z%22%20stroke%3D%22%23221F1F%22%20stroke-width%3D%221.08298%22%20stroke-miterlimit%3D%2210%22%2F%3E%0A%3C%2Fg%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3Cclippath%20id%3D%22clip0_3641_57857%22%3E%0A%3Crect%20width%3D%2294%22%20height%3D%2284%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fclippath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
        />
        <_Builtin.Block
          className={_utils.cx(_styles, "emial-change-text")}
          tag="div"
        >
          <Text size="5" weight="medium" content="Check your inbox" />
          <Text
            content={textDesc}
            size="2"
            weight=""
            color="neutral"
            align=""
          />
        </_Builtin.Block>
        <ButtonSoft
          onClickButton={onClickClose}
          size="2"
          color="neutral"
          isLeftIcon={false}
          isRightIcon={false}
          textButton="Close"
        />
      </_Builtin.Block>
    </_Component>
  );
}
