"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import cityTimezones from 'city-timezones'

interface CityData {
  city: string
  city_ascii: string
  lat: number
  lng: number
  pop: number
  country: string
  iso2: string
  iso3: string
  province: string
  exactCity: string
  exactProvince: string
  state_ansi: string
  timezone: string
}

interface TimezoneGroup {
  timezone: string
  cities: CityData[]
}

const getTimezones = (): TimezoneGroup[] => {
  const allCities = cityTimezones.cityMapping as CityData[]
  const filteredCities = allCities.filter(city => 
    city.country === 'United States of America' || city.country === 'India'
  )

  const timezoneGroups: { [key: string]: TimezoneGroup } = {}

  filteredCities.forEach(city => {
    if (!timezoneGroups[city.timezone]) {
      timezoneGroups[city.timezone] = { timezone: city.timezone, cities: [] }
    }
    timezoneGroups[city.timezone].cities.push(city)
  })

  return Object.values(timezoneGroups).sort((a, b) => a.timezone.localeCompare(b.timezone))
}

const timezones = getTimezones()

export function TimezonePicker() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  const selectedCity = React.useMemo(() => 
    timezones.flatMap(g => g.cities).find(city => `${city.city}, ${city.state_ansi}` === value),
    [value]
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[280px] justify-between"
        >
          {selectedCity
            ? `${selectedCity.city}, ${selectedCity.state_ansi}`
            : "Select city and timezone..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0">
        <Command>
          <CommandInput placeholder="Search city or timezone..." />
          <CommandList>
            <CommandEmpty>No city or timezone found.</CommandEmpty>
            {timezones.map((group) => (
              <CommandGroup key={group.timezone} heading={group.timezone}>
                {group.cities.map((city) => (
                  <CommandItem
                    key={`${city.city}-${city.state_ansi}`}
                    value={`${city.city}, ${city.state_ansi}`}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === `${city.city}, ${city.state_ansi}` ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {`${city.city}, ${city.state_ansi} (${city.country === 'United States of America' ? 'US' : 'India'})`}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default TimezonePicker