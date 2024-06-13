"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { CandidateAssesmentCard } from "./CandidateAssesmentCard";
import * as _utils from "./utils";
import _styles from "./CandidateLanding.module.css";

export function CandidateLanding({
  as: _Component = _Builtin.Block,
  slotLogo,
  textTitle = "Assessment for Senior Software Engineer",
  slotCandidateAssesmentCard,
  textCompanyName = "About",
  textAboutCompany = "Adidas is a San Francisco-based startup founded by successful founders who are passionate about making a difference in the talent development industry. Our team is in stealth mode, working hard to develop an all-in-one talent development platform that provides solutions to help companies develop, retain, and support their employees.",
  onClickAbout = {},
  slotInstructions,
  textTime = "30 minitues",
  isAboutCompnay = false,
  textAssessmentCount = "2",
}) {
  return (
    <_Component className={_utils.cx(_styles, "cand-land-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "cand-land-inner-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-966")}
          tag="div"
        >
          {slotLogo}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-xxl", "fw-semibold")}
          tag="div"
        >
          {textTitle}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "cand-ins-wrap")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "est-wrap")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "timer_flex")}
            tag="div"
          >
            <_Builtin.Block tag="div">
              <_Builtin.Span
                className={_utils.cx(_styles, "fw-semibold", "text-blue-500")}
              >
                {"Estimated Time :"}
              </_Builtin.Span>{" "}
            </_Builtin.Block>
            <_Builtin.Block tag="div">{textTime}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600")}
            tag="div"
          >
            {
              "Please ensure you have sufficient time to complete it in one sitting."
            }
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "est-wrap")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold", "text-blue-500")}
            tag="div"
          >
            {"Instructions"}
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            {slotInstructions ?? (
              <_Builtin.List
                className={_utils.cx(_styles, "list")}
                tag="ul"
                unstyled={false}
              >
                <_Builtin.ListItem>
                  <_Builtin.Span className={_utils.cx(_styles, "fw-semibold")}>
                    {"Quiet Environment"}
                  </_Builtin.Span>
                  <br />
                  {
                    "Choose a quiet place to take the interview where you will not be interrupted."
                  }
                </_Builtin.ListItem>
                <_Builtin.ListItem>
                  <_Builtin.Span className={_utils.cx(_styles, "fw-semibold")}>
                    {"Interruptions"}
                    <br />
                  </_Builtin.Span>
                  {
                    "If the interview is stopped for any reason, you will need to start over from the beginning."
                  }
                </_Builtin.ListItem>
                <_Builtin.ListItem>
                  <_Builtin.Span className={_utils.cx(_styles, "fw-semibold")}>
                    {"Question Types"}
                    <br />
                  </_Builtin.Span>
                  {
                    "The AI will ask you questions based on your resume and the job requirements. Prepare yourself accordingly."
                  }
                </_Builtin.ListItem>
                <_Builtin.ListItem>
                  <_Builtin.Span className={_utils.cx(_styles, "fw-semibold")}>
                    {"Answer Submission"}
                    <br />
                  </_Builtin.Span>
                  {
                    "You have the option to submit your answers via voice or by typing them out."
                  }
                </_Builtin.ListItem>
                <_Builtin.ListItem>
                  <_Builtin.Span className={_utils.cx(_styles, "fw-semibold")}>
                    {"Timing"}
                    <br />
                  </_Builtin.Span>
                  {
                    "You have the option to submit your answers via voice or by typing them out."
                  }
                </_Builtin.ListItem>
              </_Builtin.List>
            )}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "est-wrap")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "assessment_flex")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold", "text-blue-500")}
              tag="div"
            >
              {"Assesments - "}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold", "text-blue-500")}
              tag="div"
            >
              {textAssessmentCount}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-959")}
            tag="div"
          >
            {slotCandidateAssesmentCard ?? <CandidateAssesmentCard />}
          </_Builtin.Block>
        </_Builtin.Block>
        {isAboutCompnay ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "est-wrap", "gap-18")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-965")}
              tag="div"
              {...onClickAbout}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold", "text-blue-500")}
                tag="div"
              >
                {"About"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold", "text-blue-500")}
                tag="div"
              >
                {textCompanyName}
              </_Builtin.Block>
              <_Builtin.Block tag="div">
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons", "ml-4")}
                  value="%3Csvg%20width%3D%2212%22%20height%3D%2213%22%20viewbox%3D%220%200%2012%2013%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.875%200.5H11.625C11.8594%200.515625%2011.9844%200.640625%2012%200.875V4.625C11.9844%204.85938%2011.8594%204.98438%2011.625%205C11.3906%204.98438%2011.2656%204.85938%2011.25%204.625V1.78906L5.50781%207.50781C5.33594%207.66406%205.16406%207.66406%204.99219%207.50781C4.83594%207.33594%204.83594%207.16406%204.99219%206.99219L10.7109%201.25H7.875C7.64062%201.23437%207.51562%201.10938%207.5%200.875C7.51562%200.640625%207.64062%200.515625%207.875%200.5ZM1.5%201.25H4.875C5.10938%201.26563%205.23438%201.39062%205.25%201.625C5.23438%201.85938%205.10938%201.98437%204.875%202H1.5C1.28125%202%201.10156%202.07031%200.960938%202.21094C0.820312%202.35156%200.75%202.53125%200.75%202.75V11C0.75%2011.2188%200.820312%2011.3984%200.960938%2011.5391C1.10156%2011.6797%201.28125%2011.75%201.5%2011.75H9.75C9.96875%2011.75%2010.1484%2011.6797%2010.2891%2011.5391C10.4297%2011.3984%2010.5%2011.2188%2010.5%2011V7.625C10.5156%207.39062%2010.6406%207.26562%2010.875%207.25C11.1094%207.26562%2011.2344%207.39062%2011.25%207.625V11C11.2344%2011.4219%2011.0859%2011.7734%2010.8047%2012.0547C10.5234%2012.3359%2010.1719%2012.4844%209.75%2012.5H1.5C1.07812%2012.4844%200.726562%2012.3359%200.445312%2012.0547C0.164062%2011.7734%200.015625%2011.4219%200%2011V2.75C0.015625%202.32812%200.164062%201.97656%200.445312%201.69531C0.726562%201.41406%201.07812%201.26563%201.5%201.25Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-600")}
              tag="div"
            >
              {textAboutCompany}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "powered-footer-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600", "text-sm")}
          tag="div"
        >
          {"Powered By"}
        </_Builtin.Block>
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons")}
          value="%3Csvg%20width%3D%2280%22%20height%3D%2219%22%20viewbox%3D%220%200%2080%2019%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M15.7421%208.65936C13.5984%208.12219%2012.5241%207.85858%2011.783%207.11749C11.0419%206.37142%2010.7783%205.30206%2010.2411%203.15835L9.45025%200L8.65941%203.15835C8.12224%205.30206%207.85863%206.37639%207.11753%207.11749C6.37146%207.85858%205.30209%208.12219%203.15837%208.65936L0%209.4502L3.15837%2010.241C5.30209%2010.7782%206.37643%2011.0418%207.11753%2011.7829C7.85863%2012.529%208.12224%2013.5983%208.65941%2015.742L9.45025%2018.9004L10.2411%2015.742C10.7783%2013.5983%2011.0419%2012.524%2011.783%2011.7829C12.529%2011.0418%2013.5984%2010.7782%2015.7421%2010.241L18.9005%209.4502L15.7421%208.65936Z%22%20fill%3D%22%23FF6224%22%2F%3E%0A%3Cpath%20d%3D%22M25.438%2015.2093C24.771%2015.2093%2024.1484%2015.0907%2023.5702%2014.8535C23.0069%2014.6015%2022.5474%2014.2383%2022.1916%2013.7639C21.8507%2013.2747%2021.6802%2012.667%2021.6802%2011.9406C21.6802%2010.9029%2022.0434%2010.0728%2022.7697%209.4502C23.5109%208.82759%2024.6005%208.51629%2026.0384%208.51629H29.1514V8.22723C29.1514%207.57498%2028.9661%207.11544%2028.5955%206.84861C28.2398%206.58178%2027.5134%206.44837%2026.4164%206.44837C25.2157%206.44837%2024.0594%206.63367%2022.9476%207.00426V4.89187C23.4368%204.69916%2024.0298%204.54351%2024.7265%204.42491C25.438%204.2915%2026.2089%204.22479%2027.039%204.22479C28.6252%204.22479%2029.8482%204.55092%2030.7079%205.20317C31.5826%205.84059%2032.0199%206.87085%2032.0199%208.29394V14.9869H29.4183L29.2626%2014.0308C28.8475%2014.4014%2028.3361%2014.6904%2027.7283%2014.898C27.1206%2015.1055%2026.3571%2015.2093%2025.438%2015.2093ZM26.2608%2013.2303C26.9278%2013.2303%2027.506%2013.1191%2027.9952%2012.8967C28.4844%2012.6744%2028.8698%2012.3927%2029.1514%2012.0518V10.3841H26.1051C24.934%2010.3841%2024.3485%2010.8659%2024.3485%2011.8294C24.3485%2012.7633%2024.9859%2013.2303%2026.2608%2013.2303Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3Cpath%20d%3D%22M39.1067%2018.9004C38.321%2018.9004%2037.5131%2018.8485%2036.683%2018.7447C35.8677%2018.641%2035.1783%2018.4927%2034.615%2018.3V16.0542C35.208%2016.2469%2035.9047%2016.3952%2036.7052%2016.4989C37.5057%2016.6175%2038.2543%2016.6768%2038.951%2016.6768C39.9739%2016.6768%2040.7151%2016.6175%2041.1746%2016.4989C41.6342%2016.3952%2041.8639%2016.2025%2041.8639%2015.9208C41.8639%2015.6836%2041.7602%2015.5206%2041.5526%2015.4316C41.3599%2015.3427%2040.9448%2015.2982%2040.3074%2015.2982H37.439C35.5563%2015.2982%2034.615%2014.6015%2034.615%2013.208C34.615%2012.7781%2034.7336%2012.3853%2034.9708%2012.0295C35.208%2011.6738%2035.586%2011.3921%2036.1048%2011.1846C34.9041%2010.5768%2034.3037%209.55396%2034.3037%208.11605C34.3037%206.75226%2034.7262%205.76647%2035.5712%205.15869C36.4161%204.53609%2037.6688%204.22479%2039.329%204.22479C39.67%204.22479%2040.0406%204.25444%2040.4408%204.31374C40.8559%204.35821%2041.1672%204.40268%2041.3747%204.44715H45.3327L45.266%206.33719H43.5983C44.0579%206.76708%2044.2876%207.36745%2044.2876%208.13829C44.2876%209.22043%2043.9467%2010.0876%2043.2648%2010.7399C42.5829%2011.3773%2041.5749%2011.696%2040.2407%2011.696C40.0035%2011.696%2039.7738%2011.6886%2039.5514%2011.6738C39.3439%2011.6441%2039.1289%2011.6145%2038.9066%2011.5848C38.4618%2011.6441%2038.0838%2011.7479%2037.7725%2011.8961C37.476%2012.0444%2037.3278%2012.2445%2037.3278%2012.4965C37.3278%2012.8374%2037.6317%2013.0079%2038.2395%2013.0079H41.2191C42.2864%2013.0079%2043.1091%2013.2525%2043.6873%2013.7417C44.2654%2014.2161%2044.5545%2014.9128%2044.5545%2015.8319C44.5545%2016.8695%2044.0875%2017.6404%2043.1536%2018.1444C42.2197%2018.6484%2040.8707%2018.9004%2039.1067%2018.9004ZM39.3513%2010.0061C40.2407%2010.0061%2040.8559%209.85785%2041.1968%209.56137C41.5526%209.25007%2041.7305%208.73124%2041.7305%208.00487C41.7305%207.2785%2041.5526%206.75226%2041.1968%206.42613C40.8559%206.10001%2040.2407%205.93695%2039.3513%205.93695C38.5063%205.93695%2037.8985%206.10001%2037.5279%206.42613C37.1573%206.73743%2036.972%207.26368%2036.972%208.00487C36.972%208.68677%2037.1425%209.19078%2037.4835%209.5169C37.8392%209.84303%2038.4618%2010.0061%2039.3513%2010.0061Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3Cpath%20d%3D%22M50.303%2015.2093C49.2801%2015.2093%2048.5315%2014.9721%2048.0571%2014.4977C47.5976%2014.0233%2047.3678%2013.2673%2047.3678%2012.2297V0H50.3697V11.9851C50.3697%2012.3557%2050.4438%2012.6151%2050.592%2012.7633C50.7403%2012.8967%2050.9552%2012.9634%2051.2369%2012.9634C51.6223%2012.9634%2051.9707%2012.9116%2052.282%2012.8078V14.8757C51.7186%2015.0981%2051.059%2015.2093%2050.303%2015.2093Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3Cpath%20d%3D%22M54.1652%202.51264V0.15565H57.4339V2.51264H54.1652ZM54.4098%2014.9869V6.67073H52.8311L53.0979%204.44715H57.4117V14.9869H54.4098Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3Cpath%20d%3D%22M60.1899%2014.9869V4.44715H62.9694L63.0806%205.44776C63.5105%205.12163%2064.0516%204.83998%2064.7038%204.6028C65.3709%204.3508%2066.0676%204.22479%2066.794%204.22479C68.1874%204.22479%2069.2029%204.55092%2069.8403%205.20317C70.4777%205.85541%2070.7965%206.86344%2070.7965%208.22723V14.9869H67.7946V8.38288C67.7946%207.67133%2067.6464%207.16732%2067.3499%206.87085C67.0682%206.57437%2066.5346%206.42613%2065.7489%206.42613C65.2894%206.42613%2064.8224%206.5299%2064.348%206.73743C63.8885%206.94497%2063.5031%207.20438%2063.1918%207.51569V14.9869H60.1899Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3Cpath%20d%3D%22M77.6432%2015.2093C76.4276%2015.2093%2075.5234%2014.8905%2074.9304%2014.2531C74.3523%2013.6157%2074.0632%2012.7485%2074.0632%2011.6515V6.75967H72.5734V4.44715H74.0632V2.1791L77.0651%201.28967V4.44715H79.7334L79.5555%206.75967H77.0651V11.4514C77.0651%2012.0295%2077.1985%2012.4298%2077.4653%2012.6521C77.7321%2012.8597%2078.1472%2012.9634%2078.7105%2012.9634C79.1256%2012.9634%2079.5555%2012.8893%2080.0002%2012.7411V14.809C79.6741%2014.9424%2079.3183%2015.0388%2078.9329%2015.0981C78.5475%2015.1722%2078.1176%2015.2093%2077.6432%2015.2093Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600", "text-sm")}
          tag="div"
        >
          {"© 2024 Aglint Inc. All Rights Reserved"}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
