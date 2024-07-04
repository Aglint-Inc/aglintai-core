"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { GlobalIcon } from "./GlobalIcon";
import * as _utils from "./utils";
import _styles from "./WelcomeSlider1.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-818":{"id":"e-818","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-342","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-819"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"f8188b07-34af-73cb-6ca4-13782c20dc06","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"f8188b07-34af-73cb-6ca4-13782c20dc06","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":0,"direction":null,"effectIn":true},"createdOn":1694670592510},"e-819":{"id":"e-819","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-343","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-818"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"f8188b07-34af-73cb-6ca4-13782c20dc06","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"f8188b07-34af-73cb-6ca4-13782c20dc06","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694670592510},"e-820":{"id":"e-820","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-342","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-821"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"f8188b07-34af-73cb-6ca4-13782c20dc10","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"f8188b07-34af-73cb-6ca4-13782c20dc10","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":0,"direction":null,"effectIn":true},"createdOn":1694670592510},"e-821":{"id":"e-821","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-343","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-820"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"f8188b07-34af-73cb-6ca4-13782c20dc10","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"f8188b07-34af-73cb-6ca4-13782c20dc10","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694670592510},"e-822":{"id":"e-822","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-342","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-823"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"f8188b07-34af-73cb-6ca4-13782c20dc1a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"f8188b07-34af-73cb-6ca4-13782c20dc1a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":0,"direction":null,"effectIn":true},"createdOn":1694670592510},"e-823":{"id":"e-823","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-343","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-822"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"f8188b07-34af-73cb-6ca4-13782c20dc1a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"f8188b07-34af-73cb-6ca4-13782c20dc1a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694670592510},"e-824":{"id":"e-824","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-344","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-825"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".ju-cta-btn","originalId":"f8188b07-34af-73cb-6ca4-13782c20dc06","appliesTo":"CLASS"},"targets":[{"selector":".ju-cta-btn","originalId":"f8188b07-34af-73cb-6ca4-13782c20dc06","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694684198873},"e-826":{"id":"e-826","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-345","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-827"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".ju-redirect-link.sign-in","originalId":"650c129b14ba3ec43088ffe0|0eceb87e-fa39-97e0-b799-497146b03323","appliesTo":"CLASS"},"targets":[{"selector":".ju-redirect-link.sign-in","originalId":"650c129b14ba3ec43088ffe0|0eceb87e-fa39-97e0-b799-497146b03323","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694684648206}},"actionLists":{"a-342":{"id":"a-342","title":"animated-opacity-[in]","actionItemGroups":[{"actionItems":[{"id":"a-342-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-342-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1694591797471},"a-343":{"id":"a-343","title":"animated-opacity-[out]","actionItemGroups":[{"actionItems":[{"id":"a-343-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694591877080},"a-344":{"id":"a-344","title":"sign-up-[open]","actionItemGroups":[{"actionItems":[{"id":"a-344-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".auth-right-block","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-344-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".auth-right-block","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba"]},"value":"none"}},{"id":"a-344-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{},"value":"flex"}}]},{"actionItems":[{"id":"a-344-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694684223794},"a-345":{"id":"a-345","title":"login-[open]","actionItemGroups":[{"actionItems":[{"id":"a-345-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".auth-right-block","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-345-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".auth-right-block","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba"]},"value":"none"}},{"id":"a-345-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{},"value":"flex"}}]},{"actionItems":[{"id":"a-345-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694684755830}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
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
          <_Builtin.HtmlEmbed value="%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20viewBox%3D%220%200%2032%2032%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2232%22%20height%3D%2232%22%20rx%3D%224%22%20fill%3D%22%23FF9C00%22%20fill-opacity%3D%220.160784%22%3E%3C%2Frect%3E%0A%3Cpath%20d%3D%22M22.325%2015.6049C20.17%2015.0649%2019.09%2014.7999%2018.345%2014.0549C17.6%2013.3049%2017.335%2012.2299%2016.795%2010.0749L16%206.8999L15.205%2010.0749C14.665%2012.2299%2014.4%2013.3099%2013.655%2014.0549C12.905%2014.7999%2011.83%2015.0649%209.675%2015.6049L6.5%2016.3999L9.675%2017.1949C11.83%2017.7349%2012.91%2017.9999%2013.655%2018.7449C14.4%2019.4949%2014.665%2020.5699%2015.205%2022.7249L16%2025.8999L16.795%2022.7249C17.335%2020.5699%2017.6%2019.4899%2018.345%2018.7449C19.095%2017.9999%2020.17%2017.7349%2022.325%2017.1949L25.5%2016.3999L22.325%2015.6049Z%22%20fill%3D%22%23F76B15%22%3E%3C%2Fpath%3E%0A%3Cpath%20d%3D%22M23.7083%207.33527C22.9899%207.15527%2022.6299%207.06693%2022.3815%206.81859C22.1332%206.56859%2022.0449%206.21027%2021.8649%205.49193L21.5999%204.43359L21.3349%205.49193C21.1549%206.21027%2021.0666%206.57027%2020.8183%206.81859C20.5683%207.06693%2020.2099%207.15527%2019.4915%207.33527L18.4332%207.60027L19.4915%207.86527C20.2099%208.04527%2020.5699%208.13359%2020.8183%208.38193C21.0666%208.63193%2021.1549%208.99027%2021.3349%209.70859L21.5999%2010.7669L21.8649%209.70859C22.0449%208.99027%2022.1332%208.63027%2022.3815%208.38193C22.6315%208.13359%2022.9899%208.04527%2023.7083%207.86527L24.7666%207.60027L23.7083%207.33527Z%22%20fill%3D%22%23F76B15%22%3E%3C%2Fpath%3E%0A%3C%2Fsvg%3E" />
          <Text
            content="Streamline Recruitment with Aglint AI"
            size="4"
            weight="bold"
            align=""
            highContrast=""
          />
          <Text
            content="Transform how you find and connect with talent using our advanced AI for simplified and effective hiring."
            size="2"
            weight=""
            align=""
            highContrast=""
            color="neutral"
          />
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
                <GlobalIcon
                  size="9"
                  iconName="corporate_fare"
                  weight="thin"
                  color="neutral-11"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "ju-cta-content")}
                tag="div"
              >
                <Text
                  content="I'm a Company"
                  size="2"
                  weight="bold"
                  align=""
                  highContrast=""
                />
                <Text
                  content="I want to find the best talent for my in-house positions."
                  size="2"
                  weight=""
                  align=""
                  highContrast=""
                  color="neutral"
                />
              </_Builtin.Block>
            </_Builtin.Block>
            <GlobalIcon iconName="arrow_right_alt" size="6" />
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
                <GlobalIcon
                  size="9"
                  iconName="person_search"
                  weight="thin"
                  color="neutral-11"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "ju-cta-content")}
                tag="div"
              >
                <Text
                  content="I'm a Recruiting Agency"
                  size="2"
                  weight="bold"
                  align=""
                  highContrast=""
                />
                <Text
                  content="We specialize in sourcing candidates for various industries and roles"
                  size="2"
                  weight=""
                  align=""
                  highContrast=""
                  color="neutral"
                />
              </_Builtin.Block>
            </_Builtin.Block>
            <GlobalIcon iconName="arrow_right_alt" size="6" />
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
                <GlobalIcon
                  size="9"
                  iconName="person"
                  weight="thin"
                  color="neutral-11"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "ju-cta-content")}
                tag="div"
              >
                <Text
                  content="I'm a Recruiting Consultant"
                  size="2"
                  weight="bold"
                  align=""
                  highContrast=""
                />
                <Text
                  content="I offer expert HR advice and recruitment services on a contract basis."
                  size="2"
                  weight=""
                  align=""
                  highContrast=""
                  color="neutral"
                />
              </_Builtin.Block>
            </_Builtin.Block>
            <GlobalIcon iconName="arrow_right_alt" size="6" />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
