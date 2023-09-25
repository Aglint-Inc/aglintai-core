import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { WelcomeSlider6 } from "./WelcomeSlider6";
import * as _utils from "./utils";
import _styles from "./SignupSlider.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-826":{"id":"e-826","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-345","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-827"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".ju-redirect-link.sign-in","originalId":"650c129b14ba3ec43088ffe0|0eceb87e-fa39-97e0-b799-497146b03323","appliesTo":"CLASS"},"targets":[{"selector":".ju-redirect-link.sign-in","originalId":"650c129b14ba3ec43088ffe0|0eceb87e-fa39-97e0-b799-497146b03323","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694684648206}},"actionLists":{"a-345":{"id":"a-345","title":"login-[open]","actionItemGroups":[{"actionItems":[{"id":"a-345-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".auth-right-block","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-345-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".auth-right-block","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba"]},"value":"none"}},{"id":"a-345-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".auth-right-block.login","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba","9b76f671-e79b-6a67-4574-de8fce2fd55a"]},"value":"flex"}}]},{"actionItems":[{"id":"a-345-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".auth-right-block.login","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba","9b76f671-e79b-6a67-4574-de8fce2fd55a"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694684755830}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function SignupSlider({
  as: _Component = _Builtin.Block,
  slotRightSlider,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "div-block-258")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "auth-wrapper")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "join-us-wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "auth-left-wrapper")}
            id={_utils.cx(
              _styles,
              "w-node-af2c0f8a-d69c-130e-d1d1-a38a2d802199-2d802196"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "auth-icon-block")}
              tag="div"
            >
              <_Builtin.Image
                loading="lazy"
                width="auto"
                height="auto"
                alt="__wf_reserved_inherit"
                src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890203_App%20Logo.svg"
              />
            </_Builtin.Block>
            <_Builtin.SliderWrapper
              className={_utils.cx(_styles, "auth-slider")}
              navSpacing={3}
              navShadow={false}
              autoplay={true}
              delay={4000}
              iconArrows={true}
              animation="slide"
              navNumbers={true}
              easing="ease"
              navRound={true}
              hideArrows={false}
              disableSwipe={false}
              duration={500}
              infinite={true}
              autoMax={0}
              navInvert={false}
            >
              <_Builtin.SliderMask>
                <_Builtin.SliderSlide tag="div">
                  <_Builtin.Block
                    className={_utils.cx(_styles, "auth-left-block")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "auth-quote-block")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "flex-vertical-left",
                          "gap-32"
                        )}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "quote-icon-block")}
                          tag="div"
                        >
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "embed-icon")}
                            value="%3Csvg%20width%3D%2244%22%20height%3D%2235%22%20viewbox%3D%220%200%2044%2035%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M37.7734%200.181918C39.7266%200.181918%2040.7031%200.572543%2040.7031%201.35379C40.7031%201.68861%2040.3962%201.96763%2039.7824%202.19085C34.6484%204.25558%2032.0815%208.27344%2032.0815%2014.2444C32.8627%2014.1328%2033.4208%2014.077%2033.7556%2014.077C40.452%2014.077%2043.8002%2017.4252%2043.8002%2024.1217C43.8002%2030.7623%2040.452%2034.0826%2033.7556%2034.0826C25.9989%2034.0826%2022.1205%2029.8136%2022.1205%2021.2757C22.1205%2012.0681%2025.8315%205.45536%2033.2533%201.4375C34.8158%200.600445%2036.3225%200.181918%2037.7734%200.181918ZM15.9263%200.433034C17.8795%200.433034%2018.856%200.823659%2018.856%201.60491C18.856%201.93973%2018.5491%202.21875%2017.9353%202.44196C12.8013%204.50669%2010.2344%208.52455%2010.2344%2014.4955C11.0156%2014.3839%2011.5737%2014.3281%2011.9085%2014.3281C18.6049%2014.3281%2021.9531%2017.6763%2021.9531%2024.3728C21.9531%2031.0134%2018.6049%2034.3337%2011.9085%2034.3337C4.15179%2034.3337%200.273438%2030.0647%200.273438%2021.5268C0.273438%2012.3192%203.98438%205.70647%2011.4063%201.68861C12.9688%200.851561%2014.4754%200.433034%2015.9263%200.433034Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                        </_Builtin.Block>
                        <_Builtin.Paragraph
                          className={_utils.cx(
                            _styles,
                            "text-xl",
                            "fw-semibold",
                            "text-white"
                          )}
                        >
                          {
                            "Aglint's candidate screening tool has been a game-changer for our hiring process. It not only slashed our screening time in half but also significantly improved the quality of candidates we interview. A must-have for any busy HR team!"
                          }
                        </_Builtin.Paragraph>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "ju-profile-block")}
                        tag="div"
                      >
                        <_Builtin.Image
                          className={_utils.cx(
                            _styles,
                            "join-us-profile-image"
                          )}
                          loading="lazy"
                          width="auto"
                          height="auto"
                          alt="__wf_reserved_inherit"
                          src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890204_Rectangle%20344.png"
                        />
                        <_Builtin.Block
                          className={_utils.cx(_styles, "div-block-255")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "text-sm",
                              "fw-semibold"
                            )}
                            tag="div"
                          >
                            {"Sarah Lee"}
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "text-sm",
                              "fw-semibold"
                            )}
                            tag="div"
                          >
                            {"Recruiter, EliteRecruit Agency"}
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Image
                      className={_utils.cx(_styles, "bg-image")}
                      loading="lazy"
                      width="auto"
                      height="auto"
                      alt="__wf_reserved_inherit"
                      src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890202_9b293bfefab6eb73a37b2d3b8de37b30.jpg"
                    />
                    <_Builtin.Block
                      className={_utils.cx(_styles, "bg-image-overlay")}
                      tag="div"
                    />
                  </_Builtin.Block>
                </_Builtin.SliderSlide>
                <_Builtin.SliderSlide tag="div">
                  <_Builtin.Block
                    className={_utils.cx(_styles, "auth-left-block")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "auth-quote-block")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "flex-vertical-left",
                          "gap-32"
                        )}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "quote-icon-block")}
                          tag="div"
                        >
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "embed-icon")}
                            value="%3Csvg%20width%3D%2244%22%20height%3D%2235%22%20viewbox%3D%220%200%2044%2035%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M37.7734%200.181918C39.7266%200.181918%2040.7031%200.572543%2040.7031%201.35379C40.7031%201.68861%2040.3962%201.96763%2039.7824%202.19085C34.6484%204.25558%2032.0815%208.27344%2032.0815%2014.2444C32.8627%2014.1328%2033.4208%2014.077%2033.7556%2014.077C40.452%2014.077%2043.8002%2017.4252%2043.8002%2024.1217C43.8002%2030.7623%2040.452%2034.0826%2033.7556%2034.0826C25.9989%2034.0826%2022.1205%2029.8136%2022.1205%2021.2757C22.1205%2012.0681%2025.8315%205.45536%2033.2533%201.4375C34.8158%200.600445%2036.3225%200.181918%2037.7734%200.181918ZM15.9263%200.433034C17.8795%200.433034%2018.856%200.823659%2018.856%201.60491C18.856%201.93973%2018.5491%202.21875%2017.9353%202.44196C12.8013%204.50669%2010.2344%208.52455%2010.2344%2014.4955C11.0156%2014.3839%2011.5737%2014.3281%2011.9085%2014.3281C18.6049%2014.3281%2021.9531%2017.6763%2021.9531%2024.3728C21.9531%2031.0134%2018.6049%2034.3337%2011.9085%2034.3337C4.15179%2034.3337%200.273438%2030.0647%200.273438%2021.5268C0.273438%2012.3192%203.98438%205.70647%2011.4063%201.68861C12.9688%200.851561%2014.4754%200.433034%2015.9263%200.433034Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                        </_Builtin.Block>
                        <_Builtin.Paragraph
                          className={_utils.cx(
                            _styles,
                            "text-xl",
                            "fw-semibold",
                            "text-white"
                          )}
                        >
                          {
                            "With Aglint, we've cut our candidate screening time by 50% while boosting the caliber of applicants. An indispensable tool for HR efficiency!"
                          }
                        </_Builtin.Paragraph>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "ju-profile-block")}
                        tag="div"
                      >
                        <_Builtin.Image
                          className={_utils.cx(
                            _styles,
                            "join-us-profile-image"
                          )}
                          loading="lazy"
                          width="auto"
                          height="auto"
                          alt="__wf_reserved_inherit"
                          src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890204_Rectangle%20344.png"
                        />
                        <_Builtin.Block
                          className={_utils.cx(_styles, "div-block-255")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "text-sm",
                              "fw-semibold"
                            )}
                            tag="div"
                          >
                            {"Sarah Lee"}
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "text-sm",
                              "fw-semibold"
                            )}
                            tag="div"
                          >
                            {"Recruiter, EliteRecruit Agency"}
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Image
                      className={_utils.cx(_styles, "bg-image")}
                      loading="lazy"
                      width="auto"
                      height="auto"
                      alt="__wf_reserved_inherit"
                      src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890205_5cc2627731d6bb27a233e9d1e4fc90f7.jpg"
                    />
                    <_Builtin.Block
                      className={_utils.cx(_styles, "bg-image-overlay")}
                      tag="div"
                    />
                  </_Builtin.Block>
                </_Builtin.SliderSlide>
                <_Builtin.SliderSlide tag="div">
                  <_Builtin.Block
                    className={_utils.cx(_styles, "auth-left-block")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "auth-quote-block")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "flex-vertical-left",
                          "gap-32"
                        )}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "quote-icon-block")}
                          tag="div"
                        >
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "embed-icon")}
                            value="%3Csvg%20width%3D%2244%22%20height%3D%2235%22%20viewbox%3D%220%200%2044%2035%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M37.7734%200.181918C39.7266%200.181918%2040.7031%200.572543%2040.7031%201.35379C40.7031%201.68861%2040.3962%201.96763%2039.7824%202.19085C34.6484%204.25558%2032.0815%208.27344%2032.0815%2014.2444C32.8627%2014.1328%2033.4208%2014.077%2033.7556%2014.077C40.452%2014.077%2043.8002%2017.4252%2043.8002%2024.1217C43.8002%2030.7623%2040.452%2034.0826%2033.7556%2034.0826C25.9989%2034.0826%2022.1205%2029.8136%2022.1205%2021.2757C22.1205%2012.0681%2025.8315%205.45536%2033.2533%201.4375C34.8158%200.600445%2036.3225%200.181918%2037.7734%200.181918ZM15.9263%200.433034C17.8795%200.433034%2018.856%200.823659%2018.856%201.60491C18.856%201.93973%2018.5491%202.21875%2017.9353%202.44196C12.8013%204.50669%2010.2344%208.52455%2010.2344%2014.4955C11.0156%2014.3839%2011.5737%2014.3281%2011.9085%2014.3281C18.6049%2014.3281%2021.9531%2017.6763%2021.9531%2024.3728C21.9531%2031.0134%2018.6049%2034.3337%2011.9085%2034.3337C4.15179%2034.3337%200.273438%2030.0647%200.273438%2021.5268C0.273438%2012.3192%203.98438%205.70647%2011.4063%201.68861C12.9688%200.851561%2014.4754%200.433034%2015.9263%200.433034Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                        </_Builtin.Block>
                        <_Builtin.Paragraph
                          className={_utils.cx(
                            _styles,
                            "text-xl",
                            "fw-semibold",
                            "text-white"
                          )}
                        >
                          {
                            "Aglint delivers where it matters: saving time without sacrificing quality. Our team couldn't be happier with the high-caliber candidates."
                          }
                        </_Builtin.Paragraph>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "ju-profile-block")}
                        tag="div"
                      >
                        <_Builtin.Image
                          className={_utils.cx(
                            _styles,
                            "join-us-profile-image"
                          )}
                          loading="lazy"
                          width="auto"
                          height="auto"
                          alt="__wf_reserved_inherit"
                          src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890204_Rectangle%20344.png"
                        />
                        <_Builtin.Block
                          className={_utils.cx(_styles, "div-block-255")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "text-sm",
                              "fw-semibold"
                            )}
                            tag="div"
                          >
                            {"Sarah Lee"}
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "text-sm",
                              "fw-semibold"
                            )}
                            tag="div"
                          >
                            {"Recruiter, EliteRecruit Agency"}
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Image
                      className={_utils.cx(_styles, "bg-image")}
                      loading="lazy"
                      width="auto"
                      height="auto"
                      alt="__wf_reserved_inherit"
                      src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec43089020d_33bc4fe49822f82b171f0daf6928f26e-min.jpg"
                    />
                    <_Builtin.Block
                      className={_utils.cx(_styles, "bg-image-overlay")}
                      tag="div"
                    />
                  </_Builtin.Block>
                </_Builtin.SliderSlide>
                <_Builtin.SliderSlide tag="div">
                  <_Builtin.Block
                    className={_utils.cx(_styles, "auth-left-block")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "auth-quote-block")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "flex-vertical-left",
                          "gap-32"
                        )}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "quote-icon-block")}
                          tag="div"
                        >
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "embed-icon")}
                            value="%3Csvg%20width%3D%2244%22%20height%3D%2235%22%20viewbox%3D%220%200%2044%2035%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M37.7734%200.181918C39.7266%200.181918%2040.7031%200.572543%2040.7031%201.35379C40.7031%201.68861%2040.3962%201.96763%2039.7824%202.19085C34.6484%204.25558%2032.0815%208.27344%2032.0815%2014.2444C32.8627%2014.1328%2033.4208%2014.077%2033.7556%2014.077C40.452%2014.077%2043.8002%2017.4252%2043.8002%2024.1217C43.8002%2030.7623%2040.452%2034.0826%2033.7556%2034.0826C25.9989%2034.0826%2022.1205%2029.8136%2022.1205%2021.2757C22.1205%2012.0681%2025.8315%205.45536%2033.2533%201.4375C34.8158%200.600445%2036.3225%200.181918%2037.7734%200.181918ZM15.9263%200.433034C17.8795%200.433034%2018.856%200.823659%2018.856%201.60491C18.856%201.93973%2018.5491%202.21875%2017.9353%202.44196C12.8013%204.50669%2010.2344%208.52455%2010.2344%2014.4955C11.0156%2014.3839%2011.5737%2014.3281%2011.9085%2014.3281C18.6049%2014.3281%2021.9531%2017.6763%2021.9531%2024.3728C21.9531%2031.0134%2018.6049%2034.3337%2011.9085%2034.3337C4.15179%2034.3337%200.273438%2030.0647%200.273438%2021.5268C0.273438%2012.3192%203.98438%205.70647%2011.4063%201.68861C12.9688%200.851561%2014.4754%200.433034%2015.9263%200.433034Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                        </_Builtin.Block>
                        <_Builtin.Paragraph
                          className={_utils.cx(
                            _styles,
                            "text-xl",
                            "fw-semibold",
                            "text-white"
                          )}
                        >
                          {
                            "Aglint has transformed our hiring workflow, offering us both speed and precision. It's the perfect blend for finding the best talent quickly."
                          }
                        </_Builtin.Paragraph>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "ju-profile-block")}
                        tag="div"
                      >
                        <_Builtin.Image
                          className={_utils.cx(
                            _styles,
                            "join-us-profile-image"
                          )}
                          loading="lazy"
                          width="auto"
                          height="auto"
                          alt="__wf_reserved_inherit"
                          src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890204_Rectangle%20344.png"
                        />
                        <_Builtin.Block
                          className={_utils.cx(_styles, "div-block-255")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "text-sm",
                              "fw-semibold"
                            )}
                            tag="div"
                          >
                            {"Raj Patel"}
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "text-sm",
                              "fw-semibold"
                            )}
                            tag="div"
                          >
                            {"Hiring Manager, GreenWorld Renewables"}
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Image
                      className={_utils.cx(_styles, "bg-image")}
                      loading="lazy"
                      width="auto"
                      height="auto"
                      alt="__wf_reserved_inherit"
                      src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec43089020c_76f9501969c1f1d3f67bfa5f8cb9acc8-min.jpg"
                    />
                    <_Builtin.Block
                      className={_utils.cx(_styles, "bg-image-overlay")}
                      tag="div"
                    />
                  </_Builtin.Block>
                </_Builtin.SliderSlide>
                <_Builtin.SliderSlide tag="div">
                  <_Builtin.Block
                    className={_utils.cx(_styles, "auth-left-block")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "auth-quote-block")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "flex-vertical-left",
                          "gap-32"
                        )}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "quote-icon-block")}
                          tag="div"
                        >
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "embed-icon")}
                            value="%3Csvg%20width%3D%2244%22%20height%3D%2235%22%20viewbox%3D%220%200%2044%2035%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M37.7734%200.181918C39.7266%200.181918%2040.7031%200.572543%2040.7031%201.35379C40.7031%201.68861%2040.3962%201.96763%2039.7824%202.19085C34.6484%204.25558%2032.0815%208.27344%2032.0815%2014.2444C32.8627%2014.1328%2033.4208%2014.077%2033.7556%2014.077C40.452%2014.077%2043.8002%2017.4252%2043.8002%2024.1217C43.8002%2030.7623%2040.452%2034.0826%2033.7556%2034.0826C25.9989%2034.0826%2022.1205%2029.8136%2022.1205%2021.2757C22.1205%2012.0681%2025.8315%205.45536%2033.2533%201.4375C34.8158%200.600445%2036.3225%200.181918%2037.7734%200.181918ZM15.9263%200.433034C17.8795%200.433034%2018.856%200.823659%2018.856%201.60491C18.856%201.93973%2018.5491%202.21875%2017.9353%202.44196C12.8013%204.50669%2010.2344%208.52455%2010.2344%2014.4955C11.0156%2014.3839%2011.5737%2014.3281%2011.9085%2014.3281C18.6049%2014.3281%2021.9531%2017.6763%2021.9531%2024.3728C21.9531%2031.0134%2018.6049%2034.3337%2011.9085%2034.3337C4.15179%2034.3337%200.273438%2030.0647%200.273438%2021.5268C0.273438%2012.3192%203.98438%205.70647%2011.4063%201.68861C12.9688%200.851561%2014.4754%200.433034%2015.9263%200.433034Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                        </_Builtin.Block>
                        <_Builtin.Paragraph
                          className={_utils.cx(
                            _styles,
                            "text-xl",
                            "fw-semibold",
                            "text-white"
                          )}
                        >
                          {
                            "Streamlined and effective, Aglint makes candidate screening a breeze, freeing up our time without compromising on quality."
                          }
                        </_Builtin.Paragraph>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "ju-profile-block")}
                        tag="div"
                      >
                        <_Builtin.Image
                          className={_utils.cx(
                            _styles,
                            "join-us-profile-image"
                          )}
                          loading="lazy"
                          width="auto"
                          height="auto"
                          alt="__wf_reserved_inherit"
                          src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890204_Rectangle%20344.png"
                        />
                        <_Builtin.Block
                          className={_utils.cx(_styles, "div-block-255")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "text-sm",
                              "fw-semibold"
                            )}
                            tag="div"
                          >
                            {"Raj Patel"}
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "text-sm",
                              "fw-semibold"
                            )}
                            tag="div"
                          >
                            {"Hiring Manager, GreenWorld Renewables"}
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Image
                      className={_utils.cx(_styles, "bg-image")}
                      loading="lazy"
                      width="auto"
                      height="auto"
                      alt="__wf_reserved_inherit"
                      src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec43089020c_76f9501969c1f1d3f67bfa5f8cb9acc8-min.jpg"
                    />
                    <_Builtin.Block
                      className={_utils.cx(_styles, "bg-image-overlay")}
                      tag="div"
                    />
                  </_Builtin.Block>
                </_Builtin.SliderSlide>
                <_Builtin.SliderSlide tag="div">
                  <_Builtin.Block
                    className={_utils.cx(_styles, "auth-left-block")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "auth-quote-block")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "flex-vertical-left",
                          "gap-32"
                        )}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "quote-icon-block")}
                          tag="div"
                        >
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "embed-icon")}
                            value="%3Csvg%20width%3D%2244%22%20height%3D%2235%22%20viewbox%3D%220%200%2044%2035%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M37.7734%200.181918C39.7266%200.181918%2040.7031%200.572543%2040.7031%201.35379C40.7031%201.68861%2040.3962%201.96763%2039.7824%202.19085C34.6484%204.25558%2032.0815%208.27344%2032.0815%2014.2444C32.8627%2014.1328%2033.4208%2014.077%2033.7556%2014.077C40.452%2014.077%2043.8002%2017.4252%2043.8002%2024.1217C43.8002%2030.7623%2040.452%2034.0826%2033.7556%2034.0826C25.9989%2034.0826%2022.1205%2029.8136%2022.1205%2021.2757C22.1205%2012.0681%2025.8315%205.45536%2033.2533%201.4375C34.8158%200.600445%2036.3225%200.181918%2037.7734%200.181918ZM15.9263%200.433034C17.8795%200.433034%2018.856%200.823659%2018.856%201.60491C18.856%201.93973%2018.5491%202.21875%2017.9353%202.44196C12.8013%204.50669%2010.2344%208.52455%2010.2344%2014.4955C11.0156%2014.3839%2011.5737%2014.3281%2011.9085%2014.3281C18.6049%2014.3281%2021.9531%2017.6763%2021.9531%2024.3728C21.9531%2031.0134%2018.6049%2034.3337%2011.9085%2034.3337C4.15179%2034.3337%200.273438%2030.0647%200.273438%2021.5268C0.273438%2012.3192%203.98438%205.70647%2011.4063%201.68861C12.9688%200.851561%2014.4754%200.433034%2015.9263%200.433034Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                        </_Builtin.Block>
                        <_Builtin.Paragraph
                          className={_utils.cx(
                            _styles,
                            "text-xl",
                            "fw-semibold",
                            "text-white"
                          )}
                        >
                          {
                            "Morem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
                          }
                        </_Builtin.Paragraph>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "ju-profile-block")}
                        tag="div"
                      >
                        <_Builtin.Image
                          className={_utils.cx(
                            _styles,
                            "join-us-profile-image"
                          )}
                          loading="lazy"
                          width="auto"
                          height="auto"
                          alt="__wf_reserved_inherit"
                          src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890204_Rectangle%20344.png"
                        />
                        <_Builtin.Block
                          className={_utils.cx(_styles, "div-block-255")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "text-sm",
                              "fw-semibold"
                            )}
                            tag="div"
                          >
                            {"Raj Patel"}
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "text-sm",
                              "fw-semibold"
                            )}
                            tag="div"
                          >
                            {"Hiring Manager, GreenWorld Renewables"}
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Image
                      className={_utils.cx(_styles, "bg-image")}
                      loading="lazy"
                      width="auto"
                      height="auto"
                      alt="__wf_reserved_inherit"
                      src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890207_8c1682abd5555cad7cc95b890ef191e3-min.jpg"
                    />
                    <_Builtin.Block
                      className={_utils.cx(_styles, "bg-image-overlay")}
                      tag="div"
                    />
                  </_Builtin.Block>
                </_Builtin.SliderSlide>
              </_Builtin.SliderMask>
              <_Builtin.SliderArrow
                className={_utils.cx(_styles, "hide")}
                dir="left"
              >
                <_Builtin.Icon
                  widget={{
                    type: "icon",
                    icon: "slider-left",
                  }}
                />
              </_Builtin.SliderArrow>
              <_Builtin.SliderArrow
                className={_utils.cx(_styles, "hide")}
                dir="right"
              >
                <_Builtin.Icon
                  widget={{
                    type: "icon",
                    icon: "slider-right",
                  }}
                />
              </_Builtin.SliderArrow>
              <_Builtin.SliderNav className={_utils.cx(_styles, "hide")} />
            </_Builtin.SliderWrapper>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "auth-right-wrapper")}
            tag="div"
          >
            {slotRightSlider ?? (
              <>
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "hide")}
                  value="%3Cstyle%3E%0A.auth-right-block%3A%3A-webkit-scrollbar%20%7B%0A%20%20display%3A%20none%3B%0A%7D%0A%0A.auth-right-block%20%7B%0A%20%20-ms-overflow-style%3A%20none%3B%0A%20%20scrollbar-width%3A%20none%3B%0A%7D%0A%3C%2Fstyle%3E"
                />
                <WelcomeSlider6 />
                <_Builtin.Block
                  className={_utils.cx(_styles, "auth-right-bottom")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "ju-redirect-text",
                      "left-align"
                    )}
                    tag="div"
                  >
                    {"Need help? "}
                    <_Builtin.Link
                      className={_utils.cx(_styles, "ju-redirect-link")}
                      button={false}
                      options={{
                        href: "#",
                      }}
                    >
                      {"Contact Support"}
                    </_Builtin.Link>
                  </_Builtin.Block>
                </_Builtin.Block>
              </>
            )}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
