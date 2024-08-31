import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@components/shadcn/ui/card"

export default function AverageTenure() {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Average Tenure</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="text-6xl font-bold mb-2">1.9</div>
        <div className="text-2xl font-semibold mb-4">Years</div>
        <p className="text-center text-muted-foreground">
          Average time before switching companies.
        </p>
      </CardContent>
    </Card>
  )
}