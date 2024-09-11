import { Badge } from '@components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';

function ResendRequests() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  return (
    <Card className='bg-white shadow-sm'>
      <CardHeader>
        <CardTitle className='text-xl font-semibold'>Recent Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {[
            {
              role: 'Software Engineer',
              department: 'Frontend Development',
              sessions: [
                'Technical Interview',
                'System Design Discussion',
                'Culture Fit Assessment',
              ],
              status: 'Completed',
            },
            {
              role: 'Data Scientist',
              department: 'Machine Learning',
              sessions: ['Algorithm Proficiency Test', 'Project Review'],
              status: 'In Progress',
            },
            {
              role: 'Product Manager',
              department: 'Product Development',
              sessions: [
                'Product Strategy Discussion',
                'Stakeholder Management Scenario',
                'Technical Knowledge Assessment',
                'Final Round with Leadership',
              ],
              status: 'Completed',
            },
            {
              role: 'UX Designer',
              department: 'User Experience',
              sessions: ['Portfolio Review'],
              status: 'Scheduled',
            },
          ].map((item, index) => (
            <div key={index} className='border rounded-lg overflow-hidden'>
              <div
                className='flex items-center justify-between p-4 cursor-pointer bg-gray-50'
                onClick={() =>
                  setExpandedCard(expandedCard === index ? null : index)
                }
              >
                <div>
                  <h3 className='font-medium'>{item.role}</h3>
                  <p className='text-sm text-gray-500'>{item.department}</p>
                </div>
                <div className='text-right flex items-center space-x-2'>
                  <p className='text-sm'>
                    {item.sessions.length} interview session
                    {item.sessions.length !== 1 ? 's' : ''}
                  </p>
                  <Badge
                    variant='outline'
                    className={`${
                      item.status === 'Completed'
                        ? 'bg-green-50 text-green-700'
                        : item.status === 'In Progress'
                          ? 'bg-yellow-50 text-yellow-700'
                          : 'bg-gray-50 text-gray-700'
                    }`}
                  >
                    {item.status}
                  </Badge>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      expandedCard === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </div>
              </div>
              {expandedCard === index && (
                <div className='p-4 bg-white'>
                  <h4 className='font-medium mb-2'>Interview Sessions:</h4>
                  <ul className='list-disc pl-5 space-y-1'>
                    {item.sessions.map((session, sessionIndex) => (
                      <li key={sessionIndex} className='text-sm'>
                        {session}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default ResendRequests;
