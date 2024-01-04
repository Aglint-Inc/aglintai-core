import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./SidemenuLeft.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-684":{"id":"e-684","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-300","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-685"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".navmenu_link","originalId":"64c7628d257634068611bc88|fcf6e88a-1c6b-2fdb-a2ec-f46513aa3a67","appliesTo":"CLASS"},"targets":[{"selector":".navmenu_link","originalId":"64c7628d257634068611bc88|fcf6e88a-1c6b-2fdb-a2ec-f46513aa3a67","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1691400998963},"e-685":{"id":"e-685","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-301","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-684"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".navmenu_link","originalId":"64c7628d257634068611bc88|fcf6e88a-1c6b-2fdb-a2ec-f46513aa3a67","appliesTo":"CLASS"},"targets":[{"selector":".navmenu_link","originalId":"64c7628d257634068611bc88|fcf6e88a-1c6b-2fdb-a2ec-f46513aa3a67","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1691400998964},"e-704":{"id":"e-704","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-300","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-705"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".nav_mainlink","originalId":"64c7628d257634068611bc88|fcf6e88a-1c6b-2fdb-a2ec-f46513aa3a67","appliesTo":"CLASS"},"targets":[{"selector":".nav_mainlink","originalId":"64c7628d257634068611bc88|fcf6e88a-1c6b-2fdb-a2ec-f46513aa3a67","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1691400998963},"e-705":{"id":"e-705","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-301","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-704"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".nav_mainlink","originalId":"64c7628d257634068611bc88|fcf6e88a-1c6b-2fdb-a2ec-f46513aa3a67","appliesTo":"CLASS"},"targets":[{"selector":".nav_mainlink","originalId":"64c7628d257634068611bc88|fcf6e88a-1c6b-2fdb-a2ec-f46513aa3a67","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1691400998964}},"actionLists":{"a-300":{"id":"a-300","title":"Nav Menu Tooltip [show] 4","actionItemGroups":[{"actionItems":[{"id":"a-300-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".aui_navmenu_tooltip","selectorGuids":["53b8a4f4-0499-18f6-dae1-365c5ce1895d"]},"value":0,"unit":""}},{"id":"a-300-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".aui_navmenu_tooltip","selectorGuids":["53b8a4f4-0499-18f6-dae1-365c5ce1895d"]},"value":"none"}},{"id":"a-300-n-3","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".aui_navmenu_tooltip","selectorGuids":["53b8a4f4-0499-18f6-dae1-365c5ce1895d"]},"xValue":0.8,"yValue":0.8,"locked":true}}]},{"actionItems":[{"id":"a-300-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".aui_navmenu_tooltip","selectorGuids":["53b8a4f4-0499-18f6-dae1-365c5ce1895d"]},"value":"block"}}]},{"actionItems":[{"id":"a-300-n-5","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".aui_navmenu_tooltip","selectorGuids":["53b8a4f4-0499-18f6-dae1-365c5ce1895d"]},"xValue":1,"yValue":1,"locked":true}},{"id":"a-300-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".aui_navmenu_tooltip","selectorGuids":["53b8a4f4-0499-18f6-dae1-365c5ce1895d"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1690795104465},"a-301":{"id":"a-301","title":"Nav Menu Tooltip [hide] 4","actionItemGroups":[{"actionItems":[{"id":"a-301-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".aui_navmenu_tooltip","selectorGuids":["53b8a4f4-0499-18f6-dae1-365c5ce1895d"]},"value":0,"unit":""}},{"id":"a-301-n-2","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".aui_navmenu_tooltip","selectorGuids":["53b8a4f4-0499-18f6-dae1-365c5ce1895d"]},"xValue":0.8,"yValue":0.8,"locked":true}}]},{"actionItems":[{"id":"a-301-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".aui_navmenu_tooltip","selectorGuids":["53b8a4f4-0499-18f6-dae1-365c5ce1895d"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1690795104465}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function SidemenuLeft({
  as: _Component = _Builtin.Block,
  isDashboard = true,
  isJobs = true,
  isResume = true,
  isInterview = true,
  isCoach = true,
  onClickLogout = {},
  textNotificationCount = "1",
  isNotificationCount = true,
  isPro = true,
  onClickDashboard = {},
  onClickJobs = {},
  onClickResume = {},
  onClickInterview = {},
  onClickCoach = {},
  slotProfileImage,
  isSettings = true,
  isNotification = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "sidemenu_left")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "sidemenu_left-contents")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "sidemenu_left_top")}
          tag="div"
        >
          <_Builtin.Link
            className={_utils.cx(_styles, "sidemenu_favicon")}
            button={false}
            block="inline"
            options={{
              href: "/dashboard",
            }}
            {...onClickDashboard}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex")}
              value="%3Csvg%20width%3D%2236%22%20height%3D%2236%22%20viewbox%3D%220%200%2036%2036%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M27.4875%2016.8075C24.255%2015.9975%2022.635%2015.6%2021.5175%2014.4825C20.4%2013.3575%2020.0025%2011.745%2019.1925%208.5125L18%203.75L16.8075%208.5125C15.9975%2011.745%2015.6%2013.365%2014.4825%2014.4825C13.3575%2015.6%2011.745%2015.9975%208.5125%2016.8075L3.75%2018L8.5125%2019.1925C11.745%2020.0025%2013.365%2020.4%2014.4825%2021.5175C15.6%2022.6425%2015.9975%2024.255%2016.8075%2027.4875L18%2032.25L19.1925%2027.4875C20.0025%2024.255%2020.4%2022.635%2021.5175%2021.5175C22.6425%2020.4%2024.255%2020.0025%2027.4875%2019.1925L32.25%2018L27.4875%2016.8075Z%22%20fill%3D%22%23FF6224%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Link>
          <_Builtin.Block
            className={_utils.cx(_styles, "sidemenu_main_links")}
            tag="div"
          >
            <_Builtin.Link
              className={_utils.cx(_styles, "nav_mainlink")}
              button={false}
              id="dashboard"
              block="inline"
              options={{
                href: "/dashboard",
              }}
              {...onClickDashboard}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "embed_flex")}
                value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewbox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M21%2019.9997C21%2020.552%2020.5523%2020.9997%2020%2020.9997H4C3.44772%2020.9997%203%2020.552%203%2019.9997V9.48882C3%209.18023%203.14247%208.88893%203.38606%208.69947L11.3861%202.47725C11.7472%202.19639%2012.2528%202.19639%2012.6139%202.47725L20.6139%208.69947C20.8575%208.88893%2021%209.18023%2021%209.48882V19.9997ZM19%2018.9997V9.97791L12%204.53346L5%209.97791V18.9997H19Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "aui_navmenu_tooltip")}
                tag="div"
              >
                <_Builtin.Block tag="div">{"Dashboard"}</_Builtin.Block>
              </_Builtin.Block>
              {isDashboard ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "navlink_active")}
                  tag="div"
                  id="dashboard"
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "embed_flex")}
                    value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewbox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M21%2019.9997C21%2020.552%2020.5523%2020.9997%2020%2020.9997H4C3.44772%2020.9997%203%2020.552%203%2019.9997V9.48882C3%209.18023%203.14247%208.88893%203.38606%208.69947L11.3861%202.47725C11.7472%202.19639%2012.2528%202.19639%2012.6139%202.47725L20.6139%208.69947C20.8575%208.88893%2021%209.18023%2021%209.48882V19.9997ZM19%2018.9997V9.97791L12%204.53346L5%209.97791V18.9997H19Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
              ) : null}
            </_Builtin.Link>
            <_Builtin.Link
              className={_utils.cx(_styles, "nav_mainlink")}
              button={false}
              id="job"
              block="inline"
              options={{
                href: "/jobs",
              }}
              {...onClickJobs}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "embed_flex")}
                value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewbox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7%205V2C7%201.44772%207.44772%201%208%201H16C16.5523%201%2017%201.44772%2017%202V5H21C21.5523%205%2022%205.44772%2022%206V20C22%2020.5523%2021.5523%2021%2021%2021H3C2.44772%2021%202%2020.5523%202%2020V6C2%205.44772%202.44772%205%203%205H7ZM4%2016V19H20V16H4ZM4%2014H20V7H4V14ZM9%203V5H15V3H9Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "aui_navmenu_tooltip")}
                tag="div"
              >
                <_Builtin.Block tag="div">{"Jobs"}</_Builtin.Block>
              </_Builtin.Block>
              {isJobs ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "navlink_active")}
                  tag="div"
                  id="job"
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "embed_flex")}
                    value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewbox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7%205V2C7%201.44772%207.44772%201%208%201H16C16.5523%201%2017%201.44772%2017%202V5H21C21.5523%205%2022%205.44772%2022%206V20C22%2020.5523%2021.5523%2021%2021%2021H3C2.44772%2021%202%2020.5523%202%2020V6C2%205.44772%202.44772%205%203%205H7ZM4%2016V19H20V16H4ZM4%2014H20V7H4V14ZM9%203V5H15V3H9Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
              ) : null}
            </_Builtin.Link>
            <_Builtin.Link
              className={_utils.cx(_styles, "nav_mainlink")}
              button={false}
              id="resume"
              block="inline"
              options={{
                href: "/resume",
              }}
              {...onClickResume}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "embed_flex")}
                value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewbox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M20%2022H4C3.44772%2022%203%2021.5523%203%2021V3C3%202.44772%203.44772%202%204%202H20C20.5523%202%2021%202.44772%2021%203V21C21%2021.5523%2020.5523%2022%2020%2022ZM19%2020V4H5V20H19ZM7%206H11V10H7V6ZM7%2012H17V14H7V12ZM7%2016H17V18H7V16ZM13%207H17V9H13V7Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "aui_navmenu_tooltip")}
                tag="div"
              >
                <_Builtin.Block tag="div">
                  {"Resume and Cover Letter"}
                </_Builtin.Block>
              </_Builtin.Block>
              {isResume ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "navlink_active")}
                  tag="div"
                  id="resume"
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "embed_flex")}
                    value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewbox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M20%2022H4C3.44772%2022%203%2021.5523%203%2021V3C3%202.44772%203.44772%202%204%202H20C20.5523%202%2021%202.44772%2021%203V21C21%2021.5523%2020.5523%2022%2020%2022ZM19%2020V4H5V20H19ZM7%206H11V10H7V6ZM7%2012H17V14H7V12ZM7%2016H17V18H7V16ZM13%207H17V9H13V7Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
              ) : null}
            </_Builtin.Link>
            <_Builtin.Link
              className={_utils.cx(_styles, "nav_mainlink")}
              button={false}
              id="interview"
              block="inline"
              options={{
                href: "/interview",
              }}
              {...onClickInterview}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "embed_flex")}
                value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewbox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10%209.75293C8.81742%209.75293%208.5%2010.5%208.5%2011.5804V15.8627C8.5%2016.5118%208.81742%2017.5%2010%2017.5C11.1826%2017.5%2011.5%2016.7113%2011.5%2015.8627V11.5C11.5%2010.5409%2011.1826%209.75293%2010%209.75293ZM10%208.01177C11.9709%208.01177%2013.5686%209.6095%2013.5686%2011.5804V15.8627C13.5686%2017.8336%2011.9709%2019.4314%2010%2019.4314C8.02909%2019.4314%206.43137%2017.8336%206.43137%2015.8627V11.5804C6.43137%209.6095%208.02909%208.01177%2010%208.01177ZM3%2017.2627L5%2016.5C5.52052%2019.1172%207.22989%2021%2010%2021C12.7701%2021%2014.7306%2019.2635%2015.2511%2016.6463L17%2017.2627C16.3494%2020.5342%2013.4626%2023%2010%2023C6.53736%2023%203.65065%2020.5342%203%2017.2627Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3Cpath%20d%3D%22M15.7116%208.91638C15.5737%209.27618%2015.0854%209.29844%2014.9153%208.95269L14.4727%208.05309C14.0788%207.25257%2013.4073%206.63162%2012.5904%206.31271L11.465%205.87338C11.1072%205.73371%2011.0839%205.22354%2011.4275%205.05188L12.4745%204.52882C13.2792%204.1268%2013.9019%203.42273%2014.2139%202.56207L14.5752%201.56541C14.7093%201.19556%2015.2108%201.17269%2015.378%201.52881L15.8286%202.48845C16.2176%203.31714%2016.9018%203.96162%2017.7397%204.28874L18.8299%204.71435C19.1877%204.85403%2019.211%205.36421%2018.8674%205.53585L17.7867%206.07577C17.0022%206.46771%2016.3899%207.14719%2016.0705%207.98023L15.7116%208.91638ZM12.7718%205.40219C13.8367%205.81791%2014.7201%206.54074%2015.2511%207.56653C15.6866%206.49667%2016.5005%205.69644%2017.5231%205.18555C16.4456%204.76487%2015.5578%204.00504%2015.041%202.95993C14.6216%204.04773%2013.8066%204.8852%2012.7718%205.40219ZM19.8258%2010.9682L19.9267%2010.7048C20.1066%2010.2351%2020.4517%209.85187%2020.8941%209.6307L21.2342%209.46058C21.4182%209.36859%2021.4058%209.09568%2021.2142%209.02082L20.8798%208.89011C20.4073%208.70548%2020.0216%208.34201%2019.8024%207.87481L19.674%207.60096C19.5844%207.41013%2019.3155%207.42239%2019.2437%207.62058L19.1407%207.90499C18.965%208.39019%2018.6139%208.78725%2018.1602%209.01411L17.839%209.17472C17.6551%209.2667%2017.6675%209.53962%2017.8591%209.61448L18.2133%209.75293C18.674%209.93293%2019.0525%2010.2831%2019.2745%2010.7345L19.399%2010.9877C19.4901%2011.173%2019.7519%2011.1611%2019.8258%2010.9682ZM19.281%209.32617L19.5262%209.0594L19.7894%209.30299L19.5492%209.56235L19.281%209.32617Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "aui_navmenu_tooltip")}
                tag="div"
              >
                <_Builtin.Block tag="div">{"Interview Prep"}</_Builtin.Block>
              </_Builtin.Block>
              {isInterview ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "navlink_active")}
                  tag="div"
                  id="interview"
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "embed_flex")}
                    value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewbox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10%209.75293C8.81742%209.75293%208.5%2010.5%208.5%2011.5804V15.8627C8.5%2016.5118%208.81742%2017.5%2010%2017.5C11.1826%2017.5%2011.5%2016.7113%2011.5%2015.8627V11.5C11.5%2010.5409%2011.1826%209.75293%2010%209.75293ZM10%208.01177C11.9709%208.01177%2013.5686%209.6095%2013.5686%2011.5804V15.8627C13.5686%2017.8336%2011.9709%2019.4314%2010%2019.4314C8.02909%2019.4314%206.43137%2017.8336%206.43137%2015.8627V11.5804C6.43137%209.6095%208.02909%208.01177%2010%208.01177ZM3%2017.2627L5%2016.5C5.52052%2019.1172%207.22989%2021%2010%2021C12.7701%2021%2014.7306%2019.2635%2015.2511%2016.6463L17%2017.2627C16.3494%2020.5342%2013.4626%2023%2010%2023C6.53736%2023%203.65065%2020.5342%203%2017.2627Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3Cpath%20d%3D%22M15.7116%208.91638C15.5737%209.27618%2015.0854%209.29844%2014.9153%208.95269L14.4727%208.05309C14.0788%207.25257%2013.4073%206.63162%2012.5904%206.31271L11.465%205.87338C11.1072%205.73371%2011.0839%205.22354%2011.4275%205.05188L12.4745%204.52882C13.2792%204.1268%2013.9019%203.42273%2014.2139%202.56207L14.5752%201.56541C14.7093%201.19556%2015.2108%201.17269%2015.378%201.52881L15.8286%202.48845C16.2176%203.31714%2016.9018%203.96162%2017.7397%204.28874L18.8299%204.71435C19.1877%204.85403%2019.211%205.36421%2018.8674%205.53585L17.7867%206.07577C17.0022%206.46771%2016.3899%207.14719%2016.0705%207.98023L15.7116%208.91638ZM12.7718%205.40219C13.8367%205.81791%2014.7201%206.54074%2015.2511%207.56653C15.6866%206.49667%2016.5005%205.69644%2017.5231%205.18555C16.4456%204.76487%2015.5578%204.00504%2015.041%202.95993C14.6216%204.04773%2013.8066%204.8852%2012.7718%205.40219ZM19.8258%2010.9682L19.9267%2010.7048C20.1066%2010.2351%2020.4517%209.85187%2020.8941%209.6307L21.2342%209.46058C21.4182%209.36859%2021.4058%209.09568%2021.2142%209.02082L20.8798%208.89011C20.4073%208.70548%2020.0216%208.34201%2019.8024%207.87481L19.674%207.60096C19.5844%207.41013%2019.3155%207.42239%2019.2437%207.62058L19.1407%207.90499C18.965%208.39019%2018.6139%208.78725%2018.1602%209.01411L17.839%209.17472C17.6551%209.2667%2017.6675%209.53962%2017.8591%209.61448L18.2133%209.75293C18.674%209.93293%2019.0525%2010.2831%2019.2745%2010.7345L19.399%2010.9877C19.4901%2011.173%2019.7519%2011.1611%2019.8258%2010.9682ZM19.281%209.32617L19.5262%209.0594L19.7894%209.30299L19.5492%209.56235L19.281%209.32617Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
              ) : null}
            </_Builtin.Link>
            <_Builtin.Link
              className={_utils.cx(_styles, "nav_mainlink")}
              button={false}
              id="coach"
              block="inline"
              options={{
                href: "/career-coach",
              }}
              {...onClickCoach}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "embed_flex")}
                value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewbox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.29117%2020.8242L2%2022L3.17581%2016.7088C2.42544%2015.3056%202%2013.7025%202%2012C2%206.47715%206.47715%202%2012%202C17.5228%202%2022%206.47715%2022%2012C22%2017.5228%2017.5228%2022%2012%2022C10.2975%2022%208.6944%2021.5746%207.29117%2020.8242ZM7.58075%2018.711L8.23428%2019.0605C9.38248%2019.6745%2010.6655%2020%2012%2020C16.4183%2020%2020%2016.4183%2020%2012C20%207.58172%2016.4183%204%2012%204C7.58172%204%204%207.58172%204%2012C4%2013.3345%204.32549%2014.6175%204.93949%2015.7657L5.28896%2016.4192L4.63416%2019.3658L7.58075%2018.711ZM7%2012H9C9%2013.6569%2010.3431%2015%2012%2015C13.6569%2015%2015%2013.6569%2015%2012H17C17%2014.7614%2014.7614%2017%2012%2017C9.23858%2017%207%2014.7614%207%2012Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "aui_navmenu_tooltip")}
                tag="div"
              >
                <_Builtin.Block tag="div">{"Career Coach"}</_Builtin.Block>
              </_Builtin.Block>
              {isCoach ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "navlink_active")}
                  tag="div"
                  id="coach"
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "embed_flex")}
                    value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewbox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.29117%2020.8242L2%2022L3.17581%2016.7088C2.42544%2015.3056%202%2013.7025%202%2012C2%206.47715%206.47715%202%2012%202C17.5228%202%2022%206.47715%2022%2012C22%2017.5228%2017.5228%2022%2012%2022C10.2975%2022%208.6944%2021.5746%207.29117%2020.8242ZM7.58075%2018.711L8.23428%2019.0605C9.38248%2019.6745%2010.6655%2020%2012%2020C16.4183%2020%2020%2016.4183%2020%2012C20%207.58172%2016.4183%204%2012%204C7.58172%204%204%207.58172%204%2012C4%2013.3345%204.32549%2014.6175%204.93949%2015.7657L5.28896%2016.4192L4.63416%2019.3658L7.58075%2018.711ZM7%2012H9C9%2013.6569%2010.3431%2015%2012%2015C13.6569%2015%2015%2013.6569%2015%2012H17C17%2014.7614%2014.7614%2017%2012%2017C9.23858%2017%207%2014.7614%207%2012Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
              ) : null}
              {isPro ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "pro_badge")}
                  tag="div"
                >
                  <_Builtin.Block tag="div">{"pro"}</_Builtin.Block>
                </_Builtin.Block>
              ) : null}
            </_Builtin.Link>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "sidemenu_left_bottom")}
          tag="div"
        >
          <_Builtin.Link
            className={_utils.cx(_styles, "nav_mainlink")}
            button={false}
            block="inline"
            options={{
              href: "/settings",
            }}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex")}
              value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewbox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2%2011.9998C2%2011.1353%202.1097%2010.2964%202.31595%209.49631C3.40622%209.55283%204.48848%209.01015%205.0718%207.99982C5.65467%206.99025%205.58406%205.78271%204.99121%204.86701C6.18354%203.69529%207.66832%202.82022%209.32603%202.36133C9.8222%203.33385%2010.8333%203.99982%2012%203.99982C13.1667%203.99982%2014.1778%203.33385%2014.674%202.36133C16.3317%202.82022%2017.8165%203.69529%2019.0088%204.86701C18.4159%205.78271%2018.3453%206.99025%2018.9282%207.99982C19.5115%209.01015%2020.5938%209.55283%2021.6841%209.49631C21.8903%2010.2964%2022%2011.1353%2022%2011.9998C22%2012.8643%2021.8903%2013.7032%2021.6841%2014.5033C20.5938%2014.4468%2019.5115%2014.9895%2018.9282%2015.9998C18.3453%2017.0094%2018.4159%2018.2169%2019.0088%2019.1326C17.8165%2020.3043%2016.3317%2021.1794%2014.674%2021.6383C14.1778%2020.6658%2013.1667%2019.9998%2012%2019.9998C10.8333%2019.9998%209.8222%2020.6658%209.32603%2021.6383C7.66832%2021.1794%206.18354%2020.3043%204.99121%2019.1326C5.58406%2018.2169%205.65467%2017.0094%205.0718%2015.9998C4.48848%2014.9895%203.40622%2014.4468%202.31595%2014.5033C2.1097%2013.7032%202%2012.8643%202%2011.9998ZM6.80385%2014.9998C7.43395%2016.0912%207.61458%2017.3459%207.36818%2018.5236C7.77597%2018.8138%208.21005%2019.0652%208.66489%2019.2741C9.56176%2018.4712%2010.7392%2017.9998%2012%2017.9998C13.2608%2017.9998%2014.4382%2018.4712%2015.3351%2019.2741C15.7899%2019.0652%2016.224%2018.8138%2016.6318%2018.5236C16.3854%2017.3459%2016.566%2016.0912%2017.1962%2014.9998C17.8262%2013.9085%2018.8225%2013.1248%2019.9655%2012.7493C19.9884%2012.5015%2020%2012.2516%2020%2011.9998C20%2011.7481%2019.9884%2011.4981%2019.9655%2011.2504C18.8225%2010.8749%2017.8262%2010.0912%2017.1962%208.99982C16.566%207.90845%2016.3854%206.65378%2016.6318%205.47605C16.224%205.18588%2015.7899%204.93447%2015.3351%204.72552C14.4382%205.52844%2013.2608%205.99982%2012%205.99982C10.7392%205.99982%209.56176%205.52844%208.66489%204.72552C8.21005%204.93447%207.77597%205.18588%207.36818%205.47605C7.61458%206.65378%207.43395%207.90845%206.80385%208.99982C6.17376%2010.0912%205.17754%2010.8749%204.03451%2011.2504C4.01157%2011.4981%204%2011.7481%204%2011.9998C4%2012.2516%204.01157%2012.5015%204.03451%2012.7493C5.17754%2013.1248%206.17376%2013.9085%206.80385%2014.9998ZM12%2014.9998C10.3431%2014.9998%209%2013.6567%209%2011.9998C9%2010.343%2010.3431%208.99982%2012%208.99982C13.6569%208.99982%2015%2010.343%2015%2011.9998C15%2013.6567%2013.6569%2014.9998%2012%2014.9998ZM12%2012.9998C12.5523%2012.9998%2013%2012.5521%2013%2011.9998C13%2011.4475%2012.5523%2010.9998%2012%2010.9998C11.4477%2010.9998%2011%2011.4475%2011%2011.9998C11%2012.5521%2011.4477%2012.9998%2012%2012.9998Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "aui_navmenu_tooltip")}
              tag="div"
            >
              <_Builtin.Block tag="div">{"Settings"}</_Builtin.Block>
            </_Builtin.Block>
            {isSettings ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "navlink_active", "without-bg")}
                tag="div"
                id="setting"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "embed_flex")}
                  value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewbox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2%2011.9998C2%2011.1353%202.1097%2010.2964%202.31595%209.49631C3.40622%209.55283%204.48848%209.01015%205.0718%207.99982C5.65467%206.99025%205.58406%205.78271%204.99121%204.86701C6.18354%203.69529%207.66832%202.82022%209.32603%202.36133C9.8222%203.33385%2010.8333%203.99982%2012%203.99982C13.1667%203.99982%2014.1778%203.33385%2014.674%202.36133C16.3317%202.82022%2017.8165%203.69529%2019.0088%204.86701C18.4159%205.78271%2018.3453%206.99025%2018.9282%207.99982C19.5115%209.01015%2020.5938%209.55283%2021.6841%209.49631C21.8903%2010.2964%2022%2011.1353%2022%2011.9998C22%2012.8643%2021.8903%2013.7032%2021.6841%2014.5033C20.5938%2014.4468%2019.5115%2014.9895%2018.9282%2015.9998C18.3453%2017.0094%2018.4159%2018.2169%2019.0088%2019.1326C17.8165%2020.3043%2016.3317%2021.1794%2014.674%2021.6383C14.1778%2020.6658%2013.1667%2019.9998%2012%2019.9998C10.8333%2019.9998%209.8222%2020.6658%209.32603%2021.6383C7.66832%2021.1794%206.18354%2020.3043%204.99121%2019.1326C5.58406%2018.2169%205.65467%2017.0094%205.0718%2015.9998C4.48848%2014.9895%203.40622%2014.4468%202.31595%2014.5033C2.1097%2013.7032%202%2012.8643%202%2011.9998ZM6.80385%2014.9998C7.43395%2016.0912%207.61458%2017.3459%207.36818%2018.5236C7.77597%2018.8138%208.21005%2019.0652%208.66489%2019.2741C9.56176%2018.4712%2010.7392%2017.9998%2012%2017.9998C13.2608%2017.9998%2014.4382%2018.4712%2015.3351%2019.2741C15.7899%2019.0652%2016.224%2018.8138%2016.6318%2018.5236C16.3854%2017.3459%2016.566%2016.0912%2017.1962%2014.9998C17.8262%2013.9085%2018.8225%2013.1248%2019.9655%2012.7493C19.9884%2012.5015%2020%2012.2516%2020%2011.9998C20%2011.7481%2019.9884%2011.4981%2019.9655%2011.2504C18.8225%2010.8749%2017.8262%2010.0912%2017.1962%208.99982C16.566%207.90845%2016.3854%206.65378%2016.6318%205.47605C16.224%205.18588%2015.7899%204.93447%2015.3351%204.72552C14.4382%205.52844%2013.2608%205.99982%2012%205.99982C10.7392%205.99982%209.56176%205.52844%208.66489%204.72552C8.21005%204.93447%207.77597%205.18588%207.36818%205.47605C7.61458%206.65378%207.43395%207.90845%206.80385%208.99982C6.17376%2010.0912%205.17754%2010.8749%204.03451%2011.2504C4.01157%2011.4981%204%2011.7481%204%2011.9998C4%2012.2516%204.01157%2012.5015%204.03451%2012.7493C5.17754%2013.1248%206.17376%2013.9085%206.80385%2014.9998ZM12%2014.9998C10.3431%2014.9998%209%2013.6567%209%2011.9998C9%2010.343%2010.3431%208.99982%2012%208.99982C13.6569%208.99982%2015%2010.343%2015%2011.9998C15%2013.6567%2013.6569%2014.9998%2012%2014.9998ZM12%2012.9998C12.5523%2012.9998%2013%2012.5521%2013%2011.9998C13%2011.4475%2012.5523%2010.9998%2012%2010.9998C11.4477%2010.9998%2011%2011.4475%2011%2011.9998C11%2012.5521%2011.4477%2012.9998%2012%2012.9998Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
            ) : null}
          </_Builtin.Link>
          <_Builtin.Link
            className={_utils.cx(_styles, "nav_mainlink", "negative")}
            button={false}
            id="notification"
            block="inline"
            options={{
              href: "/notifications",
            }}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex")}
              value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewbox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M20%2017H22V19H2V17H4V10C4%205.58172%207.58172%202%2012%202C16.4183%202%2020%205.58172%2020%2010V17ZM18%2017V10C18%206.68629%2015.3137%204%2012%204C8.68629%204%206%206.68629%206%2010V17H18ZM9%2021H15V23H9V21Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "aui_navmenu_tooltip")}
              tag="div"
            >
              <_Builtin.Block tag="div">{"Notifications"}</_Builtin.Block>
            </_Builtin.Block>
            {isNotificationCount ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "notification_count")}
                tag="div"
              >
                {textNotificationCount}
              </_Builtin.Block>
            ) : null}
            {isNotification ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "navlink_active", "without-bg")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "embed_flex")}
                  value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewbox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M20%2017H22V19H2V17H4V10C4%205.58172%207.58172%202%2012%202C16.4183%202%2020%205.58172%2020%2010V17ZM18%2017V10C18%206.68629%2015.3137%204%2012%204C8.68629%204%206%206.68629%206%2010V17H18ZM9%2021H15V23H9V21Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
            ) : null}
          </_Builtin.Link>
          <_Builtin.Block
            className={_utils.cx(_styles, "nav_mainlink")}
            tag="div"
            id="profile"
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "aui_navmenu_tooltip",
                "is_profile"
              )}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "aui_tip_profile")}
                tag="div"
              >
                <_Builtin.Link
                  className={_utils.cx(_styles, "aui_profile_link")}
                  button={false}
                  id="view-profile"
                  block="inline"
                  options={{
                    href: "/profile",
                  }}
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "embed_flex")}
                    value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M7.99662%2010.4416C8.02889%2010.7158%207.83272%2010.9643%207.55847%2010.9966C7.28422%2011.0288%207.03574%2010.8327%207.00347%2010.5584C6.83287%209.10827%205.54418%208%204.00005%208C2.45592%208%201.16723%209.10827%200.996623%2010.5584C0.964359%2010.8327%200.715878%2011.0288%200.441627%2010.9966C0.167377%2010.9643%20-0.028792%2010.7158%200.0034728%2010.4416C0.234176%208.4806%201.95581%207%204.00005%207C6.04429%207%207.76592%208.4806%207.99662%2010.4416ZM8.00005%204C7.72391%204%207.50005%203.77614%207.50005%203.5C7.50005%203.22386%207.72391%203%208.00005%203H11.5C11.7762%203%2012%203.22386%2012%203.5C12%203.77614%2011.7762%204%2011.5%204H8.00005ZM8.50005%207C8.22391%207%208.00005%206.77614%208.00005%206.5C8.00005%206.22386%208.22391%206%208.50005%206H11.5C11.7762%206%2012%206.22386%2012%206.5C12%206.77614%2011.7762%207%2011.5%207H8.50005ZM10%2010C9.72391%2010%209.50005%209.77614%209.50005%209.5C9.50005%209.22386%209.72391%209%2010%209H11.5C11.7762%209%2012%209.22386%2012%209.5C12%209.77614%2011.7762%2010%2011.5%2010H10ZM4.00005%206C2.61934%206%201.50005%204.88071%201.50005%203.5C1.50005%202.11929%202.61934%201%204.00005%201C5.38076%201%206.50005%202.11929%206.50005%203.5C6.50005%204.88071%205.38076%206%204.00005%206ZM4.00005%205C4.82848%205%205.50005%204.32843%205.50005%203.5C5.50005%202.67157%204.82848%202%204.00005%202C3.17162%202%202.50005%202.67157%202.50005%203.5C2.50005%204.32843%203.17162%205%204.00005%205Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                  <_Builtin.Block tag="div">{"View Profile"}</_Builtin.Block>
                </_Builtin.Link>
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "aui_profile_link",
                    "is_logout"
                  )}
                  tag="div"
                  id="log-out"
                  {...onClickLogout}
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "embed_flex")}
                    value="%3Csvg%20width%3D%2212%22%20height%3D%2214%22%20viewbox%3D%220%200%2012%2014%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M8.47841%204.47838C8.68761%204.26917%209.02681%204.26917%209.23602%204.47838L11.3789%206.62124C11.4793%206.7217%2011.5358%206.85796%2011.5358%207.00004C11.5358%207.14212%2011.4793%207.27838%2011.3789%207.37885L9.23602%209.52171C9.02681%209.73092%208.68761%209.73092%208.47841%209.52171C8.2692%209.3125%208.2692%208.9733%208.47841%208.76409L9.70674%207.53576H6.00007C5.7042%207.53576%205.46436%207.29591%205.46436%207.00004C5.46436%206.70418%205.7042%206.46433%206.00007%206.46433H9.70674L8.47841%205.23599C8.2692%205.02678%208.2692%204.68759%208.47841%204.47838Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M0.464355%202.00002C0.464355%200.915176%201.3438%200.0357361%202.42864%200.0357361H9.5715C10.6564%200.0357361%2011.5358%200.915182%2011.5358%202.00002V2.71431C11.5358%203.01017%2011.2959%203.25002%2011.0001%203.25002C10.7042%203.25002%2010.4644%203.01017%2010.4644%202.71431V2.00002C10.4644%201.5069%2010.0646%201.10716%209.5715%201.10716H2.42864C1.93553%201.10716%201.53578%201.50691%201.53578%202.00002V12C1.53578%2012.4931%201.93552%2012.8929%202.42864%2012.8929H9.5715C10.0646%2012.8929%2010.4644%2012.4932%2010.4644%2012V11.2857C10.4644%2010.9899%2010.7042%2010.75%2011.0001%2010.75C11.2959%2010.75%2011.5358%2010.9899%2011.5358%2011.2857V12C11.5358%2013.0849%2010.6564%2013.9643%209.5715%2013.9643H2.42864C1.3438%2013.9643%200.464355%2013.0849%200.464355%2012V2.00002Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                  <_Builtin.Block tag="div">{"Logout"}</_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "aui_navmenu_profile")}
              tag="div"
            >
              {slotProfileImage}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
