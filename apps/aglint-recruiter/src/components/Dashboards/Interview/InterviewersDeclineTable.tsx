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
import { Avatar, AvatarImage, AvatarFallback } from "@components/shadcn/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@components/shadcn/ui/tabs"
import { Button } from "@components/shadcn/ui/button"
import { DownloadIcon, ClockIcon } from 'lucide-react'

const interviewers = [
  {
    name: "Patrick Hood",
    avatar: "/placeholder.svg?height=40&width=40&text=P",
    declines: 3,
    avgLeadTime: "-2h 39min",
    reasons: "Declined from slack. Out of office , Declined from slack. Too ...",
  },
  {
    name: "Lydia Han",
    avatar: "/placeholder.svg?height=40&width=40&text=L",
    declines: 2,
    avgLeadTime: "1h 2min",
    reasons: "Declined because I am out of office, Declined because I am o...",
  },
  {
    name: "JD Harper",
    avatar: "/placeholder.svg?height=40&width=40",
    declines: 2,
    avgLeadTime: "11min",
    reasons: "Declined because I am out of office, Decline from google cale...",
  },
  {
    name: "Hassaan Momin",
    avatar: "/placeholder.svg?height=40&width=40&text=H",
    declines: 2,
    avgLeadTime: "51min",
    reasons: "Decline from google calendar event, Decline from google cale...",
  },
  {
    name: "Ed Maldonado",
    avatar: "/placeholder.svg?height=40&width=40&text=E",
    declines: 1,
    avgLeadTime: "54min",
    reasons: "Decline from google calendar event",
  },
  {
    name: "Brittany Ridge",
    avatar: "/placeholder.svg?height=40&width=40&text=B",
    declines: 1,
    avgLeadTime: "-1min",
    reasons: "Missed interview",
  },
  {
    name: "Andy Kevin Arao",
    avatar: "/placeholder.svg?height=40&width=40&text=A",
    declines: 1,
    avgLeadTime: "49min",
    reasons: "Decline from google calendar event",
  },
  {
    name: "Ashutosh Lodhi",
    avatar: "/placeholder.svg?height=40&width=40&text=A",
    declines: 1,
    avgLeadTime: "22min",
    reasons: "Decline from google calendar event",
  },
]

export default function InterviewersDeclineTable() {
  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Interviewers</CardTitle>
        <div className="flex items-center space-x-2">
          <Tabs defaultValue="declines">
            <TabsList>
              <TabsTrigger value="interviewing">Interviewing</TabsTrigger>
              <TabsTrigger value="declines">Declines</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" size="icon">
            <DownloadIcon className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead>Declines</TableHead>
              <TableHead>Avg lead time</TableHead>
              <TableHead className="w-[300px]">Reason(s)</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {interviewers.map((interviewer) => (
              <TableRow key={interviewer.name}>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={interviewer.avatar} alt={interviewer.name} />
                      <AvatarFallback>{interviewer.name.split(' ')[0][0]}</AvatarFallback>
                    </Avatar>
                    <span>{interviewer.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <ClockIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                    {interviewer.declines}
                  </div>
                </TableCell>
                <TableCell>{interviewer.avgLeadTime}</TableCell>
                <TableCell className="max-w-[300px] truncate">{interviewer.reasons}</TableCell>
                <TableCell className="text-right">
                  <Button variant="link" className="text-blue-500">View note</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}