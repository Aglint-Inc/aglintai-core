import React from 'react';

function MessageCard() {
  return (

       <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
      <Avatar>
        <AvatarImage src="path-to-avatar-image.jpg" alt="Brittany Emmanuel" />
        <AvatarFallback>BE</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="text-sm text-gray-500 flex justify-between items-center">
          <span>Brittany Emmanuel</span>
          <span className="text-xs">10 Minutes ago</span>
        </div>
        <div className="text-sm text-gray-500">Hiring Manager</div>
        <h3 className="text-lg font-semibold mt-2">
          Availability requested for Coding round II
        </h3>
        <p className="text-gray-500 mt-2">
          Hi Ter Stegen,
          <br />
          Please submit your availability for the interview of coding round II
          before 24th August 2024, 05:30 AM PST. Upon your submission, we will
          be sending a self-scheduling link to confirm the interview.
        </p>
        <div className="mt-4">
          <Button className="w-full bg-gray-800 text-white">
            Submit Availability
          </Button>
        </div>
      </div>
    </div>
   
  );
}

export default MessageCard;


