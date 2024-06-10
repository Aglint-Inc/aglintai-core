import { Stack } from '@mui/material';


function CandidateInfo({ applications, candidate, file }) {
  // const application: JobApplication = useMemo(
  //   () =>
  //     ({
  //       ...applications,
  //       candidate: candidate,
  //       candidate_files: file,
  //     }) as unknown as JobApplication,
  //   [applications, candidate, file],
  // );
  // const resumeJson: any = file?.resume_json;
  if (applications && candidate && file)
    return (
      <Stack direction={'row'}>
        
      </Stack>
    );
}

export default CandidateInfo;
