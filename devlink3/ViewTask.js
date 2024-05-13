"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { ViewTaskCard } from "./ViewTaskCard";
import { TaskProgress } from "./TaskProgress";
import * as _utils from "./utils";
import _styles from "./ViewTask.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-53":{"id":"e-53","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-31","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-54"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"b5766867-4376-9164-037c-56410a1f2209","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b5766867-4376-9164-037c-56410a1f2209","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1713879535086},"e-54":{"id":"e-54","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-32","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-53"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"b5766867-4376-9164-037c-56410a1f2209","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b5766867-4376-9164-037c-56410a1f2209","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1713879535087},"e-55":{"id":"e-55","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-33","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-56"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"0b3b2f1f-5f46-6508-56f8-8b41579ca1ba","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"0b3b2f1f-5f46-6508-56f8-8b41579ca1ba","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1713879736534},"e-56":{"id":"e-56","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-34","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-55"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"0b3b2f1f-5f46-6508-56f8-8b41579ca1ba","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"0b3b2f1f-5f46-6508-56f8-8b41579ca1ba","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1713879736535}},"actionLists":{"a-31":{"id":"a-31","title":"Task Next previous hover in","actionItemGroups":[{"actionItems":[{"id":"a-31-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer.grey-600.task","selectorGuids":["f38c0a61-6b19-ab7f-58ba-4d0343dbde28","b6a0da89-f663-e6d1-08c9-57dd7131ca46","a2a837d1-3ada-a444-2fa0-fdd1c9899dbc"]},"value":0,"unit":""}},{"id":"a-31-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer.grey-600.task","selectorGuids":["f38c0a61-6b19-ab7f-58ba-4d0343dbde28","b6a0da89-f663-e6d1-08c9-57dd7131ca46","a2a837d1-3ada-a444-2fa0-fdd1c9899dbc"]},"value":"none"}}]},{"actionItems":[{"id":"a-31-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer.grey-600.task","selectorGuids":["f38c0a61-6b19-ab7f-58ba-4d0343dbde28","b6a0da89-f663-e6d1-08c9-57dd7131ca46","a2a837d1-3ada-a444-2fa0-fdd1c9899dbc"]},"value":1,"unit":""}},{"id":"a-31-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer.grey-600.task","selectorGuids":["f38c0a61-6b19-ab7f-58ba-4d0343dbde28","b6a0da89-f663-e6d1-08c9-57dd7131ca46","a2a837d1-3ada-a444-2fa0-fdd1c9899dbc"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1713879541901},"a-32":{"id":"a-32","title":"Task Next previous hover out","actionItemGroups":[{"actionItems":[{"id":"a-32-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer.grey-600.task","selectorGuids":["f38c0a61-6b19-ab7f-58ba-4d0343dbde28","b6a0da89-f663-e6d1-08c9-57dd7131ca46","a2a837d1-3ada-a444-2fa0-fdd1c9899dbc"]},"value":0,"unit":""}},{"id":"a-32-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer.grey-600.task","selectorGuids":["f38c0a61-6b19-ab7f-58ba-4d0343dbde28","b6a0da89-f663-e6d1-08c9-57dd7131ca46","a2a837d1-3ada-a444-2fa0-fdd1c9899dbc"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1713879541901},"a-33":{"id":"a-33","title":"task next hover in","actionItemGroups":[{"actionItems":[{"id":"a-33-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer.grey-600.task-next","selectorGuids":["f38c0a61-6b19-ab7f-58ba-4d0343dbde28","b6a0da89-f663-e6d1-08c9-57dd7131ca46","2323e848-ad42-6abb-165b-58d703c9633d"]},"value":0,"unit":""}},{"id":"a-33-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer.grey-600.task-next","selectorGuids":["f38c0a61-6b19-ab7f-58ba-4d0343dbde28","b6a0da89-f663-e6d1-08c9-57dd7131ca46","2323e848-ad42-6abb-165b-58d703c9633d"]},"value":"none"}}]},{"actionItems":[{"id":"a-33-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer.grey-600.task-next","selectorGuids":["f38c0a61-6b19-ab7f-58ba-4d0343dbde28","b6a0da89-f663-e6d1-08c9-57dd7131ca46","2323e848-ad42-6abb-165b-58d703c9633d"]},"value":1,"unit":""}},{"id":"a-33-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer.grey-600.task-next","selectorGuids":["f38c0a61-6b19-ab7f-58ba-4d0343dbde28","b6a0da89-f663-e6d1-08c9-57dd7131ca46","2323e848-ad42-6abb-165b-58d703c9633d"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1713879745453},"a-34":{"id":"a-34","title":"task next hover out","actionItemGroups":[{"actionItems":[{"id":"a-34-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer.grey-600.task-next","selectorGuids":["f38c0a61-6b19-ab7f-58ba-4d0343dbde28","b6a0da89-f663-e6d1-08c9-57dd7131ca46","2323e848-ad42-6abb-165b-58d703c9633d"]},"value":0,"unit":""}},{"id":"a-34-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer.grey-600.task-next","selectorGuids":["f38c0a61-6b19-ab7f-58ba-4d0343dbde28","b6a0da89-f663-e6d1-08c9-57dd7131ca46","2323e848-ad42-6abb-165b-58d703c9633d"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1713879745453}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function ViewTask({
  as: _Component = _Builtin.Block,
  onClickClose = {},
  slotTaskCard,
  slotTaskProgress,
  textTaskDetail = "The TAR (Talent Acquisition Representative) admin currently lacks the ability to edit basic candidate details. It's necessary to grant TAR admins the permission",
  isCancelTaskVisible = true,
  onClickCancelTask = {},
  onClickPrev = {},
  onClickNext = {},
  isDisablePrev = false,
  isDisableNext = false,
  onClickCompleteTask = {},
  isCompleteTaskVisible = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "div-block-1338")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1339", "plr-16")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600")}
          tag="div"
        >
          {"Task Detail"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1570")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1571")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1569")}
              data-w-id="b5766867-4376-9164-037c-56410a1f2209"
              tag="div"
              {...onClickPrev}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2.60156%206.39844C2.38281%206.13281%202.38281%205.86719%202.60156%205.60156L7.10156%201.10156C7.36719%200.882812%207.63281%200.882812%207.89844%201.10156C8.11719%201.36719%208.11719%201.63281%207.89844%201.89844L3.79688%206L7.89844%2010.1016C8.11719%2010.3672%208.11719%2010.6328%207.89844%2010.8984C7.63281%2011.1172%207.36719%2011.1172%207.10156%2010.8984L2.60156%206.39844Z%22%20fill%3D%22%2349545C%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "arrow-tooltips-drawer",
                  "grey-600",
                  "task"
                )}
                tag="div"
              >
                <_Builtin.Block tag="div">{"Shift + ←"}</_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            {isDisablePrev ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-1569", "disable")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2.60156%206.39844C2.38281%206.13281%202.38281%205.86719%202.60156%205.60156L7.10156%201.10156C7.36719%200.882812%207.63281%200.882812%207.89844%201.10156C8.11719%201.36719%208.11719%201.63281%207.89844%201.89844L3.79688%206L7.89844%2010.1016C8.11719%2010.3672%208.11719%2010.6328%207.89844%2010.8984C7.63281%2011.1172%207.36719%2011.1172%207.10156%2010.8984L2.60156%206.39844Z%22%20fill%3D%22%23c2c8cc%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1571")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1569")}
              data-w-id="0b3b2f1f-5f46-6508-56f8-8b41579ca1ba"
              tag="div"
              {...onClickNext}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.39844%205.60156C9.61719%205.86719%209.61719%206.13281%209.39844%206.39844L4.89844%2010.8984C4.63281%2011.1172%204.36719%2011.1172%204.10156%2010.8984C3.88281%2010.6328%203.88281%2010.3672%204.10156%2010.1016L8.20312%206L4.10156%201.89844C3.88281%201.63281%203.88281%201.36719%204.10156%201.10156C4.36719%200.882813%204.63281%200.882813%204.89844%201.10156L9.39844%205.60156Z%22%20fill%3D%22%2349545C%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "arrow-tooltips-drawer",
                  "grey-600",
                  "task-next"
                )}
                tag="div"
              >
                <_Builtin.Block tag="div">{"Shift + →"}</_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            {isDisableNext ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-1569", "disable")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.39844%205.60156C9.61719%205.86719%209.61719%206.13281%209.39844%206.39844L4.89844%2010.8984C4.63281%2011.1172%204.36719%2011.1172%204.10156%2010.8984C3.88281%2010.6328%203.88281%2010.3672%204.10156%2010.1016L8.20312%206L4.10156%201.89844C3.88281%201.63281%203.88281%201.36719%204.10156%201.10156C4.36719%200.882813%204.63281%200.882813%204.89844%201.10156L9.39844%205.60156Z%22%20fill%3D%22%23c2c8cc%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1569", "width-30")}
            tag="div"
            {...onClickClose}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons", "cursor-pointer")}
              value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.58594%203.21094L6.79688%206L9.58594%208.78906C9.80469%209.05469%209.80469%209.32031%209.58594%209.58594C9.32031%209.80469%209.05469%209.80469%208.78906%209.58594L6%206.79688L3.21094%209.58594C2.94531%209.80469%202.67969%209.80469%202.41406%209.58594C2.19531%209.32031%202.19531%209.05469%202.41406%208.78906L5.20312%206L2.41406%203.21094C2.19531%202.94531%202.19531%202.67969%202.41406%202.41406C2.67969%202.19531%202.94531%202.19531%203.21094%202.41406L6%205.20312L8.78906%202.41406C9.05469%202.19531%209.32031%202.19531%209.58594%202.41406C9.80469%202.67969%209.80469%202.94531%209.58594%203.21094Z%22%20fill%3D%22%2349545C%22%2F%3E%0A%3C%2Fsvg%3E"
              {...onClickClose}
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1588")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "plr-16")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "text-lg", "fw-semibold")}
            tag="div"
          >
            {textTaskDetail}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1344", "plr-16")}
          tag="div"
        >
          {slotTaskCard ?? <ViewTaskCard />}
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1345", "plr-16")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey_600")}
              tag="div"
            >
              {"Task Activity"}
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "")} tag="div">
              {slotTaskProgress ?? <TaskProgress />}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      {isCancelTaskVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1545")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1546", "cursor-pointer")}
            tag="div"
            {...onClickCancelTask}
          >
            <_Builtin.Block tag="div">{"Close Task"}</_Builtin.Block>
          </_Builtin.Block>
          {isCompleteTaskVisible ? (
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "div-block-1546",
                "cursor-pointer",
                "green"
              )}
              tag="div"
              {...onClickCompleteTask}
            >
              <_Builtin.Block tag="div">{"Complete Task"}</_Builtin.Block>
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
