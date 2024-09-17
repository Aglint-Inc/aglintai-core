import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { FileText } from 'lucide-react';

export const RecentActivity = ({ interviewer }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className='space-y-4'>
          {interviewer.recentActivity.map((activity, index) => (
            <li key={index} className='flex items-start space-x-3'>
              <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-100'>
                <FileText className='h-5 w-5 text-gray-500' />
              </div>
              <div>
                <p className='text-sm font-medium text-gray-900'>
                  {activity.action}
                </p>
                <p className='text-sm text-gray-500'>{activity.details}</p>
                <p className='mt-1 text-xs text-gray-400'>
                  {activity.timestamp}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
