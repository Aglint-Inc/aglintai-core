"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@components/shadcn/ui/card"
import React from 'react'
import { Bar, CartesianGrid, Cell,ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function RequestTypesDelaysChart() {
  const data = [
    { type: 'Scheduling', avgTime: 3, completionRate: 85, color: 'hsl(var(--primary))' },
    { type: 'Rescheduling', avgTime: 4.5, completionRate: 90, color: 'hsl(var(--secondary))' },
    { type: 'Decline', avgTime: 2, completionRate: 75, color: 'hsl(var(--accent))' },
    { type: 'Cancel', avgTime: 1.5, completionRate: 95, color: 'hsl(var(--destructive))' },
    { type: 'Debrief', avgTime: 5, completionRate: 80, color: 'hsl(var(--muted))' },
  ]

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center">
          Request Types Causing Most Delays: Avg. Time to Completion vs Completion Rate
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="type" 
              stroke="hsl(var(--foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              yAxisId="left"
              orientation="left"
              stroke="hsl(var(--foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              label={{ value: 'Avg. Time to Completion (Days)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              stroke="hsl(var(--foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              label={{ value: 'Completion Rate (%)', angle: 90, position: 'insideRight', style: { textAnchor: 'middle' } }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))', 
                borderColor: 'hsl(var(--border))' 
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Legend />
            <Bar 
              yAxisId="left" 
              dataKey="avgTime" 
              name="Avg. Time to Completion (Days)" 
              radius={[4, 4, 0, 0]}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
            <Line 
              yAxisId="right" 
              type="monotone" 
              dataKey="completionRate" 
              stroke="hsl(var(--info))" 
              name="Completion Rate (%)" 
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--info))', strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}