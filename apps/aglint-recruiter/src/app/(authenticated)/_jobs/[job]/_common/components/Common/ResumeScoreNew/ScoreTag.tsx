import { Badge } from '@components/ui/badge';
import { cn } from '@lib/utils'; // Assuming you have a utility function for class merging

export const ScoreTag = ({ score }: { score: number }) => {
  const { text, bgColor, textColor } = getResumeScore(score);
  return (
    <Badge
      className={cn(
        'text-xs font-medium px-2 py-1 rounded-full',
        bgColor,
        textColor,
      )}
    >
      {`${text} - ${score}%`}
    </Badge>
  );
};

const getResumeScore = (
  score: number,
): { text: string; bgColor: string; textColor: string } => {
  if (score >= 80)
    return {
      text: 'Top match',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-800',
    };
  else if (score >= 60)
    return {
      text: 'Good match',
      bgColor: 'bg-teal-100',
      textColor: 'text-teal-800',
    };
  else if (score >= 40)
    return {
      text: 'Average match',
      bgColor: 'bg-lime-100',
      textColor: 'text-lime-800',
    };
  else if (score >= 20)
    return {
      text: 'Poor match',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-800',
    };
  else if (score >= 0)
    return {
      text: 'Not a match',
      bgColor: 'bg-red-100',
      textColor: 'text-red-800',
    };
  else if (score === -1)
    return {
      text: 'Resume processing',
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-800',
    };
  else if (score === -2)
    return {
      text: 'Resume fetching',
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-800',
    };
  else if (score === -3)
    return {
      text: 'Resume unparsable',
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-800',
    };
  else if (score === -4)
    return {
      text: 'Resume unavailable',
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-800',
    };
  else
    return {
      text: 'Resume unscorable',
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-800',
    };
};
