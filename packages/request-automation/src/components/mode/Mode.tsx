import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";

type jobMode = "aglint" | "ats";
const modes: {
  name: string;
  value: jobMode;
}[] = [
  { name: "Aglint", value: "aglint" },
  { name: "ATS Sync", value: "ats" },
];

function Mode() {
  const { recruiterId } = useAppContext();
  const [jobMode, setJobMode] = useState<jobMode>("aglint");
  const [isLoading, setIsLoading] = useState<{
    jobMode: boolean;
    flags: boolean;
  }>({
    jobMode: false,
    flags: true,
  });

  const [flags, setFlags] = useState({
    integrations: false,
    request: false,
    roles: false,
    scheduling: false,
    workflow: false,
    analytics: false,
    candidate_portal: false,
    scoring: false,
    agent: false,
    reports: false,
    themes: false,
    onboard_complete: false,
  });

  const supabase = window.supabase;

  const jobModeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as jobMode;
    setJobMode(value);
  };

  const fetchFlags = async () => {
    setIsLoading((pre) => ({ ...pre, flags: true }));
    const { data: iniFlags, error } = await supabase
      .from("recruiter_preferences")
      .select(
        "scoring, integrations, request, roles, scheduling, workflow, analytics, candidate_portal, agent, reports, themes, onboard_complete"
      )
      .eq("recruiter_id", recruiterId)
      .single();

    if (error) {
      console.log(error.message);
      return;
    }
    setFlags(iniFlags);
    setIsLoading((pre) => ({ ...pre, flags: false }));
  };

  useEffect(() => {
    if (recruiterId) fetchFlags();
  }, [recruiterId]);

  const updateScoring = async (updatedflags: typeof flags) => {
    setIsLoading((pre) => ({ ...pre, flags: true }));
    const { error } = await supabase
      .from("recruiter_preferences")
      .update({ ...updatedflags })
      .eq("recruiter_id", recruiterId);
    await fetchFlags();
    if (error) {
      console.log(error.message);
      return;
    }
    setIsLoading((pre) => ({ ...pre, flags: false }));
  };

  const handleFeatureChange = (key: keyof typeof flags) => {
    const newFlags = { ...flags, [key]: !flags[key] };
    updateScoring(newFlags);
  };

  return (
    <div id="mode">
      <div id="first">
        <div className="job-mode">
          <h5>Job Modes</h5>
          <div className="ats" style={{ display: "flex", gap: "10px" }}>
            {modes.map((mode) => (
              <label>
                <input
                  disabled
                  type="radio"
                  name={"job"}
                  value={mode.value}
                  checked={mode.value === jobMode}
                  onChange={jobModeHandler}
                />
                {mode.name}
              </label>
            ))}
          </div>
        </div>
      </div>
      <div id="second">
        <h5>Features</h5>
        {isLoading.flags ? (
          <p>Loading...</p>
        ) : (
          <div className="flags">
            <div
              className="Integrations"
              onClick={() => handleFeatureChange("integrations")}
            >
              <input type="checkbox" checked={flags.integrations} />
              <p>Integrations</p>
            </div>
            <div
              className="Request"
              onClick={() => handleFeatureChange("request")}
            >
              <input type="checkbox" checked={flags.request} />
              <p>Request</p>
            </div>
            <div className="Roles" onClick={() => handleFeatureChange("roles")}>
              <input type="checkbox" checked={flags.roles} />
              <p>Roles</p>
            </div>
            <div
              className="Scheduling"
              onClick={() => handleFeatureChange("scheduling")}
            >
              <input type="checkbox" checked={flags.scheduling} />
              <p>Scheduling</p>
            </div>
            <div
              className="Workflow"
              onClick={() => handleFeatureChange("workflow")}
            >
              <input type="checkbox" checked={flags.workflow} />
              <p>Workflow</p>
            </div>
            <div
              className="Analytics"
              onClick={() => handleFeatureChange("analytics")}
            >
              <input type="checkbox" checked={flags.analytics} />
              <p>Analytics</p>
            </div>
            <div
              className="Candidate-portal"
              onClick={() => handleFeatureChange("candidate_portal")}
            >
              <input type="checkbox" checked={flags.candidate_portal} />
              <p>Candidate Portal</p>
            </div>
            <div
              className="score"
              onClick={() => handleFeatureChange("scoring")}
            >
              <input type="checkbox" checked={flags.scoring} />
              <p>Scoring</p>
            </div>
            <div className="agent" onClick={() => handleFeatureChange("agent")}>
              <input type="checkbox" checked={flags.agent} />
              <p>Agent</p>
            </div>
            <div
              className="reports"
              onClick={() => handleFeatureChange("reports")}
            >
              <input type="checkbox" checked={flags.reports} />
              <p>Reports</p>
            </div>
            <div
              className="themes"
              onClick={() => handleFeatureChange("themes")}
            >
              <input type="checkbox" checked={flags.themes} />
              <p>Theme</p>
            </div>
            <div
              className="themes"
              onClick={() => handleFeatureChange("onboard_complete")}
            >
              <input type="checkbox" checked={flags.onboard_complete} />
              <p>Onboard complete</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Mode;
