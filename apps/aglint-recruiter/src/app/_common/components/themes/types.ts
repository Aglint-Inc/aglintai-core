import type { COLORS } from './constants/colors';
import type { MODES } from './constants/modes';

export type Mode = (typeof MODES)[number];

export type Color = (typeof COLORS)[number];
