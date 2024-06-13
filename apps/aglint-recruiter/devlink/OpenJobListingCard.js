"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { GlobalIcon } from "./GlobalIcon";
import * as _utils from "./utils";
import _styles from "./OpenJobListingCard.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1320":{"id":"e-1320","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-451","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1321"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"3b6022e9-7521-6a98-1483-a49ee53c9b86","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"3b6022e9-7521-6a98-1483-a49ee53c9b86","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1696266303507},"e-1321":{"id":"e-1321","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-452","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1320"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"3b6022e9-7521-6a98-1483-a49ee53c9b86","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"3b6022e9-7521-6a98-1483-a49ee53c9b86","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1696266303511},"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-451":{"id":"a-451","title":"Open Jobs Mouse hover In","actionItemGroups":[{"actionItems":[{"id":"a-451-n-4","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"3b6022e9-7521-6a98-1483-a49ee53c9b86"},"globalSwatchId":"80449ce7","rValue":255,"bValue":255,"gValue":255,"aValue":1}}]},{"actionItems":[{"id":"a-451-n","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":true,"id":"3b6022e9-7521-6a98-1483-a49ee53c9b86"},"globalSwatchId":"--neutral-4","rValue":233,"bValue":230,"gValue":232,"aValue":1}},{"id":"a-451-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".apply-button-icon","selectorGuids":["12c54e31-c3ac-72b0-9c6c-f40c4b94ca08"]},"value":"flex"}},{"id":"a-451-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".apply-button-icon","selectorGuids":["12c54e31-c3ac-72b0-9c6c-f40c4b94ca08"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1696266307244},"a-452":{"id":"a-452","title":"Open Jobs Mouse hover Out","actionItemGroups":[{"actionItems":[{"id":"a-452-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":true,"id":"3b6022e9-7521-6a98-1483-a49ee53c9b86"},"globalSwatchId":"--neutral-2","rValue":249,"bValue":248,"gValue":249,"aValue":1}},{"id":"a-452-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".apply-button-icon","selectorGuids":["12c54e31-c3ac-72b0-9c6c-f40c4b94ca08"]},"value":0,"unit":""}},{"id":"a-452-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".apply-button-icon","selectorGuids":["12c54e31-c3ac-72b0-9c6c-f40c4b94ca08"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1696266307244},"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function OpenJobListingCard({
  as: _Component = _Builtin.Block,
  textJobRole = "Linux Device Driver Engineer - Embedded System",
  textLocation = "California, United States",
  textWorkingType = "Internship, On-site",
  textCompanyType = "Information and Technology",
  onClickApplyNow = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "open-jobs-list-card")}
      data-w-id="3b6022e9-7521-6a98-1483-a49ee53c9b86"
      tag="div"
      {...onClickApplyNow}
    >
      <Text content={textJobRole} weight="bold" />
      <_Builtin.Block
        className={_utils.cx(_styles, "open-job-info-list")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-428")}
          tag="div"
        >
          <GlobalIcon iconName="" />
          <Text content={textLocation} color="neutral" />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-428")}
          tag="div"
        >
          <GlobalIcon iconName="badge" />
          <Text content={textWorkingType} color="neutral" />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-428")}
          tag="div"
        >
          <GlobalIcon iconName="corporate_fare" />
          <Text content={textCompanyType} color="neutral" />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "apply-button-icon")}
        tag="div"
        {...onClickApplyNow}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "text-blue-600")}
          tag="div"
        >
          {"Apply Now"}
        </_Builtin.Block>
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons")}
          value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M15.3333%202.66666C15.6606%202.66666%2015.9328%202.90249%2015.9893%203.21349L16%203.33332V7.33332C16%207.70151%2015.7015%207.99999%2015.3333%207.99999C15.0061%207.99999%2014.7339%207.76416%2014.6774%207.45316L14.6667%207.33332V4.94132L9.13807%2010.4714C8.90665%2010.7028%208.54742%2010.7285%208.28759%2010.5485L8.19526%2010.4714L6%208.27599L1.13807%2013.1381C0.906649%2013.3695%200.547417%2013.3952%200.287593%2013.2152L0.195262%2013.1381C-0.0361597%2012.9066%20-0.0618732%2012.5474%200.118122%2012.2876L0.195262%2012.1953L5.5286%206.86192C5.76002%206.6305%206.11925%206.60478%206.37907%206.78478L6.4714%206.86192L8.66667%209.05732L13.7227%203.99999H11.3333C11.0061%203.99999%2010.7339%203.76416%2010.6774%203.45316L10.6667%203.33332C10.6667%203.00604%2010.9025%202.73385%2011.2135%202.6774L11.3333%202.66666H15.3333Z%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3C%2Fsvg%3E"
        />
      </_Builtin.Block>
    </_Component>
  );
}
