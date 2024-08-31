"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@components/shadcn/ui/card"
import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer,Tooltip, XAxis, YAxis } from 'recharts'

export default function RequestHandlingOverQuartersChart() {
  const data = [
    { quarter: 'Q1', Scheduling: 50, Rescheduling: 30, Decline: 20, Cancel: 10, Debrief: 15 },
    { quarter: 'Q2', Scheduling: 60, Rescheduling: 40, Decline: 25, Cancel: 15, Debrief: 20 },
    { quarter: 'Q3', Scheduling: 70, Rescheduling: 50, Decline: 30, Cancel: 20, Debrief: 25 },
    { quarter: 'Q4', Scheduling: 80, Rescheduling: 60, Decline: 35, Cancel: 25, Debrief: 30 },
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
        <CardTitle className="text-md font-semibold text-center">Request Handling Over Quarters</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="quarter" />
            <YAxis label={{ value: 'Number of Requests', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Scheduling" stackId="a" fill={colors.Scheduling} />
            <Bar dataKey="Rescheduling" stackId="a" fill={colors.Rescheduling} />
            <Bar dataKey="Decline" stackId="a" fill={colors.Decline} />
            <Bar dataKey="Cancel" stackId="a" fill={colors.Cancel} />
            <Bar dataKey="Debrief" stackId="a" fill={colors.Debrief} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}