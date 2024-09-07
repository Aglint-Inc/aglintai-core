#!/bin/bash

# List of files to keep
KEYWORDS=(
    "clean.sh"
    "interactions"
    "SlotComp"
    "Text"
    "GlobalIcon"
    "Breadcrum"
    "StatusBadge"
    "index"
    "util"
    "devlink"
    "types"
    "utils"
    "devlinkContext"
    "DevLinkProvider"
    "Activities"
    "ActivitiesCard"
    "AddScheduleCard"
    "AddScheduleOption"
    "AiBookingInstruction"
    "AvatarWithName"
    "BannerAlert"
    "BodyWithSidePanel"
    "CardWithNumber"
    "CdFeedback"
    "CompletedInterviews"
    "ConfirmScheduleList"
    "ConfirmScheduleListCard"
    "ConfirmationPopup"
    "ConflictPopover"
    "ConflictReason"
    "CreateJobLoader"
    "DarkPill"
    "DateOption"
    "DatePickerBody"
    "DayOffHelper"
    "DebreifHelperText"
    "DebriefDefaults"
    "DeletePopup"
    "DevLinkProvider"
    "EditJobTopbarLeft"
    "EmailPreviewOnScheduling"
    "EmptySlotReason"
    "FeedbackCandidate"
    "FeedbackCard"
    "FilterItem"
    "GlobalCta"
    "GlobalScheduleCard"
    "GlobalUserDetail"
    "GraphBlock"
    "HelperDropdown"
    "HistoryPill"
    "HistoryTrainingCard"
    "InterviewBreakCard"
    "InterviewLoadCard"
    "InterviewLoadDetails"
    "InterviewLoadHelper"
    "InterviewModuleStats"
    "InterviewModuleStatsCard"
    "InterviewPlanDetail"
    "InterviewPlanWrap"
    "InterviewRatio"
    "InterviewStage"
    "InterviewStatsLoader"
    "InterviewTypeToken"
    "InterviewWorkloadList"
    "InterviewerDetail"
    "InterviewerDetailOverview"
    "InterviewerMetricList"
    "InterviewerMetrics"
    "InterviewerPage"
    "InterviewerTraining"
    "InterviewerTrainingList"
    "InterviewerWorkload"
    "InterviewersCardList"
    "InterviewersDash"
    "JobDashboard"
    "JobDetailBlock"
    "JobRole"
    "JobsBanner"
    "KeywordsHelper"
    "LeaderBoard"
    "LeaderBoardCard"
    "LeaderBoardLoader"
    "LearnHowAshby"
    "LearnHowGreenhouse"
    "LearnHowLever"
    "MemberRow"
    "MembersList"
    "MetricsLeaderboard"
    "MultiFilterLayout"
    "MyFeedbackPopup"
    "MyScheduleSubCard"
    "NewInterviewDetail"
    "NewMyScheduleCard"
    "NewScheduleCard"
    "NewScheduleDetail"
    "PipeLine"
    "PiplelineTab"
    "ProfileScoreSkeleton"
    "Reason"
    "RecentDeclineList"
    "RecentDeclines"
    "RecentReschedule"
    "RecentRescheduleList"
    "RequestHistoryCard"
    "RescheduleCard"
    "RoleList"
    "RoundedNumber"
    "ScheduleCardSmall"
    "ScheduleCountStats"
    "ScheduleDetailTabs"
    "ScheduleOption"
    "ScheduleOptionsList"
    "ScheduleSelectPill"
    "SchedulerConflictCard"
    "SchedulingDashboard"
    "ScoreSetting"
    "SessionDetails"
    "SideDrawerLarge"
    "SingleDaySchedule"
    "SkeletonActivitiesCard"
    "StagePipelineSmall"
    "TrainingProgress"
    "TrainingProgressList"
    "TrainingProgressLoader"
    "UpcomingInterviewList"
    "WorkflowAddAction"
    "WorkflowButton"
    "WorkflowCard"
    "WorkflowConnectedCard"
    "WorkflowConnector"
    "WorkflowDetail"
    "WorkflowItem"
    "WorkflowLanding"
    "WorkingHourDetails"
    "YourSchedules"
)


# File extensions to keep
EXTENSIONS="\.(js|d\.ts|module\.css)$"

# Create a grep pattern from the keywords
GREP_PATTERN=$(printf "%s\n" "${KEYWORDS[@]}" | paste -sd "|" -)

# Function to check if a file should be kept
should_keep_file() {
    local filename=$(basename "$1")
    echo "$filename" | grep -E "$GREP_PATTERN" | grep -E "$EXTENSIONS" > /dev/null
}

# Function to check if a file is in the _Builtin folder
is_in_builtin_folder() {
    [[ "$1" == *"/_Builtin/"* ]]
}

# List files that will be deleted (for debugging)
echo "Files that will be deleted:"
find . -type f ! -name "clean.sh" | while read file; do
    if ! should_keep_file "$file" && ! is_in_builtin_folder "$file"; then
        echo "$file"
    fi
done

# Prompt user before deleting
read -p "Do you want to proceed with deletion? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
    # Delete files that don't match the criteria and are not in _Builtin folder
    find . -type f ! -name "clean.sh" | while read file; do
        if ! should_keep_file "$file" && ! is_in_builtin_folder "$file"; then
            rm "$file"
        fi
    done

    # Delete empty directories, except _Builtin
    find . -type d -empty ! -path "*/_Builtin*" -delete

    echo "Unwanted files and directories have been deleted."
else
    echo "Operation cancelled."
fi