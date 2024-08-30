"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@components/shadcn/ui/card"
import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function UrgentVsStandard() {
  const data = [
    { type: 'Scheduling', Urgent: 30, Standard: 70 },
    { type: 'Rescheduling', Urgent: 20, Standard: 50 },
    { type: 'Decline', Urgent: 15, Standard: 35 },
    { type: 'Cancel', Urgent: 10, Standard: 25 },
    { type: 'Debrief', Urgent: 5, Standard: 15 },
  ]

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Request Type Distribution: Urgent vs. Standard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis label={{ value: 'Number of Requests', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Urgent" stackId="a" fill="#ffa500" /> {/* Orange color for Urgent */}
            <Bar dataKey="Standard" stackId="a" fill="#87CEEB" /> {/* Light blue color for Standard */}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}