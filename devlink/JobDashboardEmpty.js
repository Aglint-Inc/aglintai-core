import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./JobDashboardEmpty.module.css";

export function JobDashboardEmpty({
  as: _Component = _Builtin.Block,
  onClickHowItWorks = {},
  onClickRequestIntegration = {},
  slotImport,
  onClickAddJob = {},
  onClickGreenHouse = {},
  textHeader = "Jobs",
  onClickIndeed = {},
  onClickLever = {},
  isOldTitleVisible = true,
  isSelectTitleVisible = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "job-dashboard-empty-landing-wrappers")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "job-header-empty", "no-sticky")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "text-lg", "fw-semibold")}
          tag="div"
        >
          {textHeader}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "job-empty-landing-wrappers")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-274")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cj-option-wrapper")}
            tag="div"
          >
            {isOldTitleVisible ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-374")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-xl", "fw-semibold")}
                  tag="div"
                >
                  {"Let's set up your first job for screening."}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-grey-700")}
                  tag="div"
                >
                  {
                    "Aglint assists you in sourcing and screening candidates by conducting assessments focused on skills, cultural fit, personality fit, soft skills, and more."
                  }
                </_Builtin.Block>
              </_Builtin.Block>
            ) : null}
            {isSelectTitleVisible ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "text-lg", "fw-semibold")}
                tag="div"
              >
                {"Select an option to continue with"}
              </_Builtin.Block>
            ) : null}
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "cj-option-block",
                "yellow-100",
                "small-card-add-job"
              )}
              tag="div"
              {...onClickAddJob}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "frame-1036")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-6")}
                  tag="div"
                >
                  {"Recommended"}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "cj-option-icon-block")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20d%3D%22M5.83317%204.16732V1.66732C5.83317%201.20708%206.20627%200.833984%206.6665%200.833984H13.3332C13.7934%200.833984%2014.1665%201.20708%2014.1665%201.66732V4.16732H17.4998C17.9601%204.16732%2018.3332%204.54042%2018.3332%205.00065V16.6673C18.3332%2017.1276%2017.9601%2017.5007%2017.4998%2017.5007H2.49984C2.0396%2017.5007%201.6665%2017.1276%201.6665%2016.6673V5.00065C1.6665%204.54042%202.0396%204.16732%202.49984%204.16732H5.83317ZM3.33317%2013.334V15.834H16.6665V13.334H3.33317ZM3.33317%2011.6673H16.6665V5.83398H3.33317V11.6673ZM7.49984%202.50065V4.16732H12.4998V2.50065H7.49984ZM9.1665%209.16732H10.8332V10.834H9.1665V9.16732Z%22%20fill%3D%22%23AD5918%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "cj-option-info")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "medium-bold-5")}
                  tag="div"
                >
                  {"Add Job"}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-grey-600")}
                  tag="div"
                >
                  {
                    "Craft your job listing effortlessly in just three simple steps with Aglint."
                  }
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "cj-imports-wrapper")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-375")}
              tag="div"
            >
              <_Builtin.Block tag="div">
                {"Or Connect with your Applicant Tracking System (ATS)"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-grey-600")}
                tag="div"
              >
                {
                  "If the applicant tracking system (ATS) you are using is not listed here, please don't hesitate to "
                }
                <_Builtin.Span
                  className={_utils.cx(
                    _styles,
                    "text-blue-500",
                    "cursor-pointer"
                  )}
                  {...onClickRequestIntegration}
                >
                  {"request integration"}
                </_Builtin.Span>
                {
                  ". In addition to ATS, we also support integrations with a variety of other tools such as Slack, Dropbox, Google Drive, and more to enhance your workflow and improve efficiency."
                }
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "cj-imports-options")}
              tag="div"
            >
              {slotImport ?? (
                <>
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
                        value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2232%22%20viewBox%3D%220%200%2016%2032%22%20fill%3D%22none%22%3E%0A%20%20%3Cg%20clip-path%3D%22url(%23clip0_2425_14921)%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M8.26568%2031.4574C4.15195%2031.5176%200.79769%2027.9891%200.87484%2023.912C0.907438%2021.951%201.71299%2020.0821%203.11628%2018.7119C4.51958%2017.3417%206.4071%2016.581%208.36832%2016.5953C12.2867%2016.6059%2015.5673%2019.9688%2015.6381%2023.8908C15.7132%2028.0457%2012.2881%2031.5211%208.26568%2031.4574ZM14.3138%2024.0734C14.3386%2020.7056%2011.6461%2017.9564%208.29754%2017.9309C4.94894%2017.9055%202.21966%2020.6136%202.19135%2023.9807C2.17398%2025.5989%202.79991%2027.1579%203.93154%2028.3147C5.06316%2029.4716%206.60786%2030.1318%208.22605%2030.1501C11.5378%2030.1918%2014.2891%2027.4455%2014.3138%2024.0734ZM0.889704%208.95081C0.883169%208.14682%201.03572%207.34948%201.33859%206.6047C1.64145%205.85991%202.08864%205.18239%202.65441%204.61115C3.22018%204.0399%203.89335%203.58621%204.63517%203.2762C5.37698%202.96619%206.17279%202.80597%206.97678%202.80479C10.3176%202.79842%2013.0695%205.55751%2013.0745%208.91754C13.0801%2012.3257%2010.3714%2015.0848%207.01076%2015.0947C3.60058%2015.1039%200.899613%2012.3915%200.889704%208.95081ZM2.22815%208.91258C2.22206%209.53578%202.33878%2010.1541%202.57164%2010.7322C2.80449%2011.3103%203.14893%2011.8368%203.58528%2012.2818C4.02163%2012.7268%204.54135%2013.0814%205.11476%2013.3256C5.68818%2013.5697%206.30405%2013.6984%206.92724%2013.7045C7.55042%2013.7106%208.16869%2013.5939%208.74677%2013.361C9.32484%2013.1282%209.85139%2012.7837%2010.2963%2012.3474C10.7413%2011.911%2011.096%2011.3913%2011.3401%2010.8178C11.5842%2010.2444%2011.713%209.62851%2011.719%209.00531C11.736%206.34885%209.63386%204.18292%207.01925%204.16168C4.39119%204.14328%202.24868%206.26674%202.22815%208.91258ZM10.5781%201.24192C10.5803%200.91133%2010.7138%200.595179%2010.9491%200.363013C11.0657%200.248056%2011.2037%200.157178%2011.3554%200.095567C11.507%200.0339563%2011.6693%200.00281976%2011.833%200.00393519C11.9967%200.00505062%2012.1585%200.0383961%2012.3093%200.102068C12.4601%200.16574%2012.5969%200.258491%2012.7119%200.375025C12.8268%200.49156%2012.9177%200.629596%2012.9793%200.781252C13.0409%200.932908%2013.0721%201.09521%2013.0709%201.2589C13.0727%201.42424%2013.0415%201.58826%2012.979%201.74134C12.9165%201.89442%2012.8241%202.03347%2012.7071%202.15032C12.5901%202.26717%2012.451%202.35946%2012.2978%202.42177C12.1447%202.48408%2011.9806%202.51515%2011.8153%202.51316C11.1146%202.50821%2010.5781%201.95611%2010.5781%201.24192Z%22%20fill%3D%22%2338B2A7%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3CclipPath%20id%3D%22clip0_2425_14921%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%2216%22%20height%3D%2231.5219%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%3C%2FclipPath%3E%0A%20%20%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
                      />
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cj-option-info")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "fw-semibold")}
                        tag="div"
                      >
                        {"Import Job from Greenhouse"}
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "text-grey-600")}
                        tag="div"
                      >
                        {
                          "Drop us a line at customersuccess@aglinthq.com with your integration request, and we'll handle everything for you!"
                        }
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "click-fake-div")}
                      tag="div"
                      {...onClickGreenHouse}
                    />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "cj-option-block",
                      "blue-100"
                    )}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cj-option-icon-block")}
                      tag="div"
                    >
                      <_Builtin.Image
                        className={_utils.cx(_styles, "image-39")}
                        loading="lazy"
                        width="auto"
                        height="auto"
                        alt=""
                        src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/65155ad6c1dcf28a5a3af3a0_SVGmix-XJma8a-indeed-member%201%20(2).svg"
                      />
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cj-option-info")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "fw-semibold",
                          "text-blue-800"
                        )}
                        tag="div"
                      >
                        {"Import Job from Indeed"}
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "text-grey-600")}
                        tag="div"
                      >
                        {
                          "Drop us a line at customersuccess@aglinthq.com with your integration request, and we'll handle everything for you!"
                        }
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "click-fake-div")}
                      tag="div"
                      {...onClickIndeed}
                    />
                    <_Builtin.Block
                      className={_utils.cx(_styles, "coming-soon-badges")}
                      tag="div"
                    >
                      <_Builtin.Block tag="div">{"Coming Soon"}</_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "cj-option-block",
                      "kale-100"
                    )}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cj-option-icon-block")}
                      tag="div"
                    >
                      <_Builtin.Image
                        className={_utils.cx(_styles, "image-38")}
                        loading="lazy"
                        width="auto"
                        height="auto"
                        alt=""
                        src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/65155ad803eafe8aa1c3b68c_lever_rgb_logo_standard%201%20(2).svg"
                      />
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cj-option-info")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "fw-semibold",
                          "text-kale-800"
                        )}
                        tag="div"
                      >
                        {"Import Job from Lever"}
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "text-grey-600")}
                        tag="div"
                      >
                        {
                          "Drop us a line at customersuccess@aglinthq.com with your integration request, and we'll handle everything for you!"
                        }
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "click-fake-div")}
                      tag="div"
                      {...onClickLever}
                    />
                  </_Builtin.Block>
                </>
              )}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
