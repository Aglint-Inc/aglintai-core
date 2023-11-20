import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { ButtonPrimarySmall } from "./ButtonPrimarySmall";
import * as _utils from "./utils";
import _styles from "./UploadVideo.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1474":{"id":"e-1474","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-538","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1475"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"4160f0cc-545d-c5e3-e01d-484c7a8ac9e8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"4160f0cc-545d-c5e3-e01d-484c7a8ac9e8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1700206216610},"e-1476":{"id":"e-1476","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-539","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1477"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"a3c2938d-2bbd-9096-5e92-472a3d1e2ce5","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"a3c2938d-2bbd-9096-5e92-472a3d1e2ce5","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1700206230806}},"actionLists":{"a-538":{"id":"a-538","title":"Chat Bubble Open","actionItemGroups":[{"actionItems":[{"id":"a-538-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":"flex"}},{"id":"a-538-n-11","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"yValue":30,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-538-n-10","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":0,"unit":""}},{"id":"a-538-n-9","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":"none"}},{"id":"a-538-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":"none"}},{"id":"a-538-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":0,"unit":""}},{"id":"a-538-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":1,"unit":""}}]},{"actionItems":[{"id":"a-538-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":0,"unit":""}},{"id":"a-538-n-15","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".div-block-588","selectorGuids":["a61e8d58-3cd9-bc7c-d748-888ff47ed4db"]},"xValue":0.9,"yValue":0.9,"locked":true}},{"id":"a-538-n-14","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":"block"}},{"id":"a-538-n-13","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":1,"unit":""}},{"id":"a-538-n-12","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-538-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":"none"}},{"id":"a-538-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":100,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":1,"unit":""}},{"id":"a-538-n-8","actionTypeId":"GENERAL_DISPLAY","config":{"delay":100,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1700132612161},"a-539":{"id":"a-539","title":"Chat Bubble Close","actionItemGroups":[{"actionItems":[{"id":"a-539-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":1,"unit":""}},{"id":"a-539-n-15","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".div-block-588","selectorGuids":["a61e8d58-3cd9-bc7c-d748-888ff47ed4db"]},"xValue":1,"yValue":1,"locked":true}},{"id":"a-539-n-10","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":0,"unit":""}},{"id":"a-539-n-11","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"yValue":30,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-539-n-14","actionTypeId":"GENERAL_DISPLAY","config":{"delay":100,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":"none"}},{"id":"a-539-n-13","actionTypeId":"STYLE_OPACITY","config":{"delay":100,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":0,"unit":""}},{"id":"a-539-n-9","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":"none"}},{"id":"a-539-n-12","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1700132612161}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function UploadVideo({
  as: _Component = _Builtin.Block,
  onClickBrowse = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "ic-import-body-wrapper", "ptb-35")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "ic-import-body-block")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "ic-text-content")}
          tag="div"
        >
          <_Builtin.Block tag="div">
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2230%22%20height%3D%2240%22%20viewBox%3D%220%200%2030%2040%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M4.95868%2038.719H24.7934C25.8264%2038.6674%2026.7045%2038.3058%2027.4277%2037.6343C28.0992%2036.9112%2028.4607%2036.0331%2028.5124%2035V14.2355C28.5124%2014.1322%2028.5124%2014.0289%2028.5124%2013.9256H19.2149C18.3368%2013.9256%2017.6136%2013.6157%2017.0455%2012.9959C16.4256%2012.4277%2016.1157%2011.7045%2016.1157%2010.8264V1.52893C16.0124%201.52893%2015.9091%201.52893%2015.8058%201.52893H4.95868C3.92562%201.58058%203.04752%201.94215%202.32438%202.61364C1.65289%203.33678%201.29132%204.21488%201.23967%205.24793V35C1.29132%2036.0331%201.65289%2036.9112%202.32438%2037.6343C3.04752%2038.3058%203.92562%2038.6674%204.95868%2038.719ZM27.8151%2012.4535L17.5878%202.22624C17.4845%202.17459%2017.407%202.12293%2017.3554%202.07128V10.8264C17.4587%2011.9628%2018.0785%2012.5826%2019.2149%2012.686H27.97C27.9184%2012.6343%2027.8667%2012.5568%2027.8151%2012.4535ZM4.95868%200.289256H15.8058C16.8388%200.289256%2017.7169%200.650826%2018.4401%201.37397L28.6674%2011.6012C29.3905%2012.3244%2029.7521%2013.2025%2029.7521%2014.2355V35C29.7004%2036.3946%2029.2097%2037.5568%2028.28%2038.4866C27.3502%2039.4163%2026.188%2039.907%2024.7934%2039.9587H4.95868C3.56405%2039.907%202.40186%2039.4163%201.47211%2038.4866C0.542355%2037.5568%200.0516529%2036.3946%200%2035V5.24793C0.0516529%203.85331%200.542355%202.69112%201.47211%201.76136C2.40186%200.831611%203.56405%200.340909%204.95868%200.289256ZM17.3554%2021.3636H8.67769C7.90289%2021.4153%207.48967%2021.8285%207.43802%2022.6033V30.0413C7.48967%2030.8161%207.90289%2031.2293%208.67769%2031.281H17.3554C18.1302%2031.2293%2018.5434%2030.8161%2018.595%2030.0413V28.1818V24.4628V22.6033C18.5434%2021.8285%2018.1302%2021.4153%2017.3554%2021.3636ZM19.8347%2030.0413C19.8347%2030.7645%2019.6023%2031.3585%2019.1374%2031.8233C18.6725%2032.2882%2018.0785%2032.5207%2017.3554%2032.5207H8.67769C7.95455%2032.5207%207.36054%2032.2882%206.89566%2031.8233C6.43079%2031.3585%206.19835%2030.7645%206.19835%2030.0413V22.6033C6.19835%2021.8802%206.43079%2021.2862%206.89566%2020.8213C7.36054%2020.3564%207.95455%2020.124%208.67769%2020.124H17.3554C18.0785%2020.124%2018.6725%2020.3564%2019.1374%2020.8213C19.6023%2021.2862%2019.8347%2021.8802%2019.8347%2022.6033V23.3781L23.1663%2021.5186C23.3213%2021.4153%2023.5021%2021.3636%2023.7087%2021.3636C24.3802%2021.4153%2024.7417%2021.7769%2024.7934%2022.4483V30.1963C24.7417%2030.8678%2024.3802%2031.2293%2023.7087%2031.281C23.5021%2031.281%2023.3213%2031.2293%2023.1663%2031.126L19.8347%2029.2665V30.0413ZM23.5537%2029.9638V22.6808L19.8347%2024.8502V27.7944L23.5537%2029.9638Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            {"Drag and drop your video file"}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "ic-divider-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "ic-hr-line")}
            tag="div"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "text-blue-700-2")}
            tag="div"
          >
            {"OR"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "ic-hr-line")}
            tag="div"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "ic-import-button-wrapper")}
          tag="div"
          {...onClickBrowse}
        >
          <ButtonPrimarySmall textLabel="Browse " />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
