interface ScoreWeightageProps {
  slotResetButton: React.ReactNode;
  slotScoreWheel: React.ReactNode;
  slotScorePercent: React.ReactNode;
  slotBanner: React.ReactNode;
}

export function ScoreWeightage({ slotResetButton, slotScoreWheel, slotScorePercent, slotBanner }: ScoreWeightageProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        {slotResetButton}
      </div>
      <div className="flex justify-center">
        {slotScoreWheel}
      </div>
      <div className="space-y-2">
        {slotScorePercent}
      </div>
      {slotBanner}
    </div>
  );
}