import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@components/shadcn/ui/card"
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { ArrowDownIcon, DownloadIcon } from 'lucide-react'

const data = [
  { date: '18 Feb', days: 2.8 },
  { date: '19 Feb', days: 4.1 },
  { date: '20 Feb', days: 3.7 },
  { date: '21 Feb', days: 3.9 },
  { date: '22 Feb', days: 4.2 },
  { date: '23 Feb', days: 6.5 },
]

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-300 rounded shadow">
        <p>{`${payload[0].payload.date}: ${payload[0].value} days`}</p>
      </div>
    )
  }
  return null
}

export default function DeclineLeadTimeChart() {
  const averageLeadTime = 4.5

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-2xl font-bold">Decline lead time</CardTitle>
          <p className="text-sm text-muted-foreground">Time between decline received & interview starts</p>
        </div>
        <DownloadIcon className="h-5 w-5 text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center">
            <span className="text-xl font-bold">{averageLeadTime} days</span>
            <ArrowDownIcon className="h-5 w-5 ml-1" />
          </div>
          <span className="text-muted-foreground">on average</span>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis type="number" domain={[0, 7]} ticks={[0, 2, 3, 4, 5, 6, 7]} />
              <Tooltip content={<CustomTooltip />} />
              <Scatter data={data} fill="#22c55e" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}