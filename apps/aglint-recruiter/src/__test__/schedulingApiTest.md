# Testing Cases [Scheduling Algorithm]

- Verify for correct slots under different cases:
  - Meetings in the middle
  - Free keyword
  - Different API options
  - Holiday
  - Day off
  - Out of office (OOO)

## Ensure no conflict slots

## Ensure API returns slots within candidate's different time zones

## Interviewer Load

- API should return only no-conflict slots and interview load reached conflicted slots.
- Mock interviewers meeting data for getting load.

## Ensure "1 of" and "2 of" setting in interview plan

- Make sure all possible interviewers are there.

## Multiday Plan with Holidays and Day Off

- Ensure day selection in multiday plan is correct.

## Default API Options

```json
{
  "check_next_minutes": 30, // interval between each slot combination
  "include_free_time": true, // consider calendar event as free time based on keyword
  "make_training_optional": true,
  "use_recruiting_blocks": true,
  "cand_start_time": 8, // in 24 hour format
  "cand_end_time": 18, // in 24 hour format
  "include_conflicting_slots": {
    // to include respective conflicting slots enable the below flags
    "interviewer_pause": false,
    "show_conflicts_events": false,
    "interviewers_load": false,
    "calendar_not_connected": false,
    "day_off": false,
    "holiday": false,
    "out_of_office": false,
    "show_soft_conflicts": false,
    "out_of_working_hrs": false,
    "day_passed": false
  }
}
```
