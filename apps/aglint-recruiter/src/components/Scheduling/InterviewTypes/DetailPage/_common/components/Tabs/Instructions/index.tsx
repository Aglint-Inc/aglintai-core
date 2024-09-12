import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Edit } from 'lucide-react';
import React from 'react';

function Instructions() {
  return (
    <div>
      {' '}
      <div className='flex justify-between mb-4'>
        <h2 className='text-2xl font-bold text-gray-900'>
          Interview Instructions
        </h2>
        <Button className='bg-blue-600 hover:bg-blue-700 text-white'>
          <Edit className='h-4 w-4 mr-2' />
          Edit Instructions
        </Button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <Card className='bg-white shadow-md'>
          <CardHeader>
            <CardTitle className='text-gray-800'>For Interviewers</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className='list-disc pl-5 space-y-2 text-gray-700'>
              <li>
                Review the candidate's resume and application before the
                interview
              </li>
              <li>
                Start with a brief introduction and explain the interview
                process
              </li>
              <li>
                Focus on assessing technical skills related to DevOps practices
              </li>
              <li>
                Ask about experience with CI/CD, containerization, and cloud
                platforms
              </li>
              <li>Evaluate problem-solving skills with real-world scenarios</li>
              <li>Allow time for the candidate to ask questions</li>
              <li>Provide detailed feedback immediately after the interview</li>
            </ul>
          </CardContent>
        </Card>
        <Card className='bg-white shadow-md'>
          <CardHeader>
            <CardTitle className='text-gray-800'>For Candidates</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className='list-disc pl-5 space-y-2 text-gray-700'>
              <li>Review your DevOps knowledge and recent projects</li>
              <li>
                Be prepared to discuss your experience with various DevOps tools
                and practices
              </li>
              <li>
                Have examples ready of how you've solved complex technical
                problems
              </li>
              <li>
                Be ready to write or review code during the technical interview
              </li>
              <li>Prepare questions about the role and the company</li>
              <li>
                Ensure you have a stable internet connection for virtual
                interviews
              </li>
              <li>Follow up with a thank-you email after the interview</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Instructions;
