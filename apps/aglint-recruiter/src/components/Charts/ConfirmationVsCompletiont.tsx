"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@components/shadcn/ui/card"
import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Line, ResponsiveContainer,Tooltip, XAxis, YAxis } from 'recharts'

export default function ConfirmationVsCompletion() {
  const data = [
    { month: 'January', confirmationRate: 82, completionRate: 80 },
    { month: 'February', confirmationRate: 73, completionRate: 79 },
    { month: 'March', confirmationRate: 80, completionRate: 87.5 },
    { month: 'April', confirmationRate: 90, completionRate: 84 },
    { month: 'May', confirmationRate: 72, completionRate: 90 },
    { month: 'June', confirmationRate: 85, completionRate: 90.5 },
  ]

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Interview Confirmation vs. Completion Rates Over 6 Months
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--primary))" />
            <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--primary))" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="confirmationRate" fill="hsl(45, 100%, 70%)" name="Confirmation Rate (%)" />
            <Line yAxisId="right" type="monotone" dataKey="completionRate" stroke="hsl(220, 100%, 50%)" strokeWidth={2} name="Completion Rate (%)" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}