/* eslint-disable security/detect-object-injection */
import { PostgrestError } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { BulkImportCandidateCsv } from '@/src/components/JobApplicationsDashboard/ImportCandidatesCsv';
import { bulkCreateCandidateDbAction } from '@/src/context/CandidatesContext/utils';
import { ApplicationsInsert } from '@/src/types/applications.types';
import { Candidate } from '@/src/types/candidates.types';

import { getExisitingCandidates, getExisitingJobApplications } from './utils';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<UploadCandidateAPi['response']>,
) => {
  const { jobId, candidates } = req.body as UploadCandidateAPi['request'];
  const { emailList, candidateObj, invalidCandidates } = candidates.reduce(
    (acc, curr) => {
      if (
        curr.email &&
        curr.email.trim() !== '' &&
        !acc.candidateObj[curr.email]
      )
        return {
          ...acc,
          emailList: [...acc.emailList, curr.email],
          candidateObj: { ...acc.candidateObj, [curr.email]: curr },
        };
      else
        return {
          ...acc,
          invalidCandidates: [...acc.invalidCandidates, curr],
        };
    },
    { emailList: [], candidateObj: {}, invalidCandidates: [] } as {
      emailList: string[];
      candidateObj: {
        [key: string]: UploadCandidateAPi['request']['candidates'][0];
      };
      invalidCandidates: UploadCandidateAPi['request']['candidates'];
    },
  );
  const { data: d1, error: e1 } = await getExisitingCandidates(emailList);
  if (e1) {
    res.status(200).json({ data: null, error: e1 });
    return;
  }
  const { oldEmails, oldCandidates, existingCandidateObj } = d1.reduce(
    (acc, curr) => {
      return {
        oldEmails: [...acc.oldEmails, curr.email],
        oldCandidates: [...acc.oldCandidates, curr],
        existingCandidateObj: {
          ...acc.existingCandidateObj,
          [curr.email]: curr,
        },
      };
    },
    {
      oldEmails: [] as string[],
      oldCandidates: [] as Candidate[],
      existingCandidateObj: {} as { [key: string]: Candidate },
    },
  );
  const { newCandidates, existingCandidates } = emailList.reduce(
    (acc, curr) => {
      if (!oldEmails.includes(curr))
        return {
          ...acc,
          newCandidates: [...acc.newCandidates, candidateObj[curr]],
        };
      else
        return {
          ...acc,
          existingCandidates: [
            ...acc.existingCandidates,
            existingCandidateObj[curr],
          ],
        };
    },
    { newCandidates: [], existingCandidates: [] } as {
      newCandidates: UploadCandidateAPi['request']['candidates'];
      existingCandidates: Candidate[];
    },
  );
  const { data: d2, error: e2 } = await bulkCreateCandidateDbAction(
    newCandidates.map((n) => {
      // eslint-disable-next-line no-unused-vars
      const { resume, ...candidate } = n;
      return candidate;
    }),
  );
  if (e2) {
    res.status(200).json({ data: null, error: e2 });
    return;
  }
  const { data: d3, error: e3 } = await getExisitingJobApplications(
    [...d1.map((d) => d.id)],
    jobId,
  );
  if (e3) {
    res.status(200).json({ data: null, error: e3 });
    return;
  }
  const exisitingApplicantIds = d3.map((d) => d.candidate_id);

  const { newApplicants, existingApplicants } = oldCandidates.reduce(
    (acc, curr) => {
      if (!exisitingApplicantIds.includes(curr.id))
        return {
          ...acc,
          newApplicants: [...acc.newApplicants, curr],
        };
      else
        return {
          ...acc,
          existingApplicants: [...acc.existingApplicants, curr],
        };
    },
    {
      newApplicants: [] as Candidate[],
      existingApplicants: [] as Candidate[],
    },
  );
  const finalPayload: ApplicationsInsert[] = [
    ...newApplicants,
    ...d2,
  ].map((c) => {
    return {
      job_id: jobId,
      candidate_id: c.id,
      resume: candidateObj[c.email].resume,
    } as ApplicationsInsert;
  });

  res.status(200).json({
    data: {
      invalidCandidates,
      newCandidates,
      existingCandidates,
      newApplicants,
      existingApplicants,
      finalPayload,
    },
    error: null,
  });
};

export default handler;

export type UploadCandidateAPi = {
  request: {
    jobId: string;
    candidates: BulkImportCandidateCsv[];
  };
  response: {
    data: {
      invalidCandidates: BulkImportCandidateCsv[];
      newCandidates: BulkImportCandidateCsv[];
      existingCandidates: Candidate[];
      newApplicants: Candidate[];
      existingApplicants: Candidate[];
      finalPayload: ApplicationsInsert[];
    };
    error: PostgrestError;
  };
};
