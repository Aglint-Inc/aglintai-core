import { Label } from "@components/ui/label";

interface ScorePercentageProps {
  bgColor: string;
  textTitle: string;
  slotInputPercent: React.ReactNode;
}

export function ScorePercentage({ bgColor, textTitle, slotInputPercent }: ScorePercentageProps) {
  return (
    <div className={`flex items-center justify-between p-2 rounded-md ${bgColor}`}>
      <Label className="text-white">{textTitle}</Label>
      {slotInputPercent}
    </div>
  );
}