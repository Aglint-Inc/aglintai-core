import { Button } from '@components/ui/button';
import { Card, CardContent } from '@components/ui/card';
import { Input } from '@components/ui/input';
import { Progress } from '@radix-ui/react-progress';
import { Badge, BookOpen, MoreVertical, Plus, Search } from 'lucide-react';
import React from 'react';

function Training() {
  return (
    <div>
      <div className='flex justify-between'>
        <Input
          placeholder='Search training modules...'
          className='max-w-sm bg-white'
          startAdornment={<Search className='h-4 w-4 text-gray-400' />}
        />
        <Button className='bg-blue-600 hover:bg-blue-700 text-white'>
          <Plus className='h-4 w-4 mr-2' />
          Add Training Module
        </Button>
      </div>
      <Card>
        <CardContent className='p-0'>
          <table className='w-full'>
            <thead>
              <tr className='border-b bg-gray-50'>
                <th className='text-left p-4 text-gray-600'>Module Name</th>
                <th className='text-left p-4 text-gray-600'>Type</th>
                <th className='text-left p-4 text-gray-600'>Duration</th>
                <th className='text-left p-4 text-gray-600'>Completion Rate</th>
                <th className='text-left p-4 text-gray-600'>Status</th>
                <th className='text-left p-4 text-gray-600'></th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  name: 'DevOps Fundamentals',
                  type: 'Online Course',
                  duration: '2 weeks',
                  completionRate: 85,
                  status: 'Active',
                },
                {
                  name: 'CI/CD Pipeline Workshop',
                  type: 'Hands-on Lab',
                  duration: '3 days',
                  completionRate: 92,
                  status: 'Active',
                },
                {
                  name: 'Cloud Infrastructure Management',
                  type: 'Webinar Series',
                  duration: '1 week',
                  completionRate: 78,
                  status: 'Upcoming',
                },
                {
                  name: 'Kubernetes for DevOps',
                  type: 'Practical Assessment',
                  duration: '1 day',
                  completionRate: 95,
                  status: 'Active',
                },
              ].map((module, index) => (
                <tr
                  key={index}
                  className='border-b last:border-b-0 hover:bg-gray-50'
                >
                  <td className='p-4'>
                    <div className='flex items-center text-gray-900'>
                      <BookOpen className='h-4 w-4 mr-2 text-gray-400' />
                      {module.name}
                    </div>
                  </td>
                  <td className='p-4 text-gray-700'>{module.type}</td>
                  <td className='p-4 text-gray-700'>{module.duration}</td>
                  <td className='p-4'>
                    <div className='flex items-center'>
                      <Progress
                        value={module.completionRate}
                        className='w-[100px] mr-2 bg-blue-100'
                        indicatorClassName='bg-blue-600'
                      />
                      <span className='text-gray-700'>
                        {module.completionRate}%
                      </span>
                    </div>
                  </td>
                  <td className='p-4'>
                    <Badge
                      variant={
                        module.status === 'Active' ? 'success' : 'secondary'
                      }
                    >
                      {module.status}
                    </Badge>
                  </td>
                  <td className='p-4'>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='text-gray-500 hover:text-gray-700'
                    >
                      <MoreVertical className='h-4 w-4' />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

export default Training;
