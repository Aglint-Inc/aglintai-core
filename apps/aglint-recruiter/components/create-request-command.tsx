'use client';

import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { addDays, endOfWeek, format, startOfWeek } from 'date-fns';
import {
  ArrowRight,
  Briefcase,
  Calendar,
  ChevronLeft,
  FileText,
  Plus,
  User,
  UserPlus,
  X,
} from 'lucide-react';
import React, {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { DateRange } from 'react-day-picker';

import { useJobs } from '@/jobs/hooks';

import { DatePickerWithRange } from './date-picker-with-range';

interface Suggestion {
  type:
    | 'requestType'
    | 'candidate'
    | 'job'
    | 'interviewer'
    | 'date'
    | 'interview';
  id: string;
  name: string;
}

interface StructuredRequest {
  requestType: string;
  job?: string;
  candidate?: string;
  dateRange?: DateRange;
  interviews?: string[];
  interviewer?: string;
}

const mockData = {
  requestTypes: ['Schedule', 'Cancel', 'Reschedule', 'Decline'],
  candidates: ['John Doe', 'Jane Smith', 'Bob Johnson'],
  jobs: ['Senior Developer', 'Product Manager', 'UX Designer'],
  interviewers: ['Alice Williams', 'Charlie Brown', 'David Lee'],
  interviews: [
    'Technical Interview',
    'Behavioral Interview',
    'Culture Fit Interview',
  ],
};

const predefinedDateRanges = [
  { name: 'Today', getRange: () => ({ from: new Date(), to: new Date() }) },
  {
    name: 'Tomorrow',
    getRange: () => {
      const tomorrow = addDays(new Date(), 1);
      return { from: tomorrow, to: tomorrow };
    },
  },
  {
    name: 'This Week',
    getRange: () => ({
      from: startOfWeek(new Date()),
      to: endOfWeek(new Date()),
    }),
  },
  {
    name: 'Next Week',
    getRange: () => {
      const nextWeek = addDays(new Date(), 7);
      return { from: startOfWeek(nextWeek), to: endOfWeek(nextWeek) };
    },
  },
  {
    name: 'Custom Range',
    getRange: () => ({ from: new Date(), to: addDays(new Date(), 7) }),
  },
];

function CommandBar() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [structuredRequest, setStructuredRequest] = useState<StructuredRequest>(
    { requestType: '' },
  );
  const [customDateRange, setCustomDateRange] = useState<DateRange | undefined>(
    undefined,
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const { jobs } = useCreateRequest();

  const generateSuggestions = useCallback(() => {
    const lowercaseInput = inputValue.toLowerCase();
    let newSuggestions: Suggestion[] = [];

    switch (step) {
      case 0: // Request Type
        newSuggestions = mockData.requestTypes
          .filter((type) => type.toLowerCase().includes(lowercaseInput))
          .map((type) => ({
            type: 'requestType',
            id: type.toLowerCase(),
            name: type,
          }));
        break;
      case 1: // Job
        newSuggestions = jobs
          .filter((job) => job.toLowerCase().includes(lowercaseInput))
          .map((job) => ({ type: 'job', id: job.toLowerCase(), name: job }));
        break;
      case 2: // Candidate
        newSuggestions = mockData.candidates
          .filter((candidate) =>
            candidate.toLowerCase().includes(lowercaseInput),
          )
          .map((candidate) => ({
            type: 'candidate',
            id: candidate.toLowerCase(),
            name: candidate,
          }));
        break;
      case 3: // Interviews
        newSuggestions = mockData.interviews
          .filter((interview) =>
            interview.toLowerCase().includes(lowercaseInput),
          )
          .map((interview) => ({
            type: 'interview',
            id: interview.toLowerCase(),
            name: interview,
          }));
        break;
      case 4: // Date
        newSuggestions = predefinedDateRanges
          .filter((range) => range.name.toLowerCase().includes(lowercaseInput))
          .map((range) => ({
            type: 'date',
            id: range.name.toLowerCase(),
            name: range.name,
          }));
        break;
      case 5: // Interviewer (optional)
        newSuggestions = mockData.interviewers
          .filter((interviewer) =>
            interviewer.toLowerCase().includes(lowercaseInput),
          )
          .map((interviewer) => ({
            type: 'interviewer',
            id: interviewer.toLowerCase(),
            name: interviewer,
          }));
        break;
    }

    setSuggestions(newSuggestions);
  }, [inputValue, step]);

  useEffect(() => {
    generateSuggestions();
  }, [generateSuggestions]);

  const handleSelect = useCallback((item: Suggestion) => {
    setStructuredRequest((prev) => {
      if (item.type === 'interview') {
        // Prevent adding duplicate interview sessions
        if (prev.interviews && prev.interviews.includes(item.name)) {
          return prev;
        }
        return {
          ...prev,
          interviews: [...(prev.interviews || []), item.name],
        };
      }
      if (item.type === 'date') {
        const selectedRange = predefinedDateRanges.find(
          (range) => range.name === item.name,
        );
        if (selectedRange?.name === 'Custom Range') {
          setCustomDateRange(selectedRange.getRange());
        }
        return {
          ...prev,
          dateRange: selectedRange ? selectedRange.getRange() : undefined,
        };
      }
      return {
        ...prev,
        [item.type]: item.name,
      };
    });

    setInputValue('');

    if (item.type !== 'interview' && item.type !== 'date') {
      setStep((prev) => prev + 1);
    }

    inputRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Tab' && suggestions.length > 0) {
        e.preventDefault();
        handleSelect(suggestions[0]);
      } else if (e.key === 'Enter' && step === 5) {
        e.preventDefault();
        handleCompleteRequest();
      }
    },
    [suggestions, handleSelect, step],
  );

  const validateRequest = (request: StructuredRequest): string[] => {
    const errors: string[] = [];

    if (!request.requestType) {
      errors.push('At least one request type must be selected.');
    }

    if (!request.candidate) {
      errors.push('A candidate must be selected.');
    }

    if (!request.job) {
      errors.push('A job must be selected.');
    }

    if (!request.interviews || request.interviews.length === 0) {
      errors.push('At least one interview must be selected.');
    }

    if (!request.dateRange) {
      errors.push('A date range must be selected.');
    }

    return errors;
  };

  const handleCompleteRequest = () => {
    const errors = validateRequest(structuredRequest);

    if (errors.length > 0) {
      // Display errors to the user
      alert(errors.join('\n'));
      return;
    }

    // eslint-disable-next-line no-console
    console.log('Request completed:', structuredRequest);
    // Here you would typically send the request to your backend
    resetFlow();
  };

  const resetFlow = () => {
    setStructuredRequest({ requestType: '' });
    setStep(0);
    setInputValue('');
    setOpen(false);
  };

  //   const handleDateRangeChange = (range: DateRange | undefined) => {
  //     if (range) {
  //       setStructuredRequest((prev) => ({ ...prev, dateRange: range }));
  //     }
  //   };

  const renderPrompt = () => {
    switch (step) {
      case 0:
        return 'What type of request?';
      case 1:
        return 'What is the job position?';
      case 2:
        return 'Who is the candidate?';
      case 3:
        return 'Select interview types (multiple allowed)';
      case 4:
        return 'Select date range';
      case 5:
        return 'Who is the interviewer? (Optional)';
      default:
        return 'Type your request...';
    }
  };

  const renderStructuredRequest = () => {
    return (
      <div className='flex flex-wrap gap-2 mt-2'>
        {Object.entries(structuredRequest).map(
          ([key, value]) =>
            value &&
            (key !== 'interviews' ? (
              <Badge key={key} variant='secondary' className='text-sm'>
                {key}:{' '}
                {key === 'dateRange'
                  ? renderDateRange(value as DateRange)
                  : value}
                <button
                  className='ml-1'
                  onClick={() => {
                    setStructuredRequest((prev) => ({
                      ...prev,
                      [key]: undefined,
                    }));
                    const stepIndex = [
                      'requestType',
                      'job',
                      'candidate',
                      'interviews',
                      'dateRange',
                      'interviewer',
                    ].indexOf(key);
                    setStep(stepIndex);
                    // Clear all subsequent steps
                    for (let i = stepIndex + 1; i < 6; i++) {
                      const field = [
                        'requestType',
                        'job',
                        'candidate',
                        'interviews',
                        'dateRange',
                        'interviewer',
                      ][i];
                      setStructuredRequest((prev) => ({
                        ...prev,
                        [field]: undefined,
                      }));
                    }
                    setInputValue('');
                  }}
                >
                  <X className='h-3 w-4' />
                </button>
              </Badge>
            ) : (
              (value as string[]).map((interview) => (
                <Badge key={interview} variant='secondary' className='text-sm'>
                  interview: {interview}
                  <button
                    className='ml-1'
                    onClick={() => {
                      setStructuredRequest((prev) => ({
                        ...prev,
                        interviews: prev.interviews?.filter(
                          (i) => i !== interview,
                        ),
                      }));
                      if (structuredRequest.interviews?.length === 1) {
                        setStep(3); // Go back to interview selection step if all interviews are removed
                      }
                    }}
                  >
                    <X className='h-3 w-4' />
                  </button>
                </Badge>
              ))
            )),
        )}
      </div>
    );
  };

  const renderDateRange = (range: DateRange) => {
    if (range.from) {
      return range.to
        ? `${format(range.from, 'LLL dd, y')} - ${format(range.to, 'LLL dd, y')}`
        : format(range.from, 'LLL dd, y');
    }
    return 'Pick a date range';
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline'>
          <Plus className='mr-2 h-4 w-4' /> New Request
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[400px] p-0' align='start' sideOffset={4}>
        <div className='p-4 space-y-4'>
          {step > 0 && (
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setStep((prev) => prev - 1)}
            >
              <ChevronLeft className='mr-2 h-4 w-4' /> Back
            </Button>
          )}
          {step !== 4 ? (
            <Command>
              <CommandInput
                ref={inputRef}
                placeholder={renderPrompt()}
                value={inputValue}
                onValueChange={setInputValue}
                onKeyDown={handleKeyDown}
              />
              <CommandList>
                <CommandEmpty>No suggestions available.</CommandEmpty>
                {suggestions.map((suggestion) => (
                  <CommandItem
                    key={suggestion.id}
                    onSelect={() => handleSelect(suggestion)}
                  >
                    {suggestion.type === 'candidate' && (
                      <User className='mr-2 h-4 w-4' />
                    )}
                    {suggestion.type === 'job' && (
                      <Briefcase className='mr-2 h-4 w-4' />
                    )}
                    {suggestion.type === 'interviewer' && (
                      <UserPlus className='mr-2 h-4 w-4' />
                    )}
                    {suggestion.type === 'requestType' && (
                      <Calendar className='mr-2 h-4 w-4' />
                    )}
                    {suggestion.type === 'date' && (
                      <Calendar className='mr-2 h-4 w-4' />
                    )}
                    {suggestion.type === 'interview' && (
                      <FileText className='mr-2 h-4 w-4' />
                    )}
                    <span>{suggestion.name}</span>
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          ) : (
            <>
              {customDateRange ? (
                <DatePickerWithRange
                  date={customDateRange}
                  setDate={setCustomDateRange}
                />
              ) : (
                <Command>
                  <CommandInput
                    ref={inputRef}
                    placeholder="Select a predefined date range or type 'Custom Range'"
                    value={inputValue}
                    onValueChange={setInputValue}
                    onKeyDown={handleKeyDown}
                  />
                  <CommandList>
                    <CommandEmpty>No suggestions available.</CommandEmpty>
                    {suggestions.map((suggestion) => (
                      <CommandItem
                        key={suggestion.id}
                        onSelect={() => handleSelect(suggestion)}
                      >
                        <Calendar className='mr-2 h-4 w-4' />
                        <span>{suggestion.name}</span>
                      </CommandItem>
                    ))}
                  </CommandList>
                </Command>
              )}
            </>
          )}
          {renderStructuredRequest()}
          <div className='flex justify-between'>
            <Button variant='outline' onClick={resetFlow}>
              Cancel
            </Button>
            {step < 5 ? (
              <Button
                onClick={() => setStep((prev) => prev + 1)}
                disabled={
                  (step === 0 && !structuredRequest.requestType) ||
                  (step === 1 && !structuredRequest.job) ||
                  (step === 2 && !structuredRequest.candidate) ||
                  (step === 3 &&
                    (!structuredRequest.interviews ||
                      structuredRequest.interviews.length === 0)) ||
                  (step === 4 && !structuredRequest.dateRange)
                }
              >
                Next <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
            ) : (
              <Button
                onClick={handleCompleteRequest}
                disabled={validateRequest(structuredRequest).length > 0}
              >
                Create Request <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

const useCreateRequestContext = () => {
  const {
    jobs: { data: jobs },
  } = useJobs();
  const safeJobs = (jobs ?? []).map(({ job_title }) => job_title);
  return { jobs: safeJobs };
};

const CreateRequestContext =
  createContext<ReturnType<typeof useCreateRequestContext>>(undefined);

const CreateRequestProvider = (props: PropsWithChildren) => {
  const value = useCreateRequestContext();
  return (
    <CreateRequestContext.Provider value={value}>
      {props.children}
    </CreateRequestContext.Provider>
  );
};

const useCreateRequest = () => {
  const value = useContext(CreateRequestContext);
  if (!value) throw new Error('CreateRequestContext was not found as provider');
  return value;
};

export const CreateRequestCommand = () => {
  return (
    <CreateRequestProvider>
      <CommandBar />
    </CreateRequestProvider>
  );
};
