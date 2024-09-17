import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { AlertTriangle } from 'lucide-react';

import { UIButton } from '@/components/Common/UIButton';
export const PendingActions = ({ interviewer }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {interviewer.pendingActions.map((action, index) => (
            <div
              key={index}
              className='flex items-center justify-between rounded-lg border border-yellow-200 bg-yellow-50 p-4'
            >
              <div className='flex items-start space-x-3'>
                <AlertTriangle className='mt-1 h-5 w-5 text-yellow-500' />
                <div>
                  <h3 className='font-medium text-yellow-800'>{action.type}</h3>
                  <p className='text-sm text-yellow-700'>{action.details}</p>
                  <p className='mt-1 text-xs text-yellow-600'>
                    Deadline: {action.deadline}
                  </p>
                </div>
              </div>
              <UIButton
                size='sm'
                variant='outline'
                className='border-yellow-300 text-yellow-700 hover:bg-yellow-100'
              >
                Take Action
              </UIButton>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
