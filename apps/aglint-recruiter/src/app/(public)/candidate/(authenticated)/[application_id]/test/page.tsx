import React from 'react'

import InterviewProgressCard from '@/src/components/CandiatePortal/components/InterviewProgressCard'
import MessageCard from '@/src/components/CandiatePortal/components/MessageCard'

const interviews = [
  {
    name: "Personality and Cultural fit",
    time: "09:30 AM",
    date: "11 December 2021",
    status: "Completed" as const
  },
  {
    name: "Technical Interview",
    time: "11:00 AM",
    date: "12 December 2021",
    status: "Not Scheduled" as const
  },
  {
    name: "HR Interview",
    time: "02:00 PM",
    date: "",
    status: "Not Scheduled" as const
  }
];

function Test() {
  return (
    <div className='w-full max-w-3xl mx-auto flex flex-col gap-4 pb-20'>
      <MessageCard />
      <MessageCard />
      <div>
        {interviews.map((interview, index) => (
          <InterviewProgressCard
            key={index}
            interview={interview}
            isLast={index === interviews.length - 1} 
          />
        ))}
      </div>
    </div>
  )
}

export default Test
