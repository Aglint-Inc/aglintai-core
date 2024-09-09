"use client";
import React from "react";
import * as _Builtin from "./_Builtin";

export function ThemeStyle({ as: _Component = _Builtin.HtmlEmbed }) {
  return (
    <_Component value="%3Cstyle%3E%0Abody.component-grid%20%3E%20div%3Anot(.w-embed)%20%7B%0A%20%20%20%20outline%3A%201px%20dashed%20purple%3B%0A%20%20%20%20outline-offset%3A%208px%3B%0A%20%20%20%20border-radius%3A%201px%3B%0A%7D%0A%0A%2F*%20Define%20common%20styles%20for%20different%20weights%20*%2F%0A*%5Bfont-weight%3D%22light%22%5D%20%7B%0A%20%20%20%20font-weight%3A%20300%3B%0A%7D%0A%0A*%5Bfont-weight%3D%22regular%22%5D%20%7B%0A%20%20%20%20font-weight%3A%20400%3B%0A%7D%0A%0A*%5Bfont-weight%3D%22medium%22%5D%20%7B%0A%20%20%20%20font-weight%3A%20500%3B%0A%7D%0A%0A*%5Bfont-weight%3D%22bold%22%5D%20%7B%0A%20%20%20%20font-weight%3A%20700%3B%0A%7D%0A%0A%2F*%20Define%20common%20styles%20for%20different%20text%20alignments%20*%2F%0A*%5Btext-align%3D%22left%22%5D%20%7B%0A%20%20%20%20text-align%3A%20left%3B%0A%7D%0A%0A*%5Btext-align%3D%22center%22%5D%20%7B%0A%20%20%20%20text-align%3A%20center%3B%0A%7D%0A%0A*%5Btext-alig%3D%22right%22%5D%20%7B%0A%20%20%20%20text-align%3A%20right%3B%0A%7D%0A%0A%2F*%20Define%20styles%20for%20different%20sizes%20*%2F%0A%0A*%5Bfont-size%3D%221%22%5D%20%7B%0A%20%20%20%20font-size%3A%20var(--font-size-1)%3B%0A%7D%0A%0A*%5Bfont-size%3D%221%22%5D%20%7B%0A%20%20font-size%3A%20var(--font-size-1)%3B%0A%20%20line-height%3A%20var(--line-height-1)%3B%0A%20%20letter-spacing%3A%20var(--letter-spacing-1)%3B%0A%7D%0A%0A*%5Bfont-size%3D%222%22%5D%20%7B%0A%20%20font-size%3A%20var(--font-size-2)%3B%0A%20%20line-height%3A%20var(--line-height-2)%3B%0A%20%20letter-spacing%3A%20var(--letter-spacing-2)%3B%0A%7D%0A%0A*%5Bfont-size%3D%223%22%5D%20%7B%0A%20%20font-size%3A%20var(--font-size-3)%3B%0A%20%20line-height%3A%20var(--line-height-3)%3B%0A%20%20letter-spacing%3A%20var(--letter-spacing-3)%3B%0A%7D%0A%0A*%5Bfont-size%3D%224%22%5D%20%7B%0A%20%20font-size%3A%20var(--font-size-4)%3B%0A%20%20line-height%3A%20var(--line-height-4)%3B%0A%20%20letter-spacing%3A%20var(--letter-spacing-4)%3B%0A%7D%0A%0A*%5Bfont-size%3D%225%22%5D%20%7B%0A%20%20font-size%3A%20var(--font-size-5)%3B%0A%20%20line-height%3A%20var(--line-height-5)%3B%0A%20%20letter-spacing%3A%20var(--letter-spacing-5)%3B%0A%7D%0A%0A*%5Bfont-size%3D%226%22%5D%20%7B%0A%20%20font-size%3A%20var(--font-size-6)%3B%0A%20%20line-height%3A%20var(--line-height-6)%3B%0A%20%20letter-spacing%3A%20var(--letter-spacing-6)%3B%0A%7D%0A*%5Bfont-size%3D%227%22%5D%20%7B%0A%20%20font-size%3A%20var(--font-size-7)%3B%0A%20%20line-height%3A%20var(--line-height-7)%3B%0A%20%20letter-spacing%3A%20var(--letter-spacing-7)%3B%0A%7D%0A*%5Bfont-size%3D%228%22%5D%20%7B%0A%20%20font-size%3A%20var(--font-size-8)%3B%0A%20%20line-height%3A%20var(--line-height-8)%3B%0A%20%20letter-spacing%3A%20var(--letter-spacing-8)%3B%0A%7D%0A*%5Bfont-size%3D%229%22%5D%20%7B%0A%20%20font-size%3A%20var(--font-size-9)%3B%0A%20%20line-height%3A%20var(--line-height-9)%3B%0A%20%20letter-spacing%3A%20var(--letter-spacing-9)%3B%0A%7D%0A%0A%2F*%20Error%20styles%20*%2F%0A*%5Bfont-color%3D%22error%22%5D%20%7B%0A%20%20%20%20color%3A%20var(--error-11)%3B%0A%7D%0A*%5Bfont-color%3D%22error%22%5D%5Bhigh-contrast%3D%22true%22%5D%20%7B%0A%20%20%20%20color%3A%20var(--error-12)%3B%0A%7D%0A*%5Bfont-color%3D%22error-alpha%22%5D%20%7B%0A%20%20%20%20color%3A%20var(--error-a11)%3B%0A%7D%0A*%5Bfont-color%3D%22error-alpha%22%5D%5Bhigh-contrast%3D%22true%22%5D%20%7B%0A%20%20%20%20color%3A%20var(--error-a12)%3B%0A%7D%0A%0A%2F*%20Warning%20styles%20*%2F%0A*%5Bfont-color%3D%22warning%22%5D%20%7B%0A%20%20%20%20color%3A%20var(--warning-11)%3B%0A%7D%0A*%5Bfont-color%3D%22warning%22%5D%5Bhigh-contrast%3D%22true%22%5D%20%7B%0A%20%20%20%20color%3A%20var(--warning-12)%3B%0A%7D%0A*%5Bfont-color%3D%22warning%22%5D%20%7B%0A%20%20%20%20color%3A%20var(--warning-a11)%3B%0A%7D%0A*%5Bfont-color%3D%22warning-alpha%22%5D%5Bhigh-contrast%3D%22true%22%5D%20%7B%0A%20%20%20%20color%3A%20var(--warning-a12)%3B%0A%7D%0A%0A%2F*%20Info%20styles%20*%2F%0A*%5Bfont-color%3D%22info%22%5D%20%7B%0A%20%20%20%20color%3A%20var(--info-11)%3B%0A%7D%0A*%5Bfont-color%3D%22info%22%5D%5Bhigh-contrast%3D%22true%22%5D%20%7B%0A%20%20%20%20color%3A%20var(--info-12)%3B%0A%7D%0A*%5Bfont-color%3D%22info-alpha%22%5D%20%7B%0A%20%20%20%20color%3A%20var(--info-a11)%3B%0A%7D%0A*%5Bfont-color%3D%22info-alpha%22%5D%5Bhigh-contrast%3D%22true%22%5D%20%7B%0A%20%20%20%20color%3A%20var(--info-a12)%3B%0A%7D%0A%0A%2F*%20Success%20styles%20*%2F%0A*%5Bfont-color%3D%22success%22%5D%20%7B%0A%20%20%20%20color%3A%20var(--success-11)%3B%0A%7D%0A*%5Bfont-color%3D%22success%22%5D%5Bhigh-contrast%3D%22true%22%5D%20%7B%0A%20%20%20%20color%3A%20var(--success-12)%3B%0A%7D%0A*%5Bfont-color%3D%22success-alpha%22%5D%20%7B%0A%20%20%20%20color%3A%20var(--success-a11)%3B%0A%7D%0A*%5Bfont-color%3D%22success-alpha%22%5D%5Bhigh-contrast%3D%22true%22%5D%20%7B%0A%20%20%20%20color%3A%20var(--success-a12)%3B%0A%7D%0A%0A%2F*%20Accent%20styles%20*%2F%0A*%5Bfont-color%3D%22accent%22%5D%20%7B%0A%20%20%20%20color%3A%20var(--accent-11)%3B%0A%7D%0A*%5Bfont-color%3D%22accent%22%5D%5Bhigh-contrast%3D%22true%22%5D%20%7B%0A%20%20%20%20color%3A%20var(--accent-12)%3B%0A%7D%0A*%5Bfont-color%3D%22accent-alpha%22%5D%20%7B%0A%20%20%20%20color%3A%20var(--accent-a11)%3B%0A%7D%0A*%5Bfont-color%3D%22accent-alpha%22%5D%5Bhigh-contrast%3D%22true%22%5D%20%7B%0A%20%20%20%20color%3A%20var(--accent-a12)%3B%0A%7D%0A%0A%2F*%20Neutral%20styles%20*%2F%0A*%5Bfont-color%3D%22neutral%22%5D%20%7B%0A%20%20%20%20color%3A%20var(--neutral-11)%3B%0A%7D%0A*%5Bfont-color%3D%22neutral%22%5D%5Bhigh-contrast%3D%22true%22%5D%20%7B%0A%20%20%20%20color%3A%20var(--neutral-12)%3B%0A%7D%0A*%5Bfont-color%3D%22neutral-alpha%22%5D%20%7B%0A%20%20%20%20color%3A%20var(--neutral-a11)%3B%0A%7D%0A*%5Bfont-color%3D%22neutral-alpha%22%5D%5Bhigh-contrast%3D%22true%22%5D%20%7B%0A%20%20%20%20color%3A%20var(--neutral-a12)%3B%0A%7D%0A%0A%5Bbox-shadow%3D%221%22%5D%20%7B%0A%20%20box-shadow%3A%20inset%200%200%200%201px%20var(--neutral-a5)%2C%20inset%200%201.5px%202px%200%20var(--neutral-a2)%2C%20inset%200%201.5px%202px%200%20var(--black-a2)%3B%0A%7D%0A%0A%5Bbox-shadow%3D%222%22%5D%20%7B%0A%20%20box-shadow%3A%200%200%200%201px%20var(--neutral-a3)%2C%200%200%200%200.5px%20var(--black-a1)%2C%200%201px%201px%200%20var(--neutral-a2)%2C%200%202px%201px%20-1px%20var(--black-a1)%2C%200%201px%203px%200%20var(--black-a1)%3B%0A%7D%0A%0A%5Bbox-shadow%3D%223%22%5D%20%7B%0A%20%20box-shadow%3A%200%200%200%201px%20var(--neutral-a3)%2C%200%202px%203px%20-2px%20var(--neutral-a3)%2C%200%203px%2012px%20-4px%20var(--black-a2)%2C%200%204px%2016px%20-8px%20var(--black-a2)%3B%0A%7D%0A%0A%5Bbox-shadow%3D%224%22%5D%20%7B%0A%20%20box-shadow%3A%200%200%200%201px%20var(--neutral-a3)%2C%200%208px%2040px%20var(--black-a1)%2C%200%2012px%2032px%20-16px%20var(--neutral-a3)%3B%0A%7D%0A%0A%5Bbox-shadow%3D%225%22%5D%20%7B%0A%20%20box-shadow%3A%200%200%200%201px%20var(--neutral-a3)%2C%200%2012px%2060px%20var(--black-a3)%2C%200%2012px%2032px%20-16px%20var(--neutral-a5)%3B%0A%7D%0A%0A%5Bbox-shadow%3D%226%22%5D%20%7B%0A%20%20box-shadow%3A%200%200%200%201px%20var(--neutral-a3)%2C%200%2012px%2060px%20var(--black-a3)%2C%200%2016px%2064px%20var(--neutral-a2)%2C%200%2016px%2036px%20-20px%20var(--neutral-a7)%3B%0A%7D%0A%0A%0A%2F*%20BUTTON%20STYLES%20--------------------*%2F%0A%2F*%20size%20*%2F%0A%5Bbutton-size-solid%3D%221%22%5D%2C%5Bbutton-size-soft%3D%221%22%5D%2C%5Bbutton-size-surface%3D%221%22%5D%2C%5Bbutton-size-outline%3D%221%22%5D%2C%5Bbutton-size-ghost%3D%221%22%5D%20%7B%0A%20%20height%3A%20var(--space-5)%3B%0A%20%20padding-right%3A%20var(--space-2)%3B%0A%20%20padding-left%3A%20var(--space-2)%3B%0A%20%20grid-column-gap%3A%20var(--space-1)%3B%0A%20%20grid-row-gap%3A%20var(--space-1)%3B%0A%20%20border-radius%3Avar(--radius-1)%3B%0A%20%20font-size%3A%20var(--font-size-1)%3B%0A%20%20line-height%3A%20var(--line-height-1)%3B%0A%20%20letter-spacing%3A%20var(--letter-spacing-1)%3B%0A%7D%0A%5Bbutton-size%3D%222%22%5D%2C%5Bbutton-size-solid%3D%222%22%5D%2C%5Bbutton-size-soft%3D%222%22%5D%2C%5Bbutton-size-surface%3D%222%22%5D%2C%5Bbutton-size-outline%3D%222%22%5D%2C%5Bbutton-size-ghost%3D%222%22%5D%20%7B%0A%20%20height%3A%20var(--space-6)%3B%0A%20%20padding-right%3A%20var(--space-3)%3B%0A%20%20padding-left%3A%20var(--space-3)%3B%0A%20%20grid-column-gap%3A%20var(--space-1)%3B%0A%20%20grid-row-gap%3A%20var(--space-1)%3B%0A%20%20border-radius%3Avar(--radius-2)%3B%0A%20%20font-size%3Avar(--font-size-2)%3B%0A%20%20line-height%3A%20var(--line-height-2)%3B%0A%20%20letter-spacing%3A%20var(--letter-spacing-2)%3B%0A%7D%0A%5Bbutton-size%3D%223%22%5D%2C%5Bbutton-size-solid%3D%223%22%5D%2C%5Bbutton-size-soft%3D%223%22%5D%2C%5Bbutton-size-surface%3D%223%22%5D%2C%5Bbutton-size-outline%3D%223%22%5D%2C%5Bbutton-size-ghost%3D%223%22%5D%20%7B%0A%20%20height%3A%20var(--space-7)%3B%0A%20%20padding-right%3A%20var(--space-4)%3B%0A%20%20padding-left%3A%20var(--space-4)%3B%0A%20%20grid-column-gap%3A%20var(--space-2)%3B%0A%20%20grid-row-gap%3A%20var(--space-2)%3B%0A%20%20border-radius%3Avar(--radius-3)%3B%0A%20%20font-size%3Avar(--font-size-3)%3B%0A%20%20line-height%3A%20var(--line-height-3)%3B%0A%20%20letter-spacing%3A%20var(--letter-spacing-3)%3B%0A%7D%0A%5Bbutton-size%3D%224%22%5D%2C%5Bbutton-size-solid%3D%224%22%5D%2C%5Bbutton-size-soft%3D%224%22%5D%2C%5Bbutton-size-surface%3D%224%22%5D%2C%5Bbutton-size-outline%3D%224%22%5D%2C%5Bbutton-size-ghost%3D%224%22%5D%20%20%7B%0A%20%20height%3A%20var(--space-8)%3B%0A%20%20padding-right%3A%20var(--space-5)%3B%0A%20%20padding-left%3A%20var(--space-5)%3B%0A%20%20grid-column-gap%3A%20var(--space-3)%3B%0A%20%20grid-row-gap%3A%20var(--space-3)%3B%0A%20%20border-radius%3Avar(--radius-4)%3B%0A%20%20font-size%3A%20var(--font-size-4)%3B%0A%20%20line-height%3A%20var(--line-height-4)%3B%0A%20%20letter-spacing%3Avar(--letter-spacing-4)%3B%0A%7D%0A%0A%0A%2F*%20--------------Variant%20Solid%20----------------*%2F%0A%2F*%20solidcolor%20accent%20*%2F%0A%5Bbutton-color-solid%3D%22accent%22%5D%20%7B%0A%20%20background-color%3A%20var(--accent-9)%3B%0A%20%20color%3A%20var(--white)%3B%0A%7D%0A%5Bbutton-color-solid%3D%22accent%22%5D%3Ahover%20%7B%0A%20%20background-color%3A%20var(--accent-10)%3B%20%0A%7D%0A%2F*%20solidcolor%20neutral%20*%2F%0A%5Bbutton-color-solid%3D%22neutral%22%5D%20%7B%0A%20%20background-color%3A%20var(--neutral-9)%3B%0A%20%20color%3A%20var(--white)%3B%0A%7D%0A%5Bbutton-color-solid%3D%22neutral%22%5D%3Ahover%20%7B%0A%20%20background-color%3A%20var(--neurtal-10)%3B%20%0A%7D%0A%2F*%20solidcolor%20error%20*%2F%0A%5Bbutton-color-solid%3D%22error%22%5D%20%7B%0A%20%20background-color%3A%20%20var(--error-9)%3B%0A%20%20color%3A%20var(--white)%3B%0A%7D%0A%5Bbutton-color-solid%3D%22error%22%5D%3Ahover%20%7B%0A%20%20background-color%3A%20var(--error-10)%3B%20%0A%7D%0A%2F*%20high%20contrast%20solid%20*%2F%0A%5Bbutton-high-contrast-solid%3D%22true%22%5D%3Ahover%20%7B%0A%09opacity%3A%200.88%3B%0A%7D%0A%5Bbutton-color-solid%3D%22accent%22%5D%5Bbutton-high-contrast-solid%3D%22true%22%5D%20%7B%0A%20%20background-color%3Avar(--accent-12)%3B%0A%7D%0A%5Bbutton-color-solid%3D%22neutral%22%5D%5Bbutton-high-contrast-solid%3D%22true%22%5D%20%7B%0A%20%20background-color%3A%20var(--neutral-12)%3B%0A%7D%0A%5Bbutton-color-solid%3D%22error%22%5D%5Bbutton-high-contrast-solid%3D%22true%22%5D%20%7B%0A%20%20background-color%3A%20var(--error-12)%3B%0A%7D%0A%0A%0A%0A%2F*%20--------------Variant%20Soft%20----------------*%2F%0A%2F*%20softcolor%20accent%20*%2F%0A%5Bbutton-color-soft%3D%22accent%22%5D%20%7B%0A%20%20background-color%3A%20var(--accent-a3)%3B%0A%20%20color%3A%20%20var(--accent-a11)%3B%0A%7D%0A%5Bbutton-color-soft%3D%22accent%22%5D%3Ahover%20%7B%0A%20%20background-color%3A%20var(--accent-a4)%3B%20%0A%7D%0A%2F*%20softcolor%20neutral%20*%2F%0A%5Bbutton-color-soft%3D%22neutral%22%5D%20%7B%0A%20%20background-color%3A%20var(--neutral-a3)%3B%0A%20%20color%3A%20%20var(--neutral-a11)%3B%0A%7D%0A%5Bbutton-color-soft%3D%22neutral%22%5D%3Ahover%20%7B%0A%20%20background-color%3A%20var(--neutral-a4)%3B%20%0A%7D%0A%2F*%20softcolor%20error%20*%2F%0A%5Bbutton-color-soft%3D%22error%22%5D%20%7B%0A%20%20background-color%3A%20var(--error-a3)%3B%0A%20%20color%3A%20%20var(--error-a11)%3B%0A%7D%0A%5Bbutton-color-soft%3D%22error%22%5D%3Ahover%20%7B%0A%20%20background-color%3A%20var(--error-a4)%3B%20%0A%7D%0A%2F*%20high%20contrast%20soft%20*%2F%0A%5Bbutton-high-contrast-soft%3D%22true%22%5D%3Ahover%20%7B%0A%09opacity%3A%200.88%3B%0A%7D%0A%5Bbutton-color-soft%3D%22accent%22%5D%5Bbutton-high-contrast-soft%3D%22true%22%5D%20%7B%0A%20%20color%3Avar(--accent-a12)%3B%0A%7D%0A%5Bbutton-color-soft%3D%22neutral%22%5D%5Bbutton-high-contrast-soft%3D%22true%22%5D%20%7B%0A%20%20color%3Avar(--neutral-a12)%3B%0A%7D%0A%5Bbutton-color-soft%3D%22error%22%5D%5Bbutton-high-contrast-soft%3D%22true%22%5D%20%7B%0A%20%20color%3Avar(--error-a12)%3B%0A%7D%0A%0A%0A%0A%2F*%20--------------Variant%20Surface%20----------------*%2F%0A%2F*%20suface%20color%20accent%20*%2F%0A%5Bcolor-surface%3D%22accent%22%5D%20%7B%0A%20%20background-color%3A%20var(--accent-a2)%3B%0A%20%20color%3A%20%20var(--accent-a11)%3B%0A%20%20box-shadow%3A%20inset%200%200%200%201px%20var(--accent-a7)%3B%0A%7D%0A%5Bcolor-surface%3D%22accent%22%5D%3Ahover%20%7B%0A%20%09background-color%3A%20var(--accent-a3)%3B%0A%20%20box-shadow%3A%20inset%200%200%200%201px%20var(--accent-a8)%3B%0A%7D%0A%2F*%20suface%20color%20neutral%20*%2F%0A%5Bcolor-surface%3D%22neutral%22%5D%20%7B%0A%20%20background-color%3A%20var(--neutral-a2)%3B%0A%20%20color%3A%20%20var(--neutral-a11)%3B%0A%20%20box-shadow%3A%20inset%200%200%200%201px%20var(--neutral-a7)%3B%0A%7D%0A%5Bcolor-surface%3D%22neutral%22%5D%3Ahover%20%7B%0Abackground-color%3A%20var(--neutral-a3)%3B%0A%20%20box-shadow%3A%20inset%200%200%200%201px%20var(--neutral-a8)%3B%0A%7D%0A%2F*%20suface%20color%20error%20*%2F%0A%5Bcolor-surface%3D%22error%22%5D%20%7B%0A%20%20background-color%3A%20var(--error-a2)%3B%0A%20%20color%3A%20%20var(--error-a11)%3B%0A%20%20box-shadow%3A%20inset%200%200%200%201px%20var(--error-a7)%3B%0A%7D%0A%5Bcolor-surface%3D%22neutral%22%5D%3Ahover%20%7B%0Abackground-color%3A%20var(--error-a3)%3B%0A%20%20box-shadow%3A%20inset%200%200%200%201px%20var(--error-a8)%3B%0A%7D%0A%2F*%20high%20contrast%20surface*%2F%0A%5Bhigh-contrast-surface%3D%22true%22%5D%3Ahover%20%7B%0A%09opacity%3A%200.88%3B%0A%7D%0A%5Bcolor-surface%3D%22accent%22%5D%5Bhigh-contrast-surface%3D%22true%22%5D%20%7B%0A%20%20color%3Avar(--accent-a12)%3B%0A%7D%0A%5Bcolor-surface%3D%22neutral%22%5D%5Bhigh-contrast-surface%3D%22true%22%5D%20%7B%0A%20%20color%3Avar(--neutral-a12)%3B%0A%7D%0A%5Bcolor-surface%3D%22error%22%5D%5Bhigh-contrast-surface%3D%22true%22%5D%20%7B%0A%20%20color%3Avar(--error-a12)%3B%0A%7D%0A%0A%0A%0A%2F*%20--------------Variant%20Outline%20----------------*%2F%0A%2F*%20outline%20color%20accent%20*%2F%0A%5Bcolor-outline%3D%22accent%22%5D%20%7B%0A%20%20background-color%3A%20transparent%3B%0A%20%20color%3A%20%20var(--accent-a11)%3B%0A%20%20box-shadow%3A%20inset%200%200%200%201px%20var(--accent-a8)%3B%0A%7D%0A%5Bcolor-outline%3D%22accent%22%5D%3Ahover%20%7B%0A%20%20background-color%3A%20var(--accent-a2)%3B%0A%7D%0A%2F*%20outline%20color%20neutral%20*%2F%0A%5Bcolor-outline%3D%22neutral%22%5D%20%7B%0A%20%20background-color%3A%20transparent%3B%0A%20%20color%3A%20%20var(--neutral-a11)%3B%0A%20%20box-shadow%3A%20inset%200%200%200%201px%20var(--neutral-a8)%3B%0A%7D%0A%5Bcolor-outline%3D%22neutral%22%5D%3Ahover%20%7B%0A%20%20background-color%3A%20var(--neutral-a2)%3B%0A%7D%0A%2F*%20outline%20color%20error%20*%2F%0A%5Bcolor-outline%3D%22error%22%5D%20%7B%0A%20%20background-color%3A%20transparent%3B%0A%20%20color%3A%20%20var(--error-a11)%3B%0A%20%20box-shadow%3A%20inset%200%200%200%201px%20var(--error-a8)%3B%0A%7D%0A%5Bcolor-outline%3D%22error%22%5D%3Ahover%20%7B%0A%20%20background-color%3A%20var(--error-a2)%3B%0A%7D%0A%2F*%20high%20contrast%20outline%20*%2F%0A%5Bcolor-outline%3D%22accent%22%5D%5Bhigh-contrast-outline%3D%22true%22%5D%20%7B%0A%20%20color%3Avar(--accent-a12)%3B%0A%20%20box-shadow%3A%20inset%200%200%200%201px%20var(--accent-a11)%3B%0A%7D%0A%5Bcolor-outline%3D%22neutral%22%5D%5Bhigh-contrast-outline%3D%22true%22%5D%20%7B%0A%20%20color%3Avar(--neutral-a12)%3B%0A%20%20box-shadow%3A%20inset%200%200%200%201px%20var(--neutral-a11)%3B%0A%7D%0A%5Bcolor-outline%3D%22error%22%5D%5Bhigh-contrast-outline%3D%22true%22%5D%20%7B%0A%20%20color%3Avar(--error-a12)%3B%0A%20%20box-shadow%3A%20inset%200%200%200%201px%20var(--error-a11)%3B%0A%7D%0A%0A%0A%0A%2F*%20--------------Variant%20Ghost%20----------------*%2F%0A%2F*%20ghost%20color%20accent%20*%2F%0A%5Bcolor-ghost%3D%22accent%22%5D%20%7B%0A%20%20background-color%3A%20transparent%3B%0A%20%20color%3A%20%20var(--accent-a11)%3B%0A%7D%0A%5Bcolor-ghost%3D%22accent%22%5D%3Ahover%20%7B%0A%20%20background-color%3A%20var(--accent-a3)%3B%0A%7D%0A%2F*%20ghost%20color%20neutral%20*%2F%0A%5Bcolor-ghost%3D%22neutral%22%5D%20%7B%0A%20%20background-color%3A%20transparent%3B%0A%20%20color%3A%20%20var(--neutral-a11)%3B%0A%7D%0A%5Bcolor-ghost%3D%22neutral%22%5D%3Ahover%20%7B%0A%20%20background-color%3A%20var(--neutral-a3)%3B%0A%7D%0A%2F*%20ghost%20color%20error%20*%2F%0A%5Bcolor-ghost%3D%22error%22%5D%20%7B%0A%20%20background-color%3A%20transparent%3B%0A%20%20color%3A%20%20var(--error-a11)%3B%0A%7D%0A%5Bcolor-ghost%3D%22neutral%22%5D%3Ahover%20%7B%0A%20%20background-color%3A%20var(--error-a3)%3B%0A%7D%0A%0A%0A%2F*%20high%20contrast%20ghost%20*%2F%0A%5Bcolor-ghost%3D%22accent%22%5D%5Bhigh-contrast-ghost%3D%22true%22%5D%20%7B%0A%20%20color%3Avar(--accent-a12)%3B%0A%7D%0A%5Bcolor-ghost%3D%22neutral%22%5D%5Bhigh-contrast-ghost%3D%22true%22%5D%20%7B%0A%20%20color%3Avar(--neutral-a12)%3B%0A%7D%0A%5Bcolor-ghost%3D%22error%22%5D%5Bhigh-contrast-ghost%3D%22true%22%5D%20%7B%0A%20%20color%3Avar(--error-a12)%3B%0A%7D%0A%0A%2F*%20--------------Variant%20Surface%20----------------*%2F%0A%2F*%20suface%20color%20accent%20*%2F%0A%5Bbutton-color-surface%3D%22accent%22%5D%20%7B%0A%20%20background-color%3A%20var(--accent-a2)%3B%0A%20%20color%3A%20%20var(--accent-a11)%3B%0A%20%20box-shadow%3A%20inset%200%200%200%201px%20var(--accent-a7)%3B%0A%7D%0A%5Bbutton-color-surface%3D%22accent%22%5D%3Ahover%20%7B%0A%20%09background-color%3A%20var(--accent-a3)%3B%0A%20%20box-shadow%3A%20inset%200%200%200%201px%20var(--accent-a8)%3B%0A%7D%0A%2F*%20suface%20color%20neutral%20*%2F%0A%5Bbutton-color-surface%3D%22neutral%22%5D%20%7B%0A%20%20background-color%3A%20var(--neutral-a2)%3B%0A%20%20color%3A%20%20var(--neutral-a11)%3B%0A%20%20box-shadow%3A%20inset%200%200%200%201px%20var(--neutral-a7)%3B%0A%7D%0A%5Bbutton-color-surface%3D%22neutral%22%5D%3Ahover%20%7B%0A%20%20background-color%3A%20var(--neutral-a3)%3B%0A%20%20box-shadow%3A%20inset%200%200%200%201px%20var(--neutral-a8)%3B%0A%7D%0A%2F*%20suface%20color%20error%20*%2F%0A%5Bbutton-color-surface%3D%22error%22%5D%20%7B%0A%20%20background-color%3A%20var(--error-a2)%3B%0A%20%20color%3A%20%20var(--error-a11)%3B%0A%20%20box-shadow%3A%20inset%200%200%200%201px%20var(--error-a7)%3B%0A%7D%0A%5Bbutton-color-surface%3D%22neutral%22%5D%3Ahover%20%7B%0A%20%20background-color%3A%20var(--error-a3)%3B%0A%20%20box-shadow%3A%20inset%200%200%200%201px%20var(--error-a8)%3B%0A%7D%0A%2F*%20high%20contrast%20surface*%2F%0A%5Bbutton-high-contrast-surface%3D%22true%22%5D%3Ahover%20%7B%0A%09opacity%3A%200.88%3B%0A%7D%0A%5Bbutton-color-surface%3D%22accent%22%5D%5Bbutton-high-contrast-surface%3D%22true%22%5D%20%7B%0A%20%20color%3Avar(--accent-a12)%3B%0A%7D%0A%5Bbutton-color-surface%3D%22neutral%22%5D%5Bbutton-high-contrast-surface%3D%22true%22%5D%20%7B%0A%20%20color%3Avar(--neutral-a12)%3B%0A%7D%0A%5Bbutton-color-surface%3D%22error%22%5D%5Bbutton-high-contrast-surface%3D%22true%22%5D%20%7B%0A%20%20color%3Avar(--error-a12)%3B%0A%7D%0A%0A%0A%0A%2F*%20--------------Variant%20Outline%20----------------*%2F%0A%2F*%20outline%20color%20accent%20*%2F%0A%5Bbutton-color-outline%3D%22accent%22%5D%20%7B%0A%20%20background-color%3A%20transparent%3B%0A%20%20color%3A%20%20var(--accent-a11)%3B%0A%20%20box-shadow%3A%20inset%200%200%200%201px%20var(--accent-a8)%3B%0A%7D%0A%5Bbutton-color-outline%3D%22accent%22%5D%3Ahover%20%7B%0A%20%20background-color%3A%20var(--accent-a2)%3B%0A%7D%0A%2F*%20outline%20color%20neutral%20*%2F%0A%5Bbutton-color-outline%3D%22neutral%22%5D%20%7B%0A%20%20background-color%3A%20transparent%3B%0A%20%20color%3A%20%20var(--neutral-a11)%3B%0A%20%20box-shadow%3A%20inset%200%200%200%201px%20var(--neutral-a8)%3B%0A%7D%0A%5Bbutton-color-outline%3D%22neutral%22%5D%3Ahover%20%7B%0A%20%20background-color%3A%20var(--neutral-a2)%3B%0A%7D%0A%2F*%20outline%20color%20error%20*%2F%0A%5Bbutton-color-outline%3D%22error%22%5D%20%7B%0A%20%20background-color%3A%20transparent%3B%0A%20%20color%3A%20%20var(--error-a11)%3B%0A%20%20box-shadow%3A%20inset%200%200%200%201px%20var(--error-a8)%3B%0A%7D%0A%5Bbutton-color-outline%3D%22error%22%5D%3Ahover%20%7B%0A%20%20background-color%3A%20var(--error-a2)%3B%0A%7D%0A%2F*%20high%20contrast%20outline%20*%2F%0A%5Bbutton-color-outline%3D%22accent%22%5D%5Bbutton-high-contrast-outline%3D%22true%22%5D%20%7B%0A%20%20color%3Avar(--accent-a12)%3B%0A%20%20box-shadow%3A%20inset%200%200%200%201px%20var(--accent-a11)%3B%0A%7D%0A%5Bbutton-color-outline%3D%22neutral%22%5D%5Bbutton-high-contrast-outline%3D%22true%22%5D%20%7B%0A%20%20color%3Avar(--neutral-a12)%3B%0A%20%20box-shadow%3A%20inset%200%200%200%201px%20var(--neutral-a11)%3B%0A%7D%0A%5Bbutton-color-outline%3D%22error%22%5D%5Bbutton-high-contrast-outline%3D%22true%22%5D%20%7B%0A%20%20color%3Avar(--error-a12)%3B%0A%20%20box-shadow%3A%20inset%200%200%200%201px%20var(--error-a11)%3B%0A%7D%0A%0A%0A%0A%2F*%20--------------Variant%20Ghost%20----------------*%2F%0A%2F*%20ghost%20color%20accent%20*%2F%0A%5Bbutton-color-ghost%3D%22accent%22%5D%20%7B%0A%20%20background-color%3A%20transparent%3B%0A%20%20color%3A%20%20var(--accent-a11)%3B%0A%7D%0A%5Bbutton-color-ghost%3D%22accent%22%5D%3Ahover%20%7B%0A%20%20background-color%3A%20var(--accent-a3)%3B%0A%7D%0A%2F*%20ghost%20color%20neutral%20*%2F%0A%5Bbutton-color-ghost%3D%22neutral%22%5D%20%7B%0A%20%20background-color%3A%20transparent%3B%0A%20%20color%3A%20%20var(--neutral-a11)%3B%0A%7D%0A%5Bbutton-color-ghost%3D%22neutral%22%5D%3Ahover%20%7B%0A%20%20background-color%3A%20var(--neutral-a3)%3B%0A%7D%0A%2F*%20ghost%20color%20error%20*%2F%0A%5Bbutton-color-ghost%3D%22error%22%5D%20%7B%0A%20%20background-color%3A%20transparent%3B%0A%20%20color%3A%20%20var(--error-a11)%3B%0A%7D%0A%5Bbutton-color-ghost%3D%22neutral%22%5D%3Ahover%20%7B%0A%20%20background-color%3A%20var(--error-a3)%3B%0A%7D%0A%0A%0A%2F*%20high%20contrast%20ghost%20*%2F%0A%5Bbutton-color-ghost%3D%22accent%22%5D%5Bbutton-high-contrast-ghost%3D%22true%22%5D%20%7B%0A%20%20color%3Avar(--accent-a12)%3B%0A%7D%0A%5Bbutton-color-ghost%3D%22neutral%22%5D%5Bbutton-high-contrast-ghost%3D%22true%22%5D%20%7B%0A%20%20color%3Avar(--neutral-a12)%3B%0A%7D%0A%5Bbutton-color-ghost%3D%22error%22%5D%5Bbutton-high-contrast-ghost%3D%22true%22%5D%20%7B%0A%20%20color%3Avar(--error-a12)%3B%0A%7D%0A%0A%3C%2Fstyle%3E" />
  );
}