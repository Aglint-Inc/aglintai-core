export type ScreeningConfig = {
  screening: {
    qualificationRange: { min: number; max: number };
    isManual: boolean;
  };
  interview: {
    qualificationRange: { min: number; max: number };
    isManual: boolean;
  };
  interviewMail: {
    timestamp: string | null;
    isManual: boolean;
  };
  disqualifiedMail: {
    timestamp: string | null;
    isManual: boolean;
  };
  feedbackVisible: boolean;
};
