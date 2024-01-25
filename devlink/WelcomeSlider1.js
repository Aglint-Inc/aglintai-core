import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./WelcomeSlider1.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-818":{"id":"e-818","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-342","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-819"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"f8188b07-34af-73cb-6ca4-13782c20dc06","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"f8188b07-34af-73cb-6ca4-13782c20dc06","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":0,"direction":null,"effectIn":true},"createdOn":1694670592510},"e-819":{"id":"e-819","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-343","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-818"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"f8188b07-34af-73cb-6ca4-13782c20dc06","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"f8188b07-34af-73cb-6ca4-13782c20dc06","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694670592510},"e-820":{"id":"e-820","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-342","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-821"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"f8188b07-34af-73cb-6ca4-13782c20dc10","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"f8188b07-34af-73cb-6ca4-13782c20dc10","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":0,"direction":null,"effectIn":true},"createdOn":1694670592510},"e-821":{"id":"e-821","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-343","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-820"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"f8188b07-34af-73cb-6ca4-13782c20dc10","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"f8188b07-34af-73cb-6ca4-13782c20dc10","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694670592510},"e-822":{"id":"e-822","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-342","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-823"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"f8188b07-34af-73cb-6ca4-13782c20dc1a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"f8188b07-34af-73cb-6ca4-13782c20dc1a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":0,"direction":null,"effectIn":true},"createdOn":1694670592510},"e-823":{"id":"e-823","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-343","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-822"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"f8188b07-34af-73cb-6ca4-13782c20dc1a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"f8188b07-34af-73cb-6ca4-13782c20dc1a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694670592510},"e-824":{"id":"e-824","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-344","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-825"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".ju-cta-btn","originalId":"f8188b07-34af-73cb-6ca4-13782c20dc06","appliesTo":"CLASS"},"targets":[{"selector":".ju-cta-btn","originalId":"f8188b07-34af-73cb-6ca4-13782c20dc06","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694684198873},"e-826":{"id":"e-826","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-345","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-827"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".ju-redirect-link.sign-in","originalId":"650c129b14ba3ec43088ffe0|0eceb87e-fa39-97e0-b799-497146b03323","appliesTo":"CLASS"},"targets":[{"selector":".ju-redirect-link.sign-in","originalId":"650c129b14ba3ec43088ffe0|0eceb87e-fa39-97e0-b799-497146b03323","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694684648206}},"actionLists":{"a-342":{"id":"a-342","title":"animated-opacity-[in]","actionItemGroups":[{"actionItems":[{"id":"a-342-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".animated-opacity","selectorGuids":["2293934d-0f96-7a01-ab1c-f1b7b36b6240"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-342-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".animated-opacity","selectorGuids":["2293934d-0f96-7a01-ab1c-f1b7b36b6240"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1694591797471},"a-343":{"id":"a-343","title":"animated-opacity-[out]","actionItemGroups":[{"actionItems":[{"id":"a-343-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".animated-opacity","selectorGuids":["2293934d-0f96-7a01-ab1c-f1b7b36b6240"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694591877080},"a-344":{"id":"a-344","title":"sign-up-[open]","actionItemGroups":[{"actionItems":[{"id":"a-344-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".auth-right-block","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-344-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".auth-right-block","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba"]},"value":"none"}},{"id":"a-344-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".auth-right-block.sign-up","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba","178d5435-5b0e-e3a4-d9f8-9d8275b14d31"]},"value":"flex"}}]},{"actionItems":[{"id":"a-344-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".auth-right-block.sign-up","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba","178d5435-5b0e-e3a4-d9f8-9d8275b14d31"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694684223794},"a-345":{"id":"a-345","title":"login-[open]","actionItemGroups":[{"actionItems":[{"id":"a-345-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".auth-right-block","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-345-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".auth-right-block","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba"]},"value":"none"}},{"id":"a-345-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".auth-right-block.login","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba","9b76f671-e79b-6a67-4574-de8fce2fd55a"]},"value":"flex"}}]},{"actionItems":[{"id":"a-345-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".auth-right-block.login","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba","9b76f671-e79b-6a67-4574-de8fce2fd55a"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694684755830}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function WelcomeSlider1({
  as: _Component = _Builtin.Block,
  onClickCompany = {},
  onClickAgency = {},
  onClickConsultant = {},
  onClickSignIn = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "auth-right-block", "join-us")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "auth-cta-block", "tab-edit")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "auth-header-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-xl", "fw-semibold")}
            tag="div"
          >
            {"Streamline Recruitment with Aglint AI"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "ju-header-description")}
            tag="div"
          >
            {
              "Transform how you find and connect with talent using our advanced AI for simplified and effective hiring."
            }
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "auth-form-block-recruiters")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "ju-cta-btn")}
            data-w-id="f8188b07-34af-73cb-6ca4-13782c20dc06"
            tag="div"
            {...onClickCompany}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "ju-cta-btn-block")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "ju-cta-image")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "embed-icon")}
                  value="%3Csvg%20width%3D%2238%22%20height%3D%2238%22%20viewBox%3D%220%200%2038%2038%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M18.667%201.16211C17.6948%201.21072%2016.8684%201.551%2016.1878%202.18294C15.5559%202.8635%2015.2156%203.68989%2015.167%204.66211V32.6621C15.2156%2033.6343%2015.5559%2034.4607%2016.1878%2035.1413C16.8684%2035.7732%2017.6948%2036.1135%2018.667%2036.1621H32.667C33.6392%2036.1135%2034.4656%2035.7732%2035.1462%2035.1413C35.7781%2034.4607%2036.1184%2033.6343%2036.167%2032.6621V4.66211C36.1184%203.68989%2035.7781%202.8635%2035.1462%202.18294C34.4656%201.551%2033.6392%201.21072%2032.667%201.16211H18.667ZM14.0003%204.66211C14.0489%203.34961%2014.5107%202.25586%2015.3857%201.38086C16.2607%200.505857%2017.3545%200.0440516%2018.667%20-0.00455952H32.667C33.9795%200.0440516%2035.0732%200.505857%2035.9482%201.38086C36.8232%202.25586%2037.285%203.34961%2037.3337%204.66211V32.6621C37.285%2033.9746%2036.8232%2035.0684%2035.9482%2035.9434C35.0732%2036.8184%2033.9795%2037.2802%2032.667%2037.3288H18.667C17.3545%2037.2802%2016.2607%2036.8184%2015.3857%2035.9434C14.5107%2035.0684%2014.0489%2033.9746%2014.0003%2032.6621V4.66211ZM4.08366%209.32877H11.667V10.4954H4.08366C3.25727%2010.4954%202.57671%2010.7871%202.04199%2011.3704C1.45866%2011.9052%201.16699%2012.5857%201.16699%2013.4121V33.2454C1.16699%2034.0718%201.45866%2034.7524%202.04199%2035.2871C2.57671%2035.8704%203.25727%2036.1621%204.08366%2036.1621H12.6149C12.858%2036.5996%2013.1253%2036.9885%2013.417%2037.3288H4.08366C2.91699%2037.2802%201.94477%2036.8913%201.16699%2036.1621C0.437824%2035.3843%200.0489354%2034.4121%200.000324249%2033.2454V13.4121C0.0489354%2012.2454%200.437824%2011.2732%201.16699%2010.4954C1.94477%209.76627%202.91699%209.37739%204.08366%209.32877ZM4.66699%2025.0788C4.76421%2024.0093%205.34755%2023.426%206.41699%2023.3288H8.75032C9.81977%2023.426%2010.4031%2024.0093%2010.5003%2025.0788V27.4121C10.4031%2028.4816%209.81977%2029.0649%208.75032%2029.1621H6.41699C5.34755%2029.0649%204.76421%2028.4816%204.66699%2027.4121V25.0788ZM6.41699%2024.4954C6.07671%2024.5441%205.88227%2024.7385%205.83366%2025.0788V27.4121C5.88227%2027.7524%206.07671%2027.9468%206.41699%2027.9954H8.75032C9.0906%2027.9468%209.28505%2027.7524%209.33366%2027.4121V25.0788C9.28505%2024.7385%209.0906%2024.5441%208.75032%2024.4954H6.41699ZM6.41699%2013.9954H8.75032C9.81977%2014.0927%2010.4031%2014.676%2010.5003%2015.7454V18.0788C10.4031%2019.1482%209.81977%2019.7316%208.75032%2019.8288H6.41699C5.34755%2019.7316%204.76421%2019.1482%204.66699%2018.0788V15.7454C4.76421%2014.676%205.34755%2014.0927%206.41699%2013.9954ZM5.83366%2015.7454V18.0788C5.88227%2018.4191%206.07671%2018.6135%206.41699%2018.6621H8.75032C9.0906%2018.6135%209.28505%2018.4191%209.33366%2018.0788V15.7454C9.28505%2015.4052%209.0906%2015.2107%208.75032%2015.1621H6.41699C6.07671%2015.2107%205.88227%2015.4052%205.83366%2015.7454ZM26.8337%2027.4121V25.0788C26.9309%2024.0093%2027.5142%2023.426%2028.5837%2023.3288H30.917C31.9864%2023.426%2032.5698%2024.0093%2032.667%2025.0788V27.4121C32.5698%2028.4816%2031.9864%2029.0649%2030.917%2029.1621H28.5837C27.5142%2029.0649%2026.9309%2028.4816%2026.8337%2027.4121ZM28.5837%2027.9954H30.917C31.2573%2027.9468%2031.4517%2027.7524%2031.5003%2027.4121V25.0788C31.4517%2024.7385%2031.2573%2024.5441%2030.917%2024.4954H28.5837C28.2434%2024.5441%2028.0489%2024.7385%2028.0003%2025.0788V27.4121C28.0489%2027.7524%2028.2434%2027.9468%2028.5837%2027.9954ZM28.5837%2019.8288C27.5142%2019.7316%2026.9309%2019.1482%2026.8337%2018.0788V15.7454C26.9309%2014.676%2027.5142%2014.0927%2028.5837%2013.9954H30.917C31.9864%2014.0927%2032.5698%2014.676%2032.667%2015.7454V18.0788C32.5698%2019.1482%2031.9864%2019.7316%2030.917%2019.8288H28.5837ZM28.0003%2018.0788C28.0489%2018.4191%2028.2434%2018.6135%2028.5837%2018.6621H30.917C31.2573%2018.6135%2031.4517%2018.4191%2031.5003%2018.0788V15.7454C31.4517%2015.4052%2031.2573%2015.2107%2030.917%2015.1621H28.5837C28.2434%2015.2107%2028.0489%2015.4052%2028.0003%2015.7454V18.0788ZM18.667%2027.4121V25.0788C18.7642%2024.0093%2019.3475%2023.426%2020.417%2023.3288H22.7503C23.8198%2023.426%2024.4031%2024.0093%2024.5003%2025.0788V27.4121C24.4031%2028.4816%2023.8198%2029.0649%2022.7503%2029.1621H20.417C19.3475%2029.0649%2018.7642%2028.4816%2018.667%2027.4121ZM20.417%2027.9954H22.7503C23.0906%2027.9468%2023.285%2027.7524%2023.3337%2027.4121V25.0788C23.285%2024.7385%2023.0906%2024.5441%2022.7503%2024.4954H20.417C20.0767%2024.5441%2019.8823%2024.7385%2019.8337%2025.0788V27.4121C19.8823%2027.7524%2020.0767%2027.9468%2020.417%2027.9954ZM20.417%205.24544H22.7503C23.8198%205.34266%2024.4031%205.926%2024.5003%206.99544V9.32877C24.4031%2010.3982%2023.8198%2010.9816%2022.7503%2011.0788H20.417C19.3475%2010.9816%2018.7642%2010.3982%2018.667%209.32877V6.99544C18.7642%205.926%2019.3475%205.34266%2020.417%205.24544ZM19.8337%206.99544V9.32877C19.8823%209.66905%2020.0767%209.8635%2020.417%209.91211H22.7503C23.0906%209.8635%2023.285%209.66905%2023.3337%209.32877V6.99544C23.285%206.65516%2023.0906%206.46072%2022.7503%206.41211H20.417C20.0767%206.46072%2019.8823%206.65516%2019.8337%206.99544ZM18.667%2018.0788V15.7454C18.7642%2014.676%2019.3475%2014.0927%2020.417%2013.9954H22.7503C23.8198%2014.0927%2024.4031%2014.676%2024.5003%2015.7454V18.0788C24.4031%2019.1482%2023.8198%2019.7316%2022.7503%2019.8288H20.417C19.3475%2019.7316%2018.7642%2019.1482%2018.667%2018.0788ZM20.417%2018.6621H22.7503C23.0906%2018.6135%2023.285%2018.4191%2023.3337%2018.0788V15.7454C23.285%2015.4052%2023.0906%2015.2107%2022.7503%2015.1621H20.417C20.0767%2015.2107%2019.8823%2015.4052%2019.8337%2015.7454V18.0788C19.8823%2018.4191%2020.0767%2018.6135%2020.417%2018.6621ZM28.5837%205.24544H30.917C31.9864%205.34266%2032.5698%205.926%2032.667%206.99544V9.32877C32.5698%2010.3982%2031.9864%2010.9816%2030.917%2011.0788H28.5837C27.5142%2010.9816%2026.9309%2010.3982%2026.8337%209.32877V6.99544C26.9309%205.926%2027.5142%205.34266%2028.5837%205.24544ZM28.0003%206.99544V9.32877C28.0489%209.66905%2028.2434%209.8635%2028.5837%209.91211H30.917C31.2573%209.8635%2031.4517%209.66905%2031.5003%209.32877V6.99544C31.4517%206.65516%2031.2573%206.46072%2030.917%206.41211H28.5837C28.2434%206.46072%2028.0489%206.65516%2028.0003%206.99544Z%22%20fill%3D%22%230F3554%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "ju-cta-content")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "ju-cta-company-name")}
                  tag="div"
                >
                  {"I'm a Company"}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "ju-cta-company-desc")}
                  tag="div"
                >
                  {"I want to find the best talent for my in-house positions."}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Image
              className={_utils.cx(_styles, "ju-cta-arrow", "animated-opacity")}
              loading="lazy"
              width="20"
              height="20"
              src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/6500758f12a101e249463e97_Vectors-Wrapper.svg"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "ju-cta-btn")}
            data-w-id="f8188b07-34af-73cb-6ca4-13782c20dc10"
            tag="div"
            {...onClickAgency}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "ju-cta-btn-block")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "ju-cta-image")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "embed-icon")}
                  value="%3Csvg%20width%3D%2247%22%20height%3D%2238%22%20viewBox%3D%220%200%2047%2038%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M16.5%201.16211C15.0417%201.16211%2013.6806%201.52669%2012.4167%202.25586C11.1528%202.98502%2010.1562%203.98155%209.42708%205.24544C8.69791%206.50933%208.33333%207.87044%208.33333%209.32877C8.33333%2010.7871%208.69791%2012.1482%209.42708%2013.4121C10.1562%2014.676%2011.1528%2015.6725%2012.4167%2016.4017C13.6806%2017.1309%2015.0417%2017.4954%2016.5%2017.4954C17.9583%2017.4954%2019.3194%2017.1309%2020.5833%2016.4017C21.8472%2015.6725%2022.8437%2014.676%2023.5729%2013.4121C24.3021%2012.1482%2024.6667%2010.7871%2024.6667%209.32877C24.6667%207.87044%2024.3021%206.50933%2023.5729%205.24544C22.8437%203.98155%2021.8472%202.98502%2020.5833%202.25586C19.3194%201.52669%2017.9583%201.16211%2016.5%201.16211ZM13.1458%2023.3288C9.79166%2023.426%207.02083%2024.5927%204.83333%2026.8288C2.59722%2029.0163%201.43055%2031.7871%201.33333%2035.1413C1.38194%2035.7732%201.72222%2036.1135%202.35416%2036.1621H30.6458C31.2778%2036.1135%2031.6181%2035.7732%2031.6667%2035.1413C31.6667%2035.1413%2031.6667%2035.117%2031.6667%2035.0684C31.6667%2035.0197%2031.6667%2034.9711%2031.6667%2034.9225C32.0556%2034.9711%2032.4444%2034.9954%2032.8333%2034.9954C32.8333%2035.0441%2032.8333%2035.0684%2032.8333%2035.0684C32.8333%2035.117%2032.8333%2035.1413%2032.8333%2035.1413C32.8333%2035.7732%2032.6146%2036.2836%2032.1771%2036.6725C31.7882%2037.11%2031.2778%2037.3288%2030.6458%2037.3288H2.35416C1.72222%2037.3288%201.2118%2037.11%200.822914%2036.6725C0.385414%2036.2836%200.166664%2035.7732%200.166664%2035.1413C0.263886%2031.4954%201.52778%2028.4329%203.95833%2025.9538C6.4375%2023.5232%209.5%2022.2593%2013.1458%2022.1621H19.8542C20.2917%2022.1621%2020.7535%2022.1864%2021.2396%2022.235C21.191%2022.5753%2021.1667%2022.9399%2021.1667%2023.3288V23.4017C20.7292%2023.3531%2020.2917%2023.3288%2019.8542%2023.3288H13.1458ZM25.8333%209.32877C25.8333%2011.0302%2025.4201%2012.5857%2024.5937%2013.9954C23.7674%2015.4052%2022.625%2016.5475%2021.1667%2017.4225C19.7083%2018.2489%2018.1528%2018.6621%2016.5%2018.6621C14.8472%2018.6621%2013.2917%2018.2489%2011.8333%2017.4225C10.375%2016.5475%209.23264%2015.4052%208.40625%2013.9954C7.57986%2012.5857%207.16666%2011.0302%207.16666%209.32877C7.16666%207.62739%207.57986%206.07183%208.40625%204.66211C9.23264%203.25239%2010.375%202.11002%2011.8333%201.23502C13.2917%200.408635%2014.8472%20-0.00455952%2016.5%20-0.00455952C18.1528%20-0.00455952%2019.7083%200.408635%2021.1667%201.23502C22.625%202.11002%2023.7674%203.25239%2024.5937%204.66211C25.4201%206.07183%2025.8333%207.62739%2025.8333%209.32877ZM32.8333%2015.1621C31.375%2015.1621%2030.0139%2015.5267%2028.75%2016.2559C27.4861%2016.985%2026.4896%2017.9816%2025.7604%2019.2454C25.0312%2020.5579%2024.6667%2021.9191%2024.6667%2023.3288C24.6667%2024.7871%2025.0312%2026.1482%2025.7604%2027.4121C26.4896%2028.676%2027.4861%2029.6725%2028.75%2030.4017C30.0139%2031.1309%2031.375%2031.4954%2032.8333%2031.4954C34.2917%2031.4954%2035.6528%2031.1309%2036.9167%2030.4017C38.1806%2029.6725%2039.1771%2028.676%2039.9063%2027.4121C40.6354%2026.1482%2041%2024.7871%2041%2023.3288C41%2021.9191%2040.6354%2020.5579%2039.9063%2019.2454C39.1771%2017.9816%2038.1806%2016.985%2036.9167%2016.2559C35.6528%2015.5267%2034.2917%2015.1621%2032.8333%2015.1621ZM32.8333%2032.6621C30.2083%2032.6135%2027.9965%2031.7142%2026.1979%2029.9642C24.4479%2028.1656%2023.5486%2025.9538%2023.5%2023.3288C23.5486%2020.7038%2024.4479%2018.5163%2026.1979%2016.7663C27.9965%2014.9677%2030.2083%2014.0441%2032.8333%2013.9954C35.4583%2014.0441%2037.6701%2014.9677%2039.4688%2016.7663C41.2188%2018.5163%2042.1181%2020.7038%2042.1667%2023.3288C42.1181%2025.7593%2041.3403%2027.8253%2039.8333%2029.5267L46.6875%2036.3809C46.8819%2036.6239%2046.8819%2036.8913%2046.6875%2037.1829C46.3958%2037.3774%2046.1042%2037.3774%2045.8125%2037.1829L39.0313%2030.3288C37.3299%2031.8357%2035.2639%2032.6135%2032.8333%2032.6621Z%22%20fill%3D%22%230F3554%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "ju-cta-content")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "ju-cta-company-name")}
                  tag="div"
                >
                  {"I'm a Recruiting Agency"}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "ju-cta-company-desc")}
                  tag="div"
                >
                  {
                    "We specialize in sourcing candidates for various industries and roles."
                  }
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Image
              className={_utils.cx(_styles, "ju-cta-arrow", "animated-opacity")}
              loading="lazy"
              width="20"
              height="20"
              src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/6500758f12a101e249463e97_Vectors-Wrapper.svg"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "ju-cta-btn")}
            data-w-id="f8188b07-34af-73cb-6ca4-13782c20dc1a"
            tag="div"
            {...onClickConsultant}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "ju-cta-btn-block")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "ju-cta-image")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "embed-icon")}
                  value="%3Csvg%20width%3D%2233%22%20height%3D%2238%22%20viewBox%3D%220%200%2033%2038%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M16.5%2017.4954C17.9583%2017.4954%2019.3194%2017.1309%2020.5833%2016.4017C21.8472%2015.6725%2022.8438%2014.676%2023.5729%2013.4121C24.3021%2012.1482%2024.6667%2010.7871%2024.6667%209.32877C24.6667%207.87044%2024.3021%206.50933%2023.5729%205.24544C22.8438%203.98155%2021.8472%202.98502%2020.5833%202.25586C19.3194%201.52669%2017.9583%201.16211%2016.5%201.16211C15.0417%201.16211%2013.6806%201.52669%2012.4167%202.25586C11.1528%202.98502%2010.1563%203.98155%209.42708%205.24544C8.69792%206.50933%208.33333%207.87044%208.33333%209.32877C8.33333%2010.7871%208.69792%2012.1482%209.42708%2013.4121C10.1563%2014.676%2011.1528%2015.6725%2012.4167%2016.4017C13.6806%2017.1309%2015.0417%2017.4954%2016.5%2017.4954ZM25.8333%209.32877C25.8333%2011.0302%2025.4201%2012.5857%2024.5938%2013.9954C23.7674%2015.4052%2022.625%2016.5475%2021.1667%2017.4225C19.7083%2018.2489%2018.1528%2018.6621%2016.5%2018.6621C14.8472%2018.6621%2013.2917%2018.2489%2011.8333%2017.4225C10.375%2016.5475%209.23264%2015.4052%208.40625%2013.9954C7.57986%2012.5857%207.16667%2011.0302%207.16667%209.32877C7.16667%207.62739%207.57986%206.07183%208.40625%204.66211C9.23264%203.25239%2010.375%202.11002%2011.8333%201.23502C13.2917%200.408635%2014.8472%20-0.00455952%2016.5%20-0.00455952C18.1528%20-0.00455952%2019.7083%200.408635%2021.1667%201.23502C22.625%202.11002%2023.7674%203.25239%2024.5938%204.66211C25.4201%206.07183%2025.8333%207.62739%2025.8333%209.32877ZM13.0729%2022.4538C13.1701%2022.2593%2013.3403%2022.1621%2013.5833%2022.1621H19.4167C19.6597%2022.1621%2019.8299%2022.2593%2019.9271%2022.4538C20.0243%2022.6968%2020.0243%2022.9156%2019.9271%2023.11L17.1563%2026.9017L18.9063%2030.2559L22.3333%2023.4017C25.3472%2023.7906%2027.8264%2025.0545%2029.7708%2027.1934C31.7639%2029.3322%2032.7847%2031.9572%2032.8333%2035.0684C32.8333%2035.7003%2032.6146%2036.235%2032.1771%2036.6725C31.7396%2037.11%2031.2049%2037.3288%2030.5729%2037.3288H16.6458H16.3542H2.42708C1.79514%2037.3288%201.26042%2037.11%200.822916%2036.6725C0.385416%2036.235%200.166666%2035.7003%200.166666%2035.0684C0.215277%2031.9572%201.23611%2029.3322%203.22917%2027.1934C5.17361%2025.0545%207.65278%2023.7906%2010.6667%2023.4017L14.1667%2030.2559L15.8438%2026.9017L13.1458%2023.11C13%2022.9156%2012.9757%2022.6968%2013.0729%2022.4538ZM14.75%2023.3288L16.5%2025.8079L18.3229%2023.3288H14.75ZM15.4792%2035.5059L10.0104%2024.6413C7.48264%2025.176%205.41667%2026.3913%203.8125%2028.2871C2.20833%2030.1829%201.38194%2032.4434%201.33333%2035.0684C1.38194%2035.7489%201.74653%2036.1135%202.42708%2036.1621H15.7708L15.4792%2035.5059ZM14.75%2031.5684L15.8438%2033.6829L16.5%2034.9954L17.1563%2033.6829L18.25%2031.5684L16.5%2028.1413L14.8229%2031.5684H14.75ZM31.6667%2035.0684C31.6181%2032.4434%2030.7917%2030.1829%2029.1875%2028.2871C27.5833%2026.3913%2025.5174%2025.176%2022.9896%2024.6413L17.5208%2035.5059L17.2292%2036.1621H30.5729C31.2535%2036.1135%2031.6181%2035.7489%2031.6667%2035.0684Z%22%20fill%3D%22%230F3554%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "ju-cta-content")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "ju-cta-company-name")}
                  tag="div"
                >
                  {"I'm a Recruiting Consultant"}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "ju-cta-company-desc")}
                  tag="div"
                >
                  {
                    "I offer expert HR advice and recruitment services on a contract basis."
                  }
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Image
              className={_utils.cx(_styles, "ju-cta-arrow", "animated-opacity")}
              loading="lazy"
              width="20"
              height="20"
              src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/6500758f12a101e249463e97_Vectors-Wrapper.svg"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
