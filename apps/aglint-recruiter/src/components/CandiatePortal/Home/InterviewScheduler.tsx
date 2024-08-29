import { AvailabilityBlock } from "./AvailabilityBlock"
import NextInterviewBlock from "./NextInterviewBlock"
import { RecruitingTeamBlock } from "./RecruitingTeamBlock"
import { ScheduleInterviewBlock } from "./ScheduleInterviewBlock"

export default function InterviewScheduler() {
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">What's next?</h1>
      <ScheduleInterviewBlock />
      <AvailabilityBlock />
      <NextInterviewBlock />
      <RecruitingTeamBlock />
    </div>
  )
}