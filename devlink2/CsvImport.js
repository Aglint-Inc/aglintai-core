import React from 'react';
import * as _Builtin from './_Builtin';
import { CsvListItem } from './CsvListItem';
import * as _utils from './utils';
import _styles from './CsvImport.module.css';

export function CsvImport({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, 'csv-import-wrapper')} tag='div'>
      <_Builtin.Block className={_utils.cx(_styles, 'csv-imp-top')} tag='div'>
        <_Builtin.Block
          className={_utils.cx(_styles, 'text-gray-600')}
          tag='div'
        >
          {'Listing 0 candidates'}
        </_Builtin.Block>
        <_Builtin.Block tag='div' />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, 'csv-imp-body')} tag='div'>
        <_Builtin.Block
          className={_utils.cx(_styles, 'csv-list-item')}
          tag='div'
        >
          <_Builtin.Block
            className={_utils.cx(_styles, 'csv-list-item-column', 'candidate')}
            tag='div'
          >
            <_Builtin.Block
              className={_utils.cx(_styles, 'icon-block', '_16x16')}
              tag='div'
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, 'svg-icon')}
                value='%3Csvg%20width%3D%2211%22%20height%3D%2211%22%20viewBox%3D%220%200%2011%2011%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.04629%209.86845C2.02661%2010.0948%201.82713%2010.2624%201.60074%2010.2427C1.37435%2010.223%201.20678%2010.0235%201.22647%209.79716C1.40781%207.71177%203.21195%206.12967%205.33951%206.12967C7.46707%206.12967%209.27121%207.71177%209.45255%209.79716C9.47224%2010.0235%209.30467%2010.223%209.07828%2010.2427C8.8519%2010.2624%208.65241%2010.0948%208.63273%209.86845C8.48907%208.21638%207.0479%206.95259%205.33951%206.95259C3.63112%206.95259%202.18995%208.21638%202.04629%209.86845ZM5.33994%205.30665C3.97649%205.30665%202.87119%204.20135%202.87119%202.83789C2.87119%201.47444%203.97649%200.369141%205.33994%200.369141C6.7034%200.369141%207.8087%201.47444%207.8087%202.83789C7.8087%204.20135%206.7034%205.30665%205.33994%205.30665ZM5.33849%204.48307C6.24746%204.48307%206.98433%203.74621%206.98433%202.83724C6.98433%201.92827%206.24746%201.1914%205.33849%201.1914C4.42952%201.1914%203.69266%201.92827%203.69266%202.83724C3.69266%203.74621%204.42952%204.48307%205.33849%204.48307Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E'
              />
            </_Builtin.Block>
            <_Builtin.Block tag='div'>{'Candidate'}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, 'csv-list-item-column', 'job')}
            tag='div'
          >
            <_Builtin.Block
              className={_utils.cx(_styles, 'icon-block', '_16x16')}
              tag='div'
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, 'svg-icon')}
                value='%3Csvg%20width%3D%2213%22%20height%3D%2212%22%20viewBox%3D%220%200%2013%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_2282_75816)%22%3E%0A%3Cpath%20d%3D%22M3.86403%202.59983V1.15972C3.86403%200.894609%204.07895%200.679688%204.34406%200.679688H8.18434C8.44947%200.679688%208.66438%200.894609%208.66438%201.15972V2.59983H10.5845C10.8496%202.59983%2011.0646%202.81475%2011.0646%203.07986V9.80036C11.0646%2010.0655%2010.8496%2010.2804%2010.5845%2010.2804H1.94389C1.67877%2010.2804%201.46385%2010.0655%201.46385%209.80036V3.07986C1.46385%202.81475%201.67877%202.59983%201.94389%202.59983H3.86403ZM2.42392%207.88022V9.32032H10.1045V7.88022H2.42392ZM2.42392%206.92015H10.1045V3.5599H2.42392V6.92015ZM4.8241%201.63976V2.59983H7.70431V1.63976H4.8241ZM5.78417%205.48004H6.74424V6.44011H5.78417V5.48004Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3CclipPath%20id%3D%22clip0_2282_75816%22%3E%0A%3Crect%20width%3D%2211.5208%22%20height%3D%2211.5208%22%20fill%3D%22white%22%20transform%3D%22translate(0.503891%200.199219)%22%2F%3E%0A%3C%2FclipPath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E'
              />
            </_Builtin.Block>
            <_Builtin.Block tag='div'>{'LinkedIn'}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, 'csv-list-item-column', 'email')}
            tag='div'
          >
            <_Builtin.Block
              className={_utils.cx(_styles, 'icon-block', '_16x16')}
              tag='div'
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, 'svg-icon')}
                value='%3Csvg%20width%3D%2210%22%20height%3D%2210%22%20viewBox%3D%220%200%2010%2010%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M9.18117%200.845703H0.952034C0.497551%200.845703%200.12912%201.21413%200.12912%201.66862V8.25193C0.12912%208.70641%200.497551%209.07484%200.952034%209.07484H9.18117C9.63566%209.07484%2010.0041%208.70641%2010.0041%208.25193V1.66862C10.0041%201.21413%209.63566%200.845703%209.18117%200.845703ZM0.952362%202.25084V7.67038L2.71805%205.90469C2.87873%205.74401%203.13925%205.74401%203.29994%205.90469C3.46062%206.06538%203.46062%206.3259%203.29994%206.48658L1.53524%208.25128H8.59734L6.83264%206.48658C6.67196%206.3259%206.67196%206.06538%206.83264%205.90469C6.99332%205.74401%207.25384%205.74401%207.41453%205.90469L9.1815%207.67167V2.24975L5.65446%205.78439C5.49995%205.94018%205.28961%206.02781%205.07019%206.02781C4.85077%206.02781%204.64044%205.94018%204.48711%205.78559L0.952362%202.25084ZM8.59951%201.66797H1.53327L5.07019%205.2049L8.59951%201.66797Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E'
              />
            </_Builtin.Block>
            <_Builtin.Block tag='div'>{'Email'}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, 'csv-list-item-column', 'phone')}
            tag='div'
          >
            <_Builtin.Block
              className={_utils.cx(_styles, 'icon-block', '_16x16')}
              tag='div'
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, 'svg-icon')}
                value='%3Csvg%20width%3D%2211%22%20height%3D%2211%22%20viewBox%3D%220%200%2011%2011%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3.35008%200.369141H8.28758C8.74207%200.369141%209.1105%200.737573%209.1105%201.19206V9.42124C9.1105%209.87572%208.74207%2010.2442%208.28758%2010.2442H3.35008C2.89559%2010.2442%202.52716%209.87572%202.52716%209.42124V1.19206C2.52716%200.737573%202.89559%200.369141%203.35008%200.369141ZM3.35018%207.7754V2.01518H8.28768V7.7754H3.35018ZM6.64185%209.42103H4.99601C4.74914%209.42103%204.58455%209.25645%204.58455%209.00957C4.58455%208.7627%204.74914%208.59812%204.99601%208.59812H6.64185C6.88872%208.59812%207.05331%208.7627%207.05331%209.00957C7.05331%209.25645%206.88872%209.42103%206.64185%209.42103Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E'
              />
            </_Builtin.Block>
            <_Builtin.Block tag='div'>{'Phone'}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, 'csv-list-wrapper')}
          tag='div'
        >
          <_Builtin.Block className={_utils.cx(_styles, 'csv-list')} tag='div'>
            <CsvListItem />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, 'csv-imp-bottom')}
        tag='div'
      >
        <_Builtin.Block
          className={_utils.cx(_styles, 'csv-imp-warning')}
          tag='div'
        >
          <_Builtin.Block
            className={_utils.cx(_styles, 'icon-block', '_16x16')}
            tag='div'
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, 'svg-icon')}
              value='%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M7.5%2016C3.36%2016%200%2012.64%200%208.5C0%204.36%203.36%201%207.5%201C11.64%201%2015%204.36%2015%208.5C15%2012.64%2011.64%2016%207.5%2016ZM7%2012.5C7%2012.78%207.22%2013%207.5%2013C7.78%2013%208%2012.78%208%2012.5V8C8%207.72%207.78%207.5%207.5%207.5C7.22%207.5%207%207.72%207%208V12.5ZM7.5%204C6.95%204%206.5%204.45%206.5%205C6.5%205.55%206.95%206%207.5%206C8.05%206%208.5%205.55%208.5%205C8.5%204.45%208.05%204%207.5%204Z%22%20fill%3D%22%23F79A3E%22%2F%3E%0A%3C%2Fsvg%3E'
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, 'text-yellow-800')}
            tag='div'
          >
            {'130 candidates already exists in this job'}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, 'csv-imp-btn-wrapper')}
          tag='div'
        />
      </_Builtin.Block>
    </_Component>
  );
}
