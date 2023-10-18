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
                  value="%3Csvg%20width%3D%2215%22%20height%3D%2215%22%20viewBox%3D%220%200%2015%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M13.3346%200.920091C13.1035%200.688985%2012.8339%200.573431%2012.5258%200.573431C12.2176%200.573431%2011.948%200.688985%2011.7169%200.920091L10.7636%201.84452L12.7569%203.83782L13.6813%202.8845C13.9124%202.65339%2014.028%202.38377%2014.028%202.07563C14.028%201.76748%2013.9124%201.49786%2013.6813%201.26675L13.3346%200.920091ZM5.10145%207.50664C4.94738%207.66071%204.85108%207.84367%204.81257%208.05552L4.29257%2010.3088L6.54587%209.78882C6.75772%209.7503%206.94067%209.65401%207.09475%209.49993L12.4391%204.15559L10.4458%202.16229L5.10145%207.50664ZM11.3702%200.573431C11.7169%200.265289%2012.1021%200.111217%2012.5258%200.111217C12.9495%200.111217%2013.3346%200.265289%2013.6813%200.573431L14.028%200.920091C14.3361%201.26675%2014.4902%201.65193%2014.4902%202.07563C14.4902%202.49932%2014.3361%202.8845%2014.028%203.23116L7.41252%209.81771C7.20067%2010.0296%206.94067%2010.174%206.63253%2010.251L4.03258%2010.8577C3.93629%2010.8769%203.85925%2010.8577%203.80147%2010.7999C3.7437%2010.7229%203.72444%2010.6458%203.7437%2010.5688L4.35035%207.96885C4.42739%207.66071%204.57183%207.40071%204.78368%207.18887L11.3702%200.573431ZM2.12595%201.61341H6.28587C6.42068%201.63267%206.49772%201.70971%206.51698%201.84452C6.49772%201.97933%206.42068%202.05637%206.28587%202.07563H2.12595C1.66373%202.09488%201.27856%202.24896%200.970413%202.53784C0.68153%202.84598%200.527458%203.23116%200.508199%203.69337V12.4754C0.527458%2012.9376%200.68153%2013.3228%200.970413%2013.631C1.27856%2013.9199%201.66373%2014.0739%202.12595%2014.0932H10.908C11.3702%2014.0739%2011.7554%2013.9199%2012.0635%2013.631C12.3524%2013.3228%2012.5065%2012.9376%2012.5258%2012.4754V8.31551C12.545%208.1807%2012.6221%208.10366%2012.7569%208.08441C12.8917%208.10366%2012.9687%208.1807%2012.988%208.31551V12.4754C12.9687%2013.0725%2012.7665%2013.5636%2012.3813%2013.9487C11.9961%2014.3339%2011.505%2014.5361%2010.908%2014.5554H2.12595C1.52892%2014.5361%201.03782%2014.3339%200.652641%2013.9487C0.267463%2013.5636%200.0652446%2013.0725%200.0459857%2012.4754V3.69337C0.0652446%203.09635%200.267463%202.60525%200.652641%202.22007C1.03782%201.83489%201.52892%201.63267%202.12595%201.61341Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
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
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "submit-btn-wrapers-inter")}
              tag="div"
              {...onClickSubmit}
            >
              <_Builtin.Block tag="div">{"Submit"}</_Builtin.Block>
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
