import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { ApplyFormQuestion } from "./ApplyFormQuestion";
import { AddSocialLink } from "./AddSocialLink";
import * as _utils from "./utils";
import _styles from "./ApplyForm.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1310":{"id":"e-1310","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-445","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1311"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c7|8a739c8f-3b04-d3fa-1677-41e585ec020a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c7|8a739c8f-3b04-d3fa-1677-41e585ec020a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1696218546622},"e-1311":{"id":"e-1311","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-446","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1310"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c7|8a739c8f-3b04-d3fa-1677-41e585ec020a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c7|8a739c8f-3b04-d3fa-1677-41e585ec020a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1696218546625},"e-1312":{"id":"e-1312","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-445","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1313"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ee42bd02-8e07-5bbb-d27d-013d11de547a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1696242553159},"e-1313":{"id":"e-1313","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-446","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1312"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"ee42bd02-8e07-5bbb-d27d-013d11de547a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1696242553159}},"actionLists":{"a-445":{"id":"a-445","title":"Add Questions","actionItemGroups":[{"actionItems":[{"id":"a-445-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".choose-question-wrappers","selectorGuids":["3e6cd6c5-015e-0730-31cb-b619dcbc517d"]},"value":0,"unit":""}},{"id":"a-445-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".choose-question-wrappers","selectorGuids":["3e6cd6c5-015e-0730-31cb-b619dcbc517d"]},"value":"none"}}]},{"actionItems":[{"id":"a-445-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".choose-question-wrappers","selectorGuids":["3e6cd6c5-015e-0730-31cb-b619dcbc517d"]},"value":1,"unit":""}},{"id":"a-445-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".choose-question-wrappers","selectorGuids":["3e6cd6c5-015e-0730-31cb-b619dcbc517d"]},"value":"block"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1696218455814},"a-446":{"id":"a-446","title":"Add Questions hover out","actionItemGroups":[{"actionItems":[{"id":"a-446-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".choose-question-wrappers","selectorGuids":["3e6cd6c5-015e-0730-31cb-b619dcbc517d"]},"value":0,"unit":""}},{"id":"a-446-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".choose-question-wrappers","selectorGuids":["3e6cd6c5-015e-0730-31cb-b619dcbc517d"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1696218455814}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function ApplyForm({
  as: _Component = _Builtin.Block,
  onClickEditUserInfo = {},
  onClickEditUserExperience = {},
  slotQuestions,
  onClickText = {},
  onClickYesNo = {},
  onClickMultipleChoice = {},
  onClickFileUpload = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "apply-form-wrappers", "personal")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "text-lg", "fw-semibold")}
          tag="div"
        >
          {"Personal Info"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "info-wrappers")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-398")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-399")}
              tag="div"
            >
              <_Builtin.Block tag="div">
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M7.99993%209C10.2091%209%2011.9999%207.20914%2011.9999%205C11.9999%202.79086%2010.2091%201%207.99993%201C5.79079%201%203.99993%202.79086%203.99993%205C3.99993%207.20914%205.79079%209%207.99993%209ZM1.99993%2015.47C2.27592%2012.3649%204.88941%209.98786%208.01406%2010C11.1272%2010.0034%2013.7231%2012.3764%2013.9981%2015.47C14.0064%2015.6078%2013.9573%2015.7428%2013.8624%2015.8432C13.7675%2015.9435%2013.6352%2016.0003%2013.4969%2016H2.50111C2.36281%2016.0003%202.23055%2015.9435%202.13565%2015.8432C2.04075%2015.7428%201.99163%2015.6078%201.99993%2015.47Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
              <_Builtin.Block tag="div">
                {"Name*,Email*,LinkedIn"}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "edit-icons-inbox")}
              tag="div"
              {...onClickEditUserInfo}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10.1711%202.57586L0.141837%2012.606C0.0501124%2012.7011%20-0.000784821%2012.8284%209.15144e-06%2012.9606V15.4934C9.15144e-06%2015.7771%200.222882%2016%200.506538%2016H3.03918C3.17088%2016%203.30258%2015.9493%203.39375%2015.848L13.423%205.81792L10.1711%202.57586ZM15.7024%202.10981L13.889%200.296288C13.6997%200.106599%2013.4428%200%2013.1748%200C12.9069%200%2012.6499%200.106599%2012.4606%200.296288L10.9005%201.85653L14.1524%205.10872L15.7125%203.54848C16.0975%203.15335%2016.0975%202.50494%2015.7024%202.10981Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-398")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-399")}
              tag="div"
            >
              <_Builtin.Block tag="div">
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5.85998%2012.12C6.29998%2014.44%207.08998%2016%207.99998%2016C8.90998%2016%209.69998%2014.44%2010.14%2012.12H5.85998ZM10.14%203.88C9.69998%201.56%208.90998%200%207.99998%200C7.08998%200%206.29998%201.56%205.85998%203.88H10.14ZM15.46%2010.88C16.1752%209.0266%2016.1752%206.9734%2015.46%205.12H11.58C11.6912%206.076%2011.748%207.03755%2011.75%208C11.748%208.96245%2011.6912%209.924%2011.58%2010.88H15.46ZM10.33%205.12H5.66998C5.44331%207.03331%205.44331%208.96669%205.66998%2010.88H10.33C10.4447%209.92431%2010.5015%208.96255%2010.5%208C10.5015%207.03745%2010.4447%206.07569%2010.33%205.12ZM4.24998%208C4.25198%207.03755%204.30873%206.076%204.41998%205.12H0.539983C-0.175193%206.9734%20-0.175193%209.0266%200.539983%2010.88H4.41998C4.30873%209.924%204.25198%208.96245%204.24998%208ZM11.4%2012.12C11.2173%2013.3592%2010.8286%2014.5591%2010.25%2015.67C12.1741%2015.105%2013.8158%2013.838%2014.85%2012.12H11.4ZM11.4%203.88H14.85C13.8158%202.16196%2012.1741%200.894986%2010.25%200.33C10.8286%201.44092%2011.2173%202.64081%2011.4%203.88ZM4.59998%2012.12H1.14998C2.1842%2013.838%203.82591%2015.105%205.74998%2015.67C5.17135%2014.5591%204.78265%2013.3592%204.59998%2012.12ZM4.59998%203.88C4.78265%202.64081%205.17135%201.44092%205.74998%200.33C3.82591%200.894986%202.1842%202.16196%201.14998%203.88H4.59998Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
              <_Builtin.Block tag="div">
                {"Education,Work experience"}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "edit-icons-inbox")}
              tag="div"
              {...onClickEditUserExperience}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10.1711%202.57586L0.141837%2012.606C0.0501124%2012.7011%20-0.000784821%2012.8284%209.15144e-06%2012.9606V15.4934C9.15144e-06%2015.7771%200.222882%2016%200.506538%2016H3.03918C3.17088%2016%203.30258%2015.9493%203.39375%2015.848L13.423%205.81792L10.1711%202.57586ZM15.7024%202.10981L13.889%200.296288C13.6997%200.106599%2013.4428%200%2013.1748%200C12.9069%200%2012.6499%200.106599%2012.4606%200.296288L10.9005%201.85653L14.1524%205.10872L15.7125%203.54848C16.0975%203.15335%2016.0975%202.50494%2015.7024%202.10981Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "apply-form-wrappers")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-416")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-lg", "fw-semibold")}
            tag="div"
          >
            {"Questions"}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "all-form-questions-wrappers")}
          tag="div"
        >
          {slotQuestions ?? <ApplyFormQuestion />}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-420")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "add-question-wrappers")}
            data-w-id="ee42bd02-8e07-5bbb-d27d-013d11de547a"
            tag="div"
          >
            <AddSocialLink textLabel="Add Question" />
            <_Builtin.Block
              className={_utils.cx(_styles, "choose-question-wrappers")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {"Choose Question Type"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-400")}
                tag="div"
                {...onClickText}
              >
                <_Builtin.Block tag="div">
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons")}
                    value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M1.5%202C1.22386%202%201%201.77614%201%201.5C1%201.22386%201.22386%201%201.5%201H10.5C10.7761%201%2011%201.22386%2011%201.5C11%201.77614%2010.7761%202%2010.5%202H1.5ZM1.5%205C1.22386%205%201%204.77614%201%204.5C1%204.22386%201.22386%204%201.5%204H7.5C7.77614%204%208%204.22386%208%204.5C8%204.77614%207.77614%205%207.5%205H1.5ZM1.5%208C1.22386%208%201%207.77614%201%207.5C1%207.22386%201.22386%207%201.5%207H10.5C10.7761%207%2011%207.22386%2011%207.5C11%207.77614%2010.7761%208%2010.5%208H1.5ZM1.5%2011C1.22386%2011%201%2010.7761%201%2010.5C1%2010.2239%201.22386%2010%201.5%2010H7.5C7.77614%2010%208%2010.2239%208%2010.5C8%2010.7761%207.77614%2011%207.5%2011H1.5Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
                <_Builtin.Block tag="div">{"Text"}</_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-400")}
                tag="div"
                {...onClickYesNo}
              >
                <_Builtin.Block tag="div">
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons")}
                    value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6.00004%2011C3.5815%2011%201.56403%209.28284%201.1003%207.00119H10.8998C10.4361%209.28284%208.41858%2011%206.00004%2011ZM6.00004%201C8.41893%201%2010.4366%202.71767%2010.9%204.99981H1.1001C1.56344%202.71767%203.58115%201%206.00004%201Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
                <_Builtin.Block tag="div">{"Yes/No"}</_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-400")}
                tag="div"
                {...onClickMultipleChoice}
              >
                <_Builtin.Block tag="div">
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons")}
                    value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5%207.11612L8.55806%203.55806C8.80214%203.31398%209.19786%203.31398%209.44194%203.55806C9.68602%203.80214%209.68602%204.19786%209.44194%204.44194L5.44194%208.44194C5.19786%208.68602%204.80214%208.68602%204.55806%208.44194L2.55806%206.44194C2.31398%206.19786%202.31398%205.80214%202.55806%205.55806C2.80214%205.31398%203.19786%205.31398%203.44194%205.55806L5%207.11612Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
                <_Builtin.Block tag="div">{"Multiple Choice"}</_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-400")}
                tag="div"
                {...onClickFileUpload}
              >
                <_Builtin.Block tag="div">
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons")}
                    value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M11%205C10.91%205%2010.83%205%2010.74%205.01C10.1108%203.20692%208.40971%201.9993%206.5%202C4.02%202%202%204.02%202%206.5C2%206.82%202.04%207.14%202.12%207.48C0.82%208.17%200%209.5%200%2011C0%2013.21%201.79%2015%204%2015H8V9.88L6.44%2011.44C6.2%2011.68%205.8%2011.68%205.56%2011.44C5.32%2011.2%205.32%2010.8%205.56%2010.56L7.7%208.41C8.14%207.97%208.85%207.97%209.29%208.41L11.44%2010.56C11.68%2010.8%2011.68%2011.2%2011.44%2011.44C11.32%2011.56%2011.16%2011.62%2011%2011.62C10.84%2011.62%2010.68%2011.56%2010.56%2011.44L9%209.88V15H11C13.76%2015%2016%2012.76%2016%2010C16%207.24%2013.76%205%2011%205Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
                <_Builtin.Block tag="div">{"File Upload"}</_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
