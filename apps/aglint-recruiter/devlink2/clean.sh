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
    "NavigationPill"
    "index"
    "util"
    "devlink"
    "types"
    "utils"
    "DevLinkProvider"
    "GlobalIcon"
    "Text SlotComp"
    "Breadcrum"
    "StatusBadge"
    "NavigationPill"
    "NoPendingReq"
    "Skeleton"
    "StartOption"
    "TextWithIcon"
    "TextWithBg"
    "PanelBlock"
    "ResumeTag"
    "ShadowSessionCard"
    "InterviewerListRd"
    "ButtonOutline"
    "InterviewScreenCard"
    "devlinkContext"
    "AddFilter"
    "AglintAiChat"
    "AglintAiWelcome"
    "AiChatSuggest"
    "AiTaskBanner"
    "AllInterviewEmpty"
    "AllInterviewers"
    "AllInterviewersCard"
    "ApplicantDetailStage"
    "ApplicantInfoBox"
    "ApplicantsListEmpty"
    "ApplicantsTable"
    "ApplicationDetail"
    "AssessmentListCardLoader"
    "AssignedNameCard"
    "AssignedToList"
    "Attendee"
    "AvailabilityEmpty"
    "AvailabilityReq"
    "AvailableOptionCardDate"
    "ButtonFilter"
    "ButtonGhost"
    "ButtonSoft"
    "ButtonSolid"
    "CalendarPick"
    "CandidateListItem"
    "CompanyDayOff"
    "DatePicker"
    "DayOff"
    "DayoffList"
    "DevLinkProvider"
    "EmailTemplateHolder"
    "EmptyGeneral"
    "EmptyState"
    "FilterDropdown"
    "FilterPageLayout"
    "GlobalBadge"
    "GlobalBanner"
    "GlobalBannerInline"
    "GlobalBannerShort"
    "GlobalInfo"
    "InterviewConfirmed"
    "InterviewConfirmedCard"
    "InterviewLoad"
    "InterviewMemberList"
    "InterviewMemberSide"
    "InterviewMode"
    "InterviewModePill"
    "InterviewModuleCard"
    "InterviewModuleTable"
    "InterviewPlanEmpty"
    "JobDetails"
    "KeywordCard"
    "Keywords"
    "MemberListCard"
    "MemberListCardOption"
    "ModuleMembers"
    "ModuleSetting"
    "MultiDaySelect"
    "MultidayCard"
    "NotesRequestDetail"
    "OptionAvailable"
    "PageLayout"
    "PanelMemberPill"
    "PickSlotDay"
    "PreviewEmail"
    "QualifiedIcons"
    "ReqCompleted"
    "ReqUrgent"
    "RequestAgentEmpty"
    "RequestCandidate"
    "RequestCard"
    "RequestCardDetail"
    "RequestCardSkeleton"
    "RequestDashboard"
    "RequestDetail"
    "RequestDetailRight"
    "RequestList"
    "RequestProgress"
    "RequestReschedule"
    "RequestSetting"
    "RequestsWrapper"
    "ResponsiveBanner"
    "ResumeErrorBlock"
    "ScheduleInterviewPop"
    "ScheduleProgress"
    "ScheduleSettings"
    "SelectActionBar"
    "SelectActionsDropdown"
    "SelectedMemberPill"
    "SelectedSlot"
    "ShadowSession"
    "SideDrawerBlock"
    "SidedrawerBodyBreak"
    "SidedrawerBodyDebrief"
    "SidedrawerBodySession"
    "SkeletonCandidateListItem"
    "SkeletonParagraph"
    "SkeletonScheduleCard"
    "SlotPicker"
    "Stepper"
    "TimePick"
    "TimeRangeInput"
    "TrainingDetailList"
    "TrainingProgressDetail"
    "TrainingSetting"
    "TrainingSettingItem"
    "TrainingStatus"
    "WorkingHourDay"
    "TokenItem"
    "ToggleWithText"
    "SlotComp"
    "SkeletonActivitiesCard"
    "SkeletonCandidateListItem"
    "SkeletonLoaderAtsCard"
    "SkeletonParagraph"
    "SkeletonScheduleCard"
    "SkeletonTextSmall"
    "UserPasswordChange"
    "orkflowEmpty"
    "TeamEmpty"
    "AllInterviewEmpty"
    "ApplicantsListEmpty"
    "AvailabilityEmpty"
    "EmptyGeneral"
    "EmptySlotReason"
    "EmptyState"
    "JobDashboardEmpty"
    "InterviewPlanEmpty"
    "JobEmptyState"
    "RequestAgentEmpty"
    "NoData"
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