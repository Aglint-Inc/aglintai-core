'use client';
import MonthlyRequestWorkloadChart from '@/src/components/Charts/MonthlyRequestWorkloadByType';
import RequestHandlingOverQuartersChart from '@/src/components/Charts/RequestHandlingOverQuarters';
import { RequestTrend } from '@/src/components/Charts/RequestTrend';
import RequestTypesDelaysChart from '@/src/components/Charts/RequestTypesDelaysChart';
import UrgentVsStandard from '@/src/components/Charts/UrgentvsStandard';

export default function ReportsPage() {
  return (
    <div>
      Reports:
        <RequestTrend />
        <div className="grid grid-cols-2 gap-4">
        <UrgentVsStandard />
        <RequestTypesDelaysChart />
        <MonthlyRequestWorkloadChart />
        <RequestHandlingOverQuartersChart />
        <div className="bg-gray-200 h-24"></div>
        <div className="bg-gray-200 h-24"></div>
        <div className="bg-gray-200 h-24"></div>
        <div className="bg-gray-200 h-24"></div>
        <div className="bg-gray-200 h-24"></div>
      </div>
    </div>
  );
}
