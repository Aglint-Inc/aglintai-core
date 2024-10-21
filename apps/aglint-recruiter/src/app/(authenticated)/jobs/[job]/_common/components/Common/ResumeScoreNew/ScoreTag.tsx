import { UIBadge } from '@components/ui-badge';

export const ScoreTag = ({ score }: { score: number }) => {
  const { text, variant } = getResumeScore(score);
  return <UIBadge textBadge={`${text} - ${score}%`} variant={variant} />;
};

export const getResumeScore = (
  score: number,
): {
  text: string;
  variant:
    | 'default'
    | 'secondary'
    | 'accent'
    | 'info'
    | 'success'
    | 'warning'
    | 'destructive'
    | 'purple'
    | 'neutral'
    | null
    | undefined;
} => {
  if (score >= 80)
    return {
      text: 'Top match',
      variant: 'success',
    };
  else if (score >= 60)
    return {
      text: 'Good match',
      variant: 'info',
    };
  else if (score >= 40)
    return {
      text: 'Average match',
      variant: 'purple',
    };
  else if (score >= 20)
    return {
      text: 'Poor match',
      variant: 'warning',
    };
  else if (score >= 0)
    return {
      text: 'Not a match',
      variant: 'destructive',
    };
  else if (score === -1)
    return {
      text: 'Resume processing',
      variant: 'neutral',
    };
  else if (score === -2)
    return {
      text: 'Resume fetching',
      variant: 'neutral',
    };
  else if (score === -3)
    return {
      text: 'Resume unparsable',
      variant: 'neutral',
    };
  else if (score === -4)
    return {
      text: 'Resume unavailable',
      variant: 'neutral',
    };
  else
    return {
      text: 'Resume unscorable',
      variant: 'neutral',
    };
};
