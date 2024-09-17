interface ScoreSettingProps {
  slotBanner?: React.ReactNode;
  slotScoreCardDetails?: React.ReactNode;
  textScoreCount?: string;
  slotScoringLoader?: React.ReactNode;
}

export function ScoreSetting({
  slotBanner,
  slotScoreCardDetails,
  textScoreCount,
  slotScoringLoader,
}: ScoreSettingProps) {
  return (
    <div className='space-y-4'>
      {slotBanner}
      {textScoreCount && (
        <div className='flex items-center space-x-2'>
          <span>{textScoreCount}</span>
          {slotScoringLoader}
        </div>
      )}
      <div className='space-y-4'>{slotScoreCardDetails}</div>
    </div>
  );
}
