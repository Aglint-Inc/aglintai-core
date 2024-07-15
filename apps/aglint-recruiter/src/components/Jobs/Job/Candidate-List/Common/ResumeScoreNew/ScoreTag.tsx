import { ResumeTag } from '@/devlink2/ResumeTag';
export const ScoreTag = ({ score }: { score: number }) => {
  const props = getResumeScore(score);
  return (
    <ResumeTag
      slotText={`${props.text} - ${score}%`}
      props={{
        style: {
          backgroundColor: props.bgColor,
          color: props.color,
        },
      }}
    />
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
  else if (score == -1)
    return {
      text: 'Resume not parsable',
      bgColor: 'var(--neutral-3)',
      color: 'var(--neutral-11)',
    };
  else if (score == -2)
    return {
      text: 'Resume not found',
      bgColor: 'var(--neutral-3)',
      color: 'var(--neutral-11)',
    };
};
