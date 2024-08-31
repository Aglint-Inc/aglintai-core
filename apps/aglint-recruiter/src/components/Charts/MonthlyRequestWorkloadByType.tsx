"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@components/shadcn/ui/card"
import React from 'react'
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer,Tooltip, XAxis, YAxis } from 'recharts'

export default function MonthlyRequestWorkloadChart() {
  const data = [
    { month: 'January', Scheduling: 40, Rescheduling: 20, Decline: 10, Cancel: 5, Debrief: 15 },
    { month: 'February', Scheduling: 35, Rescheduling: 25, Decline: 12, Cancel: 6, Debrief: 18 },
    { month: 'March', Scheduling: 30, Rescheduling: 30, Decline: 15, Cancel: 7, Debrief: 20 },
    { month: 'April', Scheduling: 25, Rescheduling: 35, Decline: 18, Cancel: 8, Debrief: 22 },
    { month: 'May', Scheduling: 20, Rescheduling: 40, Decline: 20, Cancel: 10, Debrief: 25 },
    { month: 'June', Scheduling: 15, Rescheduling: 45, Decline: 22, Cancel: 12, Debrief: 28 },
  ]

  const colors = {
    Scheduling: 'hsl(var(--chart-1))',
    Rescheduling: 'hsl(var(--chart-2))',
    Decline: 'hsl(var(--chart-3))',
    Cancel: 'hsl(var(--chart-4))',
    Debrief: 'hsl(var(--chart-5))'
  }

  return (
    <Card className="w-full max-w-4xl mx-auto border border-border">
      <CardHeader>
        <CardTitle className="text-md font-semibold text-center">Monthly Request Workload by Type</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis label={{ value: 'Number of Requests', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="Scheduling" stackId="1" stroke={colors.Scheduling} fill={colors.Scheduling} />
            <Area type="monotone" dataKey="Rescheduling" stackId="1" stroke={colors.Rescheduling} fill={colors.Rescheduling} />
            <Area type="monotone" dataKey="Decline" stackId="1" stroke={colors.Decline} fill={colors.Decline} />
            <Area type="monotone" dataKey="Cancel" stackId="1" stroke={colors.Cancel} fill={colors.Cancel} />
            <Area type="monotone" dataKey="Debrief" stackId="1" stroke={colors.Debrief} fill={colors.Debrief} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}