import React, { useState } from 'react'
import { Button } from "@components/shadcn/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/shadcn/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@components/shadcn/ui/popover"
import { Calendar } from "@components/shadcn/ui/calendar"
import { CalendarIcon, X, Briefcase, Building2, MapPin, Clock } from "lucide-react"
import { format } from "date-fns"

export default function Component() {
  const [job, setJob] = useState("")
  const [department, setDepartment] = useState("")
  const [location, setLocation] = useState("")
  const [dateRange, setDateRange] = useState("")
  const [startDate, setStartDate] = useState<Date | undefined>()
  const [endDate, setEndDate] = useState<Date | undefined>()

  const clearFilter = (filter: string) => {
    switch (filter) {
      case 'job':
        setJob("")
        break
      case 'department':
        setDepartment("")
        break
      case 'location':
        setLocation("")
        break
      case 'dateRange':
        setDateRange("")
        setStartDate(undefined)
        setEndDate(undefined)
        break
      default:
        setJob("")
        setDepartment("")
        setLocation("")
        setDateRange("")
        setStartDate(undefined)
        setEndDate(undefined)
    }
  }

  const handleFilter = () => {
    console.log("Filtering with:", { job, department, location, dateRange, startDate, endDate })
  }

  const renderSelect = (
    value: string, 
    onChange: (value: string) => void, 
    placeholder: string, 
    options: { value: string, label: string }[], 
    icon: React.ReactNode
  ) => (
    <div className="relative">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="pl-8">
          {icon}
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map(option => (
            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      {value && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full"
          onClick={() => clearFilter(placeholder.toLowerCase())}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )

  return (
    <div className="space-y-2 p-4 bg-background rounded-lg shadow">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button variant="ghost" size="sm" onClick={() => clearFilter('all')}>Clear All</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
        {renderSelect(
          job,
          setJob,
          "Job",
          [
            { value: "engineer", label: "Software Engineer" },
            { value: "designer", label: "UX Designer" },
            { value: "manager", label: "Product Manager" }
          ],
          <Briefcase className="h-4 w-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        )}

        {renderSelect(
          department,
          setDepartment,
          "Department",
          [
            { value: "engineering", label: "Engineering" },
            { value: "design", label: "Design" },
            { value: "product", label: "Product" }
          ],
          <Building2 className="h-4 w-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        )}

        {renderSelect(
          location,
          setLocation,
          "Location",
          [
            { value: "newyork", label: "New York" },
            { value: "sanfrancisco", label: "San Francisco" },
            { value: "london", label: "London" }
          ],
          <MapPin className="h-4 w-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        )}

        {renderSelect(
          dateRange,
          setDateRange,
          "Date Range",
          [
            { value: "week", label: "This Week" },
            { value: "month", label: "This Month" },
            { value: "quarter", label: "This Quarter" },
            { value: "year", label: "This Year" },
            { value: "6months", label: "Last 6 Months" },
            { value: "custom", label: "Custom Range" }
          ],
          <Clock className="h-4 w-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        )}
      </div>

      {dateRange === 'custom' && (
        <div className="flex space-x-2 mt-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="w-[140px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PP") : <span>Start date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="w-[140px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PP") : <span>End date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      )}

      <Button onClick={handleFilter} size="sm" className="mt-2">Apply Filters</Button>
    </div>
  )
}