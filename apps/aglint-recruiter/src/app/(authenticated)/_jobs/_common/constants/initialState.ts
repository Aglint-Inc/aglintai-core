import { STATE_ASHBY_DIALOG } from './stateAshbyDialog';
import { STATE_GREENHOUSE_DIALOG } from './stateGreenhouseDialog';
import { STATE_LEVER_DIALOG } from './stateLeverDialog';

export const INITIAL_STATE = {
  lever: { open: false, step: STATE_LEVER_DIALOG.INITIAL },
  greenhouse: { open: false, step: STATE_GREENHOUSE_DIALOG.INITIAL },
  ashby: { open: false, step: STATE_ASHBY_DIALOG.INITIAL },
};
