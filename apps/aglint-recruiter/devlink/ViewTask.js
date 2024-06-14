"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./ViewTask.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function ViewTask({
  as: _Component = _Builtin.Block,
  textRelatedTask = "Schedule interview with @james between 16",
  textEmailSent = "Email Send to candidate : Interview Invitation",
  onClickViewTask = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "view-task-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "view-task-head")}
        tag="div"
      >
        <Text content="Related task :" />
        <Text content={textRelatedTask} />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "view-task-body")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "view-task-body-mail")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2225%22%20height%3D%2224%22%20viewbox%3D%220%200%2025%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6%207C5.70833%207%205.46875%207.09375%205.28125%207.28125C5.09375%207.46875%205%207.70833%205%208V9.25L11.125%2013.7188C11.7083%2014.1146%2012.2917%2014.1146%2012.875%2013.7188L19%209.25V8C19%207.70833%2018.9062%207.46875%2018.7188%207.28125C18.5312%207.09375%2018.2917%207%2018%207H6ZM5%2010.5V16C5%2016.2917%205.09375%2016.5312%205.28125%2016.7188C5.46875%2016.9062%205.70833%2017%206%2017H18C18.2917%2017%2018.5312%2016.9062%2018.7188%2016.7188C18.9062%2016.5312%2019%2016.2917%2019%2016V10.5L13.4688%2014.5312C13.0312%2014.8646%2012.5417%2015.0312%2012%2015.0312C11.4583%2015.0312%2010.9688%2014.8646%2010.5312%2014.5312L5%2010.5ZM4%208C4.02083%207.4375%204.21875%206.96875%204.59375%206.59375C4.96875%206.21875%205.4375%206.02083%206%206H18C18.5625%206.02083%2019.0312%206.21875%2019.4062%206.59375C19.7812%206.96875%2019.9792%207.4375%2020%208V16C19.9792%2016.5625%2019.7812%2017.0312%2019.4062%2017.4062C19.0312%2017.7812%2018.5625%2017.9792%2018%2018H6C5.4375%2017.9792%204.96875%2017.7812%204.59375%2017.4062C4.21875%2017.0312%204.02083%2016.5625%204%2016V8Z%22%20fill%3D%22%23FF6224%22%2F%3E%0A%3Cpath%20d%3D%22M22.9395%208.71844L22.9395%208.71845L24.0639%209L22.9395%209.28155L22.9395%209.28156L22.8975%209.29208C22.2419%209.45634%2021.732%209.5841%2021.3283%209.72903C20.9111%209.87884%2020.5895%2010.0528%2020.3208%2010.3197L20.3203%2010.3203C20.0529%2010.5877%2019.8788%2010.9097%2019.729%2011.3272C19.5847%2011.7295%2019.4574%2012.2376%2019.2941%2012.8892L19.2816%2012.9395L19.2815%2012.9395L19%2014.0639L18.7185%2012.9395L18.7184%2012.9395L18.7079%2012.8975C18.5437%2012.2419%2018.4159%2011.732%2018.271%2011.3283C18.1212%2010.9111%2017.9472%2010.5895%2017.6803%2010.3208L17.6797%2010.3203C17.4123%2010.0529%2017.0903%209.87877%2016.6728%209.72901C16.2705%209.5847%2015.7624%209.4574%2015.1108%209.29415L15.0605%209.28156L15.0605%209.28155L13.9361%209L15.0605%208.71845L15.0605%208.71844L15.1025%208.70793C15.7581%208.54366%2016.268%208.4159%2016.6717%208.27097C17.0889%208.12116%2017.4105%207.94716%2017.6792%207.68026L17.6797%207.67972C17.9471%207.4123%2018.1212%207.09033%2018.271%206.67282C18.4153%206.2705%2018.5426%205.7624%2018.7059%205.11079L18.7184%205.06053L18.7185%205.06049L19%203.93608L19.2815%205.06049L19.2816%205.06053L19.2921%205.1025C19.4563%205.75813%2019.5841%206.26804%2019.729%206.6717C19.8788%207.08893%2020.0528%207.41049%2020.3197%207.67918L20.3203%207.67972C20.5877%207.94714%2020.9097%208.12123%2021.3272%208.27099C21.7295%208.4153%2022.2376%208.5426%2022.8892%208.70585L22.9395%208.71844Z%22%20fill%3D%22%23FF6224%22%20stroke%3D%22white%22%20stroke-width%3D%220.454737%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <Text content={textEmailSent} />
        </_Builtin.Block>
        <_Builtin.Block tag="div" {...onClickViewTask}>
          <Text color="accent" content="View Task" />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
