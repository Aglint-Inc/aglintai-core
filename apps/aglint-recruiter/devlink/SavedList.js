"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { IconButtonSoft } from "./IconButtonSoft";
import * as _utils from "./utils";
import _styles from "./SavedList.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1526":{"id":"e-1526","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-575","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1527"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"b3d68156-df23-e49f-d4ae-cc3d618aa487","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b3d68156-df23-e49f-d4ae-cc3d618aa487","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1705738440761},"e-1527":{"id":"e-1527","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-576","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1526"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"b3d68156-df23-e49f-d4ae-cc3d618aa487","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b3d68156-df23-e49f-d4ae-cc3d618aa487","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1705738440764},"e-1554":{"id":"e-1554","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-595","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1555"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6617842178bd911935783342|e1da67ec-034d-729b-e12d-6fe7511a839d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6617842178bd911935783342|e1da67ec-034d-729b-e12d-6fe7511a839d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1712847463895},"e-1555":{"id":"e-1555","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-596","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1554"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6617842178bd911935783342|e1da67ec-034d-729b-e12d-6fe7511a839d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6617842178bd911935783342|e1da67ec-034d-729b-e12d-6fe7511a839d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1712847463895},"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-575":{"id":"a-575","title":"Edit Hover (In)","actionItemGroups":[{"actionItems":[{"id":"a-575-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".save-list-icon-wrap","selectorGuids":["726735d4-888e-4dd9-659d-06a4ecca0bff"]},"value":"none"}},{"id":"a-575-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".save-list-icon-wrap","selectorGuids":["726735d4-888e-4dd9-659d-06a4ecca0bff"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-575-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".save-list-icon-wrap","selectorGuids":["726735d4-888e-4dd9-659d-06a4ecca0bff"]},"value":"flex"}},{"id":"a-575-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".save-list-icon-wrap","selectorGuids":["726735d4-888e-4dd9-659d-06a4ecca0bff"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1705738315370},"a-576":{"id":"a-576","title":"Edit Hover (Out)","actionItemGroups":[{"actionItems":[{"id":"a-576-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".save-list-icon-wrap","selectorGuids":["726735d4-888e-4dd9-659d-06a4ecca0bff"]},"value":0,"unit":""}},{"id":"a-576-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":300,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".save-list-icon-wrap","selectorGuids":["726735d4-888e-4dd9-659d-06a4ecca0bff"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1705738315370},"a-595":{"id":"a-595","title":"Edit Hover (In) 2","actionItemGroups":[{"actionItems":[{"id":"a-595-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".save-list-icon-wrap","selectorGuids":["726735d4-888e-4dd9-659d-06a4ecca0bff"]},"value":"none"}},{"id":"a-595-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".save-list-icon-wrap","selectorGuids":["726735d4-888e-4dd9-659d-06a4ecca0bff"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-595-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".save-list-icon-wrap","selectorGuids":["726735d4-888e-4dd9-659d-06a4ecca0bff"]},"value":"flex"}},{"id":"a-595-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".save-list-icon-wrap","selectorGuids":["726735d4-888e-4dd9-659d-06a4ecca0bff"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1705738315370},"a-596":{"id":"a-596","title":"Edit Hover (Out) 2","actionItemGroups":[{"actionItems":[{"id":"a-596-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".save-list-icon-wrap","selectorGuids":["726735d4-888e-4dd9-659d-06a4ecca0bff"]},"value":0,"unit":""}},{"id":"a-596-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":300,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".save-list-icon-wrap","selectorGuids":["726735d4-888e-4dd9-659d-06a4ecca0bff"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1705738315370},"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function SavedList({
  as: _Component = _Builtin.Block,
  textRole = "Senior Software Engineer",
  textCountCandidate = "(28 Candidates)",
  onClickList = {},
  onClickEdit = {},
  onClickDelete = {},
  isEditVisible = true,
  slotInputTextSavedList,
  isSavedListInputVisible = false,
  isSavedListTextVisible = true,
  onClickSubmit = {},
  onClickClose = {},
  isCardVisible = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      data-w-id="b3d68156-df23-e49f-d4ae-cc3d618aa487"
      tag="div"
      {...onClickList}
    >
      {isCardVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "save-list-input-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "save-list-input-left", "width-auto")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewbox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3.5%205.5H4.5V4.5H3.5V5.5ZM2.5%204.25C2.54167%203.79167%202.79167%203.54167%203.25%203.5H4.75C5.20833%203.54167%205.45833%203.79167%205.5%204.25V5.75C5.45833%206.20833%205.20833%206.45833%204.75%206.5H3.25C2.79167%206.45833%202.54167%206.20833%202.5%205.75V4.25ZM7.5%204.5H17.5C17.8125%204.52083%2017.9792%204.6875%2018%205C17.9792%205.3125%2017.8125%205.47917%2017.5%205.5H7.5C7.1875%205.47917%207.02083%205.3125%207%205C7.02083%204.6875%207.1875%204.52083%207.5%204.5ZM7.5%209.5H17.5C17.8125%209.52083%2017.9792%209.6875%2018%2010C17.9792%2010.3125%2017.8125%2010.4792%2017.5%2010.5H7.5C7.1875%2010.4792%207.02083%2010.3125%207%2010C7.02083%209.6875%207.1875%209.52083%207.5%209.5ZM7.5%2014.5H17.5C17.8125%2014.5208%2017.9792%2014.6875%2018%2015C17.9792%2015.3125%2017.8125%2015.4792%2017.5%2015.5H7.5C7.1875%2015.4792%207.02083%2015.3125%207%2015C7.02083%2014.6875%207.1875%2014.5208%207.5%2014.5ZM3.5%209.5V10.5H4.5V9.5H3.5ZM3.25%208.5H4.75C5.20833%208.54167%205.45833%208.79167%205.5%209.25V10.75C5.45833%2011.2083%205.20833%2011.4583%204.75%2011.5H3.25C2.79167%2011.4583%202.54167%2011.2083%202.5%2010.75V9.25C2.54167%208.79167%202.79167%208.54167%203.25%208.5ZM3.5%2015.5H4.5V14.5H3.5V15.5ZM2.5%2014.25C2.54167%2013.7917%202.79167%2013.5417%203.25%2013.5H4.75C5.20833%2013.5417%205.45833%2013.7917%205.5%2014.25V15.75C5.45833%2016.2083%205.20833%2016.4583%204.75%2016.5H3.25C2.79167%2016.4583%202.54167%2016.2083%202.5%2015.75V14.25Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            {isSavedListTextVisible ? (
              <_Builtin.Block tag="div">
                <Text content={textRole} />
              </_Builtin.Block>
            ) : null}
            {isEditVisible ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "save-list-icon-wrap")}
                tag="div"
              >
                <IconButtonSoft
                  onClickButton={onClickEdit}
                  size="1"
                  iconName="edit"
                  color="neutral"
                />
                <IconButtonSoft
                  onClickButton={onClickDelete}
                  size="1"
                  iconName="delete"
                  color="error"
                />
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
          {isSavedListTextVisible ? (
            <_Builtin.Block tag="div">
              <Text content={textCountCandidate} color="neutral" />
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      ) : null}
      {isSavedListInputVisible ? (
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "save-list-input-wrap",
            "width-auto",
            "inline-edit"
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "save-list-input-left")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewbox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3.5%205.5H4.5V4.5H3.5V5.5ZM2.5%204.25C2.54167%203.79167%202.79167%203.54167%203.25%203.5H4.75C5.20833%203.54167%205.45833%203.79167%205.5%204.25V5.75C5.45833%206.20833%205.20833%206.45833%204.75%206.5H3.25C2.79167%206.45833%202.54167%206.20833%202.5%205.75V4.25ZM7.5%204.5H17.5C17.8125%204.52083%2017.9792%204.6875%2018%205C17.9792%205.3125%2017.8125%205.47917%2017.5%205.5H7.5C7.1875%205.47917%207.02083%205.3125%207%205C7.02083%204.6875%207.1875%204.52083%207.5%204.5ZM7.5%209.5H17.5C17.8125%209.52083%2017.9792%209.6875%2018%2010C17.9792%2010.3125%2017.8125%2010.4792%2017.5%2010.5H7.5C7.1875%2010.4792%207.02083%2010.3125%207%2010C7.02083%209.6875%207.1875%209.52083%207.5%209.5ZM7.5%2014.5H17.5C17.8125%2014.5208%2017.9792%2014.6875%2018%2015C17.9792%2015.3125%2017.8125%2015.4792%2017.5%2015.5H7.5C7.1875%2015.4792%207.02083%2015.3125%207%2015C7.02083%2014.6875%207.1875%2014.5208%207.5%2014.5ZM3.5%209.5V10.5H4.5V9.5H3.5ZM3.25%208.5H4.75C5.20833%208.54167%205.45833%208.79167%205.5%209.25V10.75C5.45833%2011.2083%205.20833%2011.4583%204.75%2011.5H3.25C2.79167%2011.4583%202.54167%2011.2083%202.5%2010.75V9.25C2.54167%208.79167%202.79167%208.54167%203.25%208.5ZM3.5%2015.5H4.5V14.5H3.5V15.5ZM2.5%2014.25C2.54167%2013.7917%202.79167%2013.5417%203.25%2013.5H4.75C5.20833%2013.5417%205.45833%2013.7917%205.5%2014.25V15.75C5.45833%2016.2083%205.20833%2016.4583%204.75%2016.5H3.25C2.79167%2016.4583%202.54167%2016.2083%202.5%2015.75V14.25Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "slot-save-list-input")}
              tag="div"
            >
              {slotInputTextSavedList}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "save-list-input-right")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons", "curser-hover-pointer")}
              value="%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewbox%3D%220%200%2040%2040%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.5%22%20y%3D%220.5%22%20width%3D%2239%22%20height%3D%2239%22%20rx%3D%223.5%22%20fill%3D%22%23EDF8F4%22%2F%3E%0A%3Crect%20x%3D%220.5%22%20y%3D%220.5%22%20width%3D%2239%22%20height%3D%2239%22%20rx%3D%223.5%22%20stroke%3D%22%23D1E8DF%22%2F%3E%0A%3Cpath%20d%3D%22M26.7812%2015.2188C27.0729%2015.5729%2027.0729%2015.9271%2026.7812%2016.2812L18.5312%2024.5312C18.1771%2024.8229%2017.8229%2024.8229%2017.4688%2024.5312L13.2188%2020.2812C12.9271%2019.9271%2012.9271%2019.5729%2013.2188%2019.2188C13.5729%2018.9271%2013.9271%2018.9271%2014.2812%2019.2188L18%2022.9375L25.7188%2015.2188C26.0729%2014.9271%2026.4271%2014.9271%2026.7812%2015.2188Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fsvg%3E"
              {...onClickSubmit}
            />
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons", "curser-hover-pointer")}
              value="%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewbox%3D%220%200%2040%2040%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.5%22%20y%3D%220.5%22%20width%3D%2239%22%20height%3D%2239%22%20rx%3D%223.5%22%20fill%3D%22%23FFF0F1%22%2F%3E%0A%3Crect%20x%3D%220.5%22%20y%3D%220.5%22%20width%3D%2239%22%20height%3D%2239%22%20rx%3D%223.5%22%20stroke%3D%22%23F5D5D8%22%2F%3E%0A%3Cpath%20d%3D%22M24.7812%2016.2812L21.0625%2020L24.7812%2023.7188C25.0729%2024.0729%2025.0729%2024.4271%2024.7812%2024.7812C24.4271%2025.0729%2024.0729%2025.0729%2023.7188%2024.7812L20%2021.0625L16.2812%2024.7812C15.9271%2025.0729%2015.5729%2025.0729%2015.2188%2024.7812C14.9271%2024.4271%2014.9271%2024.0729%2015.2188%2023.7188L18.9375%2020L15.2188%2016.2812C14.9271%2015.9271%2014.9271%2015.5729%2015.2188%2015.2188C15.5729%2014.9271%2015.9271%2014.9271%2016.2812%2015.2188L20%2018.9375L23.7188%2015.2188C24.0729%2014.9271%2024.4271%2014.9271%2024.7812%2015.2188C25.0729%2015.5729%2025.0729%2015.9271%2024.7812%2016.2812Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
              {...onClickClose}
            />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
