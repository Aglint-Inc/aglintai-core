import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@components/shadcn/ui/card';
import Link from 'next/link';

export function RecruitingTeamBlock() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-lg font-semibold'>
          The recruiting team is scheduling your next interview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className='text-sm text-gray-500 mb-4'>
          Based on availability requested on Aug 22
        </p>
        <Link href='#' className='text-blue-600 text-sm'>
          View availability
        </Link>
      </CardContent>
    </Card>
  );
}
