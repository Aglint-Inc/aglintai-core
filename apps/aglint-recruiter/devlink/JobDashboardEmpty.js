"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./JobDashboardEmpty.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function JobDashboardEmpty({
  as: _Component = _Builtin.Block,
  onClickHowItWorks = {},
  onClickRequestIntegration = {},
  slotImport,
  onClickAddJob = {},
  onClickGreenHouse = {},
  textHeader = "Jobs",
  onClickAshby = {},
  onClickLever = {},
  isOldTitleVisible = true,
  isSelectTitleVisible = true,
  slotAts,
  isAtsOptionVisible = true,
  isConnectedVisible = true,
  isGreenhouseConnected = false,
  isAshbyConnected = false,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "job-dashboard-empty-landing-wrappers")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "job-empty-header")}
        tag="div"
      >
        <Text content={textHeader} weight="medium" size="2" />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "job-empty-landing-wrappers")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "flex-vertical", "gap-7")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cj-option-wrapper")}
            tag="div"
          >
            {isSelectTitleVisible ? (
              <_Builtin.Block tag="div">
                <Text
                  content="Select an option to continue with"
                  weight="medium"
                />
              </_Builtin.Block>
            ) : null}
            <_Builtin.Block
              className={_utils.cx(_styles, "cj-option-block-white")}
              tag="div"
              {...onClickAddJob}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "cj-option-icon-block")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2225%22%20height%3D%2221%22%20viewbox%3D%220%200%2025%2021%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.28137%200.937498C5.69153%200.964842%205.91028%201.18359%205.93762%201.59375C5.91028%202.0039%205.69153%202.22265%205.28137%202.25H4.297C3.64075%202.27734%203.09387%202.49609%202.65637%202.90625C2.24622%203.34375%202.02746%203.89062%202.00012%204.54687V5.53125C1.97278%205.94141%201.75403%206.16016%201.34387%206.1875C0.933715%206.16016%200.714965%205.94141%200.687621%205.53125V4.54687C0.714965%203.53515%201.07043%202.6875%201.75403%202.0039C2.43762%201.32031%203.28528%200.964842%204.297%200.937498H5.28137ZM0.687621%2012.0937V8.15625C0.714965%207.74609%200.933715%207.52734%201.34387%207.5C1.75403%207.52734%201.97278%207.74609%202.00012%208.15625V12.0937C1.97278%2012.5039%201.75403%2012.7227%201.34387%2012.75C0.933715%2012.7227%200.714965%2012.5039%200.687621%2012.0937ZM1.34387%2014.0625C1.75403%2014.0898%201.97278%2014.3086%202.00012%2014.7187V15.7031C2.02746%2016.3594%202.24622%2016.9062%202.65637%2017.3437C3.09387%2017.7539%203.64075%2017.9727%204.297%2018H5.28137C5.69153%2018.0273%205.91028%2018.2461%205.93762%2018.6563C5.91028%2019.0664%205.69153%2019.2852%205.28137%2019.3125H4.297C3.28528%2019.2852%202.43762%2018.9297%201.75403%2018.2461C1.07043%2017.5625%200.714965%2016.7148%200.687621%2015.7031V14.7187C0.714965%2014.3086%200.933715%2014.0898%201.34387%2014.0625ZM18.4474%207.54101C18.0372%207.51367%2017.8048%207.29492%2017.7501%206.88476V4.54687C17.7228%203.89062%2017.504%203.34375%2017.0939%202.90625C16.6564%202.49609%2016.1095%202.27734%2015.4532%202.25H14.4689C14.0587%202.22265%2013.84%202.0039%2013.8126%201.59375C13.84%201.18359%2014.0587%200.964842%2014.4689%200.937498H15.4532C16.465%200.964842%2017.3126%201.32031%2017.9962%202.0039C18.6798%202.6875%2019.0353%203.53515%2019.0626%204.54687V6.88476C19.0353%207.26758%2018.8302%207.48633%2018.4474%207.54101ZM7.25012%2018.6563C7.27747%2018.2461%207.49622%2018.0273%207.90637%2018H11.8439C12.254%2018.0273%2012.4728%2018.2461%2012.5001%2018.6563C12.4728%2019.0664%2012.254%2019.2852%2011.8439%2019.3125H7.90637C7.49622%2019.2852%207.27747%2019.0664%207.25012%2018.6563ZM11.8439%202.25H7.90637C7.49622%202.22265%207.27747%202.0039%207.25012%201.59375C7.27747%201.18359%207.49622%200.964842%207.90637%200.937498H11.8439C12.254%200.964842%2012.4728%201.18359%2012.5001%201.59375C12.4728%202.0039%2012.254%202.22265%2011.8439%202.25ZM23.0001%2014.7187C23.0001%2013.8984%2022.795%2013.1328%2022.3849%2012.4219C21.9747%2011.7109%2021.4142%2011.1504%2020.7032%2010.7402C19.9923%2010.3301%2019.2267%2010.125%2018.4064%2010.125C17.5861%2010.125%2016.8204%2010.3301%2016.1095%2010.7402C15.3986%2011.1504%2014.838%2011.7109%2014.4279%2012.4219C14.0177%2013.1328%2013.8126%2013.8984%2013.8126%2014.7187C13.8126%2015.5391%2014.0177%2016.3047%2014.4279%2017.0156C14.838%2017.7266%2015.3986%2018.2871%2016.1095%2018.6973C16.8204%2019.1074%2017.5861%2019.3125%2018.4064%2019.3125C19.2267%2019.3125%2019.9923%2019.1074%2020.7032%2018.6973C21.4142%2018.2871%2021.9747%2017.7266%2022.3849%2017.0156C22.795%2016.3047%2023.0001%2015.5391%2023.0001%2014.7187ZM12.5001%2014.7187C12.5001%2013.6523%2012.7599%2012.668%2013.2794%2011.7656C13.799%2010.8633%2014.5236%2010.1387%2015.4532%209.5918C16.3829%209.07226%2017.3673%208.8125%2018.4064%208.8125C19.4454%208.8125%2020.4298%209.07226%2021.3595%209.5918C22.2892%2010.1387%2023.0138%2010.8633%2023.5333%2011.7656C24.0529%2012.668%2024.3126%2013.6523%2024.3126%2014.7187C24.3126%2015.7852%2024.0529%2016.7695%2023.5333%2017.6719C23.0138%2018.5742%2022.2892%2019.2988%2021.3595%2019.8457C20.4298%2020.3652%2019.4454%2020.625%2018.4064%2020.625C17.3673%2020.625%2016.3829%2020.3652%2015.4532%2019.8457C14.5236%2019.2988%2013.799%2018.5742%2013.2794%2017.6719C12.7599%2016.7695%2012.5001%2015.7852%2012.5001%2014.7187ZM19.0626%2012.0937V14.0625H21.0314C21.4415%2014.0898%2021.6603%2014.3086%2021.6876%2014.7187C21.6603%2015.1289%2021.4415%2015.3477%2021.0314%2015.375H19.0626V17.3437C19.0353%2017.7539%2018.8165%2017.9727%2018.4064%2018C17.9962%2017.9727%2017.7775%2017.7539%2017.7501%2017.3437V15.375H15.7814C15.3712%2015.3477%2015.1525%2015.1289%2015.1251%2014.7187C15.1525%2014.3086%2015.3712%2014.0898%2015.7814%2014.0625H17.7501V12.0937C17.7775%2011.6836%2017.9962%2011.4648%2018.4064%2011.4375C18.8165%2011.4648%2019.0353%2011.6836%2019.0626%2012.0937Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
              <_Builtin.Block tag="div">
                <Text content="Add Job" weight="medium" />
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "cj-imports-wrapper")}
            tag="div"
          >
            <_Builtin.Block tag="div">
              <Text
                content="Or Connect with your Applicant Tracking System (ATS)"
                weight="medium"
              />
            </_Builtin.Block>
            {isAtsOptionVisible ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "cj-imports-options")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "cj-option-block", "neutral-2")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cj-option-icon-block")}
                    tag="div"
                  >
                    <_Builtin.HtmlEmbed value="%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2240%22%20height%3D%2240%22%20rx%3D%224%22%20fill%3D%22%23201000%22%20fill-opacity%3D%220.0627451%22%2F%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_3746_41630)%22%3E%0A%3Cpath%20d%3D%22M33.0836%2031.9368L28.0628%2026.916C27.7295%2026.5827%2027.2086%2026.5827%2026.8753%2026.916L21.8545%2031.9368C21.5211%2032.2493%2021.5211%2032.7702%2021.8336%2033.0827C22.0003%2033.2493%2022.2295%2033.3535%2022.4586%2033.3327H32.5003C32.9586%2033.3535%2033.3336%2032.9785%2033.3336%2032.541C33.3336%2032.3118%2033.2503%2032.0827%2033.0836%2031.9368Z%22%20fill%3D%22%23C3C6CC%22%2F%3E%0A%3Cpath%20d%3D%22M33.2501%2013.8952L31.6667%209.22852C31.6042%209.02018%2031.4792%208.83268%2031.3334%208.66602L6.85425%2033.1452C7.00008%2033.2702%207.18758%2033.3327%207.37508%2033.3327H14.3334C14.7292%2033.3327%2015.1042%2033.1869%2015.3751%2032.8952L32.9167%2015.3743C33.3126%2014.9785%2033.4376%2014.416%2033.2501%2013.8952Z%22%20fill%3D%22%23E1E3E6%22%2F%3E%0A%3Cpath%20d%3D%22M30.771%208.3121L26.1043%206.7496C25.5835%206.5621%2025.021%206.6871%2024.6252%207.08293L7.0835%2024.6038C6.81266%2024.8746%206.646%2025.2496%206.646%2025.6454V32.6038C6.646%2032.7913%206.7085%2032.9788%206.8335%2033.1246L31.3543%208.64543C31.1877%208.4996%2030.9793%208.39543%2030.771%208.3121Z%22%20fill%3D%22%23C3C6CC%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3CclipPath%20id%3D%22clip0_3746_41630%22%3E%0A%3Crect%20width%3D%2226.6667%22%20height%3D%2226.6667%22%20fill%3D%22white%22%20transform%3D%22translate(6.66675%206.66699)%22%2F%3E%0A%3C%2FclipPath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E" />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cj-option-info")}
                    tag="div"
                  >
                    <Text content="Lever" weight="medium" />
                    {isConnectedVisible ? (
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "flex-horizontal",
                          "center",
                          "gap-2"
                        )}
                        tag="div"
                      >
                        <_Builtin.HtmlEmbed
                          className={_utils.cx(_styles, "icons")}
                          value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6%200C2.69%200%200%202.69%200%206C0%209.31%202.69%2012%206%2012C9.31%2012%2012%209.31%2012%206C12%202.69%209.31%200%206%200ZM9.44%204.94L5.94%208.44C5.82%208.56%205.66%208.62%205.5%208.62C5.34%208.62%205.18%208.56%205.06%208.44L3.06%206.44C2.82%206.2%202.82%205.8%203.06%205.56C3.3%205.32%203.7%205.32%203.94%205.56L5.5%207.12L8.56%204.06C8.8%203.82%209.2%203.82%209.44%204.06C9.69%204.3%209.69%204.7%209.44%204.94Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fsvg%3E"
                        />
                        <Text
                          content="Connected"
                          size="1"
                          weight="bold"
                          color="success"
                        />
                      </_Builtin.Block>
                    ) : null}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "click-fake-div")}
                    tag="div"
                    {...onClickLever}
                  />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "cj-option-block", "grey")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cj-option-icon-block")}
                    tag="div"
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icons")}
                      value="%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2240%22%20height%3D%2240%22%20rx%3D%224%22%20fill%3D%22%2300AE48%22%20fill-opacity%3D%220.0980392%22%2F%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_3746_41631)%22%3E%0A%3Cpath%20d%3D%22M24.6618%2014.5028C24.6618%2015.758%2024.1276%2016.8684%2023.2535%2017.7374C22.2823%2018.7029%2020.8741%2018.9443%2020.8741%2019.765C20.8741%2020.8754%2022.6708%2020.5375%2024.3947%2022.2513C25.5359%2023.3859%2026.24%2024.8825%2026.24%2026.6205C26.24%2030.0482%2023.4721%2032.7759%2020%2032.7759C16.5279%2032.7759%2013.76%2030.0482%2013.76%2026.6229C13.76%2024.8825%2014.4641%2023.3859%2015.6053%2022.2513C17.3292%2020.5375%2019.1259%2020.8754%2019.1259%2019.765C19.1259%2018.9443%2017.7177%2018.7029%2016.7465%2017.7374C15.8724%2016.8684%2015.3382%2015.758%2015.3382%2014.4545C15.3382%2011.944%2017.402%209.91638%2019.9272%209.91638C20.4128%209.91638%2020.8498%209.98879%2021.214%209.98879C21.8696%209.98879%2022.2095%209.69913%2022.2095%209.24049C22.2095%208.97496%2022.0881%208.63701%2022.0881%208.27493C22.0881%207.45421%2022.7922%206.77832%2023.642%206.77832C24.4918%206.77832%2025.1717%207.47835%2025.1717%208.32321C25.1717%209.21635%2024.4676%209.62671%2023.9334%209.81982C23.4964%209.96465%2023.1564%2010.1578%2023.1564%2010.5923C23.1564%2011.413%2024.6618%2012.2096%2024.6618%2014.5028ZM24.1762%2026.6229C24.1762%2024.2332%2022.4037%2022.302%2020%2022.302C17.5963%2022.302%2015.8238%2024.2332%2015.8238%2026.6229C15.8238%2028.9885%2017.5963%2030.9438%2020%2030.9438C22.4037%2030.9438%2024.1762%2028.9861%2024.1762%2026.6229ZM22.7437%2014.4545C22.7437%2012.9337%2021.5054%2011.6785%2020%2011.6785C18.4946%2011.6785%2017.2564%2012.9337%2017.2564%2014.4545C17.2564%2015.9752%2018.4946%2017.2305%2020%2017.2305C21.5054%2017.2305%2022.7437%2015.9752%2022.7437%2014.4545Z%22%20fill%3D%22%2324A57F%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3CclipPath%20id%3D%22clip0_3746_41631%22%3E%0A%3Crect%20width%3D%2212.48%22%20height%3D%2226%22%20fill%3D%22white%22%20transform%3D%22translate(13.7601%206.77734)%22%2F%3E%0A%3C%2FclipPath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cj-option-info")}
                    tag="div"
                  >
                    <Text content="Greenhouse" weight="medium" />
                    {isGreenhouseConnected ? (
                      <_Builtin.Block
                        className={_utils.cx(_styles, "div-block-551")}
                        tag="div"
                      >
                        <_Builtin.HtmlEmbed
                          className={_utils.cx(_styles, "icons")}
                          value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6%200C2.69%200%200%202.69%200%206C0%209.31%202.69%2012%206%2012C9.31%2012%2012%209.31%2012%206C12%202.69%209.31%200%206%200ZM9.44%204.94L5.94%208.44C5.82%208.56%205.66%208.62%205.5%208.62C5.34%208.62%205.18%208.56%205.06%208.44L3.06%206.44C2.82%206.2%202.82%205.8%203.06%205.56C3.3%205.32%203.7%205.32%203.94%205.56L5.5%207.12L8.56%204.06C8.8%203.82%209.2%203.82%209.44%204.06C9.69%204.3%209.69%204.7%209.44%204.94Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fsvg%3E"
                        />
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "text-sm",
                            "fw-semibold",
                            "text-green-500"
                          )}
                          tag="div"
                        >
                          {"Connected"}
                        </_Builtin.Block>
                      </_Builtin.Block>
                    ) : null}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "click-fake-div")}
                    tag="div"
                    {...onClickGreenHouse}
                  />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "cj-option-block", "asley")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "cj-option-icon-block",
                      "asby"
                    )}
                    tag="div"
                  >
                    <_Builtin.HtmlEmbed value="%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2240%22%20height%3D%2240%22%20rx%3D%224%22%20fill%3D%22%238E00F1%22%20fill-opacity%3D%220.0705882%22%2F%3E%0A%3Cmask%20id%3D%22mask0_3746_41635%22%20style%3D%22mask-type%3Aluminance%22%20maskUnits%3D%22userSpaceOnUse%22%20x%3D%229%22%20y%3D%229%22%20width%3D%2222%22%20height%3D%2222%22%3E%0A%3Cpath%20d%3D%22M30.2961%209.80469H9.80811V30.1887H30.2961V9.80469Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fmask%3E%0A%3Cg%20mask%3D%22url(%23mask0_3746_41635)%22%3E%0A%3Cpath%20d%3D%22M28.5974%2027.7405C28.8444%2028.352%2029.1093%2028.8114%2029.3943%2029.1176C29.6975%2029.4047%2029.991%2029.5567%2030.275%2029.5771V30.1511C28.5512%2030.0876%2026.8263%2030.059%2025.1013%2030.0654C22.9415%2030.0654%2021.3498%2030.0933%2020.326%2030.1511V29.5771C21.0468%2029.5385%2021.5575%2029.4528%2021.8606%2029.318C22.1637%2029.1659%2022.3163%2028.9067%2022.3163%2028.5437C22.3163%2028.1988%2022.2019%2027.7405%2021.974%2027.1654L20.2974%2022.4576H14.5558L14.0725%2023.7502C13.4473%2025.3758%2013.1336%2026.6203%2013.1336%2027.4813C13.1336%2028.2663%2013.3519%2028.8018%2013.7875%2029.0887C14.2241%2029.3758%2014.8684%2029.5385%2015.7204%2029.5771V30.1511C14.4798%2030.098%2013.2382%2030.0694%2011.9965%2030.0654C11.1063%2030.0654%2010.3761%2030.0933%209.80811%2030.1511V29.5771C10.2818%2029.5%2010.7269%2029.2033%2011.1434%2028.6872C11.5609%2028.1699%2011.9869%2027.3475%2012.4236%2026.2186L18.7343%209.82812C19.2357%209.86199%2019.7378%209.88092%2020.2402%209.88489C20.6196%209.88489%2021.1124%209.86561%2021.7186%209.82812L28.5974%2027.7394V27.7405ZM20.0983%2021.8825L17.5124%2014.7073L14.7826%2021.8825H20.0983Z%22%20fill%3D%22%23504AD0%22%2F%3E%0A%3C%2Fg%3E%0A%3C%2Fsvg%3E" />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cj-option-info")}
                    tag="div"
                  >
                    <Text content="Ashby" weight="medium" />
                    {isAshbyConnected ? (
                      <_Builtin.Block
                        className={_utils.cx(_styles, "div-block-551")}
                        tag="div"
                      >
                        <_Builtin.HtmlEmbed
                          className={_utils.cx(_styles, "icons")}
                          value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6%200C2.69%200%200%202.69%200%206C0%209.31%202.69%2012%206%2012C9.31%2012%2012%209.31%2012%206C12%202.69%209.31%200%206%200ZM9.44%204.94L5.94%208.44C5.82%208.56%205.66%208.62%205.5%208.62C5.34%208.62%205.18%208.56%205.06%208.44L3.06%206.44C2.82%206.2%202.82%205.8%203.06%205.56C3.3%205.32%203.7%205.32%203.94%205.56L5.5%207.12L8.56%204.06C8.8%203.82%209.2%203.82%209.44%204.06C9.69%204.3%209.69%204.7%209.44%204.94Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fsvg%3E"
                        />
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "text-sm",
                            "fw-semibold",
                            "text-green-500"
                          )}
                          tag="div"
                        >
                          {"Connected"}
                        </_Builtin.Block>
                      </_Builtin.Block>
                    ) : null}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "click-fake-div")}
                    tag="div"
                    {...onClickAshby}
                  />
                </_Builtin.Block>
              </_Builtin.Block>
            ) : null}
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "flex-horizontal",
                "center",
                "gap-1"
              )}
              tag="div"
            >
              <Text
                content="If the applicant tracking system (ATS) you are using is not listed here, please don't hesitate to"
                color="neutral"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "cursor-pointer")}
                tag="div"
                {...onClickRequestIntegration}
              >
                <Text content="request integration." color="accent" />
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
