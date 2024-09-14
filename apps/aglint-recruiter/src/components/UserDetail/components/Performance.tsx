import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Progress } from '@components/ui/progress';

export const Performance = ({ interviewer }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div>
            <div className='flex justify-between mb-1'>
              <span className='text-sm font-medium text-gray-700'>
                Candidate Satisfaction
              </span>
              <span className='text-sm font-medium text-gray-700'>
                {interviewer.performanceMetrics.candidateSatisfaction}%
              </span>
            </div>
            <Progress
              value={interviewer.performanceMetrics.candidateSatisfaction}
              className='h-2'
            />
          </div>
          <div>
            <div className='flex justify-between mb-1'>
              <span className='text-sm font-medium text-gray-700'>
                Hiring Manager Satisfaction
              </span>
              <span className='text-sm font-medium text-gray-700'>
                {interviewer.performanceMetrics.hiringManagerSatisfaction}%
              </span>
            </div>
            <Progress
              value={interviewer.performanceMetrics.hiringManagerSatisfaction}
              className='h-2'
            />
          </div>
          <div>
            <div className='flex justify-between mb-1'>
              <span className='text-sm font-medium text-gray-700'>
                Decision Accuracy
              </span>
              <span className='text-sm font-medium text-gray-700'>
                {interviewer.performanceMetrics.decisionAccuracy}%
              </span>
            </div>
            <Progress
              value={interviewer.performanceMetrics.decisionAccuracy}
              className='h-2'
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
