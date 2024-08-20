import React, { useState } from "react";

const RequestToDefault = ({
  setConsoleMessage,
}: {
  setConsoleMessage: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [loading, setLoading] = useState(false);
  const supabase = window.supabase;

  const getRandomDate = (daysAgo: any) => {
    const today = new Date();
    const pastDate = new Date();
    pastDate.setDate(today.getDate() - daysAgo);
    return pastDate.toISOString();
  };

  const distributeDates = async () => {
    setLoading(true);
    setConsoleMessage([]);

    try {
      // Fetch all records
      const { data, error } = await supabase.from("request").select("*");

      if (error) {
        throw error;
      }

      let createdCounts = Array(7).fill(0); // Tracks created_at counts for the past 7 days
      let statusCounts = Array(7).fill({
        completed: 0,
        in_progress: 0,
        to_do: 0,
      }); // Tracks status counts for each day
      const totalRecords = data.length;
      let completedCounts = Array(7).fill(0); // Tracks completed_at counts for the past 7 days
      const averageWeekdayCount = Math.floor(totalRecords / 5);
      const weekendCountRange = [
        Math.floor(averageWeekdayCount * 0.2),
        Math.floor(averageWeekdayCount * 0.3),
      ];
      const updatedRecords = [];
      const batchSize = Math.ceil(data.length / 4);

      // First loop to distribute created_at dates and track statuses
      for (let record of data) {
        let randomDaysAgo;

        do {
          randomDaysAgo = Math.floor(Math.random() * 7);
          const day = new Date().getDay() - randomDaysAgo;
          const isWeekend = day === 0 || day === 6; // Sunday or Saturday
          const maxCount = isWeekend
            ? Math.floor(
                Math.random() *
                  (weekendCountRange[1] - weekendCountRange[0] + 1)
              ) + weekendCountRange[0]
            : Infinity;

          if (createdCounts[randomDaysAgo] < maxCount) {
            break;
          }
        } while (true);

        const newCreatedAt = getRandomDate(randomDaysAgo);
        createdCounts[randomDaysAgo]++;

        // Track the status counts
        const status = record.status;
        statusCounts[randomDaysAgo][status] =
          (statusCounts[randomDaysAgo][status] || 0) + 1;

        // Prepare updated record and spread the original record data
        updatedRecords.push({ ...record, created_at: newCreatedAt });
      }

      // Distribute completed_at dates only for records with status 'completed'
      for (let record of updatedRecords) {
        if (record.status === "completed") {
          let randomDaysAgo;

          do {
            randomDaysAgo = Math.floor(Math.random() * 7);
            const day = new Date().getDay() - randomDaysAgo;
            const isWeekend = day === 0 || day === 6; // Sunday or Saturday
            const maxCount = isWeekend
              ? Math.floor(
                  Math.random() *
                    (weekendCountRange[1] - weekendCountRange[0] + 1)
                ) + weekendCountRange[0]
              : Infinity;

            if (
              completedCounts[randomDaysAgo] < createdCounts[randomDaysAgo] &&
              completedCounts[randomDaysAgo] < maxCount
            ) {
              break;
            }
          } while (true);

          const newCompletedAt = getRandomDate(randomDaysAgo);
          completedCounts[randomDaysAgo]++;

          // Update the record with completed_at
          record.completed_at = newCompletedAt;
        }
      }

      // Adjust to ensure created_at > completed_at for each day and match status counts
      for (let i = 0; i < 7; i++) {
        while (
          createdCounts[i] <= completedCounts[i] &&
          completedCounts[i] > 0
        ) {
          // Find a record to adjust
          const recordToAdjust = updatedRecords.find((record) => {
            const completedDate = new Date(record.completed_at);
            return completedDate.getDay() === (new Date().getDay() - i + 7) % 7;
          });

          if (recordToAdjust) {
            // Move the completed_at date to the next day
            const newDay = (i + 1) % 7;
            recordToAdjust.completed_at = getRandomDate(newDay);
            completedCounts[i]--;
            completedCounts[newDay]++;
          }
        }

        // Ensure status counts sum to created_at counts
        const totalStatusCounts =
          statusCounts[i].completed +
          statusCounts[i].in_progress +
          statusCounts[i].to_do;
        if (totalStatusCounts < createdCounts[i]) {
          // Add dummy entries to match the created_at count
          for (let j = totalStatusCounts; j < createdCounts[i]; j++) {
            const dummyStatus = "to_do"; // Default to 'to_do', adjust as needed
            statusCounts[i][dummyStatus]++;
          }
        }
      }

      // Batch update records
      for (let i = 0; i < updatedRecords.length; i += batchSize) {
        const batch = updatedRecords.slice(i, i + batchSize);

        const { error } = await window.supabase.from("request").upsert(batch);

        if (error) {
          throw error;
        }
      }

      setConsoleMessage((pre) => [...pre, "Changing graph successfully!"]);
    } catch (error: any) {
      setConsoleMessage((pre) => [
        ...pre,
        `changing graphy error ${error.message}`,
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={distributeDates}
      disabled={loading}
      style={{ width: "150px" }}
    >
      {loading ? "Processing..." : "Beautify Trends"}
    </button>
  );
};

export default RequestToDefault;
