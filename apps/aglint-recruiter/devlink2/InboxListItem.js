import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./InboxListItem.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-9":{"id":"e-9","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-6","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-10"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"480c1bf4-78d0-016d-ea8b-5ca5094808ca","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"480c1bf4-78d0-016d-ea8b-5ca5094808ca","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1696241508459},"e-10":{"id":"e-10","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-7","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-9"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"480c1bf4-78d0-016d-ea8b-5ca5094808ca","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"480c1bf4-78d0-016d-ea8b-5ca5094808ca","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1696241508460},"e-25":{"id":"e-25","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-14","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-26"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"1537bbdf-25e4-16ab-c7cd-5cdaf959527f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"1537bbdf-25e4-16ab-c7cd-5cdaf959527f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1696427423406},"e-26":{"id":"e-26","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-15","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-25"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"1537bbdf-25e4-16ab-c7cd-5cdaf959527f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"1537bbdf-25e4-16ab-c7cd-5cdaf959527f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1696427423406},"e-29":{"id":"e-29","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-12","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-30"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"87731c26-ab67-63ca-a5ae-b0a6e0d65bec","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"87731c26-ab67-63ca-a5ae-b0a6e0d65bec","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1696429509778},"e-30":{"id":"e-30","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-13","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-29"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"87731c26-ab67-63ca-a5ae-b0a6e0d65bec","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"87731c26-ab67-63ca-a5ae-b0a6e0d65bec","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1696429509781},"e-141":{"id":"e-141","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-89","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-142"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"060ed27d-d611-fc60-5986-c253a6e2933e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"060ed27d-d611-fc60-5986-c253a6e2933e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1711116560091},"e-142":{"id":"e-142","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-90","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-141"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"060ed27d-d611-fc60-5986-c253a6e2933e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"060ed27d-d611-fc60-5986-c253a6e2933e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1711116560092},"e-143":{"id":"e-143","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-91","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-144"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"060ed27d-d611-fc60-5986-c253a6e2933e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"060ed27d-d611-fc60-5986-c253a6e2933e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1711117013504}},"actionLists":{"a-6":{"id":"a-6","title":"actions-[fade-in]","actionItemGroups":[{"actionItems":[{"id":"a-6-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".il-archive-btn","selectorGuids":["062b3eff-b3e4-5db9-f6da-9339b4335cb9"]},"value":"none"}},{"id":"a-6-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".il-archive-btn","selectorGuids":["062b3eff-b3e4-5db9-f6da-9339b4335cb9"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-6-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".il-archive-btn","selectorGuids":["062b3eff-b3e4-5db9-f6da-9339b4335cb9"]},"value":"flex"}}]},{"actionItems":[{"id":"a-6-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".il-archive-btn","selectorGuids":["062b3eff-b3e4-5db9-f6da-9339b4335cb9"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1696241512726},"a-7":{"id":"a-7","title":"actions-[fade-out]","actionItemGroups":[{"actionItems":[{"id":"a-7-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".il-archive-btn","selectorGuids":["062b3eff-b3e4-5db9-f6da-9339b4335cb9"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-7-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".il-archive-btn","selectorGuids":["062b3eff-b3e4-5db9-f6da-9339b4335cb9"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1696241600450},"a-14":{"id":"a-14","title":"il-priority-dropdown-[open]","actionItemGroups":[{"actionItems":[{"id":"a-14-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".il-dropdown-content","selectorGuids":["5847968f-d734-93de-1bcf-d8ba0ed5e7b7"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}}]},{"actionItems":[{"id":"a-14-n-2","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":300,"target":{"useEventTarget":"SIBLINGS","selector":".il-dropdown-content","selectorGuids":["5847968f-d734-93de-1bcf-d8ba0ed5e7b7"]},"widthUnit":"PX","heightUnit":"AUTO","locked":false}}]}],"useFirstGroupAsInitialState":true,"createdOn":1695992309043},"a-15":{"id":"a-15","title":"il-piority-dropdown-[close]","actionItemGroups":[{"actionItems":[{"id":"a-15-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":300,"target":{"useEventTarget":"SIBLINGS","selector":".il-dropdown-content","selectorGuids":["5847968f-d734-93de-1bcf-d8ba0ed5e7b7"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}}]}],"useFirstGroupAsInitialState":false,"createdOn":1695992372694},"a-12":{"id":"a-12","title":"il-status-dropdown-[open]","actionItemGroups":[{"actionItems":[{"id":"a-12-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".il-dropdown-content","selectorGuids":["5847968f-d734-93de-1bcf-d8ba0ed5e7b7"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}}]},{"actionItems":[{"id":"a-12-n-2","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".il-dropdown-content","selectorGuids":["5847968f-d734-93de-1bcf-d8ba0ed5e7b7"]},"widthUnit":"PX","heightUnit":"AUTO","locked":false}}]}],"useFirstGroupAsInitialState":true,"createdOn":1695992309043},"a-13":{"id":"a-13","title":"il-dropdown-[close]","actionItemGroups":[{"actionItems":[{"id":"a-13-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".il-dropdown-content","selectorGuids":["5847968f-d734-93de-1bcf-d8ba0ed5e7b7"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}}]}],"useFirstGroupAsInitialState":false,"createdOn":1695992372694},"a-89":{"id":"a-89","title":"copy-hover in invitation schedular","actionItemGroups":[{"actionItems":[{"id":"a-89-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1279","selectorGuids":["f3b9e718-5093-2bff-65a2-730e873c8f84"]},"value":"none"}},{"id":"a-89-n-5","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.copy","selectorGuids":["2c8defbe-35b9-4599-ee14-45d94f9fe130","d5f9b086-8c8b-d31e-a39f-a50695a82c6a"]},"value":"block"}},{"id":"a-89-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1279","selectorGuids":["f3b9e718-5093-2bff-65a2-730e873c8f84"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-89-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1279","selectorGuids":["f3b9e718-5093-2bff-65a2-730e873c8f84"]},"value":"flex"}},{"id":"a-89-n-7","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.copy","selectorGuids":["2c8defbe-35b9-4599-ee14-45d94f9fe130","d5f9b086-8c8b-d31e-a39f-a50695a82c6a"]},"value":"block"}},{"id":"a-89-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.copied","selectorGuids":["2c8defbe-35b9-4599-ee14-45d94f9fe130","9252ac6e-77b5-8e17-c28a-254683bcd6bd"]},"value":"none"}},{"id":"a-89-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1279","selectorGuids":["f3b9e718-5093-2bff-65a2-730e873c8f84"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1711116769518},"a-90":{"id":"a-90","title":"copy-hover out invitation schedular","actionItemGroups":[{"actionItems":[{"id":"a-90-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1279","selectorGuids":["f3b9e718-5093-2bff-65a2-730e873c8f84"]},"value":0,"unit":""}},{"id":"a-90-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":300,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1279","selectorGuids":["f3b9e718-5093-2bff-65a2-730e873c8f84"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1711116769518},"a-91":{"id":"a-91","title":"CLick Copied Invitation Link","actionItemGroups":[{"actionItems":[{"id":"a-91-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".text-sm.copy","selectorGuids":["2c8defbe-35b9-4599-ee14-45d94f9fe130","d5f9b086-8c8b-d31e-a39f-a50695a82c6a"]},"value":"block"}},{"id":"a-91-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".text-sm.copied","selectorGuids":["2c8defbe-35b9-4599-ee14-45d94f9fe130","9252ac6e-77b5-8e17-c28a-254683bcd6bd"]},"value":"none"}}]},{"actionItems":[{"id":"a-91-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".text-sm.copied","selectorGuids":["2c8defbe-35b9-4599-ee14-45d94f9fe130","9252ac6e-77b5-8e17-c28a-254683bcd6bd"]},"value":"block"}},{"id":"a-91-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".text-sm.copy","selectorGuids":["2c8defbe-35b9-4599-ee14-45d94f9fe130","d5f9b086-8c8b-d31e-a39f-a50695a82c6a"]},"value":"none"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1711117027368}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function InboxListItem({
  as: _Component = _Builtin.Block,
  onClickCheckbox = {},
  ticketId = "Ticket ID",
  issue = "Issue",
  candidateImage,
  candidateName = "Maria Johnson",
  role = "Software Developer",
  company = "Microsoft, California, United States",
  priorityText = "High",
  slotPriorityIcon,
  slotAssigneeImage,
  assigneeName = "Otis Milburn",
  statusText = "Open",
  assigneeProps = {},
  createDate = "11-12-2023",
  onClickArchiveBtn = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "inbox-list-sl-block")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "checkbox-wrappers-job")}
        tag="div"
        {...onClickCheckbox}
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "add-icon")}
          value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2017%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20y%3D%220.5%22%20width%3D%2216%22%20height%3D%2216%22%20rx%3D%224%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M7%209.08579L10.2929%205.79289C10.6834%205.40237%2011.3166%205.40237%2011.7071%205.79289C12.0976%206.18342%2012.0976%206.81658%2011.7071%207.20711L7.70711%2011.2071C7.31658%2011.5976%206.68342%2011.5976%206.29289%2011.2071L4.29289%209.20711C3.90237%208.81658%203.90237%208.18342%204.29289%207.79289C4.68342%207.40237%205.31658%207.40237%205.70711%207.79289L7%209.08579Z%22%20fill%3D%22white%22%2F%3E%0A%3Crect%20x%3D%221.5%22%20y%3D%222%22%20width%3D%2213%22%20height%3D%2213%22%20rx%3D%223.5%22%20stroke%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "il-ticket-id")} tag="div">
        {ticketId}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "il-issue", "content")}
        tag="div"
      >
        {issue}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "inbox-list-dropdown")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "il-dropdown-trigger", "priority")}
          data-w-id="1537bbdf-25e4-16ab-c7cd-5cdaf959527f"
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "il-priority-option")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-red-500")}
              tag="div"
            >
              {"High"}
            </_Builtin.Block>
            <_Builtin.Block tag="div">
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "svg-icon")}
                value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%229%22%20height%3D%228%22%20viewbox%3D%220%200%209%208%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20d%3D%22M4.5%200L8.83013%207.5H0.169873L4.5%200Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "svg-icon")}
              value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M1.64645%203.64645C1.82001%203.47288%202.08944%203.4536%202.28431%203.58859L2.35355%203.64645L6%207.293L9.64645%203.64645C9.82001%203.47288%2010.0894%203.4536%2010.2843%203.58859L10.3536%203.64645C10.5271%203.82001%2010.5464%204.08944%2010.4114%204.28431L10.3536%204.35355L6.35355%208.35355C6.17999%208.52712%205.91056%208.5464%205.71569%208.41141L5.64645%208.35355L1.64645%204.35355C1.45118%204.15829%201.45118%203.84171%201.64645%203.64645Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "il-dropdown-content")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "il-dropdown-content-block")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "il-priority-option")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-yellow-500")}
                tag="div"
              >
                {"Medium"}
              </_Builtin.Block>
              <_Builtin.Block tag="div">
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "svg-icon")}
                  value="%3Csvg%20width%3D%228%22%20height%3D%228%22%20viewbox%3D%220%200%208%208%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.5%22%20y%3D%220.5%22%20width%3D%227%22%20height%3D%227%22%20fill%3D%22%23F79A3E%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "il-priority-option")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-kale-500")}
                tag="div"
              >
                {"Low"}
              </_Builtin.Block>
              <_Builtin.Block tag="div">
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "svg-icon")}
                  value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%229%22%20height%3D%228%22%20viewbox%3D%220%200%209%208%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20d%3D%22M4.5%208L0.169872%200.5L8.83013%200.5L4.5%208Z%22%20fill%3D%22%23467B7C%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "inbox-list-dropdown", "assignee")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "il-dropdown-trigger", "assignee")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "il-assignee", "content", "ml-0")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "il-assignee-image")}
              tag="div"
            >
              {slotAssigneeImage}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-color-black")}
              tag="div"
            >
              {assigneeName}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "svg-icon")}
              value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M1.64645%203.64645C1.82001%203.47288%202.08944%203.4536%202.28431%203.58859L2.35355%203.64645L6%207.293L9.64645%203.64645C9.82001%203.47288%2010.0894%203.4536%2010.2843%203.58859L10.3536%203.64645C10.5271%203.82001%2010.5464%204.08944%2010.4114%204.28431L10.3536%204.35355L6.35355%208.35355C6.17999%208.52712%205.91056%208.5464%205.71569%208.41141L5.64645%208.35355L1.64645%204.35355C1.45118%204.15829%201.45118%203.84171%201.64645%203.64645Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "il-dropdown-content", "assignee")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "il-dropdown-content-block")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "il-assignee",
                "content",
                "v-margin-4",
                "ml-0"
              )}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "il-assignee-image")}
                tag="div"
              >
                {slotAssigneeImage}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-color-black")}
                tag="div"
              >
                {assigneeName}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "il-candidate-name")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "il-candidate-image")}
          tag="div"
        >
          {candidateImage}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {candidateName}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "il-job-info", "content")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {role}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "text-sm",
            "fw-semibold",
            "text-grey-600"
          )}
          tag="div"
        >
          {company}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "inbox-list-dropdown", "status")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "il-dropdown-trigger", "status")}
          data-w-id="87731c26-ab67-63ca-a5ae-b0a6e0d65bec"
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-sm", "fw-semibold")}
            tag="div"
            {...assigneeProps}
          >
            {statusText}
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "svg-icon")}
              value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M1.64645%203.64645C1.82001%203.47288%202.08944%203.4536%202.28431%203.58859L2.35355%203.64645L6%207.293L9.64645%203.64645C9.82001%203.47288%2010.0894%203.4536%2010.2843%203.58859L10.3536%203.64645C10.5271%203.82001%2010.5464%204.08944%2010.4114%204.28431L10.3536%204.35355L6.35355%208.35355C6.17999%208.52712%205.91056%208.5464%205.71569%208.41141L5.64645%208.35355L1.64645%204.35355C1.45118%204.15829%201.45118%203.84171%201.64645%203.64645Z%22%20fill%3D%22%23fff%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "il-dropdown-content")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "il-dropdown-content-block")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "ils-dropdown-option", "resolved")}
              tag="div"
            >
              {"Resolved"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "ils-dropdown-option",
                "in-progress"
              )}
              tag="div"
            >
              {"In Progress"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "ils-dropdown-option", "reopened")}
              tag="div"
            >
              {"Reopened"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "ils-dropdown-option", "pending")}
              tag="div"
            >
              {"Pending"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "ils-dropdown-option", "on-hold")}
              tag="div"
            >
              {"On Hold"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "ils-dropdown-option", "cancelled")}
              tag="div"
            >
              {"Cancelled"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "ils-dropdown-option", "escalated")}
              tag="div"
            >
              {"Escalated"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "il-create-date",
          "fw-semibold",
          "text-color-black"
        )}
        tag="div"
      >
        {createDate}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "il-actions", "content")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "il-actions-image-block")}
          data-w-id="480c1bf4-78d0-016d-ea8b-5ca5094808ca"
          tag="div"
        >
          <_Builtin.Image
            loading="lazy"
            width="auto"
            height="auto"
            alt=""
            src="https://uploads-ssl.webflow.com/651419e73ebbb12148f96ccc/651a94f8aa13f70fec023553_Frame%201282.svg"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "il-archive-btn")}
            tag="div"
            {...onClickArchiveBtn}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "svg-icon")}
              value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20d%3D%22M10%201.5L11%203.5V10C11%2010.2761%2010.7761%2010.5%2010.5%2010.5H1.5C1.22386%2010.5%201%2010.2761%201%2010V3.50177L2%201.5H10ZM10%204.5H2V9.5H10V4.5ZM6.5%205V7H8L6%209L4%207H5.5V5H6.5ZM9.38195%202.5H2.61828L2.11872%203.5H9.88195L9.38195%202.5Z%22%20fill%3D%22black%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "text-color-black")}
              tag="div"
            >
              {"Archive"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
