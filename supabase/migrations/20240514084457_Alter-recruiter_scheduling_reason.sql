ALTER TABLE recruiter
ALTER COLUMN scheduling_reason
SET DEFAULT '{
  "company": {
    "rescheduling": [
      "Conflict with Another Meeting",
      "Unexpected Urgency",
      "Travel Delays or Issues",
      "Technical Difficulties",
      "Other"
    ],
    "cancellation": [
      "Position Filled",
      "Budget Constraints",
      "Reevaluation of Hiring Needs",
      "Other"
    ],
    "decline": [
      "Conflict with Another Meeting",
      "Unexpected Urgency",
      "Travel Delays or Issues",
      "Technical Difficulties",
      "Other"
    ]
  },
  "candidate": {
    "rescheduling": [
      "Request for a Different Time",
      "Request for a Different Date",
      "Additional Preparation Needed",
      "Change of Interview Mode"
    ],
    "cancellation": [
      "Conflicting Schedule",
      "Health Reasons",
      "Unexpected Emergency",
      "Job Offer Accepted"
    ]
  }
}';