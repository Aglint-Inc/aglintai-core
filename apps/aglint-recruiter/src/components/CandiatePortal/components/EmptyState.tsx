import { type LucideIcon } from 'lucide-react'
import React from 'react'

import { Card, CardContent } from "@/components/ui/card"

interface DynamicIconTextProps {
  icon: LucideIcon
  text: string
}

export default function EmptyState({ icon: Icon, text }: DynamicIconTextProps) {
  return (
    <Card className="w-full ">
      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
        <Icon className="w-10 h-10  mb-4" aria-hidden="true" />
        <p className="text-sm">{text}</p>
      </CardContent>
    </Card>
  )
}