#!/bin/bash

# Array of keywords to keep (without extensions)
KEYWORDS=(
    "clean.sh"
    "interactions"
    "StatusBadge"
    "index"
    "util"
    "devlink"
    "types"
    "utils"
    "DevLinkProvider"
    "devlinkContext"
    "AshbyApiKey"
    "AshbyAtsJob"
    "AtsCard"
    "AtsJobs"
    "CandidateCalender"
    "CandidateConfirmationPage"
    "CandidateDetail"
    "CandidateScheduleCard"
    "CandidateSideDrawer"
    "CandidateSidedrawerTop"
    "DcPopup"
    "ExperienceSkeleton"
    "Filter"
    "FilterButton"
    "IntegrationFetching"
    "IntegrationModal"
    "JobsDashboard"
    "JobsListingCard"
    "LeverApiKey"
    "LoadingJobsAts"
    "Page404"
    "ProgressHoverCard"
    "SavedChanges"
    "ScheduleProgress"
    "ScheduleProgressPill"
    "SelectedDateAndTime"
    "SessionAndTime"
    "SessionInfo"
    "UserDetails"
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