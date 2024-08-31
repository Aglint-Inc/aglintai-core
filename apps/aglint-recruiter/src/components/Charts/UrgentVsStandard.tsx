"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@components/shadcn/ui/card"
import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function UrgentVsStandard() {
  const data = [
    { type: 'Scheduling', Standard: 70, Urgent: 30 },
    { type: 'Rescheduling', Standard: 50, Urgent: 20 },
    { type: 'Decline', Standard: 35, Urgent: 15 },
    { type: 'Cancel', Standard: 25, Urgent: 10 },
    { type: 'Debrief', Standard: 15, Urgent: 5 },
  ]

  return (
    <Card className="w-full max-w-3xl mx-auto border border-border">
      <CardHeader>
        <CardTitle className="text-md font-semibold text-center">
          Request Type Distribution: Standard vs. Urgent
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" stroke="hsl(var(--foreground))" />
            <YAxis label={{ value: 'Number of Requests', angle: -90, position: 'insideLeft', style: { fill: 'hsl(var(--foreground))' } }} stroke="hsl(var(--foreground))" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))', 
                borderColor: 'hsl(var(--border))' 
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Legend wrapperStyle={{ color: 'hsl(var(--foreground))' }} />
            <Bar dataKey="Standard" stackId="a" fill="hsl(var(--chart-1))" />
            <Bar dataKey="Urgent" stackId="a" fill="hsl(var(--chart-2))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}