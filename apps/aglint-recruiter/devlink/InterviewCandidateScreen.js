"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./InterviewCandidateScreen.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1372":{"id":"e-1372","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-481","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1373"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"d3d6afe1-d572-9dc3-b7ea-07463de05ba9","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d3d6afe1-d572-9dc3-b7ea-07463de05ba9","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697535473849},"e-1373":{"id":"e-1373","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-482","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1372"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"d3d6afe1-d572-9dc3-b7ea-07463de05ba9","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d3d6afe1-d572-9dc3-b7ea-07463de05ba9","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697535473852},"e-1398":{"id":"e-1398","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-493","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1399"}},"mediaQueries":["small","tiny"],"target":{"id":"20915f7f-f20c-c8c9-8b6c-c9d3833101ca","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"20915f7f-f20c-c8c9-8b6c-c9d3833101ca","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697810940681},"e-1399":{"id":"e-1399","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-494","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1398"}},"mediaQueries":["small","tiny"],"target":{"id":"20915f7f-f20c-c8c9-8b6c-c9d3833101ca","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"20915f7f-f20c-c8c9-8b6c-c9d3833101ca","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697810940684},"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-481":{"id":"a-481","title":"Interview Edit click 1","actionItemGroups":[{"actionItems":[{"id":"a-481-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".interview-edit-wrappers","selectorGuids":["45f418ac-3edd-15b7-9f9b-99278bec83f4"]},"value":"none"}},{"id":"a-481-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":200,"target":{"useEventTarget":"SIBLINGS","selector":".submit-btn-wrapers-inter","selectorGuids":["854a7a33-2cfd-1df7-a4b8-12c03083383d"]},"value":0.4,"unit":""}},{"id":"a-481-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":200,"target":{"useEventTarget":"SIBLINGS","selector":".mic-wrapper","selectorGuids":["65a49672-108a-ae7a-d138-b0273f3626f4"]},"value":0.4,"unit":""}},{"id":"a-481-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".interview-edit-done-wrapper","selectorGuids":["98623bb9-4ad5-3370-3393-409213362bc4"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1697535482499},"a-482":{"id":"a-482","title":"Interview Edit click 2","actionItemGroups":[{"actionItems":[{"id":"a-482-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".interview-edit-wrappers","selectorGuids":["45f418ac-3edd-15b7-9f9b-99278bec83f4"]},"value":"flex"}},{"id":"a-482-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":200,"target":{"useEventTarget":"SIBLINGS","selector":".submit-btn-wrapers-inter","selectorGuids":["854a7a33-2cfd-1df7-a4b8-12c03083383d"]},"value":1,"unit":""}},{"id":"a-482-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":200,"target":{"useEventTarget":"SIBLINGS","selector":".mic-wrapper","selectorGuids":["65a49672-108a-ae7a-d138-b0273f3626f4"]},"value":1,"unit":""}},{"id":"a-482-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".interview-edit-done-wrapper","selectorGuids":["98623bb9-4ad5-3370-3393-409213362bc4"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1697535482499},"a-493":{"id":"a-493","title":"Mobile Interview Transcript Open","actionItemGroups":[{"actionItems":[{"id":"a-493-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"PARENT","selector":".new-interview-input","selectorGuids":["d26accc1-68f0-3e14-125a-78df2a530e54"]},"heightValue":54,"widthUnit":"PX","heightUnit":"px","locked":false}},{"id":"a-493-n-5","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".transcript-show-mobile","selectorGuids":["7cde6340-3ef0-307a-44dc-c59d96390cf1"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]},{"actionItems":[{"id":"a-493-n-2","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"outExpo","duration":800,"target":{"useEventTarget":"PARENT","selector":".new-interview-input","selectorGuids":["d26accc1-68f0-3e14-125a-78df2a530e54"]},"heightValue":247,"widthUnit":"PX","heightUnit":"px","locked":false}},{"id":"a-493-n-6","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"ease","duration":300,"target":{"selector":".transcript-show-mobile","selectorGuids":["7cde6340-3ef0-307a-44dc-c59d96390cf1"]},"zValue":180,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1697810945648},"a-494":{"id":"a-494","title":"Mobile Interview Transcript Close","actionItemGroups":[{"actionItems":[{"id":"a-494-n-4","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"outExpo","duration":800,"target":{"useEventTarget":"PARENT","selector":".new-interview-input","selectorGuids":["d26accc1-68f0-3e14-125a-78df2a530e54"]},"heightValue":54,"widthUnit":"PX","heightUnit":"px","locked":false}},{"id":"a-494-n-5","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"ease","duration":300,"target":{"selector":".transcript-show-mobile","selectorGuids":["7cde6340-3ef0-307a-44dc-c59d96390cf1"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1697810945648},"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function InterviewCandidateScreen({
  as: _Component = _Builtin.Block,
  slotCameraVideo,
  textDisplay = " so that I can see whether it is looking good in the design. Now I want to check whether if the user talks too much whether it will break our UI or not. If it is breaking then it is not good at all. Actually I found a way right now. Maybe it will look good in the design",
  textColorProps = {},
  slotText,
  onClickEdit = {},
  onClickMic = {},
  onClickSubmit = {},
  propsDotColor = {},
  textTimer = "02 : 30",
  isTimerVisible = true,
  onClickEditDone = {},
  onClickMicStop = {},
  slotMicSpeakingLottie,
  slotMic,
  isMicVisible = true,
  isSpeakingVisible = false,
  isAllButtonDisable = false,
  isMicSubmitButtonDisable = false,
  isInputVisible = true,
  isInterviewStartVisible = false,
  onClickStart = {},
  textheader = "Click ‘start’ to begin the interview",
  textButton = "Start",
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "new-interview-left")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-interview-candidate-video")}
        tag="div"
      >
        {slotCameraVideo}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "new-interview-input")}
        tag="div"
      >
        {isInputVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "transcript-slot-interview-screen")}
            tag="div"
          >
            {slotText}
          </_Builtin.Block>
        ) : null}
        {isInputVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "interview-btn-wrappers")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "interview-btn-new")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "edit-wrappers-inter")}
                data-w-id="d3d6afe1-d572-9dc3-b7ea-07463de05ba9"
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "interview-edit-wrappers")}
                  tag="div"
                  {...onClickEdit}
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons")}
                    value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewbox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M13.1902%202.06502C12.9976%201.89169%2012.7761%201.80503%2012.5258%201.80503C12.2754%201.80503%2012.0539%201.89169%2011.8613%202.06502L11.1102%202.84501L12.7569%204.49164L13.5369%203.74055C13.7102%203.54796%2013.7968%203.32648%2013.7968%203.07611C13.7968%202.82575%2013.7102%202.60427%2013.5369%202.41168L13.1902%202.06502ZM5.50589%208.44935C5.39033%208.5649%205.3133%208.70934%205.27478%208.88267L4.81257%2010.7893L6.7192%2010.356C6.89253%2010.2982%207.03697%2010.2115%207.15252%2010.096L12.0924%205.15608L10.4458%203.50944L5.50589%208.44935ZM11.2258%201.42948C11.611%201.06356%2012.0443%200.880599%2012.5258%200.880599C13.0265%200.880599%2013.4598%201.06356%2013.8257%201.42948L14.1724%201.77614C14.5383%202.16132%2014.7213%202.59464%2014.7213%203.07611C14.7213%203.57685%2014.5383%204.01017%2014.1724%204.37609L7.81695%2010.7604C7.56659%2011.0108%207.26808%2011.1745%206.92142%2011.2515L4.32146%2011.8582C4.14813%2011.8774%204.00369%2011.8293%203.88814%2011.7137C3.77258%2011.5982%203.72444%2011.4634%203.7437%2011.3093L4.35035%208.68046C4.42739%208.3338%204.59109%208.03528%204.84145%207.78492L11.2258%201.42948ZM2.35705%202.6139H6.05476C6.34365%202.63316%206.49772%202.78723%206.51698%203.07611C6.49772%203.365%206.34365%203.51907%206.05476%203.53833H2.35705C1.97188%203.55759%201.64448%203.6924%201.37485%203.94277C1.12448%204.21239%200.989672%204.53979%200.970413%204.92497V13.2448C0.989672%2013.63%201.12448%2013.9574%201.37485%2014.227C1.64448%2014.4774%201.97188%2014.6122%202.35705%2014.6315H10.6769C11.0621%2014.6122%2011.3895%2014.4774%2011.6591%2014.227C11.9095%2013.9574%2012.0443%2013.63%2012.0635%2013.2448V9.54711C12.0828%209.25822%2012.2369%209.10415%2012.5258%209.08489C12.8146%209.10415%2012.9687%209.25822%2012.988%209.54711V13.2448C12.9687%2013.8996%2012.7472%2014.4485%2012.3235%2014.8915C11.8806%2015.3152%2011.3317%2015.5366%2010.6769%2015.5559H2.35705C1.70225%2015.5366%201.15337%2015.3152%200.710418%2014.8915C0.286722%2014.4485%200.0652446%2013.8996%200.0459857%2013.2448V4.92497C0.0652446%204.27017%200.286722%203.72129%200.710418%203.27833C1.15337%202.85464%201.70225%202.63316%202.35705%202.6139Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "interview-edit-done-wrapper")}
                  tag="div"
                  {...onClickEditDone}
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons")}
                    value="%3Csvg%20width%3D%2215%22%20height%3D%2210%22%20viewbox%3D%220%200%2015%2010%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M13.8266%200.975739C14.0191%201.18759%2014.0191%201.39943%2013.8266%201.61128L5.96892%209.46892C5.75707%209.66151%205.54522%209.66151%205.33337%209.46892L1.17345%205.30899C0.98086%205.09714%200.98086%204.8853%201.17345%204.67345C1.3853%204.48086%201.59714%204.48086%201.80899%204.67345L5.65114%208.48671L13.191%200.975739C13.4029%200.783149%2013.6147%200.783149%2013.8266%200.975739Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "mic-wrapper")}
                tag="div"
                id="mic-trigger"
              >
                {isMicVisible ? (
                  <_Builtin.Block
                    className={_utils.cx(_styles, "interview-mic-wrapper")}
                    tag="div"
                    {...onClickMic}
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icons")}
                      value="%3Csvg%20width%3D%2212%22%20height%3D%2219%22%20viewbox%3D%220%200%2012%2019%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M8.3316%203.52872C8.30709%202.86691%208.07423%202.31541%207.63303%201.8742C7.19183%201.433%206.64032%201.20014%205.97852%201.17563C5.31671%201.20014%204.7652%201.433%204.324%201.8742C3.8828%202.31541%203.64994%202.86691%203.62543%203.52872V9.41144C3.64994%2010.0732%203.8828%2010.6247%204.324%2011.066C4.7652%2011.5072%205.31671%2011.74%205.97852%2011.7645C6.64032%2011.74%207.19183%2011.5072%207.63303%2011.066C8.07423%2010.6247%208.30709%2010.0732%208.3316%209.41144V3.52872ZM2.44888%203.52872C2.47339%202.52375%202.81655%201.69037%203.47836%201.02856C4.14017%200.366755%204.97355%200.0235958%205.97852%20-0.000915527C6.98348%200.0235958%207.81687%200.366755%208.47867%201.02856C9.14048%201.69037%209.48364%202.52375%209.50815%203.52872V9.41144C9.48364%2010.4164%209.14048%2011.2498%208.47867%2011.9116C7.81687%2012.5734%206.98348%2012.9166%205.97852%2012.9411C4.97355%2012.9166%204.14017%2012.5734%203.47836%2011.9116C2.81655%2011.2498%202.47339%2010.4164%202.44888%209.41144V3.52872ZM1.27234%207.64662V9.41144C1.29685%2010.7351%201.75031%2011.8503%202.63272%2012.7572C3.53964%2013.6396%204.6549%2014.0931%205.97852%2014.1176C7.30213%2014.0931%208.41739%2013.6396%209.32431%2012.7572C10.2067%2011.8503%2010.6602%2010.7351%2010.6847%209.41144V7.64662C10.7092%207.27895%2010.9053%207.08286%2011.273%207.05835C11.6406%207.08286%2011.8367%207.27895%2011.8612%207.64662V9.41144C11.8367%2010.9802%2011.322%2012.3038%2010.317%2013.3823C9.33657%2014.4608%208.08649%2015.0858%206.56679%2015.2574V17.6472H8.91988C9.28755%2017.6718%209.48364%2017.8678%209.50815%2018.2355C9.48364%2018.6032%209.28755%2018.7993%208.91988%2018.8238H5.97852H3.03716C2.66949%2018.7993%202.47339%2018.6032%202.44888%2018.2355C2.47339%2017.8678%202.66949%2017.6718%203.03716%2017.6472H5.39024V15.2574C3.87054%2015.0858%202.62046%2014.4608%201.64001%2013.3823C0.635044%2012.3038%200.120306%2010.9802%200.0957947%209.41144V7.64662C0.120306%207.27895%200.316397%207.08286%200.684067%207.05835C1.05174%207.08286%201.24783%207.27895%201.27234%207.64662Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                ) : null}
                {isSpeakingVisible ? (
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "interview-mic-speaking-wrapper"
                    )}
                    tag="div"
                    {...onClickMicStop}
                  >
                    {slotMicSpeakingLottie}
                  </_Builtin.Block>
                ) : null}
                {isMicSubmitButtonDisable ? (
                  <_Builtin.Block
                    className={_utils.cx(_styles, "disable-all-btn-interview")}
                    tag="div"
                  />
                ) : null}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "submit-btn-wrapers-inter")}
                tag="div"
                {...onClickSubmit}
              >
                <_Builtin.Block tag="div">{"Submit"}</_Builtin.Block>
                {isMicSubmitButtonDisable ? (
                  <_Builtin.Block
                    className={_utils.cx(_styles, "disable-all-btn-interview")}
                    tag="div"
                  />
                ) : null}
              </_Builtin.Block>
              {isAllButtonDisable ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "disable-all-btn-interview")}
                  tag="div"
                />
              ) : null}
              <_Builtin.Block
                className={_utils.cx(_styles, "transcript-show-mobile")}
                data-w-id="20915f7f-f20c-c8c9-8b6c-c9d3833101ca"
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2214%22%20height%3D%228%22%20viewbox%3D%220%200%2014%208%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.83594%200.867188C6.94531%200.794271%207.05469%200.794271%207.16406%200.867188L13.0703%206.77344C13.1432%206.88281%2013.1432%206.99219%2013.0703%207.10156C12.9609%207.17448%2012.8516%207.17448%2012.7422%207.10156L7%201.33203L1.25781%207.10156C1.14844%207.17448%201.03906%207.17448%200.929688%207.10156C0.856771%206.99219%200.856771%206.88281%200.929688%206.77344L6.83594%200.867188Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isInterviewStartVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "interview-screen-start-wrap")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-615")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-start-inteview")}
                tag="div"
              >
                {textheader}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-614")}
                tag="div"
                {...onClickStart}
              >
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "text-color-white",
                    "fw-semibold"
                  )}
                  tag="div"
                >
                  {textButton}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      {isTimerVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "time-wrappers-interview-new")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "time-dot-active")}
            tag="div"
            {...propsDotColor}
          />
          <_Builtin.Block tag="div">{textTimer}</_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
