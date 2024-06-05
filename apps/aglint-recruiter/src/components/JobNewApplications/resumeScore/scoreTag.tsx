import { ResumeTag } from '@/devlink2/ResumeTag';
import { ApplicationsStore } from '@/src/context/ApplicationsContext/store';
export const ScoreTag = ({ score }: { score: number }) => {
  const props = getResumeScore(score);
  return (
    <ResumeTag
      slotText={`${props.text} - ${score}%`}
      props={{
        style: {
          backgroundColor: props.bgColor,
          borderColor: props.borderColor,
        },
      }}
    />
  );
};

export const getResumeScore = (
  score?: number,
  match?: ApplicationsStore['filters']['resume_score'][number],
) => {
  if (score >= 80 || match === 'Top match')
    return {
      text: 'Top match',
      bgColor: 'rgba(168, 24, 151, 0.2)',
      borderColor: 'rgba(168, 24, 151, 0.2)',
    };
  else if (score >= 60 || match === 'Good match')
    return {
      text: 'Good match',
      bgColor: 'rgba(209, 232, 223, 0.5)',
      borderColor: 'rgb(195, 234, 223)',
    };
  else if (score >= 40 || match === 'Average match')
    return {
      text: 'Average match',
      bgColor: 'rgba(255, 237, 194, 1)',
      borderColor: 'rgba(86, 65, 0, 0.10)',
    };
  else if (score >= 20 || match === 'Poor match')
    return {
      text: 'Poor match',
      bgColor: 'rgba(255, 238, 219, 1)',
      borderColor: 'rgba(255, 212, 161, 0.50)',
    };
  else if (score >= 0 || match === 'Not a match')
    return {
      text: 'Not a match',
      bgColor: 'rgba(255, 240, 241, 1)',
      borderColor: 'rgb(255, 210, 216)',
    };
  else if (score == -1)
    return {
      text: 'Resume not parsable',
      bgColor: 'rgba(255, 240, 241, 1)',
      borderColor: 'rgb(255, 210, 216)',
    };
  else if (score == -2)
    return {
      text: 'Resume not found',
      bgColor: 'rgba(255, 240, 241, 1)',
      borderColor: 'rgb(255, 210, 216)',
    };
};
