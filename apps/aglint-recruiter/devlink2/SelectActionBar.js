import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { SelectActionsDropdown } from "./SelectActionsDropdown";
import * as _utils from "./utils";
import _styles from "./SelectActionBar.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-141":{"id":"e-141","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-89","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-142"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"060ed27d-d611-fc60-5986-c253a6e2933e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"060ed27d-d611-fc60-5986-c253a6e2933e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1711116560091},"e-142":{"id":"e-142","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-90","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-141"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"060ed27d-d611-fc60-5986-c253a6e2933e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"060ed27d-d611-fc60-5986-c253a6e2933e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1711116560092},"e-143":{"id":"e-143","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-91","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-144"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"060ed27d-d611-fc60-5986-c253a6e2933e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"060ed27d-d611-fc60-5986-c253a6e2933e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1711117013504}},"actionLists":{"a-89":{"id":"a-89","title":"copy-hover in invitation schedular","actionItemGroups":[{"actionItems":[{"id":"a-89-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1279","selectorGuids":["f3b9e718-5093-2bff-65a2-730e873c8f84"]},"value":"none"}},{"id":"a-89-n-5","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.copy","selectorGuids":["2c8defbe-35b9-4599-ee14-45d94f9fe130","d5f9b086-8c8b-d31e-a39f-a50695a82c6a"]},"value":"block"}},{"id":"a-89-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1279","selectorGuids":["f3b9e718-5093-2bff-65a2-730e873c8f84"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-89-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1279","selectorGuids":["f3b9e718-5093-2bff-65a2-730e873c8f84"]},"value":"flex"}},{"id":"a-89-n-7","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.copy","selectorGuids":["2c8defbe-35b9-4599-ee14-45d94f9fe130","d5f9b086-8c8b-d31e-a39f-a50695a82c6a"]},"value":"block"}},{"id":"a-89-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.copied","selectorGuids":["2c8defbe-35b9-4599-ee14-45d94f9fe130","9252ac6e-77b5-8e17-c28a-254683bcd6bd"]},"value":"none"}},{"id":"a-89-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1279","selectorGuids":["f3b9e718-5093-2bff-65a2-730e873c8f84"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1711116769518},"a-90":{"id":"a-90","title":"copy-hover out invitation schedular","actionItemGroups":[{"actionItems":[{"id":"a-90-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1279","selectorGuids":["f3b9e718-5093-2bff-65a2-730e873c8f84"]},"value":0,"unit":""}},{"id":"a-90-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":300,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1279","selectorGuids":["f3b9e718-5093-2bff-65a2-730e873c8f84"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1711116769518},"a-91":{"id":"a-91","title":"CLick Copied Invitation Link","actionItemGroups":[{"actionItems":[{"id":"a-91-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".text-sm.copy","selectorGuids":["2c8defbe-35b9-4599-ee14-45d94f9fe130","d5f9b086-8c8b-d31e-a39f-a50695a82c6a"]},"value":"block"}},{"id":"a-91-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".text-sm.copied","selectorGuids":["2c8defbe-35b9-4599-ee14-45d94f9fe130","9252ac6e-77b5-8e17-c28a-254683bcd6bd"]},"value":"none"}}]},{"actionItems":[{"id":"a-91-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".text-sm.copied","selectorGuids":["2c8defbe-35b9-4599-ee14-45d94f9fe130","9252ac6e-77b5-8e17-c28a-254683bcd6bd"]},"value":"block"}},{"id":"a-91-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".text-sm.copy","selectorGuids":["2c8defbe-35b9-4599-ee14-45d94f9fe130","d5f9b086-8c8b-d31e-a39f-a50695a82c6a"]},"value":"none"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1711117027368}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function SelectActionBar({
  as: _Component = _Builtin.Block,
  onClickClear = {},
  textSelected = "2 Candidate selected",
  selectAllText = "Select all",
  isSelectAllVisible = true,
  onclickSelectAll = {},
  slotDropdown,
  isSendScreeningVisible = false,
  onclickSendScreening = {},
  isAssessmentVisible = false,
  onclickAssessment = {},
  isDisqualifyVisible = false,
  onclickDisqualify = {},
  onClickDelete = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "select-action-bar")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "select-action-left-block")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "selection-clear-btn")}
          tag="div"
          {...onClickClear}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "icon-block", "_30x30")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "svg-icon")}
              value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10.1562%2010.8438L6%206.71875L1.875%2010.8438C1.625%2011.0312%201.38542%2011.0312%201.15625%2010.8438C0.96875%2010.6146%200.96875%2010.3854%201.15625%2010.1562L5.28125%206L1.15625%201.875C0.96875%201.625%200.96875%201.38542%201.15625%201.15625C1.38542%200.96875%201.625%200.96875%201.875%201.15625L6%205.28125L10.1562%201.15625C10.3854%200.96875%2010.6146%200.96875%2010.8438%201.15625C11.0312%201.38542%2011.0312%201.625%2010.8438%201.875L6.71875%206L10.8438%2010.1562C11.0312%2010.3854%2011.0312%2010.6146%2010.8438%2010.8438C10.6146%2011.0312%2010.3854%2011.0312%2010.1562%2010.8438Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block tag="div">{textSelected}</_Builtin.Block>
        {isSelectAllVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "text-blue-500", "text-underline")}
            tag="div"
            {...onclickSelectAll}
          >
            {selectAllText}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block tag="div">
        {slotDropdown ?? <SelectActionsDropdown />}
      </_Builtin.Block>
      {isSendScreeningVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "send-screening-btn", "clickable")}
          tag="div"
          {...onclickSendScreening}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "icon-block", "_20x20")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "svg-icon")}
              value="%3Csvg%20width%3D%2218%22%20height%3D%2215%22%20viewBox%3D%220%200%2018%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M14.875%201.625H2.625C2.36979%201.625%202.16016%201.70703%201.99609%201.87109C1.83203%202.03516%201.75%202.24479%201.75%202.5V7.03906C1.42188%207.14844%201.13021%207.32161%200.875%207.55859V2.5C0.893229%202.00781%201.06641%201.59766%201.39453%201.26953C1.72266%200.941406%202.13281%200.768229%202.625%200.75H14.875C15.3672%200.768229%2015.7773%200.941406%2016.1055%201.26953C16.4336%201.59766%2016.6068%202.00781%2016.625%202.5V7.53125C16.3698%207.3125%2016.0781%207.13932%2015.75%207.01172V2.5C15.75%202.24479%2015.668%202.03516%2015.5039%201.87109C15.3398%201.70703%2015.1302%201.625%2014.875%201.625ZM2.625%2010.375C2.88021%2010.375%203.08984%2010.293%203.25391%2010.1289C3.41797%209.96484%203.5%209.75521%203.5%209.5C3.5%209.24479%203.41797%209.03516%203.25391%208.87109C3.08984%208.70703%202.88021%208.625%202.625%208.625C2.36979%208.625%202.16016%208.70703%201.99609%208.87109C1.83203%209.03516%201.75%209.24479%201.75%209.5C1.75%209.75521%201.83203%209.96484%201.99609%2010.1289C2.16016%2010.293%202.36979%2010.375%202.625%2010.375ZM2.625%207.75C3.28125%207.76823%203.78255%208.0599%204.12891%208.625C4.45703%209.20833%204.45703%209.79167%204.12891%2010.375C3.78255%2010.9401%203.28125%2011.2318%202.625%2011.25C1.96875%2011.2318%201.46745%2010.9401%201.12109%2010.375C0.792969%209.79167%200.792969%209.20833%201.12109%208.625C1.46745%208.0599%201.96875%207.76823%202.625%207.75ZM8.75%2010.375C9.00521%2010.375%209.21484%2010.293%209.37891%2010.1289C9.54297%209.96484%209.625%209.75521%209.625%209.5C9.625%209.24479%209.54297%209.03516%209.37891%208.87109C9.21484%208.70703%209.00521%208.625%208.75%208.625C8.49479%208.625%208.28516%208.70703%208.12109%208.87109C7.95703%209.03516%207.875%209.24479%207.875%209.5C7.875%209.75521%207.95703%209.96484%208.12109%2010.1289C8.28516%2010.293%208.49479%2010.375%208.75%2010.375ZM8.75%207.75C9.40625%207.76823%209.90755%208.0599%2010.2539%208.625C10.582%209.20833%2010.582%209.79167%2010.2539%2010.375C9.90755%2010.9401%209.40625%2011.2318%208.75%2011.25C8.09375%2011.2318%207.59245%2010.9401%207.24609%2010.375C6.91797%209.79167%206.91797%209.20833%207.24609%208.625C7.59245%208.0599%208.09375%207.76823%208.75%207.75ZM15.75%209.5C15.75%209.24479%2015.668%209.03516%2015.5039%208.87109C15.3398%208.70703%2015.1302%208.625%2014.875%208.625C14.6198%208.625%2014.4102%208.70703%2014.2461%208.87109C14.082%209.03516%2014%209.24479%2014%209.5C14%209.75521%2014.082%209.96484%2014.2461%2010.1289C14.4102%2010.293%2014.6198%2010.375%2014.875%2010.375C15.1302%2010.375%2015.3398%2010.293%2015.5039%2010.1289C15.668%209.96484%2015.75%209.75521%2015.75%209.5ZM13.125%209.5C13.1432%208.84375%2013.4349%208.34245%2014%207.99609C14.5833%207.66797%2015.1667%207.66797%2015.75%207.99609C16.3151%208.34245%2016.6068%208.84375%2016.625%209.5C16.6068%2010.1562%2016.3151%2010.6576%2015.75%2011.0039C15.1667%2011.332%2014.5833%2011.332%2014%2011.0039C13.4349%2010.6576%2013.1432%2010.1562%2013.125%209.5ZM0.875%2013.875V14.3125C0.856771%2014.5859%200.710938%2014.7318%200.4375%2014.75C0.164062%2014.7318%200.0182292%2014.5859%200%2014.3125V13.875C0.0182292%2013.3828%200.191406%2012.9727%200.519531%2012.6445C0.847656%2012.3164%201.25781%2012.1432%201.75%2012.125H3.5C3.99219%2012.1432%204.40234%2012.3164%204.73047%2012.6445C5.05859%2012.9727%205.23177%2013.3828%205.25%2013.875V14.3125C5.23177%2014.5859%205.08594%2014.7318%204.8125%2014.75C4.53906%2014.7318%204.39323%2014.5859%204.375%2014.3125V13.875C4.375%2013.6198%204.29297%2013.4102%204.12891%2013.2461C3.96484%2013.082%203.75521%2013%203.5%2013H1.75C1.49479%2013%201.28516%2013.082%201.12109%2013.2461C0.957031%2013.4102%200.875%2013.6198%200.875%2013.875ZM7.875%2013C7.61979%2013%207.41016%2013.082%207.24609%2013.2461C7.08203%2013.4102%207%2013.6198%207%2013.875V14.3125C6.98177%2014.5859%206.83594%2014.7318%206.5625%2014.75C6.28906%2014.7318%206.14323%2014.5859%206.125%2014.3125V13.875C6.14323%2013.3828%206.31641%2012.9727%206.64453%2012.6445C6.97266%2012.3164%207.38281%2012.1432%207.875%2012.125H9.625C10.1172%2012.1432%2010.5273%2012.3164%2010.8555%2012.6445C11.1836%2012.9727%2011.3568%2013.3828%2011.375%2013.875V14.3125C11.3568%2014.5859%2011.2109%2014.7318%2010.9375%2014.75C10.6641%2014.7318%2010.5182%2014.5859%2010.5%2014.3125V13.875C10.5%2013.6198%2010.418%2013.4102%2010.2539%2013.2461C10.0898%2013.082%209.88021%2013%209.625%2013H7.875ZM13.125%2013.875V14.3125C13.1068%2014.5859%2012.9609%2014.7318%2012.6875%2014.75C12.4141%2014.7318%2012.2682%2014.5859%2012.25%2014.3125V13.875C12.2682%2013.3828%2012.4414%2012.9727%2012.7695%2012.6445C13.0977%2012.3164%2013.5078%2012.1432%2014%2012.125H15.75C16.2422%2012.1432%2016.6523%2012.3164%2016.9805%2012.6445C17.3086%2012.9727%2017.4818%2013.3828%2017.5%2013.875V14.3125C17.4818%2014.5859%2017.3359%2014.7318%2017.0625%2014.75C16.7891%2014.7318%2016.6432%2014.5859%2016.625%2014.3125V13.875C16.625%2013.6198%2016.543%2013.4102%2016.3789%2013.2461C16.2148%2013.082%2016.0052%2013%2015.75%2013H14C13.7448%2013%2013.5352%2013.082%2013.3711%2013.2461C13.207%2013.4102%2013.125%2013.6198%2013.125%2013.875Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-sm", "text-blue-600")}
            tag="div"
          >
            {"Send screening invite"}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isAssessmentVisible ? (
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "send-screening-btn",
            "clickable",
            "text-blue-500"
          )}
          tag="div"
          {...onclickAssessment}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "icon-block", "_20x20")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "svg-icon")}
              value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7%206C6.70833%206%206.46875%206.09375%206.28125%206.28125C6.09375%206.46875%206%206.70833%206%207V17C6%2017.2917%206.09375%2017.5312%206.28125%2017.7188C6.46875%2017.9062%206.70833%2018%207%2018H17C17.2917%2018%2017.5312%2017.9062%2017.7188%2017.7188C17.9062%2017.5312%2018%2017.2917%2018%2017V7C18%206.70833%2017.9062%206.46875%2017.7188%206.28125C17.5312%206.09375%2017.2917%206%2017%206H7ZM5%207C5.02083%206.4375%205.21875%205.96875%205.59375%205.59375C5.96875%205.21875%206.4375%205.02083%207%205H17C17.5625%205.02083%2018.0312%205.21875%2018.4062%205.59375C18.7812%205.96875%2018.9792%206.4375%2019%207V17C18.9792%2017.5625%2018.7812%2018.0312%2018.4062%2018.4062C18.0312%2018.7812%2017.5625%2018.9792%2017%2019H7C6.4375%2018.9792%205.96875%2018.7812%205.59375%2018.4062C5.21875%2018.0312%205.02083%2017.5625%205%2017V7ZM10%2012.25H11.5C11.6875%2012.25%2011.8333%2012.3229%2011.9375%2012.4688C12.0208%2012.6354%2012.0312%2012.8021%2011.9688%2012.9688L11.3438%2014.2812L14%2011.75H12.5C12.3125%2011.75%2012.1771%2011.6771%2012.0938%2011.5312C11.9896%2011.3646%2011.9792%2011.1979%2012.0625%2011.0312L12.6562%209.71875L10%2012.25ZM13.8125%207.5C14.0417%207.52083%2014.2188%207.61458%2014.3438%207.78125C14.4479%207.96875%2014.4583%208.17708%2014.375%208.40625L13.2812%2010.75H14.8125C15.2292%2010.7917%2015.4583%2011.0208%2015.5%2011.4375C15.5%2011.625%2015.4271%2011.7812%2015.2812%2011.9062L10.625%2016.3438C10.5%2016.4479%2010.3542%2016.5%2010.1875%2016.5C9.95833%2016.4792%209.78125%2016.3854%209.65625%2016.2188C9.55208%2016.0312%209.54167%2015.8333%209.625%2015.625L10.7188%2013.25H9.1875C8.77083%2013.2083%208.54167%2012.9792%208.5%2012.5625C8.5%2012.375%208.57292%2012.2188%208.71875%2012.0938L13.375%207.6875C13.5%207.5625%2013.6458%207.5%2013.8125%207.5Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
          <_Builtin.Block className={_utils.cx(_styles, "text-sm")} tag="div">
            {"Send assessment invite"}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isDisqualifyVisible ? (
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "send-screening-btn",
            "clickable",
            "text-blue-500"
          )}
          tag="div"
          {...onclickDisqualify}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "icon-block", "_20x20")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "svg-icon")}
              value="%3Csvg%20width%3D%2218%22%20height%3D%2215%22%20viewBox%3D%220%200%2018%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3.5%203.75C3.5%204.22396%203.61849%204.66146%203.85547%205.0625C4.09245%205.46354%204.41146%205.78255%204.8125%206.01953C5.23177%206.25651%205.66927%206.375%206.125%206.375C6.58073%206.375%207.01823%206.25651%207.4375%206.01953C7.83854%205.78255%208.15755%205.46354%208.39453%205.0625C8.63151%204.66146%208.75%204.22396%208.75%203.75C8.75%203.27604%208.63151%202.83854%208.39453%202.4375C8.15755%202.03646%207.83854%201.71745%207.4375%201.48047C7.01823%201.24349%206.58073%201.125%206.125%201.125C5.66927%201.125%205.23177%201.24349%204.8125%201.48047C4.41146%201.71745%204.09245%202.03646%203.85547%202.4375C3.61849%202.83854%203.5%203.27604%203.5%203.75ZM7.38281%209.4375H4.86719C3.75521%209.47396%202.82552%209.85677%202.07812%2010.5859C1.3125%2011.3333%200.911458%2012.263%200.875%2013.375H11.375C11.3385%2012.263%2010.9375%2011.3333%2010.1719%2010.5859C9.42448%209.85677%208.49479%209.47396%207.38281%209.4375ZM6.125%207.25C5.48698%207.25%204.90365%207.09505%204.375%206.78516C3.84635%206.47526%203.41797%206.04688%203.08984%205.5C2.77995%204.95312%202.625%204.36979%202.625%203.75C2.625%203.13021%202.77995%202.54688%203.08984%202C3.41797%201.45312%203.84635%201.02474%204.375%200.714844C4.90365%200.404948%205.48698%200.25%206.125%200.25C6.76302%200.25%207.34635%200.404948%207.875%200.714844C8.40365%201.02474%208.83203%201.45312%209.16016%202C9.47005%202.54688%209.625%203.13021%209.625%203.75C9.625%204.36979%209.47005%204.95312%209.16016%205.5C8.83203%206.04688%208.40365%206.47526%207.875%206.78516C7.34635%207.09505%206.76302%207.25%206.125%207.25ZM4.86719%208.5625H7.38281C8.75%208.59896%209.89844%209.07292%2010.8281%209.98438C11.7396%2010.9141%2012.2135%2012.0625%2012.25%2013.4297C12.25%2013.6667%2012.168%2013.8581%2012.0039%2014.0039C11.8581%2014.168%2011.6667%2014.25%2011.4297%2014.25H0.820312C0.583333%2014.25%200.391927%2014.168%200.246094%2014.0039C0.0820312%2013.8581%200%2013.6667%200%2013.4297C0.0364583%2012.0625%200.510417%2010.9141%201.42188%209.98438C2.35156%209.07292%203.5%208.59896%204.86719%208.5625ZM12.8242%204.32422C13.0247%204.14193%2013.2253%204.14193%2013.4258%204.32422L14.875%205.74609L16.3242%204.32422C16.5247%204.14193%2016.7253%204.14193%2016.9258%204.32422C17.1081%204.52474%2017.1081%204.72526%2016.9258%204.92578L15.5039%206.375L16.9258%207.82422C17.1081%208.02474%2017.1081%208.22526%2016.9258%208.42578C16.7253%208.60807%2016.5247%208.60807%2016.3242%208.42578L14.875%207.00391L13.4258%208.42578C13.2253%208.60807%2013.0247%208.60807%2012.8242%208.42578C12.6419%208.22526%2012.6419%208.02474%2012.8242%207.82422L14.2461%206.375L12.8242%204.92578C12.6419%204.72526%2012.6419%204.52474%2012.8242%204.32422Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
          <_Builtin.Block className={_utils.cx(_styles, "text-sm")} tag="div">
            {"Send disqualification email"}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "delet_candidate", "clickable")}
        tag="div"
        {...onClickDelete}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "icon-block", "_20x20")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "svg-icon")}
            value="%3Csvg%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.89844%204.125C7.83594%204.125%207.78906%204.15625%207.75781%204.21875L7.3125%204.875H10.7109L10.2656%204.21875C10.2188%204.15625%2010.1641%204.125%2010.1016%204.125H7.89844ZM12.0469%204.875H12.375H13.5H13.6875C14.0312%204.90625%2014.2188%205.09375%2014.25%205.4375C14.2188%205.78125%2014.0312%205.96875%2013.6875%206H13.4062L12.8438%2013.6172C12.8125%2014.0078%2012.6562%2014.3359%2012.375%2014.6016C12.0938%2014.8516%2011.7578%2014.9844%2011.3672%2015H6.63281C6.24219%2014.9844%205.90625%2014.8516%205.625%2014.6016C5.34375%2014.3359%205.1875%2014.0078%205.15625%2013.6172L4.59375%206H4.3125C3.96875%205.96875%203.78125%205.78125%203.75%205.4375C3.78125%205.09375%203.96875%204.90625%204.3125%204.875H4.5H5.625H5.95312L6.82031%203.58594C7.08594%203.21094%207.44531%203.01563%207.89844%203H10.1016C10.5547%203.01563%2010.9219%203.21094%2011.2031%203.58594L12.0469%204.875ZM12.2812%206H5.71875L6.25781%2013.5234C6.30469%2013.7422%206.42969%2013.8594%206.63281%2013.875H11.3672C11.5703%2013.8594%2011.6953%2013.7422%2011.7422%2013.5234L12.2812%206Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-sm", "text-red-500")}
          tag="div"
        >
          {"Delete Application"}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
