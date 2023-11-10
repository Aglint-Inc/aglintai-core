import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./NavProfileBlock.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-67":{"id":"e-67","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-28","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-68"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"bf40e1c7-1518-9a34-7e4f-5ee973b6b404","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"bf40e1c7-1518-9a34-7e4f-5ee973b6b404","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1699278048816},"e-68":{"id":"e-68","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-29","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-67"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"bf40e1c7-1518-9a34-7e4f-5ee973b6b404","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"bf40e1c7-1518-9a34-7e4f-5ee973b6b404","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1699278048817},"e-69":{"id":"e-69","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-28","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-70"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"a58d1b9f-d05d-f76f-7ad5-728e246dbdb4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"a58d1b9f-d05d-f76f-7ad5-728e246dbdb4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1699278298212},"e-70":{"id":"e-70","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-29","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-69"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"a58d1b9f-d05d-f76f-7ad5-728e246dbdb4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"a58d1b9f-d05d-f76f-7ad5-728e246dbdb4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1699278298213}},"actionLists":{"a-28":{"id":"a-28","title":"profile-tooltip-[hover-in]","actionItemGroups":[{"actionItems":[{"id":"a-28-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".rec-tooltip","selectorGuids":["bed5430b-b8f8-5693-c256-5ce55b140246"]},"value":0,"unit":""}},{"id":"a-28-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"value":"none","target":{"useEventTarget":"SIBLINGS","selector":".rec-tooltip","selectorGuids":["bed5430b-b8f8-5693-c256-5ce55b140246"]}}}]},{"actionItems":[{"id":"a-28-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"value":"block","target":{"useEventTarget":"SIBLINGS","selector":".rec-tooltip","selectorGuids":["bed5430b-b8f8-5693-c256-5ce55b140246"]}}}]},{"actionItems":[{"id":"a-28-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":200,"target":{"useEventTarget":"SIBLINGS","selector":".rec-tooltip.logout","selectorGuids":["bed5430b-b8f8-5693-c256-5ce55b140246","2447edee-f9a9-4f97-88c3-f578fb1fb561"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1698920262492},"a-29":{"id":"a-29","title":"profile-tooltip-[hover-out]","actionItemGroups":[{"actionItems":[{"id":"a-29-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":100,"target":{"useEventTarget":"SIBLINGS","selector":".rec-tooltip","selectorGuids":["bed5430b-b8f8-5693-c256-5ce55b140246"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-29-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".rec-tooltip","selectorGuids":["bed5430b-b8f8-5693-c256-5ce55b140246"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1698920342906}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function NavProfileBlock({
  as: _Component = _Builtin.Block,
  onclickLogout = {},
  onclickProfile = {},
  slotProfileImage,
  profileName = "Name",
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "rs-bottom-block")} tag="div">
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "hide")}
        value="%3Cstyle%3E%0A.line-clamp-1%20%7B%0Adisplay%3A%20-webkit-box%3B%0A%20%20-webkit-line-clamp%3A%201%3B%0A%20%20-webkit-box-orient%3A%20vertical%3B%20%20%0A%20%20overflow%3A%20hidden%3B%0A%7D%0A%3C%2Fstyle%3E"
      />
      <_Builtin.Block className={_utils.cx(_styles, "div-block-374")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-378")}
          data-w-id="bf40e1c7-1518-9a34-7e4f-5ee973b6b404"
          tag="div"
          {...onclickProfile}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-377")}
            tag="div"
          >
            {slotProfileImage}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "line-clamp-1")}
            tag="div"
          >
            {profileName}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-380")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "rs-profile-logout-block",
              "text-red-400",
              "clickable"
            )}
            data-w-id="a58d1b9f-d05d-f76f-7ad5-728e246dbdb4"
            tag="div"
            {...onclickLogout}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icon-embed")}
              value="%3Csvg%20width%3D%2211%22%20height%3D%2211%22%20viewBox%3D%220%200%2011%2011%22%20fill%3DcurrentColor%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.75002%200.549999V6.15C5.73544%206.36875%205.61877%206.48542%205.40002%206.5C5.18127%206.48542%205.06461%206.36875%205.05002%206.15V0.549999C5.06461%200.331249%205.18127%200.214583%205.40002%200.199999C5.61877%200.214583%205.73544%200.331249%205.75002%200.549999ZM3.38752%201.90625C2.67294%202.28542%202.10419%202.81771%201.68127%203.50312C1.25836%204.17396%201.03961%204.93958%201.02502%205.8C1.05419%207.03958%201.4844%208.06771%202.31565%208.88437C3.13232%209.71562%204.16044%2010.1458%205.40002%2010.175C6.63961%2010.1458%207.66773%209.71562%208.4844%208.88437C9.31565%208.06771%209.74586%207.03958%209.77502%205.8C9.76044%204.93958%209.54169%204.17396%209.11877%203.50312C8.69586%202.81771%208.12711%202.28542%207.41252%201.90625C7.22294%201.78958%207.1719%201.63646%207.2594%201.44687C7.37607%201.25729%207.52919%201.20625%207.71877%201.29375C8.55002%201.73125%209.21357%202.34375%209.7094%203.13125C10.2052%203.91875%2010.4604%204.80833%2010.475%205.8C10.4604%206.74792%2010.2271%207.60104%209.77502%208.35937C9.32294%209.11771%208.71773%209.72292%207.9594%2010.175C7.20107%2010.6271%206.34794%2010.8604%205.40002%2010.875C4.45211%2010.8604%203.59898%2010.6271%202.84065%2010.175C2.08232%209.72292%201.47711%209.11771%201.02502%208.35937C0.572941%207.60104%200.339607%206.74792%200.325024%205.8C0.339607%204.80833%200.594816%203.91875%201.09065%203.13125C1.58648%202.34375%202.25002%201.73125%203.08127%201.29375C3.27086%201.20625%203.42398%201.25729%203.54065%201.44687C3.62815%201.63646%203.57711%201.78958%203.38752%201.90625Z%22%20fill%3DcurrentColor%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "rec-tooltip", "logout")}
            tag="div"
          >
            {"Logout"}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-376")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "rs-brand-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-xsm", "text-grey-600")}
            tag="div"
          >
            {"Powered by"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "icon-block")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icon-embed")}
              value="%3Csvg%20width%3D%2250%22%20height%3D%2212%22%20viewBox%3D%220%200%2050%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_4076_14989)%22%3E%0A%3Cpath%20d%3D%22M9.45261%205.32443C8.16538%205.00188%207.52028%204.84359%207.07527%204.39859C6.63027%203.9506%206.47198%203.30848%206.14942%202.02125L5.67455%200.124756L5.19968%202.02125C4.87713%203.30848%204.71884%203.95358%204.27383%204.39859C3.82584%204.84359%203.18372%205.00188%201.8965%205.32443L0%205.7993L1.8965%206.27417C3.18372%206.59673%203.82883%206.75502%204.27383%207.20002C4.71884%207.64801%204.87713%208.29013%205.19968%209.57736L5.67455%2011.4739L6.14942%209.57736C6.47198%208.29013%206.63027%207.64503%207.07527%207.20002C7.52326%206.75502%208.16538%206.59673%209.45261%206.27417L11.3491%205.7993L9.45261%205.32443Z%22%20fill%3D%22%23FF6224%22%2F%3E%0A%3Cpath%20d%3D%22M17.2373%209.65883C16.8367%209.65883%2016.4629%209.58762%2016.1157%209.4452C15.7775%209.29388%2015.5015%209.0758%2015.2879%208.79096C15.0832%208.49722%2014.9808%208.13227%2014.9808%207.69611C14.9808%207.07302%2015.1989%206.57455%2015.6351%206.20069C16.0801%205.82684%2016.7344%205.63992%2017.5978%205.63992H19.4671V5.46634C19.4671%205.07469%2019.3558%204.79875%2019.1333%204.63852C18.9196%204.4783%2018.4835%204.39819%2017.8248%204.39819C17.1038%204.39819%2016.4095%204.50946%2015.7419%204.73199V3.46356C16.0356%203.34784%2016.3917%203.25438%2016.81%203.18317C17.2373%203.10306%2017.7002%203.063%2018.1986%203.063C19.1511%203.063%2019.8854%203.25883%2020.4017%203.65049C20.9269%204.03324%2021.1894%204.65188%2021.1894%205.5064V9.52531H19.6273L19.5338%208.95118C19.2846%209.17371%2018.9775%209.34729%2018.6125%209.47191C18.2476%209.59652%2017.7892%209.65883%2017.2373%209.65883ZM17.7313%208.47051C18.1319%208.47051%2018.479%208.40376%2018.7728%208.27024C19.0665%208.13672%2019.2979%207.96759%2019.4671%207.76286V6.76147H17.6378C16.9346%206.76147%2016.583%207.05076%2016.583%207.62935C16.583%208.19013%2016.9658%208.47051%2017.7313%208.47051Z%22%20fill%3D%22white%22%2F%3E%0A%3Cpath%20d%3D%22M25.4448%2011.8752C24.9731%2011.8752%2024.488%2011.8441%2023.9895%2011.7818C23.4999%2011.7195%2023.086%2011.6305%2022.7478%2011.5147V10.1662C23.1038%2010.2819%2023.5222%2010.3709%2024.0028%2010.4332C24.4835%2010.5045%2024.933%2010.5401%2025.3514%2010.5401C25.9656%2010.5401%2026.4106%2010.5045%2026.6866%2010.4332C26.9625%2010.3709%2027.1005%2010.2552%2027.1005%2010.0861C27.1005%209.94367%2027.0382%209.84576%2026.9135%209.79235C26.7978%209.73894%2026.5486%209.71224%2026.1658%209.71224H24.4434C23.313%209.71224%2022.7478%209.29388%2022.7478%208.45716C22.7478%208.19903%2022.819%207.96314%2022.9614%207.74951C23.1038%207.53588%2023.3308%207.36676%2023.6423%207.24214C22.9213%206.87719%2022.5608%206.263%2022.5608%205.39958C22.5608%204.58067%2022.8145%203.98873%2023.3219%203.62378C23.8293%203.24993%2024.5814%203.063%2025.5784%203.063C25.7831%203.063%2026.0056%203.0808%2026.246%203.11641C26.4952%203.14311%2026.6821%203.16982%2026.8067%203.19652H29.1834L29.1433%204.33143H28.1419C28.4179%204.58957%2028.5558%204.95007%2028.5558%205.41293C28.5558%206.06272%2028.3511%206.58345%2027.9416%206.9751C27.5322%207.35786%2026.9269%207.54923%2026.1258%207.54923C25.9834%207.54923%2025.8454%207.54478%2025.7119%207.53588C25.5873%207.51808%2025.4582%207.50028%2025.3247%207.48247C25.0576%207.51808%2024.8307%207.58039%2024.6437%207.6694C24.4657%207.75841%2024.3767%207.87858%2024.3767%208.0299C24.3767%208.23463%2024.5592%208.337%2024.9241%208.337H26.7133C27.3542%208.337%2027.8482%208.48387%2028.1953%208.77761C28.5425%209.06245%2028.7161%209.48081%2028.7161%2010.0327C28.7161%2010.6558%2028.4357%2011.1186%2027.8749%2011.4213C27.3141%2011.7239%2026.5041%2011.8752%2025.4448%2011.8752ZM25.5917%206.53449C26.1258%206.53449%2026.4952%206.44548%2026.6999%206.26745C26.9135%206.08053%2027.0204%205.76898%2027.0204%205.33282C27.0204%204.89666%2026.9135%204.58067%2026.6999%204.38484C26.4952%204.18901%2026.1258%204.0911%2025.5917%204.0911C25.0843%204.0911%2024.7194%204.18901%2024.4969%204.38484C24.2743%204.57176%2024.1631%204.88776%2024.1631%205.33282C24.1631%205.74228%2024.2654%206.04492%2024.4701%206.24075C24.6838%206.43658%2025.0576%206.53449%2025.5917%206.53449Z%22%20fill%3D%22white%22%2F%3E%0A%3Cpath%20d%3D%22M32.1678%209.65883C31.5536%209.65883%2031.1041%209.51641%2030.8193%209.23157C30.5433%208.94673%2030.4054%208.49277%2030.4054%207.86968V0.526145H32.2079V7.72281C32.2079%207.94534%2032.2524%208.10111%2032.3414%208.19012C32.4304%208.27024%2032.5595%208.31029%2032.7286%208.31029C32.96%208.31029%2033.1692%208.27914%2033.3561%208.21683V9.45855C33.0179%209.59207%2032.6218%209.65883%2032.1678%209.65883Z%22%20fill%3D%22white%22%2F%3E%0A%3Cpath%20d%3D%22M34.487%202.03491V0.619608H36.4497V2.03491H34.487ZM34.6339%209.52531V4.53171H33.6859L33.8461%203.19652H36.4364V9.52531H34.6339Z%22%20fill%3D%22white%22%2F%3E%0A%3Cpath%20d%3D%22M38.1046%209.52531V3.19652H39.7736L39.8404%203.79736C40.0985%203.60153%2040.4234%203.4324%2040.8151%203.28998C41.2156%203.13866%2041.634%203.063%2042.0701%203.063C42.9068%203.063%2043.5166%203.25883%2043.8993%203.65049C44.2821%204.04214%2044.4735%204.64743%2044.4735%205.46634V9.52531H42.671V5.5598C42.671%205.13254%2042.582%204.8299%2042.4039%204.65188C42.2348%204.47385%2041.9144%204.38484%2041.4426%204.38484C41.1666%204.38484%2040.8863%204.44715%2040.6014%204.57176C40.3255%204.69638%2040.0941%204.85215%2039.9071%205.03908V9.52531H38.1046Z%22%20fill%3D%22white%22%2F%3E%0A%3Cpath%20d%3D%22M48.5847%209.65883C47.8548%209.65883%2047.3118%209.46745%2046.9558%209.0847C46.6086%208.70195%2046.435%208.18122%2046.435%207.52253V4.58512H45.5405V3.19652H46.435V1.83463L48.2376%201.30055V3.19652H49.8398L49.733%204.58512H48.2376V7.40236C48.2376%207.74951%2048.3177%207.98985%2048.4779%208.12336C48.6381%208.24798%2048.8873%208.31029%2049.2256%208.31029C49.4748%208.31029%2049.733%208.26579%2050%208.17677V9.4185C49.8042%209.49861%2049.5905%209.55647%2049.3591%209.59207C49.1277%209.63658%2048.8695%209.65883%2048.5847%209.65883Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3CclipPath%20id%3D%22clip0_4076_14989%22%3E%0A%3Crect%20width%3D%2250%22%20height%3D%2211.7505%22%20fill%3D%22white%22%20transform%3D%22translate(0%200.124756)%22%2F%3E%0A%3C%2FclipPath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
