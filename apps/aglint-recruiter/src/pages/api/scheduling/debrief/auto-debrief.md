How auto scheduling debrief is done

- when meetings get confirmed it will call /api/scheduling/application/debrief-add-users and it will add confirmed users to next debrief meeting
- if all previous meetings are booked it will call /api/scheduling/debrief/task_create which creates task
- while running cron for task it will call /api/scheduling/debrief/schedule_individual which will schedule debrief
