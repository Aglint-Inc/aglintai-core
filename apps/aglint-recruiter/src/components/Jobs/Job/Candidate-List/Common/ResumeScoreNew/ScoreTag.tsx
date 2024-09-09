import { Badge } from '@components/ui/badge';

export const ScoreTag = ({ score }: { score: number }) => {
  const props = getResumeScore(score);
  return (
    <Badge
      variant='outline'
      className={`bg-${props.bgColor}-100 text-${props.color}-800`}
    >
      {props.text} - {score}%
    </Badge>
  );
};

const getResumeScore = (score: number) => {
  if (score >= 80)
    return {
      text: 'Top match',
      bgColor: 'var(--purple-3)',
      color: 'var(--purple-11)',
    };
  else if (score >= 60)
    return {
      text: 'Good match',
      bgColor: 'var(--teal-3)',
      color: 'var(--teal-11)',
    };
  else if (score >= 40)
    return {
      text: 'Average match',
      bgColor: 'var(--lime-3)',
      color: 'var(--lime-11)',
    };
  else if (score >= 20)
    return {
      text: 'Poor match',
      bgColor: 'var(--yellow-3)',
      color: 'var(--yellow-11)',
    };
  else if (score >= 0)
    return {
      text: 'Not a match',
      bgColor: 'var(--error-3)',
      color: 'var(--error-11)',
    };
  else if (score === -1)
    return {
      text: 'Resume processing',
      bgColor: 'var(--neutral-3)',
      color: 'var(--neutral-11)',
    };
  else if (score === -2)
    return {
      text: 'Resume fetching',
      bgColor: 'var(--neutral-3)',
      color: 'var(--neutral-11)',
    };
  else if (score === -3)
    return {
      text: 'Resume unparsable',
      bgColor: 'var(--neutral-3)',
      color: 'var(--neutral-11)',
    };
  else if (score === -4)
    return {
      text: 'Resume unavailable',
      bgColor: 'var(--neutral-3)',
      color: 'var(--neutral-11)',
    };
  else
    return {
      text: 'Resume unscorable',
      bgColor: 'var(--neutral-3)',
      color: 'var(--neutral-11)',
    };
};
