import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
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
        <p className='mb-4 text-sm text-gray-500'>
          Based on availability requested on Aug 22
        </p>
        <Link href='#' className='text-sm text-blue-600'>
          View availability
        </Link>
      </CardContent>
    </Card>
  );
}
