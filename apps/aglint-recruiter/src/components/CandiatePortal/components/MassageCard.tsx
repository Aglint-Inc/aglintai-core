import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const MessageCard = () => {
  return (
    <Card className="mx-auto shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <CardHeader className="flex items-center px-6 py-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center">
            <img
              className="block mx-auto sm:mx-0 sm:flex-shrink-0 h-16 sm:h-24 rounded-full"
              src="https://via.placeholder.com/150"
              alt="Profile"
            />
            <div className="ml-4">
              <p className="text-xl leading-tight">Brittany Emmanuel</p>
              <p className="text-sm leading-tight text-gray-600">Hiring Manager</p>
            </div>
          </div>
            <div className="ml-auto text-center sm:text-right">
                <p className="mt-2 text-gray-500">10 Minutes ago</p>
                <a href="#" className="text-blue-500 hover:underline">View in email</a>
            </div>
        </div>
      </CardHeader>
      <CardContent className="px-6 py-4">
        <h2 className="text-lg font-semibold">Availability requested for Coding round II</h2>
        <p className="mt-2">
          Hi Ter Stegen,
          <br />
          Please submit your availability for the interview of coding round II before 24th August 2024, 05:30 AM PST. Upon your submission we will be sending a self scheduling link to confirm the interview.
        </p>
      </CardContent>
      <CardFooter className="px-6 py-4">
        <Button className="w-full py-2 px-4 rounded border border-gray-300">
          Submit Availability
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MessageCard;
