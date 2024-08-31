import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/shadcn/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@components/shadcn/ui/card"
import { ArrowUpIcon, UserIcon } from 'lucide-react'

const modules = [
  { name: "AE Intro call", trained: 5, training: 0, pendingApproval: 0 },
  { name: "C++ coding", trained: 4, training: 0, pendingApproval: 0 },
  { name: "Culture II", trained: 4, training: 3, pendingApproval: 0 },
  { name: "Culture fit", trained: 8, training: 5, pendingApproval: 0 },
  { name: "Data Science", trained: 3, training: 1, pendingApproval: 0 },
  { name: "Leadership & Drive II", trained: 5, training: 1, pendingApproval: 0 },
  { name: "Leadership III", trained: 0, training: 0, pendingApproval: 0 },
]

export default function InterviewModulesTable() {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Interview Modules</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">
                Name <ArrowUpIcon className="inline-block h-4 w-4 ml-1" />
              </TableHead>
              <TableHead className="text-right">Trained</TableHead>
              <TableHead className="text-right">Training</TableHead>
              <TableHead className="text-right">Pending approval</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {modules.map((module) => (
              <TableRow key={module.name}>
                <TableCell className="font-medium">{module.name}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end">
                    <UserIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                    {module.trained}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end">
                    <UserIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                    {module.training}
                  </div>
                </TableCell>
                <TableCell className="text-right">{module.pendingApproval}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}