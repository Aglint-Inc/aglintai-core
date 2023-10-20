import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./InterviewCandidateScreen.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1372":{"id":"e-1372","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-481","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1373"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"d3d6afe1-d572-9dc3-b7ea-07463de05ba9","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d3d6afe1-d572-9dc3-b7ea-07463de05ba9","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697535473849},"e-1373":{"id":"e-1373","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-482","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1372"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"d3d6afe1-d572-9dc3-b7ea-07463de05ba9","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d3d6afe1-d572-9dc3-b7ea-07463de05ba9","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697535473852}},"actionLists":{"a-481":{"id":"a-481","title":"Interview Edit click 1","actionItemGroups":[{"actionItems":[{"id":"a-481-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".interview-edit-wrappers","selectorGuids":["45f418ac-3edd-15b7-9f9b-99278bec83f4"]},"value":"none"}},{"id":"a-481-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":200,"target":{"useEventTarget":"SIBLINGS","selector":".submit-btn-wrapers-inter","selectorGuids":["854a7a33-2cfd-1df7-a4b8-12c03083383d"]},"value":0.4,"unit":""}},{"id":"a-481-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":200,"target":{"useEventTarget":"SIBLINGS","selector":".mic-wrapper","selectorGuids":["65a49672-108a-ae7a-d138-b0273f3626f4"]},"value":0.4,"unit":""}},{"id":"a-481-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".interview-edit-done-wrapper","selectorGuids":["98623bb9-4ad5-3370-3393-409213362bc4"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1697535482499},"a-482":{"id":"a-482","title":"Interview Edit click 2","actionItemGroups":[{"actionItems":[{"id":"a-482-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".interview-edit-wrappers","selectorGuids":["45f418ac-3edd-15b7-9f9b-99278bec83f4"]},"value":"flex"}},{"id":"a-482-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":200,"target":{"useEventTarget":"SIBLINGS","selector":".submit-btn-wrapers-inter","selectorGuids":["854a7a33-2cfd-1df7-a4b8-12c03083383d"]},"value":1,"unit":""}},{"id":"a-482-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":200,"target":{"useEventTarget":"SIBLINGS","selector":".mic-wrapper","selectorGuids":["65a49672-108a-ae7a-d138-b0273f3626f4"]},"value":1,"unit":""}},{"id":"a-482-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".interview-edit-done-wrapper","selectorGuids":["98623bb9-4ad5-3370-3393-409213362bc4"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1697535482499}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
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
        <_Builtin.Block tag="div">{slotText}</_Builtin.Block>
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
                  value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewBox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M13.1902%202.06502C12.9976%201.89169%2012.7761%201.80503%2012.5258%201.80503C12.2754%201.80503%2012.0539%201.89169%2011.8613%202.06502L11.1102%202.84501L12.7569%204.49164L13.5369%203.74055C13.7102%203.54796%2013.7968%203.32648%2013.7968%203.07611C13.7968%202.82575%2013.7102%202.60427%2013.5369%202.41168L13.1902%202.06502ZM5.50589%208.44935C5.39033%208.5649%205.3133%208.70934%205.27478%208.88267L4.81257%2010.7893L6.7192%2010.356C6.89253%2010.2982%207.03697%2010.2115%207.15252%2010.096L12.0924%205.15608L10.4458%203.50944L5.50589%208.44935ZM11.2258%201.42948C11.611%201.06356%2012.0443%200.880599%2012.5258%200.880599C13.0265%200.880599%2013.4598%201.06356%2013.8257%201.42948L14.1724%201.77614C14.5383%202.16132%2014.7213%202.59464%2014.7213%203.07611C14.7213%203.57685%2014.5383%204.01017%2014.1724%204.37609L7.81695%2010.7604C7.56659%2011.0108%207.26808%2011.1745%206.92142%2011.2515L4.32146%2011.8582C4.14813%2011.8774%204.00369%2011.8293%203.88814%2011.7137C3.77258%2011.5982%203.72444%2011.4634%203.7437%2011.3093L4.35035%208.68046C4.42739%208.3338%204.59109%208.03528%204.84145%207.78492L11.2258%201.42948ZM2.35705%202.6139H6.05476C6.34365%202.63316%206.49772%202.78723%206.51698%203.07611C6.49772%203.365%206.34365%203.51907%206.05476%203.53833H2.35705C1.97188%203.55759%201.64448%203.6924%201.37485%203.94277C1.12448%204.21239%200.989672%204.53979%200.970413%204.92497V13.2448C0.989672%2013.63%201.12448%2013.9574%201.37485%2014.227C1.64448%2014.4774%201.97188%2014.6122%202.35705%2014.6315H10.6769C11.0621%2014.6122%2011.3895%2014.4774%2011.6591%2014.227C11.9095%2013.9574%2012.0443%2013.63%2012.0635%2013.2448V9.54711C12.0828%209.25822%2012.2369%209.10415%2012.5258%209.08489C12.8146%209.10415%2012.9687%209.25822%2012.988%209.54711V13.2448C12.9687%2013.8996%2012.7472%2014.4485%2012.3235%2014.8915C11.8806%2015.3152%2011.3317%2015.5366%2010.6769%2015.5559H2.35705C1.70225%2015.5366%201.15337%2015.3152%200.710418%2014.8915C0.286722%2014.4485%200.0652446%2013.8996%200.0459857%2013.2448V4.92497C0.0652446%204.27017%200.286722%203.72129%200.710418%203.27833C1.15337%202.85464%201.70225%202.63316%202.35705%202.6139Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "interview-edit-done-wrapper")}
                tag="div"
                {...onClickEditDone}
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2213%22%20height%3D%229%22%20viewBox%3D%220%200%2013%209%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M12.6821%200.12018C12.7591%200.235734%2012.7591%200.351287%2012.6821%200.466841L4.82447%208.32448C4.70892%208.40151%204.59337%208.40151%204.47781%208.32448L0.317891%204.16455C0.240855%204.049%200.240855%203.93344%200.317891%203.81789C0.433444%203.74086%200.548997%203.74086%200.664551%203.81789L4.65114%207.83337L12.3354%200.12018C12.451%200.0431447%2012.5666%200.0431447%2012.6821%200.12018Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fsvg%3E"
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
                    value="%3Csvg%20width%3D%2212%22%20height%3D%2219%22%20viewBox%3D%220%200%2012%2019%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M8.91988%203.52921C8.89536%202.69582%208.61348%201.99725%208.07423%201.43349C7.51047%200.894237%206.8119%200.612356%205.97852%200.587845C5.14513%200.612356%204.44656%200.894237%203.8828%201.43349C3.34355%201.99725%203.06167%202.69582%203.03716%203.52921V9.41193C3.06167%2010.2453%203.34355%2010.9439%203.8828%2011.5076C4.44656%2012.0469%205.14513%2012.3288%205.97852%2012.3533C6.8119%2012.3288%207.51047%2012.0469%208.07423%2011.5076C8.61348%2010.9439%208.89536%2010.2453%208.91988%209.41193V3.52921ZM2.44888%203.52921C2.47339%202.52424%202.81655%201.69086%203.47836%201.02905C4.14017%200.367243%204.97355%200.0240841%205.97852%20-0.000427246C6.98348%200.0240841%207.81687%200.367243%208.47867%201.02905C9.14048%201.69086%209.48364%202.52424%209.50815%203.52921V9.41193C9.48364%2010.4169%209.14048%2011.2503%208.47867%2011.9121C7.81687%2012.5739%206.98348%2012.917%205.97852%2012.9416C4.97355%2012.917%204.14017%2012.5739%203.47836%2011.9121C2.81655%2011.2503%202.47339%2010.4169%202.44888%209.41193V3.52921ZM0.684067%207.35297V9.41193C0.733089%2010.9071%201.24783%2012.1572%202.22828%2013.1622C3.23325%2014.1426%204.48332%2014.6574%205.97852%2014.7064C7.47371%2014.6574%208.72379%2014.1426%209.72875%2013.1622C10.7092%2012.1572%2011.2239%2010.9071%2011.273%209.41193V7.35297C11.2975%207.18139%2011.3955%207.08335%2011.5671%207.05884C11.7387%207.08335%2011.8367%207.18139%2011.8612%207.35297V9.41193C11.8122%2011.0297%2011.273%2012.3778%2010.2435%2013.4563C9.1895%2014.5593%207.86589%2015.1721%206.27265%2015.2946V18.236H9.21401C9.38559%2018.2605%209.48364%2018.3586%209.50815%2018.5301C9.48364%2018.7017%209.38559%2018.7998%209.21401%2018.8243H5.97852H2.74302C2.57144%2018.7998%202.47339%2018.7017%202.44888%2018.5301C2.47339%2018.3586%202.57144%2018.2605%202.74302%2018.236H5.68438V15.2946C4.09114%2015.1721%202.76753%2014.5593%201.71354%2013.4563C0.684067%2012.3778%200.144817%2011.0297%200.0957947%209.41193V7.35297C0.120306%207.18139%200.218351%207.08335%200.389931%207.05884C0.56151%207.08335%200.659555%207.18139%200.684067%207.35297Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
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
              tag="div"
            >
              <_Builtin.HtmlEmbed />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
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
