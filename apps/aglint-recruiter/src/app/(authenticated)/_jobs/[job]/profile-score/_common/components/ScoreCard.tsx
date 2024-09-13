import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';

interface ScoreCardProps {
  bgColor: string;
  textHeading: string;
  children: React.ReactNode;
}

export function ScoreCard({
  bgColor,
  textHeading,
  children,
}: ScoreCardProps) {
  return (
    <Card className='w-full'>
      <CardHeader className={`text-white ${bgColor}`}>
        <CardTitle>{textHeading}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
