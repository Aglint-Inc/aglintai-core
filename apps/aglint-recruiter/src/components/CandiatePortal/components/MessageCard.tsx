import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";


export default function MessageCard() {
  return (
    <Card className="w-full rounded-md" >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12 rounded-lg">
            <AvatarImage className="rounded-lg" src="/placeholder.svg?height=40&width=40" alt="Profile picture" />
            <AvatarFallback>BE</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-sm font-semibold">Brittany Emmanuel</h2>
            <p className="text-sm text-muted-foreground">Hiring Manager</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">10 Minutes ago</p>
          <a href="mail.google.com" className="text-sm font-medium text-primary hover:underline">
            View in email
          </a>
        </div>
      </CardHeader>
      <CardContent className="mt-4">
        <h3 className="text-md font-semibold mb-4">Avaliability requested for Coding round II</h3>
        <p className="text-muted-foreground mb-2">Hi Ter Stegen,</p>
        <p className="text-muted-foreground">
          Please submit your availability for the interview of coding round II before 24 th august 2024, 05:30
          AM PST. Upon your submission we will be sending a self scheduling link to confirm the interview
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">Submit Availability</Button>
      </CardFooter>
    </Card>
  )
}