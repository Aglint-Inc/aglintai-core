'use client';
import CompletedInterviewsOverTime from '@/src/components/Charts/ CompletedInterviewsOverTime';
import ConfirmationVsCompletion from '@/src/components/Charts/ConfirmationVsCompletiont';
import { ConversionRateRadialChart } from '@/src/components/Charts/ConversionRateRadialChart';
import InterviewTypeDistribution from '@/src/components/Charts/InterviewTypeDistribution';
import JobDashboardChart from '@/src/components/Charts/JobDashboardChart';
import MonthlyRequestWorkloadChart from '@/src/components/Charts/MonthlyRequestWorkloadByType';
import RequestHandlingOverQuartersChart from '@/src/components/Charts/RequestHandlingOverQuarters';
import { RequestTrend } from '@/src/components/Charts/RequestTrend';
import RequestTypesDelaysChart from '@/src/components/Charts/RequestTypesDelaysChart';
import UrgentVsStandard from '@/src/components/Charts/UrgentVsStandard';
import InterviewersTrainingReport from '@/src/components/Reports/InterviewersTrainingReport';
import TrainingCompletionRates from '@/src/components/Reports/TrainingCompletionRates';
import TrainingDashboard from '@/src/components/Reports/TrainingDashboard';
import { EmptyState } from '@components/shadcn/empty-state';
import { useRouter } from 'next/navigation';

export default function ReportsPage() {
  const router = useRouter(); // Add this line

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <EmptyState
        module="interviewPlan"
        title="No reports found"
        description="You don't have any reports yet. Please check back later."
        actionLabel="Go to home"
        onAction={() => {
          router.push('/');
        }}
      />
      {/* <div className="col-span-1 md:col-span-2 lg:col-span-3">
        <InterviewersTrainingReport />
      </div>
      <div className="col-span-1 md:col-span-2 lg:col-span-3">
        <TrainingCompletionRates />
      </div> */}
      <div className="col-span-1 md:col-span-2 lg:col-span-3">
        <TrainingDashboard />
      </div>
      {/* <div className="col-span-1 md:col-span-2 lg:col-span-3">
        <CompletedInterviewsOverTime />
      </div>
      <div className="col-span-1 md:col-span-1 lg:col-span-1">
        <ConversionRateRadialChart />
      </div>
      <div className="col-span-1 md:col-span-1 lg:col-span-2">
        <JobDashboardChart />
      </div>
      <div className="col-span-1 md:col-span-2 lg:col-span-3">
        <RequestTrend />
      </div>
      <div className="col-span-1">
        <UrgentVsStandard />
      </div>
      <div className="col-span-1">
        <RequestTypesDelaysChart />
      </div>
      <div className="col-span-1">
        <MonthlyRequestWorkloadChart />
      </div>
      <div className="col-span-1">
        <RequestHandlingOverQuartersChart />
      </div>
      <div className="col-span-1">
        <InterviewTypeDistribution />
      </div>
      <div className="col-span-1">
        <ConfirmationVsCompletion />
      </div> */}
    </div>
  );
}
